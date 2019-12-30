from django.conf.urls import url
from galileoApp import views

# TEMPLATE TAGGING
app_name = 'galileoApp'

urlpatterns = [
    url(r'^monitor/$', views.monitor, name='monitor'),
    url(r'^monitor/carMon/$', views.carMon, name='carMon'),
    url(r'^adjust/$', views.adjust, name='adjust'),
    url(r'^calendar/$', views.calendar, name='calendar'),
    url(r'^docs/$', views.docs, name='docs'),
]