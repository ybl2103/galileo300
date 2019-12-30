# chat/routing.py
from django.conf.urls import url

from . import consumers

websocket_urlpatterns = [
    url(r'^ws/galileoApp/monitor/$', consumers.carStatConsumer),
    url(r'^ws/galileoApp/coms/$', consumers.carStatConsumer)
]