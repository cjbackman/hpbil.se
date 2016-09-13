import SimpleHTTPServer
import SocketServer
import os

#change working dir
os.chdir("../")

#settings
PORT = 8000
Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
httpd = SocketServer.TCPServer(("", PORT), Handler)

#output
print "Starting server..."
print "DocumentRoot: " + os.getcwd()
print "Port:", PORT
print "Shutdown with ^C"

#start server
httpd.serve_forever()
