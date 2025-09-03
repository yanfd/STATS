from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import JSONResponse
from pathlib import Path

# Make audio_utils import optional
try:
    from audio_utils import audio_processor
    AUDIO_PROCESSING_ENABLED = True
except ImportError as e:
    print(f"Warning: Audio processing disabled: {e}")
    AUDIO_PROCESSING_ENABLED = False
    audio_processor = None

router = APIRouter()

@router.get("/generate/{file_id}")
async def generate_waveform(
    file_id: str, 
    points: int = Query(1000, ge=100, le=10000, description="Number of points in waveform")
):
    """Generate waveform data for visualization"""
    
    # Find the file
    audio_files = list(audio_processor.upload_dir.glob(f"{file_id}.*"))
    if not audio_files:
        raise HTTPException(status_code=404, detail="Audio file not found")
    
    file_path = audio_files[0]
    
    try:
        waveform_data = audio_processor.generate_waveform_data(file_path, points)
        waveform_data["file_id"] = file_id
        
        return JSONResponse(
            status_code=200,
            content=waveform_data
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating waveform: {str(e)}")

@router.get("/analyze/{file_id}")
async def analyze_audio(file_id: str):
    """Perform detailed audio analysis"""
    
    # Find the file
    audio_files = list(audio_processor.upload_dir.glob(f"{file_id}.*"))
    if not audio_files:
        raise HTTPException(status_code=404, detail="Audio file not found")
    
    file_path = audio_files[0]
    
    try:
        analysis_data = audio_processor.analyze_audio(file_path)
        analysis_data["file_id"] = file_id
        
        return JSONResponse(
            status_code=200,
            content={
                "message": "Audio analysis completed",
                "analysis": analysis_data
            }
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing audio: {str(e)}")