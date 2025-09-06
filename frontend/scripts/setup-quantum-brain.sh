#!/bin/bash

# Setup script for Quantum-Brain Python backend
# This script ensures the Python environment is ready for the Universal Adapter

set -e

QUANTUM_DIR="/Users/cryptojoker710/Desktop/quantum-brain-mvp"
VENV_NAME=".axonpy"

echo "🧠 Setting up Quantum-Brain Python backend..."

# Check if quantum-brain-Mvp directory exists
if [ ! -d "$QUANTUM_DIR" ]; then
    echo "❌ Error: quantum-brain-Mvp directory not found at $QUANTUM_DIR"
    echo "Please ensure the quantum-brain-Mvp folder is in the correct location"
    exit 1
fi

cd "$QUANTUM_DIR"

echo "📁 Working in: $(pwd)"

# Create virtual environment if it doesn't exist
if [ ! -d "$VENV_NAME" ]; then
    echo "🐍 Creating Python virtual environment..."
    /usr/bin/python3 -m venv "$VENV_NAME"
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source "$VENV_NAME/bin/activate"

# Upgrade pip
echo "📦 Upgrading pip..."
python -m pip install -U pip

# Install required packages for Universal Adapter
echo "📦 Installing Flask and SocketIO dependencies..."
pip install Flask==2.3.2 flask-socketio==5.3.4 python-socketio==5.8.0 python-engineio==4.5.1 reportlab==4.0.4 requests==2.31.0

# Verify installation
echo "✅ Verifying installation..."
python -c "import flask, flask_socketio; print('✅ Flask and SocketIO installed successfully')"

echo "🎉 Quantum-Brain backend setup complete!"
echo ""
echo "To start the backend manually:"
echo "  cd $QUANTUM_DIR"
echo "  source $VENV_NAME/bin/activate"
echo "  python web_chat_app.py"
echo ""
echo "Or use: npm run dev:both (to start both Next.js and Python together)"
