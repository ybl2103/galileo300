#!/usr/bin/python
import websocket

try:
    import thread
except ImportError:
    import _thread as thread
import time


def on_message(ws, message):
    split = message.split()
    msg = split[1]
    if split[0] == "galileo:":
        if "togR" not in msg:
            ws.send("coms: $$ " + msg)
        else:
            ws.send("coms: Rear Toggled")


def on_error(ws, error):
    print(error)


def on_close(ws):
    print("### closed ###")


def on_open(ws):
    def run(*args):
        while True:
            text = input()
            if text == "terminate":
                ws.close()
                break
            ws.send("coms: " + text)

    thread.start_new_thread(run, ())


if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp(
        "ws://127.0.0.1:8000/ws/galileoApp/coms/",
        on_message=on_message,
        on_error=on_error,
        on_close=on_close,
    )
    ws.on_open = on_open
    ws.run_forever()
