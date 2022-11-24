import { useContext } from 'react';

import { SocketContext } from '../contexts/SocketContext';

const useSocket = () => {
  const context = useContext(SocketContext);

  return context;
};

export { useSocket };
