import os
import shutil
from pathlib import Path
from typing import List
import numpy as np

# Optional imports - audio processing functionality
try:
    import librosa
    import soundfile as sf
    from pydub import AudioSegment
    from scipy.signal import spectrogram
    AUDIO_LIBS_AVAILABLE = True
except ImportError as e:
    print(f"Warning: Audio processing libraries not fully available: {e}")
    AUDIO_LIBS_AVAILABLE = False

class AudioProcessor:
    def __init__(self):
        self.supported_formats = ['.mp3', '.wav', '.m4a', '.flac', '.ogg']
        self.upload_dir = Path("uploads")
        self.processed_dir = Path("processed")
        
    def is_audio_file(self, filename: str) -> bool:
        """Check if file has supported audio format"""
        return Path(filename).suffix.lower() in self.supported_formats
    
    def save_upload_file(self, upload_file, destination: Path) -> Path:
        """Save uploaded file to destination"""
        try:
            with destination.open("wb") as buffer:
                shutil.copyfileobj(upload_file.file, buffer)
            return destination
        finally:
            upload_file.file.close()
    
    def load_audio(self, file_path: Path, sr: int = 22050):
        """Load audio file using librosa"""
        try:
            y, sr = librosa.load(str(file_path), sr=sr)
            return y, sr
        except Exception as e:
            raise ValueError(f"Error loading audio file: {str(e)}")
    
    def get_audio_info(self, file_path: Path) -> dict:
        """Get basic audio file information"""
        try:
            y, sr = self.load_audio(file_path)
            duration = len(y) / sr
            
            return {
                "filename": file_path.name,
                "duration": round(duration, 2),
                "sample_rate": sr,
                "channels": 1,  # librosa loads as mono by default
                "format": file_path.suffix.lower(),
                "size_bytes": file_path.stat().st_size
            }
        except Exception as e:
            raise ValueError(f"Error getting audio info: {str(e)}")
    
    def generate_waveform_data(self, file_path: Path, points: int = 1000) -> dict:
        """Generate waveform data for visualization"""
        try:
            y, sr = self.load_audio(file_path)
            
            # Downsample for visualization
            if len(y) > points:
                # Calculate step size to get approximately 'points' number of samples
                step = len(y) // points
                y_downsampled = y[::step][:points]
            else:
                y_downsampled = y
            
            # Normalize to -1 to 1 range
            if np.max(np.abs(y_downsampled)) > 0:
                y_normalized = y_downsampled / np.max(np.abs(y_downsampled))
            else:
                y_normalized = y_downsampled
            
            return {
                "waveform": y_normalized.tolist(),
                "sample_rate": sr,
                "duration": len(y) / sr,
                "points": len(y_normalized)
            }
        except Exception as e:
            raise ValueError(f"Error generating waveform: {str(e)}")
    
    def analyze_audio(self, file_path: Path) -> dict:
        """Perform audio analysis"""
        try:
            y, sr = self.load_audio(file_path)
            
            # Basic analysis
            rms_energy = np.sqrt(np.mean(y**2))
            zero_crossing_rate = np.mean(librosa.feature.zero_crossing_rate(y)[0])
            
            # Spectral features
            spectral_centroids = librosa.feature.spectral_centroid(y=y, sr=sr)[0]
            spectral_rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)[0]
            
            # Tempo and beat tracking
            tempo, beats = librosa.beat.beat_track(y=y, sr=sr)
            
            # MFCC features
            mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
            
            return {
                "rms_energy": float(rms_energy),
                "zero_crossing_rate": float(zero_crossing_rate),
                "spectral_centroid_mean": float(np.mean(spectral_centroids)),
                "spectral_rolloff_mean": float(np.mean(spectral_rolloff)),
                "tempo": float(tempo),
                "beat_count": len(beats),
                "mfcc_means": [float(np.mean(mfcc)) for mfcc in mfccs]
            }
        except Exception as e:
            raise ValueError(f"Error analyzing audio: {str(e)}")

# Global instance
audio_processor = AudioProcessor()