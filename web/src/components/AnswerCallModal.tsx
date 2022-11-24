import { PhoneCall } from 'phosphor-react';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { useSocket } from '../hooks/useSocket';
import { isMobileDevice } from '../utils/isMobileDevice';

const AnswerCallModal = () => {
  const { answerCall, call, callAccepted, setCall } = useSocket();
  const ringtoneRef = useRef<HTMLAudioElement>();

  function handleRefuseCall() {
    if (ringtoneRef?.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }

    setCall({} as any);

    toast('Call refused', {
      autoClose: 3000,
      type: 'success',
      position: isMobileDevice() ? 'top-left' : 'bottom-left',
      closeButton: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      theme: 'dark'
    });
  }

  function handleAnswerCall() {
    if (ringtoneRef?.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }

    answerCall();
  }

  useEffect(() => {
    ringtoneRef.current = new Audio('/iphone-ringtone.mp3');
    ringtoneRef.current.currentTime = 0;
    ringtoneRef.current.addEventListener('ended', () => {
      handleRefuseCall();
    });

    if (call?.isReceivedCall && !callAccepted) {
      ringtoneRef.current.play();
    }
  }, [call?.isReceivedCall, callAccepted]);

  return call?.isReceivedCall && !callAccepted ? (
    <div className="fixed h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10 bg-gray-900/[.50] backdrop-blur-md">
      <div className="w-72 flex flex-col justify-center items-start animate-fade-in">
        <p className="text-white text-left text-lg font-medium mb-1">
          {call?.name} is calling
        </p>

        <div className="flex justify-center items-center gap-x-2 w-full">
          <button
            className="flex justify-center h-10 w-full mt-2 font-medium text-white bg-red-500 hover:bg-red-400 transition-colors p-2 rounded-md"
            type="button"
            onClick={handleRefuseCall}
          >
            <PhoneCall className="text-white mr-2" size={24} />
            Refuse call
          </button>

          <button
            className="flex justify-center h-10 w-full mt-2 font-medium text-white bg-green-500 hover:bg-green-400 transition-colors p-2 rounded-md"
            type="button"
            onClick={handleAnswerCall}
          >
            <PhoneCall className="text-white mr-2" size={24} />
            Accept call
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export { AnswerCallModal };
