import { Button } from "@/components/button";
import { Copy } from "@/components/icons/copy";
import { MainLayout } from "@/components/layout";
import { ErrorMessage } from "@/components/util";
import convertUTCDateToLocalDate from "@/utils/convertDate";
import axios from "axios";
import { format } from "date-fns";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

interface ContentEntry {
  content: string;
  expiresAt: string;
}

interface ViewProps {
  entry: ContentEntry | null;
}

function View(props: ViewProps) {
  const { entry } = props;

  const router = useRouter();

  const [key, setKey] = useState("");
  const [keyError, setKeyError] = useState<string | null>(null);
  const [showKeyModal, setShowKeyModal] = useState(false);

  const [copyTimeout, setCopyTimeout] = useState<ReturnType<typeof setTimeout> | null>();

  const onCopy = () => {
    navigator.clipboard.writeText(entry!.content);

    setCopyTimeout(
      setTimeout(() => {
        setCopyTimeout(null);
      }, 2000)
    );
  };

  useEffect(() => {
    if (!router.query.key) {
      setShowKeyModal(true);
    }
  }, []);

  useEffect(() => {
    if (entry) {
      const currentDate = new Date();
      const expirationDate = new Date(entry.expiresAt);

      const timeLeftInMilliseconds = expirationDate.getTime() - currentDate.getTime();

      setTimeout(() => {
        router.reload();
      }, timeLeftInMilliseconds + 30000);
    }
  }, []);

  const [showKey, setShowKey] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!key) {
      setKeyError("Passkey is required");
      return;
    }

    window.location.href = `${router.basePath}?key=${key}`;
  };

  return (
    <>
      <Head>
        <title>SendFort - View Package</title>
      </Head>
      <MainLayout>
        <div className="w-full max-w-4xl mx-auto mt-10">
          {entry ? (
            <>
              <div className="mb-5">
                {entry.content && (
                  <p>
                    <strong>Expires:</strong>&nbsp;
                    {format(
                      convertUTCDateToLocalDate(new Date(entry.expiresAt)),
                      "d MMM yyyy hh:mm:aa"
                    )}
                  </p>
                )}
              </div>
              {entry.content && (
                <div className="flex items-center justify-between mb-2">
                  <p>
                    <strong>Content:</strong>
                  </p>
                  <Button
                    className="text-xs"
                    btnClassName="cst-fort-3 border-none py-1 px-2 text-xs flex items-center gap-1"
                    disableBottom
                    onClick={onCopy}
                  >
                    {copyTimeout ? "Copied!" : "Copy"}
                    <Copy />
                  </Button>
                </div>
              )}
              {entry.content ? (
                <div className="w-full whitespace-pre-wrap p-2 border border-spacing-10 border-dashed rounded mono">
                  {entry.content}
                </div>
              ) : (
                <div className="mt-28">
                  <h1 className="text-2xl font-bold">
                    Content could not be decrypted
                  </h1>
                  <p className="mono text-xl mb-5">
                    The passkey may not be correct or may not have been
                    provided, please cross-check.
                  </p>
                  <button
                    className="border-white border text-white text-sm hover:text-primary"
                    onClick={() => setShowKeyModal(true)}
                  >
                    Enter passkey
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="w-full">
              <h1 className="text-2xl font-bold text-center">
                Package Not Found
              </h1>
              <p className="text-center mt-5 mono">
                The package you are looking for does not exist or has expired.
              </p>
            </div>
          )}
          <div className="flex justify-end mt-10">
            <Link href="/send">
              <Button>Send New Package</Button>
            </Link>
          </div>
        </div>
        {showKeyModal && (
          <div className="fixed w-full h-screen z-10 top-0 left-0 flex items-center justify-center p-2">
            <div className="bg-[#0B3A43] bg-blur p-10 rounded shadow max-w-full smallTablet:p-5">
              <form
                onSubmit={onSubmit}
                autoComplete="off"
                className="relative"
              >
                <label
                  htmlFor="contentKey"
                  className="flex items-center"
                >
                  Passkey
                </label>
                <input
                  name="contentKey"
                  className="w-full mt-2"
                  type={showKey ? "text" : "password"}
                  placeholder="Enter Passkey"
                  value={key}
                  onChange={(e) => {
                    setKey(e.target.value);
                    setKeyError(null);
                  }}
                />
                {keyError && <ErrorMessage error={keyError} />}
                <div className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    name="showKey"
                    id="showKey"
                    checked={showKey}
                    onChange={() => {
                      setShowKey(!showKey);
                    }}
                    autoComplete="off"
                  />
                  <label
                    htmlFor="showKey"
                    className="ml-2"
                  >
                    Show Passkey
                  </label>
                </div>
                <div className="flex justify-end mt-5">
                  <Button
                    className="w-full"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
                <button
                  className="absolute text-lg -top-10 -right-10 border-0 hover:border-0 hover:text-primary smallTablet:-top-5 smallTablet:-right-5"
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                >
                  &#x2715;
                </button>
              </form>
            </div>
            <div className="w-full absolute top-0 left-0 h-screen bg-black/80 z-[-1]"></div>
          </div>
        )}
      </MainLayout>
    </>
  );
}

const fetchContent = async (slug: string, key: string): Promise<ContentEntry> => {
  const { data } = await axios.get(
    `${process.env.HOST_URL}/api/content/${slug}?key=${key}`
  );

  return data;
};

export const getServerSideProps: GetServerSideProps<ViewProps> = async (context) => {
  const { slug } = context.params as { slug: string };
  const { key } = context.query as { key: string };

  let entry: ContentEntry | null = null;

  try {
    entry = await fetchContent(slug, key);
  } catch {
    //do nothing
  }

  return {
    props: {
      entry,
    },
  };
};

export default View;
