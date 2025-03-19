

# https://pypi.org/project/websockets/

# async def handle_new_websocket(websocket, path):
#     print("client connected")
#     try:
#         message = await websocket.recv()

#     except websocket.ConnectionClosed:
#         print("client disconnected")

# if __name__ == "__main__":
#     # Start the WebSocket server
#     # Port 8765 would be standard
#     start_server = websockets.serve(handle_new_websocket, "localhost", 8000)

#     # to not block our loop
#     asyncio.get_event_loop().run_until_complete(start_server)
#     asyncio.get_event_loop().run_forever()

import asyncio
from websockets.asyncio.server import serve


async def handle_new_websocket(websocket):
    # part 2 ------
    async for message in websocket:
        print(message)
        await websocket.send(message)

    # part 1 -----
    # print("Client connected")
    # try:
    #     message = await websocket.recv()
    #     print(f"Message received: {message}")

    # except websocket.ConnectionClosed:
    #     print("Client disconnected")


async def main():
    async with serve(handle_new_websocket, "localhost", 8000) as server:
        await server.serve_forever()

asyncio.run(main())