#!/bin/bash
# AnkiCoin Development Server Startup Script

echo "🚀 Starting AnkiCoin Development Server..."
echo "📍 URL: http://localhost:8000"
echo "⏹️  Press Ctrl+C to stop"
echo "============================================"

# Start Python HTTP server
python3 -m http.server 8000
