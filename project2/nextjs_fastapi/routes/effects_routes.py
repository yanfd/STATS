from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import JSONResponse, FileResponse
from pathlib import Path
import uuid
import librosa
import soundfile as sf
import numpy as np
from scipy.signal import butter, filtfilt
from audio_utils import audio_processor

router = APIRouter()

def apply_pitch_shift(y, sr, n_steps):
    """Apply pitch shifting to audio"""
    return librosa.effects.pitch_shift(y, sr=sr, n_steps=n_steps)

def apply_time_stretch(y, rate):
    """Apply time stretching to audio"""
    return librosa.effects.time_stretch(y, rate=rate)

def apply_low_pass_filter(y, sr, cutoff_freq):
    """Apply low-pass filter"""
    nyquist = sr / 2
    normalized_cutoff = cutoff_freq / nyquist
    b, a = butter(5, normalized_cutoff, btype='low')
    return filtfilt(b, a, y)

def apply_high_pass_filter(y, sr, cutoff_freq):
    """Apply high-pass filter"""
    nyquist = sr / 2
    normalized_cutoff = cutoff_freq / nyquist
    b, a = butter(5, normalized_cutoff, btype='high')
    return filtfilt(b, a, y)

@router.post("/pitch/{file_id}")
async def apply_pitch_effect(
    file_id: str,
    semitones: float = Query(0, ge=-12, le=12, description="Pitch shift in semitones")
):
    """Apply pitch shifting effect"""
    
    # Find the file
    audio_files = list(audio_processor.upload_dir.glob(f"{file_id}.*"))
    if not audio_files:
        raise HTTPException(status_code=404, detail="Audio file not found")
    
    file_path = audio_files[0]
    
    try:
        # Load audio
        y, sr = audio_processor.load_audio(file_path)
        
        # Apply pitch shift
        y_shifted = apply_pitch_shift(y, sr, semitones)
        
        # Save processed audio
        output_id = str(uuid.uuid4())
        output_filename = f"{output_id}_pitch_{semitones}.wav"
        output_path = audio_processor.processed_dir / output_filename
        
        sf.write(str(output_path), y_shifted, sr)
        
        return JSONResponse(
            status_code=200,
            content={
                "message": "Pitch effect applied successfully",
                "original_file_id": file_id,
                "processed_file_id": output_id,
                "effect": "pitch_shift",
                "parameters": {"semitones": semitones},
                "output_filename": output_filename
            }
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error applying pitch effect: {str(e)}")

@router.post("/speed/{file_id}")
async def apply_speed_effect(
    file_id: str,
    rate: float = Query(1.0, ge=0.5, le=2.0, description="Speed multiplier (0.5-2.0)")
):
    """Apply speed/tempo change effect"""
    
    # Find the file
    audio_files = list(audio_processor.upload_dir.glob(f"{file_id}.*"))
    if not audio_files:
        raise HTTPException(status_code=404, detail="Audio file not found")
    
    file_path = audio_files[0]
    
    try:
        # Load audio
        y, sr = audio_processor.load_audio(file_path)
        
        # Apply time stretch
        y_stretched = apply_time_stretch(y, rate)
        
        # Save processed audio
        output_id = str(uuid.uuid4())
        output_filename = f"{output_id}_speed_{rate}.wav"
        output_path = audio_processor.processed_dir / output_filename
        
        sf.write(str(output_path), y_stretched, sr)
        
        return JSONResponse(
            status_code=200,
            content={
                "message": "Speed effect applied successfully",
                "original_file_id": file_id,
                "processed_file_id": output_id,
                "effect": "speed_change",
                "parameters": {"rate": rate},
                "output_filename": output_filename
            }
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error applying speed effect: {str(e)}")

@router.post("/filter/{file_id}")
async def apply_filter_effect(
    file_id: str,
    filter_type: str = Query("lowpass", regex="^(lowpass|highpass)$"),
    cutoff_frequency: int = Query(1000, ge=100, le=10000, description="Cutoff frequency in Hz")
):
    """Apply filter effect (lowpass or highpass)"""
    
    # Find the file
    audio_files = list(audio_processor.upload_dir.glob(f"{file_id}.*"))
    if not audio_files:
        raise HTTPException(status_code=404, detail="Audio file not found")
    
    file_path = audio_files[0]
    
    try:
        # Load audio
        y, sr = audio_processor.load_audio(file_path)
        
        # Apply filter
        if filter_type == "lowpass":
            y_filtered = apply_low_pass_filter(y, sr, cutoff_frequency)
        else:  # highpass
            y_filtered = apply_high_pass_filter(y, sr, cutoff_frequency)
        
        # Save processed audio
        output_id = str(uuid.uuid4())
        output_filename = f"{output_id}_{filter_type}_{cutoff_frequency}.wav"
        output_path = audio_processor.processed_dir / output_filename
        
        sf.write(str(output_path), y_filtered, sr)
        
        return JSONResponse(
            status_code=200,
            content={
                "message": f"{filter_type.capitalize()} filter applied successfully",
                "original_file_id": file_id,
                "processed_file_id": output_id,
                "effect": f"{filter_type}_filter",
                "parameters": {"cutoff_frequency": cutoff_frequency},
                "output_filename": output_filename
            }
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error applying filter effect: {str(e)}")

@router.get("/download/{processed_file_id}")
async def download_processed_audio(processed_file_id: str):
    """Download processed audio file"""
    
    # Find the processed file
    processed_files = list(audio_processor.processed_dir.glob(f"{processed_file_id}_*.wav"))
    if not processed_files:
        raise HTTPException(status_code=404, detail="Processed audio file not found")
    
    file_path = processed_files[0]
    
    return FileResponse(
        path=str(file_path),
        media_type="audio/wav",
        filename=file_path.name
    )