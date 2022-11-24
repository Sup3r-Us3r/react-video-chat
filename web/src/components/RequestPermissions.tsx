import Image from 'next/image';

import { useSocket } from '../hooks/useSocket';

const RequestPermissions = () => {
  const { requestAudioAndVideoPermissions } = useSocket();

  return (
    <div className="flex flex-col justify-center items-center h-full max-w-sm mx-auto">
      <Image
        className="animate-fade"
        src="/permission.svg"
        alt="Request permission image"
        height="200"
        width="210"
      />

      <p className="mt-10 text-white font-medium text-lg">
        Grant camera and microphone access
      </p>

      <p className="leading-6 text-gray-300 font-normal text-md animate-pulse">
        To continue
      </p>

      <button
        className="flex justify-center h-10 w-full mt-10 font-medium text-white bg-violet-500 hover:bg-violet-400 transition-colors p-2 rounded-md"
        type="button"
        onClick={requestAudioAndVideoPermissions}
      >
        Request access
      </button>
    </div>
  );
};

export { RequestPermissions };
