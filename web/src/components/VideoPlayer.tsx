import { useEffect, useRef, type MouseEvent, type TouchEvent } from 'react';

import { useSocket } from '../hooks/useSocket';

const VideoPlayer = () => {
  const myVideoOnCallContainerRef = useRef<HTMLDivElement>(
    {} as HTMLDivElement
  );

  const {
    requestAudioAndVideoPermissions,
    myVideoRef,
    userVideoRef,
    name,
    callAccepted,
    callEnded,
    stream,
    call
  } = useSocket();

  let myVideoOnCallOffset = [0, 0];
  let myVideoOnCallIsMouseDown = false;

  function handleMouseDown(event: MouseEvent<HTMLDivElement>) {
    myVideoOnCallIsMouseDown = true;

    if (myVideoOnCallContainerRef?.current) {
      myVideoOnCallOffset = [
        myVideoOnCallContainerRef.current.offsetLeft - event.clientX,
        myVideoOnCallContainerRef.current.offsetTop - event.clientY
      ];
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    myVideoOnCallIsMouseDown = true;

    if (myVideoOnCallContainerRef?.current) {
      myVideoOnCallOffset = [
        myVideoOnCallContainerRef.current.offsetLeft - event.touches[0].clientX,
        myVideoOnCallContainerRef.current.offsetTop - event.touches[0].clientY
      ];
    }
  }

  function handleMouseUp() {
    myVideoOnCallIsMouseDown = false;
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();

    const mousePosition = {
      x: event.clientX,
      y: event.clientY
    };

    if (myVideoOnCallIsMouseDown && myVideoOnCallContainerRef?.current) {
      myVideoOnCallContainerRef.current.style.cursor = 'move';
      myVideoOnCallContainerRef.current.style.left =
        mousePosition.x + myVideoOnCallOffset[0] + 'px';
      myVideoOnCallContainerRef.current.style.top =
        mousePosition.y + myVideoOnCallOffset[1] + 'px';
    }
  }

  function handleTouchMove(event: TouchEvent<HTMLDivElement>) {
    const touchPosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY
    };

    if (myVideoOnCallIsMouseDown && myVideoOnCallContainerRef?.current) {
      myVideoOnCallContainerRef.current.style.cursor = 'move';
      myVideoOnCallContainerRef.current.style.left =
        touchPosition.x + myVideoOnCallOffset[0] + 'px';
      myVideoOnCallContainerRef.current.style.top =
        touchPosition.y + myVideoOnCallOffset[1] + 'px';
    }
  }

  useEffect(() => {
    if (callEnded) {
      const myVideoStreamDivElement = document.getElementById('myVideoStream');

      if (myVideoStreamDivElement) {
        myVideoStreamDivElement.style.cursor = '';
        myVideoStreamDivElement.style.left = '';
        myVideoStreamDivElement.style.top = '';
      }
    }
  }, [callEnded]);

  useEffect(() => {
    requestAudioAndVideoPermissions();
  }, []);

  return (
    <>
      {stream && (
        <div
          id="myVideoStream"
          ref={
            callAccepted && !callEnded ? myVideoOnCallContainerRef : undefined
          }
          className={
            callAccepted && !callEnded
              ? 'fixed top-4 right-4 z-10 h-60 w-40 shadow-lg animate-fade'
              : 'fixed top-0 left-0 right-0 bottom-0'
          }
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          <h1
            className={
              callAccepted && !callEnded
                ? 'absolute top-2 right-2 z-10 font-medium text-md mb-2 text-gray-200'
                : 'absolute top-2 left-3 z-10 font-medium text-md mb-2 text-gray-200'
            }
          >
            {name || 'Your name'}
          </h1>

          <video
            ref={myVideoRef}
            className={
              callAccepted && !callEnded
                ? 'scale-x-[-1] object-cover h-60 w-40 rounded-md'
                : 'scale-x-[-1] object-cover h-full w-full'
            }
            playsInline
            muted
            autoPlay
          />
        </div>
      )}

      {callAccepted && !callEnded && (
        <div className="fixed top-0 left-0 right-0 bottom-0">
          <h1 className="absolute top-2 left-3 z-10 font-medium text-md mb-2 text-gray-200">
            {call?.name || 'Caller name'}
          </h1>

          <video
            ref={userVideoRef}
            className="scale-x-[-1] object-cover h-full w-full"
            playsInline
            autoPlay
          />
        </div>
      )}
    </>
  );
};

export { VideoPlayer };
