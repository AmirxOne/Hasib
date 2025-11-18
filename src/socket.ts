import { io } from "socket.io-client";

const socket = io({
  // Optional configuration
  autoConnect: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export { socket };