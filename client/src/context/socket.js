import { createContext } from "react";
import { io } from "socket.io-client";

const ENDPOINT = "http://192.168.0.120:4001";

export const socket = io(ENDPOINT, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 2,
});
export const SocketContext = createContext();
