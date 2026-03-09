"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

export interface AudioData {
  frequencyData: Uint8Array;
  timeDomainData: Uint8Array;
  bass: number;
  mid: number;
  treble: number;
  beat: boolean;
  energy: number;
}

const EMPTY_AUDIO: AudioData = {
  frequencyData: new Uint8Array(0),
  timeDomainData: new Uint8Array(0),
  bass: 0,
  mid: 0,
  treble: 0,
  beat: false,
  energy: 0,
};

export function useAudioAnalyzer(fftSize: number = 512) {
  const [isListening, setIsListening] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const prevBassRef = useRef(0);
  const beatCooldownRef = useRef(0);

  const getAudioData = useCallback((): AudioData => {
    if (!analyserRef.current) return EMPTY_AUDIO;

    const analyser = analyserRef.current;
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);
    const timeDomainData = new Uint8Array(analyser.frequencyBinCount);

    analyser.getByteFrequencyData(frequencyData);
    analyser.getByteTimeDomainData(timeDomainData);

    const binCount = frequencyData.length;
    const bassEnd = Math.floor(binCount * 0.08);
    const midEnd = Math.floor(binCount * 0.4);

    let bassSum = 0,
      midSum = 0,
      trebleSum = 0;
    for (let i = 0; i < binCount; i++) {
      const val = frequencyData[i] / 255;
      if (i < bassEnd) bassSum += val;
      else if (i < midEnd) midSum += val;
      else trebleSum += val;
    }

    const bass = bassEnd > 0 ? bassSum / bassEnd : 0;
    const mid = midEnd - bassEnd > 0 ? midSum / (midEnd - bassEnd) : 0;
    const treble = binCount - midEnd > 0 ? trebleSum / (binCount - midEnd) : 0;
    const energy = bass * 0.5 + mid * 0.3 + treble * 0.2;

    beatCooldownRef.current = Math.max(0, beatCooldownRef.current - 1);
    const bassJump = bass - prevBassRef.current;
    const beat =
      bassJump > 0.12 && bass > 0.2 && beatCooldownRef.current === 0;
    if (beat) beatCooldownRef.current = 8;
    prevBassRef.current = bass * 0.7 + prevBassRef.current * 0.3;

    return { frequencyData, timeDomainData, bass, mid, treble, beat, energy };
  }, []);

  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = fftSize;
      analyser.smoothingTimeConstant = 0.75;
      source.connect(analyser);
      analyserRef.current = analyser;

      setIsListening(true);
    } catch (err) {
      console.error('Microphone access denied:', err);
    }
  }, [fftSize]);

  const stopListening = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    setIsListening(false);
  }, []);

  useEffect(() => {
    return () => {
      if (streamRef.current)
        streamRef.current.getTracks().forEach((t) => t.stop());
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return { isListening, getAudioData, startListening, stopListening };
}
