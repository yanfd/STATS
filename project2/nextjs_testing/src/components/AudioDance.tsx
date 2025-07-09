import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

// props 类型
interface VudioOptions {
  effect?: string;
  accuracy?: number;
  width?: number;
  height?: number;
  waveform?: {
    maxHeight?: number;
    minHeight?: number;
    spacing?: number;
    color?: string | string[];
    shadowBlur?: number;
    shadowColor?: string;
    fadeSide?: boolean;
    horizontalAlign?: string;
    verticalAlign?: string;
  };
}

interface AudioDanceProps {
  audioSrc: string;
  options?: VudioOptions;
  style?: React.CSSProperties;
  className?: string;
}

// 支持外部调用 dance/pause/setOption
export interface AudioDanceRef {
  dance: () => void;
  pause: () => void;
  setOption: (opt: VudioOptions) => void;
}

const defaultOptions: VudioOptions = {
  effect: 'waveform',
  accuracy: 128,
  width: 256,
  height: 100,
  waveform: {
    maxHeight: 80,
    minHeight: 1,
    spacing: 1,
    color: '#f00',
    shadowBlur: 0,
    shadowColor: '#f00',
    fadeSide: true,
    horizontalAlign: 'center',
    verticalAlign: 'middle',
  },
};

const AudioDance = forwardRef<AudioDanceRef, AudioDanceProps>(
  ({ audioSrc, options = {}, style, className }, ref) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const vudioInstance = useRef<any>(null);

    // 合并默认参数和外部参数
    const mergedOptions = { ...defaultOptions, ...options, waveform: { ...defaultOptions.waveform, ...options.waveform } };

    useEffect(() => {
      // @ts-ignore
      const Vudio = (window as any).Vudio;
      if (Vudio && audioRef.current && canvasRef.current) {
        vudioInstance.current = new Vudio(audioRef.current, canvasRef.current, mergedOptions);
        vudioInstance.current.dance();
      }
      return () => {
        if (vudioInstance.current) vudioInstance.current.pause();
      };
      // eslint-disable-next-line
    }, [audioSrc, JSON.stringify(options)]);

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
      dance: () => vudioInstance.current?.dance(),
      pause: () => vudioInstance.current?.pause(),
      setOption: (opt: VudioOptions) => vudioInstance.current?.setOption(opt),
    }));

    return (
      <div className={className} style={style}>
        <canvas
          ref={canvasRef}
          width={mergedOptions.width}
          height={mergedOptions.height}
          style={{ display: 'block', marginBottom: 8 }}
        />
        <audio ref={audioRef} src={audioSrc} controls />
      </div>
    );
  }
);

export default AudioDance;