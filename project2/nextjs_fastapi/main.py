from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os

# Import our route modules
from routes import audio_routes, waveform_routes, effects_routes, hughes_routes

app = FastAPI(
    title="Audio Processing API",
    description="A fun audio processing API for testing with Next.js frontend",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include route modules
app.include_router(audio_routes.router, prefix="/api/audio", tags=["audio"])
app.include_router(waveform_routes.router, prefix="/api/waveform", tags=["waveform"])
app.include_router(effects_routes.router, prefix="/api/effects", tags=["effects"])
app.include_router(hughes_routes.router)  # Hughes routes already have /api/hughes prefix

# Create uploads directory if it doesn't exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("processed", exist_ok=True)

@app.get("/")
async def root():
    return {
        "message": "Audio Processing API is running!",
        "docs": "/docs",
        "endpoints": {
            "upload": "/api/audio/upload",
            "waveform": "/api/waveform/generate",
            "effects": "/api/effects/apply"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "audio-processing-api"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)