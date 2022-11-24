import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';

import { AnswerCallModal } from '../components/AnswerCallModal';
import { FloatButtons } from '../components/FloatButtons';
import { Loading } from '../components/Loading';
import { RequestPermissions } from '../components/RequestPermissions';
import { VideoPlayer } from '../components/VideoPlayer';
import { useSocket } from '../hooks/useSocket';

const Meet: NextPage = () => {
  const { isLoadingCheckPermissions, userGrantedAudioAndVideoPermissions } =
    useSocket();

  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen">
      <Head>
        <title>React Video Chat</title>
      </Head>

      <section className="h-full w-full">
        {isLoadingCheckPermissions && <Loading />}

        {!userGrantedAudioAndVideoPermissions && <RequestPermissions />}

        {!isLoadingCheckPermissions && userGrantedAudioAndVideoPermissions && (
          <VideoPlayer />
        )}
      </section>

      {userGrantedAudioAndVideoPermissions && (
        <>
          <FloatButtons />
          <AnswerCallModal />
        </>
      )}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const cookies = parseCookies(context);

  if (!cookies['@reactVideoChat/myName']) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};

export default Meet;
