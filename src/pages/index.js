import { SendPackage } from "@/components/animations";
import { MainLayout } from "@/components/layout";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>SecureSend</title>
        <meta
          name="description"
          content="Send sensitive data securely"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <MainLayout>
        <div className="w-full">
          <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto">
            <SendPackage />
            <h1 className="text-6xl font-bold mt-20 text-blue-400">
              SecureSend!
            </h1>
            <p className="text-2xl text-center mt-10">
              SecureSend is a free service that allows you to send{" "}
              <span className="italic font-semibold">sensitive</span>&nbsp; data
              to your teammates securely.
            </p>
            <Link href="/send">
              <button className="mt-20 text-xl border rounded px-3 py-2 bg-blue-400 text-white">
                Get started
              </button>
            </Link>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
