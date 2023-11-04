import { MainLayout } from "@/components/layout";
import { ErrorMessage } from "@/components/util";
import convertUTCDateToLocalDate from "@/utils/convertDate";
import axios from "axios";
import { format } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function View(props) {
  const { entry } = props;

  const router = useRouter();

  const [key, setKey] = useState("");
  const [keyError, setKeyError] = useState(null);
  const [showKeyModal, setShowKeyModal] = useState(false);

  const [copyTimeout, setCopyTimeout] = useState();

  const onCopy = () => {
    navigator.clipboard.writeText(entry.content);

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

      const timeLeftInMilliseconds = expirationDate - currentDate;

      setTimeout(() => {
        router.reload();
      }, timeLeftInMilliseconds);
    }
  }, []);

  const [showKey, setShowKey] = useState(false);

  const onSubmit = async (e) => {
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
                  <button
                    className="text-xs"
                    onClick={onCopy}
                  >
                    {copyTimeout ? "Copied!" : "Copy to clipboard"}
                  </button>
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
                    provided, please crosscheck.
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
              <button className="bg-primary text-white">
                Send New Package
              </button>
            </Link>
          </div>
        </div>
        {showKeyModal && (
          <div className="fixed w-full h-screen top-0 left-0 flex items-center justify-center p-2">
            <div className="bg-[#080808] p-10 rounded shadow max-w-full smallTablet:p-5">
              <form
                onSubmit={onSubmit}
                autocomplete="off"
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
                  className="w-full"
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
                    autocomplete="off"
                  />
                  <label
                    htmlFor="showKey"
                    className="ml-2"
                  >
                    Show Passkey
                  </label>
                </div>
                <div className="flex justify-end mt-5">
                  <button
                    className="bg-primary border border-primary text-white w-full"
                    type="submit"
                  >
                    Submit
                  </button>
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

const fetchContent = async (slug, key) => {
  try {
    const { data } = await axios.get(
      `${process.env.HOST_URL}/api/content/${slug}?key=${key}`
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const { key } = context.query;

  let entry = null;

  try {
    entry = await fetchContent(slug, key);
  } catch (error) {
    //do nothing
  }

  return {
    props: {
      entry,
    }, // will be passed to the page component as props
  };
}

export default View;
