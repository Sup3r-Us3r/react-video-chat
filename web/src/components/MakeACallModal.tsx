import { PhoneCall } from 'phosphor-react';
import {
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  type ForwardRefRenderFunction
} from 'react';
import { toast } from 'react-toastify';

import { useSocket } from '../hooks/useSocket';
import { isMobileDevice } from '../utils/isMobileDevice';

interface IMakeACallModalHandle {
  openModal: () => void;
  closeModal: () => void;
}

const MakeACallModal: ForwardRefRenderFunction<IMakeACallModalHandle> = (
  _,
  ref
) => {
  const [idToCall, setIdToCall] = useState<string>('');
  const { callUser } = useSocket();

  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  function handleCallUser() {
    closeModal();

    toast('Call being made', {
      autoClose: 3000,
      type: 'success',
      position: isMobileDevice() ? 'top-left' : 'bottom-left',
      closeButton: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      theme: 'dark'
    });

    callUser(idToCall);

    setIdToCall('');
  }

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal
  }));

  return showModal ? (
    <div className="fixed h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10 bg-gray-900/[.50] backdrop-blur-md">
      <form className="w-72 flex flex-col justify-center items-start animate-fade-in">
        <label
          className="text-white text-left text-lg font-medium mb-1"
          htmlFor="idToCall"
        >
          Make a call
        </label>

        <input
          className="h-10 w-full bg-gray-900 text-gray-200 placeholder:text-gray-400 pl-2 outline-none border-2 border-gray-600 focus:border-green-500 transition-colors rounded-md"
          name="idToCall"
          type="text"
          placeholder="ID to call"
          onChange={event => setIdToCall(event.target.value)}
          value={idToCall}
        />

        <div className="flex justify-center items-center gap-x-2 w-full">
          <button
            className="flex justify-center h-10 w-full mt-2 font-medium text-white bg-red-500 hover:bg-red-400 transition-colors p-2 rounded-md"
            type="button"
            onClick={closeModal}
          >
            <PhoneCall className="text-white mr-2" size={24} />
            Cancel
          </button>

          <button
            className="flex justify-center h-10 w-full mt-2 font-medium text-white bg-green-500 hover:bg-green-400 transition-colors p-2 rounded-md"
            type="button"
            onClick={handleCallUser}
          >
            <PhoneCall className="text-white mr-2" size={24} />
            Call
          </button>
        </div>
      </form>
    </div>
  ) : null;
};

const MakeACallModalComponent = forwardRef(MakeACallModal);

export {
  type IMakeACallModalHandle,
  MakeACallModalComponent as MakeACallModal
};
