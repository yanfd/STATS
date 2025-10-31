from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import uvicorn
import os
import asyncio
from datetime import datetime

# Import our route modules
from routes import audio_routes, waveform_routes, effects_routes, hughes_routes

# 启动时的生命周期管理
@asynccontextmanager
async def lifespan(app: FastAPI):
    # 启动时执行
    print(f"[{datetime.now()}] Starting up Hughes API...")
    
    # 自动同步Hughes数据
    try:
        print("Triggering initial Hughes data sync...")
        from routes.hughes_routes import sync_hughes_data
        await sync_hughes_data()
        print("Initial sync completed successfully!")
    except Exception as e:
        print(f"Initial sync failed: {e}")
        print("API will continue running, data will sync on first request")
    
    # 启动定期同步任务（可选）
    # asyncio.create_task(periodic_sync())
    
    yield  # 应用运行中
    
    # 关闭时执行
    print(f"[{datetime.now()}] Shutting down Hughes API...")

# 可选：定期同步任务
async def periodic_sync():
    """每6小时同步一次数据"""
    while True:
        await asyncio.sleep(6 * 60 * 60)  # 6小时
        try:
            print(f"[{datetime.now()}] Running periodic sync...")
            from routes.hughes_routes import sync_hughes_data
            await sync_hughes_data()
            print("Periodic sync completed!")
        except Exception as e:
            print(f"Periodic sync failed: {e}")

app = FastAPI(
    title="Audio Processing API",
    description="A fun audio processing API for testing with Next.js frontend",
    version="1.0.0",
    lifespan=lifespan  # 添加生命周期管理
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000",
        "https://stats.yanfd.tech",  # 添加你的生产环境域名
        "https://api.yanfd.tech"     # 也允许API自己的域名（如果需要）
        "https://stats.yanfd.cn",  # 添加你的生产环境域名
        "https://api.yanfd.cn"     # 也允许API自己的域名（如果需要）
    ],
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