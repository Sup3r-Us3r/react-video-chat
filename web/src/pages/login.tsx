import Router from 'next/router';
import { setCookie } from 'nookies';
import { useState, type FormEvent } from 'react';
import { toast } from 'react-toastify';

import { useSocket } from '../hooks/useSocket';

const Login = () => {
  const [myName, setMyName] = useState<string>('');
  const { setName } = useSocket();

  function saveMyNameSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!myName.trim()) {
      return toast('Invalid name', {
        autoClose: 3000,
        type: 'warning',
        position: 'bottom-left',
        closeButton: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        theme: 'dark'
      });
    }

    setName(myName);
    setCookie(undefined, '@reactVideoChat/myName', myName);

    Router.push('/');
  }

  return (
    <div className="flex justify-center items-center h-screen px-6">
      <form className="w-full max-w-sm" onSubmit={saveMyNameSubmit}>
        <label
          className="text-white text-left text-lg font-medium mb-1"
          htmlFor="myName"
        >
          Name
        </label>

        <input
          className="h-10 w-full bg-gray-900 text-gray-200 placeholder:text-gray-500 mt-2 pl-2 outline-none border-2 border-gray-600 focus:border-violet-500 transition-colors rounded-md"
          name="myName"
          placeholder="Define your name"
          type="text"
          onChange={event => setMyName(event.target.value)}
          value={myName}
        />

        <button
          className="flex justify-center h-10 w-full mt-2 font-medium text-white bg-violet-500 hover:bg-violet-400 transition-colors p-2 rounded-md"
          type="submit"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Login;
