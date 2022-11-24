import { SpinnerGap } from 'phosphor-react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full mx-auto">
      <SpinnerGap size={32} className="text-white animate-spin" />
    </div>
  );
};

export { Loading };
