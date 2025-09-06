/* Socket.IO client helper for real-time updates from Quantum Brain */
import { io, Socket } from 'socket.io-client';

const BASE_URL = process.env.NEXT_PUBLIC_PY_BACKEND_URL || 'http://127.0.0.1:5000';

export type TaskUpdate = { user_id: string; task_id?: string; message: string };

let socket: Socket | null = null;

export function connectSocket(): Socket {
  if (socket) return socket;
  socket = io(BASE_URL, { transports: ['websocket'], withCredentials: false });
  return socket;
}

export function joinUserRoom(userId: string) {
  if (!socket) connectSocket();
  socket!.emit('join', { user_id: userId });
}

export function onTaskUpdate(handler: (update: TaskUpdate) => void) {
  if (!socket) connectSocket();
  socket!.on('task_update', handler);
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}


