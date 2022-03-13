from http.server import HTTPServer, BaseHTTPRequestHandler
import order
import ping
import queue
import session
import item
import response
import os
import yaml

with open("../Deploy/resources/env-dev.yml", "r") as stream:
    try:
        env = yaml.safe_load(stream)
        os.environ['RDS_USERNAME'] =  env['RDS_ORDER_USERNAME']
        os.environ['RDS_PASSWORD'] = env['RDS_ORDER_PASSWORD']
        os.environ['RDS_HOST'] = env['RDS_HOST']
        os.environ['RDS_DEFAULT_DB'] = env['RDS_DEFAULT_DB']
        os.environ['SESSION_EXPIRATION_MINUTE'] = env['SESSION_EXPIRATION_MINUTE']
    except yaml.YAMLError as exc:
        print(exc)


class LocalServerRouter(BaseHTTPRequestHandler):
    def do_GET(self):
        return_response = response.failure("Error or unsupported operations")
        event = {"Session" : self.headers['Session']}
        context = {}

        try:
            if self.path.endswith('/item'):
                return_response = item.list(event, context)
            elif self.path.endswith('/session'):
                return_response = session.new(event, context)
            elif self.path.endswith('/status'):
                return_response = queue.status(event, context)
            elif self.path.endswith('/ping'):
                return_response = ping.ping(event, context)
            else :
                self.send_response(500)
        except:       
            self.send_response(500)

        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(return_response["body"])
        
    def do_POST(self):
        return_response = response.failure("Error or unsupported operations")
        event = {"Session" : self.headers['Session'], "Authorization" : self.headers['Authorization']}
        context = {}
        try:
            if self.path.endswith('/purchase'):
                order.purchase(event, context)
            else :
                self.send_response(500)
        except:       
            self.send_response(500)

        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(return_response["body"])

httpd = HTTPServer(('localhost', 8080), LocalServerRouter)
httpd.serve_forever()