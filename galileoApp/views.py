from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    indexCon = {            #index context
        'nbar' : 'index',
        'breadcrumb' : 'index',
    }
    return render(request, 'galileoApp/index.html', indexCon)

def monitor(request):
    monitorCon= {             #monitor context
        'nbar': 'monitor',  
        'breadcrumb': 'Monitor Cars',
    }

    return render(request, 'galileoApp/monitor.html', monitorCon)

def carMon(request):
    carMonCon = {             #monitor context
        'nbar': 'monitorCar',  
        'breadcrumb': 'Car',
    }

    return render(request, 'galileoApp/monitor/carMon.html', carMonCon)

def adjust(request):
    adjustCon = {
        'nbar': 'adjust',
        'breadcrumb': 'Adjust Parameters',
    }
    return render(request, 'galileoApp/adjust.html', adjustCon)

def calendar(request):
    calendarCon = {
        'nbar': 'calendar',
        'breadcrumb': 'Calendar',
    }
    return render(request, 'galileoApp/calendar.html', calendarCon)

def docs(request):
    docsCon = {
        'nbar': 'docs',
        'breadcrumb': 'API Documentation',
    }
    return render(request, 'galileoApp/docs.html', docsCon)    