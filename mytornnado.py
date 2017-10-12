import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import os
import tornado.websocket

from tornado.options import define, options
define("port", default=8000, help="run on the given port", type=int)


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('base.html')


class ChatRoomHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('webchat.html')

class ChatSocketHandler(tornado.websocket.WebSocketHandler):
    connects = set()
    def open(self):
        print('socket opened')
        ChatSocketHandler.connects.add(self)
    def on_message(self, message):
        ChatSocketHandler.send_all(message)
    def on_close(self):
        print('socket closed')
    @classmethod
    def send_all(cls,chat):
        for connect in cls.connects:
            try:
                connect.write_message(chat)
            except:
                pass

if __name__ == "__main__":
    tornado.options.parse_command_line()
    app = tornado.web.Application(handlers=[(r"/", IndexHandler),(r'/websocket',ChatSocketHandler),(r'/chatroom',ChatRoomHandler) ],
                                  template_path=os.path.join(os.path.dirname(__file__), 'templates'),
                                  static_path=os.path.join(os.path.dirname(__file__),'static'),
                                  debug=True,
                                  )
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()