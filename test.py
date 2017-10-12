#!/usr/bin/env python
__author__ = 'tony'
import tornado.httpserver
import tornado.options
import tornado.ioloop
import tornado.web
from tornado.options import options,define


define('port', default=8000, type=int, help='run port')


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        q = self.get_arguments('q')
        self.write(','.join(q))
settings={
    'debug':True
}
if __name__ == "__main__":
    tornado.options.parse_command_line()
    app = tornado.web.Application([(r'/',IndexHandler),],**settings)
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
