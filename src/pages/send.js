import { MainLayout } from "@/components/layout";
import { ErrorMessage } from "@/components/util";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";

const validityPeriodOptions = [
  {
    label: "1h",
    alt: "1 hour",
    value: 1,
  },
  {
    label: "2h",
    alt: "2 hours",
    value: 2,
  },
  {
    label: "3h",
    alt: "3 hours",
    value: 3,
  },
  {
    label: "5h",
    alt: "5 hours",
    value: 5,
  },
  {
    label: "8h",
    alt: "8 hours",
    value: 8,
  },
  {
    label: "13h",
    alt: "13 hours",
    value: 13,
  },
  {
    label: "21h",
    alt: "21 hours",
    value: 21,
  },
  {
    label: "1d and 10h",
    alt: "1 day and 10 hours",
    value: 34,
  },
  {
    label: "2d and 7h",
    alt: "2 days and 7 hours",
    value: 55,
  },
  {
    label: "3d and 17h",
    alt: "3 days and 17 hours",
    value: 89,
  },
  {
    label: "6d",
    alt: "6 days",
    value: 144,
  },
];

export default function Send() {
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState();
  const [validityPeriod, setValidityPeriod] = useState(1);
  const [validityPeriodError, setValidityPeriodError] = useState();
  const [key, setKey] = useState("");
  const [keyError, setKeyError] = useState();
  const [confirmKey, setConfirmKey] = useState("");
  const [confirmKeyError, setConfirmKeyError] = useState();

  const [showKey, setShowKey] = useState(false);
  const [includeKey, setIncludeKey] = useState(false);

  const [formError, setFormError] = useState();

  const [confirmedSlug, setConfirmedSlug] = useState();

  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [copyTimeout, setCopyTimeout] = useState();

  const validateForm = () => {
    let isValid = true;

    if (!content) {
      setContentError("Content is required");
      isValid = false;
    } else {
      setContentError(null);
    }

    if (!validityPeriod) {
      setValidityPeriodError("Validity period is required");
      isValid = false;
    } else {
      setValidityPeriodError(null);
    }

    if (!key) {
      setKeyError("Key is required");
      isValid = false;
    } else {
      setKeyError(null);
    }

    if (!confirmKey) {
      setConfirmKeyError("Confirm key is required");
      isValid = false;
    } else {
      setConfirmKeyError(null);
    }

    if (key !== confirmKey && key && confirmKey) {
      setConfirmKeyError("Keys do not match");
      isValid = false;
    } else if (confirmKey) {
      setConfirmKeyError(null);
    }

    return isValid;
  };

  const onCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST_URL}/view/${confirmedSlug}`
    );

    setCopyTimeout(
      setTimeout(() => {
        setCopyTimeout(null);
      }, 2000)
    );
  };

  const resetForm = () => {
    setContent("");
    setValidityPeriod(1);
    setKey("");
    setConfirmKey("");
    setShowSuccess(false);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // if form is not valid, return

    const payload = {
      content: content.trim(),
      validityPeriod,
      key,
    };

    try {
      setSubmitting(true);
      setFormError(null);
      const { data } = await axios.post("/api/content", payload);

      setShowSuccess(true);
      setConfirmedSlug(`${data.slug}${includeKey ? `?key=${key}` : ""}`);
    } catch (error) {
      setFormError(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>SendFort - Send Package</title>
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
        <div className="w-full mt-10">
          {!showSuccess ? (
            <form
              onSubmit={submit}
              className="flex flex-col h-full max-w-4xl mx-auto"
              autoComplete="off"
            >
              <div className="w-full mb-5">
                <label
                  htmlFor="validityPeriod"
                  className="mb-2"
                >
                  Validity period
                </label>
                <div className="flex gap-5 flex-wrap tablet:gap-2">
                  {validityPeriodOptions.map((period) => (
                    <button
                      key={period.value}
                      type="button"
                      role="radio"
                      aria-checked={validityPeriod === period.value}
                      className={`flex items-center justify-center border-none !shadow-none px-2 py-0.5 rounded-md ${
                        validityPeriod === period.value
                          ? "bg-primary text-white"
                          : "text-gray-500"
                      }`}
                      onClick={(e) => setValidityPeriod(period.value)}
                      disabled={submitting}
                      title={period.alt}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
                {validityPeriodError && (
                  <ErrorMessage error={validityPeriodError} />
                )}
              </div>
              <div className="grid grid-cols-2 gap-5 smallTablet:grid-cols-1">
                <div className="w-full flex flex-col col-span-1">
                  <label
                    htmlFor="contentKey"
                    className="flex items-center"
                  >
                    Passkey
                  </label>
                  <input
                    name="contentKey"
                    type={showKey ? "text" : "password"}
                    placeholder="Enter Passkey"
                    value={key}
                    onChange={(e) => {
                      setKey(e.target.value);
                      setKeyError(null);
                    }}
                    disabled={submitting}
                    autoComplete="off"
                  />
                  {keyError && <ErrorMessage error={keyError} />}
                </div>
                <div className="w-full flex flex-col col-span-1">
                  <label
                    htmlFor="repeatContentKey"
                    className="flex items-center"
                  >
                    Re-enter Passkey
                  </label>
                  <input
                    name="repeatContentKey"
                    type={showKey ? "text" : "password"}
                    placeholder="Re-enter Passkey"
                    value={confirmKey}
                    onChange={(e) => {
                      setConfirmKey(e.target.value);
                      setConfirmKeyError(null);
                    }}
                    disabled={submitting}
                    autoComplete="off"
                  />
                  {confirmKeyError && <ErrorMessage error={confirmKeyError} />}
                </div>
              </div>
              <div className="mt-1">
                <input
                  type="checkbox"
                  id="showKey"
                  name="showKey"
                  checked={showKey}
                  onChange={(e) => setShowKey(e.target.checked)}
                />
                <label
                  htmlFor="showKey"
                  className="ml-2"
                >
                  Show passkey
                </label>
              </div>
              <p className="mt-1 text-sm text-yellow-500 flex items-start">
                <ExclamationCircleOutlined className="mr-1 mt-0.5" />
                This key will be used when encrypting your data so make it as
                unique as possible, but please do not use any passwords you
                would use to secure your accounts on other platforms.
              </p>
              <p className="w-full mt-10">Enter the content you want to send</p>
              <textarea
                placeholder="Content..."
                className="mono outline-none whitespace-nowrap overflow-auto w-full border border-dashed border-spacing-10 p-3 text-gray-300 h-52"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setContentError(null);
                }}
                disabled={submitting}
              />
              {contentError && <ErrorMessage error={contentError} />}
              <div className="mt-1">
                <input
                  type="checkbox"
                  id="includeKey"
                  name="includeKey"
                  checked={includeKey}
                  onChange={(e) => setIncludeKey(e.target.checked)}
                  disabled={submitting}
                />
                <label
                  htmlFor="includeKey"
                  className="ml-2"
                >
                  Include passkey in the url
                </label>
              </div>
              <button
                className="mt-5 bg-primary border border-primary text-white"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Encrypting..." : "Encrypt"}
              </button>
              {formError && <ErrorMessage error={formError} />}
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto">
              <CheckCircleOutlined className="text-5xl text-green-500" />
              <p className="text-2xl mt-5">Package encrypted successfully!</p>
              <p>Copy the link bellow to share it with your teammates</p>
              <div className="bg-gray-100 w-full text-gray-500 p-3 rounded mt-2 flex items-center justify-between">
                <a
                  className="text-sm"
                  href={`${process.env.NEXT_PUBLIC_HOST_URL}/view/${confirmedSlug}`}
                >
                  {process.env.NEXT_PUBLIC_HOST_URL}/view/{confirmedSlug}
                </a>
                <button
                  className="p-1 text-sm"
                  onClick={onCopy}
                >
                  {copyTimeout ? "Copied!" : "Copy"}
                </button>
              </div>
              <button
                className="mt-5 bg-primary text-white w-min whitespace-nowrap"
                onClick={() => resetForm()}
              >
                Send another package
              </button>
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
}
