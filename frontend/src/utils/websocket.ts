// export class WebSocketService {
//   constructor(url) {
//     this.url = url;
//     this.websocket = null;
//     this.onMessageCallback = null;
//   }

//   connect(onMessage) {
    
//     this.onMessageCallback = onMessage;

    
//     this.websocket = new WebSocket(this.url);

//     this.websocket.onopen = () => {
//       console.log("WebSocket connection established");
//     };

//     this.websocket.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         if (this.onMessageCallback) {
//           this.onMessageCallback(data); 
//         }
//       } catch (error) {
//         console.error("Error parsing WebSocket message:", error);
//       }
//     };

//     this.websocket.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     this.websocket.onclose = (event) => {
//       console.log(`WebSocket connection closed: ${event.reason}`);
//     };
//   }

//   disconnect() {
//     if (this.websocket) {
//       this.websocket.close();
//       console.log("WebSocket connection terminated");
//     }
//   }
// }
