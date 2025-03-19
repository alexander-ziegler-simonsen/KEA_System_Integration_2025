# from websockets.sync.client import connect
import asyncio
import websockets
# def send_message():
#     # part 1 ---------
#     with connect("ws://localhost:8000") as websocket:
#         websocket.send("hello")

#         message = websocket.recv()
#         print(f"received: {message}")

# send_message()

# part 2 -------------
async def send_message():
    uri = "ws://localhost:8000"
    async with websockets.connect(uri) as websocket:
        await websocket.send("this is my message")
        print(await websocket.recv())

asyncio.run(send_message())