import { io } from "socket.io-client";

export const socket = io("wss://ws.postman-echo.com");
