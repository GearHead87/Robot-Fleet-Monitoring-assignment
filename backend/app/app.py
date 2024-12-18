from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import json
import asyncio
import os


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


ROBOT_DATA = []
mock_data_path = os.path.join(os.path.dirname(__file__), "mock_data.json")
if os.path.exists(mock_data_path):
    with open(mock_data_path, "r") as f:
        ROBOT_DATA = json.load(f)
else:
    print(f"Warning: {mock_data_path} not found. Using empty data.")

@app.get("/api/robots")
async def get_robots():
    """
    API endpoint to return the robot data.
    """
    return ROBOT_DATA

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint for real-time robot data updates.
    """
    await websocket.accept()
    try:
        while True:
            
            for robot in ROBOT_DATA:
                if robot["battery"] > 0:
                    robot["battery"] -= 5  
                    robot["status"] = "low battery" if robot["battery"] < 20 else "active"
            await websocket.send_json(ROBOT_DATA)  
            await asyncio.sleep(5)  
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        await websocket.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
