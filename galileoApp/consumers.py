# chat/consumers.py
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import json

class carStatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        async_to_sync(self.channel_layer.group_add)("galileo", self.channel_name)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)("galileo", self.channel_name)

    def receive(self, text_data):
        # self.send(text_data)
        print(text_data)
        async_to_sync(self.channel_layer.group_send)(
            "galileo",
            {
                "type": "display.query",
                "text": text_data
            },
        )

    def display_query(self, event):
        self.send(text_data=event["text"])
