import type { SignalData } from 'simple-peer';

interface ICallUser {
  userToCall: string;
  signalData: SignalData;
  from: string;
  name: string;
}

export { ICallUser };
