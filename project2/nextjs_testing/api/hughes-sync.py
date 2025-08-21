import json
import os
from http.server import BaseHTTPRequestHandler
import sys
from pathlib import Path

# 添加utils路径
sys.path.append(str(Path(__file__).parent))

from hughes_utils import HughesSync

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # CORS headers
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.end_headers()
        
        token = os.getenv('GITHUB_TOKEN')
        
        if not token:
            self.wfile.write(json.dumps({
                'status': 'error',
                'message': 'GitHub token not configured'
            }).encode())
            return
        
        try:
            sync = HughesSync(token)
            messages = sync.sync_all_entries()
            
            response = {
                'status': 'success',
                'message': f'Synced {len(messages)} entries',
                'messages': messages,
                'count': len(messages)
            }
            
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            self.wfile.write(json.dumps({
                'status': 'error',
                'message': str(e)
            }).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()