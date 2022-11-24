import type { SignalData } from 'simple-peer';

interface IAnswerCall {
  to: string;
  signal: SignalData;
}

export { IAnswerCall };
