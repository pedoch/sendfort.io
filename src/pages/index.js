import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Secure Send</title>
        <meta name="description" content="Send sensitive data securely" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-screen p-3">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-6xl font-bold">Welcome to Next.js!</h1>
        </div>
      </main>
    </>
  );
}
