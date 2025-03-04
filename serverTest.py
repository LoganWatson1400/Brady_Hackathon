import http.server
import json
import os

class JSONHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/data':
            try:
                with open('data.json', 'r') as f:
                    data = json.load(f)
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(data).encode())
            except FileNotFoundError:
                self.send_response(404)
                self.send_header('Content-type', 'text/plain')
                self.end_headers()
                self.wfile.write(b'File not found')
        else:
             self.send_response(404)
             self.end_headers()

if __name__ == '__main__':
    PORT = 8000
    with http.server.HTTPServer(("", PORT), JSONHandler) as httpd:
        print(f"Serving at port {PORT}")
        # Create a dummy json file if it doesn't exist
        if not os.path.exists('data.json'):
            with open('data.json', 'w') as f:
                json.dump({"message": "Hello from JSON file!"}, f)
        httpd.serve_forever()