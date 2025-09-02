from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from pathlib import Path
import uuid

# Make audio_utils import optional
try:
    from audio_utils import audio_processor
    AUDIO_PROCESSING_ENABLED = True
except ImportError as e:
    print(f"Warning: Audio processing disabled: {e}")
    AUDIO_PROCESSING_ENABLED = False
    audio_processor = None

router = APIRouter()

@router.post("/upload")
async def upload_audio(file: UploadFile = File(...)):
    """Upload an audio file and return basic information"""
    
    # Validate file type
    if not audio_processor.is_audio_file(file.filename):
        raise HTTPException(
            status_code=400, 
            detail=f"Unsupported file format. Supported formats: {', '.join(audio_processor.supported_formats)}"
        )
    
    # Generate unique filename
    file_id = str(uuid.uuid4())
    file_extension = Path(file.filename).suffix
    filename = f"{file_id}{file_extension}"
    file_path = audio_processor.upload_dir / filename
    
    try:
        # Save uploaded file
        saved_path = audio_processor.save_upload_file(file, file_path)
        
        # Get audio information
        audio_info = audio_processor.get_audio_info(saved_path)
        audio_info["file_id"] = file_id
        audio_info["original_filename"] = file.filename
        
        return JSONResponse(
            status_code=200,
            content={
                "message": "File uploaded successfully",
                "audio_info": audio_info
            }
        )
        
    except Exception as e:
        # Clean up file if error occurred
        if file_path.exists():
            file_path.unlink()
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

@router.get("/info/{file_id}")
async def get_audio_info(file_id: str):
    """Get information about an uploaded audio file"""
    
    # Find the file
    audio_files = list(audio_processor.upload_dir.glob(f"{file_id}.*"))
    if not audio_files:
        raise HTTPException(status_code=404, detail="Audio file not found")
    
    file_path = audio_files[0]
    
    try:
        audio_info = audio_processor.get_audio_info(file_path)
        audio_info["file_id"] = file_id
        
        return JSONResponse(
            status_code=200,
            content=audio_info
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting audio info: {str(e)}")

@router.delete("/delete/{file_id}")
async def delete_audio_file(file_id: str):
    """Delete an uploaded audio file"""
    
    # Find and delete the file
    audio_files = list(audio_processor.upload_dir.glob(f"{file_id}.*"))
    if not audio_files:
        raise HTTPException(status_code=404, detail="Audio file not found")
    
    try:
        for file_path in audio_files:
            file_path.unlink()
        
        return JSONResponse(
            status_code=200,
            content={"message": f"File {file_id} deleted successfully"}
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting file: {str(e)}")

@router.get("/list")
async def list_audio_files():
    """List all uploaded audio files"""
    
    try:
        files = []
        for file_path in audio_processor.upload_dir.iterdir():
            if file_path.is_file() and audio_processor.is_audio_file(file_path.name):
                file_id = file_path.stem
                try:
                    audio_info = audio_processor.get_audio_info(file_path)
                    audio_info["file_id"] = file_id
                    files.append(audio_info)
                except:
                    # Skip files that can't be processed
                    continue
        
        return JSONResponse(
            status_code=200,
            content={"files": files, "count": len(files)}
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error listing files: {str(e)}")