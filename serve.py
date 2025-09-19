#!/usr/bin/env python3
"""
Simple HTTP server for AnkiCoin development
Serves the website locally to avoid CORS issues
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

def main():
    # Configuration
    PORT = 8000
    HOST = 'localhost'
    
    # Change to the script's directory
    os.chdir(Path(__file__).parent)
    
    # Create server
    Handler = http.server.SimpleHTTPRequestHandler
    
    # Add CORS headers for development
    class CORSRequestHandler(Handler):
        def end_headers(self):
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', '*')
            super().end_headers()
    
    try:
        with socketserver.TCPServer((HOST, PORT), CORSRequestHandler) as httpd:
            url = f"http://{HOST}:{PORT}"
            print(f"🚀 AnkiCoin Development Server")
            print(f"📍 Serving at: {url}")
            print(f"📁 Directory: {os.getcwd()}")
            print(f"🌐 Opening browser...")
            print(f"⏹️  Press Ctrl+C to stop the server")
            print("-" * 50)
            
            # Open browser automatically
            webbrowser.open(url)
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} is already in use")
            print(f"💡 Try: lsof -ti:{PORT} | xargs kill")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
