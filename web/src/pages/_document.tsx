import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="manifest.json" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body className="bg-no-repeat bg-cover bg-hero bg-gray-900 overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
