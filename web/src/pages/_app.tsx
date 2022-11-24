import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import { SocketContextProvider } from '../contexts/SocketContext';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SocketContextProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </SocketContextProvider>
  );
};

export default App;
