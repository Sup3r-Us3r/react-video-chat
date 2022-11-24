import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import type { IAnswerCall } from './interfaces/IAnswerCall';
import type { ICallUser } from './interfaces/ICallUser';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());

app.get('/', (_, response) => {
  return response.json({
    message: 'Server is running'
  });
});

io.on('connection', socket => {
  console.log(socket.id);
  socket.emit('me', { socketId: socket.id });

  socket.on('disconnect', () => {
    socket.broadcast.emit('callended');
  });

  socket.on('calluser', ({ userToCall, signalData, from, name }: ICallUser) => {
    io.to(userToCall).emit('calluser', { signal: signalData, from, name });
  });

  socket.on('answercall', (data: IAnswerCall) => {
    io.to(data.to).emit('callaccepted', { signal: data.signal });
  });

  socket.on('leavecall', ({ socketId }: { socketId: string }) => {
    io.to(socketId).emit('leavecall', true);
  });
});

export { httpServer };
