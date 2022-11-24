import { IdentificationBadge, PhoneCall, PhoneX } from 'phosphor-react';
import { useRef } from 'react';
import { toast } from 'react-toastify';

import { useSocket } from '../hooks/useSocket';
import { isMobileDevice } from '../utils/isMobileDevice';
import { type IMakeACallModalHandle, MakeACallModal } from './MakeACallModal';

const FloatButtons = () => {
  const { me, userSocketId, call, callAccepted, callEnded, leaveCall } =
    useSocket();

  const makeACallModalRef = useRef<IMakeACallModalHandle>(null);

  async function handleCopyYourId() {
    await navigator.clipboard.writeText(me);

    toast('ID copied to clipboard', {
      autoClose: 3000,
      type: 'info',
      position: isMobileDevice() ? 'top-left' : 'bottom-left',
      closeButton: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      theme: 'dark'
    });
  }

  function handleLeaveCall() {
    // If I called another user, disconnect him too
    if (userSocketId) {
      leaveCall(userSocketId);

      return;
    }

    // If I'm the one who accepted the call, disconnect the other user who called me
    if (call?.from) {
      leaveCall(call.from);
    }
  }

  return (
    <>
      <MakeACallModal ref={makeACallModalRef} />

      <div className="fixed right-4 bottom-4 flex flex-col justify-center items-center gap-y-2">
        <button
          className="bg-blue-500 hover:bg-blue-400 transition-colors p-2 rounded-full"
          type="button"
          onClick={handleCopyYourId}
        >
          <IdentificationBadge className="text-white" size={30} />
        </button>

        {!callAccepted && (
          <button
            className="bg-green-500 hover:bg-green-400 transition-colors p-2 rounded-full"
            type="button"
            onClick={() => makeACallModalRef?.current?.openModal()}
          >
            <PhoneCall className="text-white" size={30} />
          </button>
        )}

        {callAccepted && !callEnded && (
          <button
            className="bg-red-500 hover:bg-red-400 transition-colors p-2 rounded-full"
            type="button"
            onClick={handleLeaveCall}
          >
            <PhoneX className="text-white" size={30} />
          </button>
        )}
      </div>
    </>
  );
};

export { FloatButtons };
