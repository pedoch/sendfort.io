import { MainLayout } from "@/components/layout";
import convertUTCDateToLocalDate from "@/utils/convertDate";
import axios from "axios";
import { format } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

function View(props) {
  const { entry } = props;

  const [copyTimeout, setCopyTimeout] = useState();

  const onCopy = () => {
    navigator.clipboard.writeText(entry.content);

    setCopyTimeout(
      setTimeout(() => {
        setCopyTimeout(null);
      }, 2000),
    );
  };

  return (
    <>
      <Head>
        <title>SecureSend - View Package</title>
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
        <div className="w-full max-w-4xl mx-auto mt-10">
          {entry ? (
            <>
              <div className="mb-5">
                <p>
                  <strong>Expires:</strong>&nbsp;
                  {format(
                    convertUTCDateToLocalDate(new Date(entry.expiresAt)),
                    "d MMM yyyy hh:mm:aa",
                  )}
                </p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p>
                  <strong>Content:</strong>
                </p>
                <button
                  className="text-xs"
                  onClick={onCopy}
                >
                  {copyTimeout ? "Copied!" : "Copy to clipboard"}
                </button>
              </div>
              <div className="w-full whitespace-pre-wrap p-2 border border-spacing-10 border-dashed rounded mono">
                {entry.content}
              </div>
            </>
          ) : (
            <div className="w-full">
              <h1 className="text-2xl font-bold text-center">
                Package Not Found
              </h1>
            </div>
          )}
          <div className="flex justify-end mt-10">
            <Link href="/send">
              <button className="bg-blue-400 text-white text-sm">
                New Package
              </button>
            </Link>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;

  let entry = null;

  try {
    const { data } = await axios.get(
      `${process.env.HOST_URL}/api/content/${slug}`,
    );

    console.log(data);

    entry = data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      entry,
    }, // will be passed to the page component as props
  };
}

export default View;
