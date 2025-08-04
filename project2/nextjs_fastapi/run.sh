#!/bin/bash

# Audio Processing API Setup and Run Script

echo "🎵 Setting up Audio Processing API..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Create necessary directories
echo "Creating directories..."
mkdir -p uploads processed

echo "✅ Setup complete!"
echo ""
echo "🚀 Starting FastAPI server..."
echo "📖 API Documentation will be available at: http://localhost:8000/docs"
echo "🌐 API Base URL: http://localhost:8000"
echo ""

# Start the server
python main.py