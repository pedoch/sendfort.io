import { Button } from "@/components/button";
import { Copy } from "@/components/icons/copy";
import { Info } from "@/components/icons/info";
import { MainLayout } from "@/components/layout";
import { ErrorMessage } from "@/components/util";
import { CheckCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";

const nerdValidityPeriodOptions = [
  {
    label: "1hr",
    alt: "1 hour",
    value: 1,
  },
  {
    label: "2hr",
    alt: "2 hours",
    value: 2,
  },
  {
    label: "3hr",
    alt: "3 hours",
    value: 3,
  },
  {
    label: "5hr",
    alt: "5 hours",
    value: 5,
  },
  {
    label: "8hr",
    alt: "8 hours",
    value: 8,
  },
  {
    label: "13hr",
    alt: "13 hours",
    value: 13,
  },
  {
    label: "21hr",
    alt: "21 hours",
    value: 21,
  },
  {
    label: "1d 10hr",
    alt: "1 day and 10 hours",
    value: 34,
  },
  {
    label: "2d 7hr",
    alt: "2 days and 7 hours",
    value: 55,
  },
  {
    label: "3d 17hr",
    alt: "3 days and 17 hours",
    value: 89,
  },
];

const normalValidityPeriodOptions = [
  {
    label: "1hr",
    alt: "1 hour",
    value: 1,
  },
  {
    label: "2hr",
    alt: "2 hours",
    value: 2,
  },
  {
    label: "4hr",
    alt: "4 hours",
    value: 4,
  },
  {
    label: "8hr",
    alt: "8 hours",
    value: 8,
  },
  {
    label: "12hr",
    alt: "12 hours",
    value: 12,
  },
  {
    label: "16hr",
    alt: "16 hours",
    value: 16,
  },
  {
    label: "1d",
    alt: "24 hours",
    value: 24,
  },
  {
    label: "1d 12hr",
    alt: "36 hours",
    value: 36,
  },
  {
    label: "2d",
    alt: "48 hours",
    value: 60,
  },
  {
    label: "3d",
    alt: "72 hours",
    value: 72,
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
  const [showNerd, setShowNerd] = useState(false);

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
      </Head>
      <MainLayout>
        <div className="w-full mt-5 mb-20">
          {!showSuccess ? (
            <>
              <h1 className="text-center text-2xl font-bold mb-10">
                Send Something
              </h1>
              <form
                onSubmit={submit}
                className="flex flex-col h-full max-w-3xl mx-auto"
                autoComplete="off"
              >
                <div className="w-full mb-5">
                  <label htmlFor="validityPeriod">Validity period</label>
                  <div className="flex gap-5 flex-wrap mt-2 mb-5 tablet:gap-2">
                    {showNerd
                      ? nerdValidityPeriodOptions.map((period) => (
                          <PeriodButton
                            key={period.value}
                            period={period}
                            validityPeriod={validityPeriod}
                            setValidityPeriod={setValidityPeriod}
                            submitting={submitting}
                          />
                        ))
                      : normalValidityPeriodOptions.map((period) => (
                          <PeriodButton
                            key={period.value}
                            period={period}
                            validityPeriod={validityPeriod}
                            setValidityPeriod={setValidityPeriod}
                            submitting={submitting}
                          />
                        ))}
                  </div>
                  <p>
                    <input
                      type="checkbox"
                      value={showNerd}
                      onClick={(e) => {
                        setShowNerd(e.target.checked);
                        setValidityPeriod(1);
                      }}
                    />{" "}
                    I love math
                  </p>
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
                      className="mt-2"
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
                      className="mt-2"
                    />
                    {confirmKeyError && (
                      <ErrorMessage error={confirmKeyError} />
                    )}
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
                <p className="mt-5 text-sm text-[#A4A6A8] flex items-start">
                  <Info className="mr-2 mt-0.5 w-8 h-auto" />
                  This key will be used when encrypting your data so make it as
                  unique as possible, but please do not use any passwords you
                  would use to secure your accounts on other platforms.
                </p>
                <p className="w-full mt-10 mb-2">
                  Enter the content you want to send
                </p>
                <textarea
                  placeholder="Content..."
                  className="mono outline-none whitespace-nowrap overflow-auto w-full border p-3 text-gray-300 h-52"
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
                <Button
                  className="mt-5"
                  btnClassName="text-center w-full"
                  type="submit"
                  // disableBottom
                  disabled={submitting}
                >
                  {submitting ? "Encrypting..." : "Encrypt"}
                </Button>
                {formError && <ErrorMessage error={formError} />}
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full max-w-3xl mt-20 mx-auto">
              <CheckCircleOutlined className="text-5xl text-green-500" />
              <p className="text-2xl my-5 text-center">
                Package encrypted successfully!
              </p>
              <p className="mb-5 text-center">
                Copy the link bellow to share it with your teammates
              </p>
              <div className="border border-gray-400 w-full text-white p-3 rounded flex items-center justify-between mb-20">
                <a
                  className="text-sm whitespace-nowrap overflow-hidden overflow-ellipsis"
                  href={`${process.env.NEXT_PUBLIC_HOST_URL}/view/${confirmedSlug}`}
                >
                  {process.env.NEXT_PUBLIC_HOST_URL}/view/{confirmedSlug}
                </a>
                <Button
                  className="text-xs"
                  btnClassName="cst-fort-3 border-none py-1 px-2 text-xs flex items-center gap-1"
                  disableBottom
                  onClick={onCopy}
                >
                  {copyTimeout ? "Copied!" : "Copy"}
                  <Copy />
                </Button>
                {/* <button
                  className="p-1 text-xs border-none focus:shadow-none flex gap-2 items-center"
                  onClick={onCopy}
                  title="Copy link"
                  aria-label="Copy link"
                ></button> */}
              </div>
              <Button onClick={() => resetForm()}>Send another package</Button>
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
}

const PeriodButton = ({
  period,
  validityPeriod,
  setValidityPeriod,
  submitting,
}) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={validityPeriod === period.value}
      className={`flex items-center justify-center border border-white !shadow-none px-3 py-1 rounded-md hover:border-white focus:border-white ${
        validityPeriod === period.value ? "cst-fort-3 text-white" : ""
      }`}
      onClick={(e) => setValidityPeriod(period.value)}
      disabled={submitting}
      title={period.alt}
    >
      {period.label}
    </button>
  );
};
