# InnArt Replit Server
import http.server
import socketserver
import os

PORT = 3000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

os.chdir('web')

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"🎨 InnArt serving at http://localhost:{PORT}")
    print("🌍 Replit will provide a public URL")
    httpd.serve_forever()
