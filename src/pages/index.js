import { SendPackage } from "@/components/animations";
import { MainLayout } from "@/components/layout";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>SendFort</title>
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
      <MainLayout childrenSectionRelative>
        <div className="w-full">
          <p className="absolute bottom-0 left-5 py-1 px-2 bg-black/40 rounded-full">
            Photo by{" "}
            <a
              href="https://unsplash.com/@flyd2069?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              className="text-primary"
            >
              FLY:D
            </a>{" "}
            on{" "}
            <a
              href="https://unsplash.com/photos/zAhAUSdRLJ8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              className="text-primary"
            >
              Unsplash
            </a>
          </p>
          <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto">
            <SendPackage />
            <h1 className="text-6xl font-bold mt-20 smallTablet:text-4xl phone:text-2xl">
              <span className="text-primary italic">Send</span>
              <span className="text-secondary italic">Fort</span>
              &nbsp;🔒
            </h1>
            <p className="text-2xl max-w-2xl text-center mt-10 smallTablet:text-xl phone:text-base">
              Send{" "}
              <span className="italic font-semibold text-secondary">
                sensitive
              </span>{" "}
              data{" "}
              <span className="italic font-semibold text-primary">
                securely
              </span>
              .
            </p>
            <Link href="/send">
              <button className="my-20 text-xl rounded px-3 py-2 bg-primary text-white phone:text-base">
                Get started
              </button>
            </Link>
          </div>
        </div>
        <div
          className="w-full fixed top-0 left-0 h-screen bg-cover bg-center bg-no-repeat z-[-1]"
          style={{
            backgroundImage:
              "url(https://assets.ochuko.space/static/securesend_thumbnail-W1nbOA.webp)",
          }}
        ></div>
        <div className="w-full fixed top-0 left-0 h-screen bg-black/50 z-[-1]"></div>
      </MainLayout>
    </>
  );
}
