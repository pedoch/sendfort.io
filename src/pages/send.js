import { MainLayout } from "@/components/layout";
import { ErrorMessage, Tooltip } from "@/components/util";
import { CheckCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";

const validityPeriodOptions = [
  {
    label: "1 hour",
    value: 1,
  },
  {
    label: "2 hours",
    value: 2,
  },
  {
    label: "3 hours",
    value: 3,
  },
  {
    label: "5 hours",
    value: 5,
  },
  {
    label: "8 hours",
    value: 8,
  },
  {
    label: "13 hours",
    value: 13,
  },
  {
    label: "21 hours",
    value: 21,
  },
];

export default function Send() {
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState();
  const [validityPeriod, setValidityPeriod] = useState(1);
  const [validityPeriodError, setValidityPeriodError] = useState();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState();

  const [showPassword, setShowPassword] = useState(false);

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

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      isValid = false;
    } else {
      setConfirmPasswordError(null);
    }

    if (password !== confirmPassword && password && confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else if (confirmPassword) {
      setConfirmPasswordError(null);
    }

    return isValid;
  };

  const onCopy = () => {
    navigator.clipboard.writeText(
      `https://secure-send.vercel.app/view/${confirmedSlug}`,
    );

    setCopyTimeout(
      setTimeout(() => {
        setCopyTimeout(null);
      }, 2000),
    );
  };

  const resetForm = () => {
    setContent("");
    setValidityPeriod(1);
    setPassword("");
    setConfirmPassword("");
    setShowSuccess(false);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // if form is not valid, return

    const payload = {
      content: content.trim(),
      validityPeriod,
      password,
    };

    try {
      setSubmitting(true);
      setFormError(null);
      const { data } = await axios.post("/api/content", payload);

      setShowSuccess(true);
      setConfirmedSlug(`${data.slug}${password}`);
    } catch (error) {
      setFormError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>SecureSend - Send Package</title>
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
                      className={`flex items-center justify-center px-2 py-0.5 rounded-md ${
                        validityPeriod === period.value
                          ? "bg-blue-400 text-white"
                          : "text-gray-500"
                      }`}
                      onClick={(e) => setValidityPeriod(period.value)}
                      disabled={submitting}
                      title={period.label}
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
                    htmlFor="password"
                    className="flex items-center"
                  >
                    Password{" "}
                    <Tooltip tip="This password will be used to encrypt your data.">
                      <QuestionCircleOutlined className="ml-1 text-gray-400" />
                    </Tooltip>
                  </label>
                  <input
                    name="password"
                    type="text"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={submitting}
                  />
                  {passwordError && <ErrorMessage error={passwordError} />}
                </div>
                <div className="w-full flex flex-col col-span-1">
                  <label
                    htmlFor="repeatPassword"
                    className="flex items-center"
                  >
                    Re-enter password
                  </label>
                  <input
                    name="repeatPassword"
                    type="text"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={submitting}
                  />
                  {confirmPasswordError && (
                    <ErrorMessage error={confirmPasswordError} />
                  )}
                </div>
              </div>
              <p className="w-full mt-10">Enter the content you want to send</p>
              <textarea
                className="mono outline-none whitespace-nowrap overflow-auto w-full border border-dashed border-spacing-10 p-3 text-gray-500 h-52"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={submitting}
              />
              {contentError && <ErrorMessage error={contentError} />}
              <button
                className="mt-5 bg-blue-400 text-white"
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
                  href={`https://secure-send.vercel.app/view/${confirmedSlug}`}
                >
                  https://secure-send.vercel.app/view/{confirmedSlug}
                </a>
                <button
                  className="p-1 text-sm"
                  onClick={onCopy}
                >
                  {copyTimeout ? "Copied!" : "Copy"}
                </button>
              </div>
              <button
                className="mt-5 bg-blue-400 text-white w-min whitespace-nowrap"
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
