import { httpServer } from './app';

const NODE_PORT = process.env.PORT || 3333;

httpServer.listen(NODE_PORT, () => {
  console.info(`\nSERVER RUNNING ON PORT ${NODE_PORT}\n`);
});
