import Head from "next/head";
import { MainLayout } from "@/components/layout";
import { useState } from "react";
import { QuestionCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import CryptoJS from "crypto-js";
import axios from "axios";
import generatePermalink from "@/utils/generatePermalink";

export default function Send() {
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState();
  const [validityPeriod, setValidityPeriod] = useState(1);
  const [validityPeriodError, setValidityPeriodError] = useState();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState();
  const [slug, setSlug] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [formError, setFormError] = useState();

  const [confirmedSlug, setConfirmedSlug] = useState();

  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [copyTimeout, setCopyTimeout] = useState();

  const encryptObject = () => {
    const encrypted = CryptoJS.AES.encrypt(
      content,
      process.env.NEXT_PUBLIC_SECRET
    ).toString();

    return encrypted; // return encrypted string
  };

  const encryptPassword = () => {
    const encrypted = CryptoJS.AES.encrypt(
      content,
      process.env.NEXT_PUBLIC_PASSWORD_SECRET
    ).toString();

    return encrypted; // return encrypted string
  };

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

    if (showPassword) {
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

      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
        isValid = false;
      } else {
        setConfirmPasswordError(null);
      }
    }

    return isValid;
  };

  const onCopy = () => {
    navigator.clipboard.writeText(
      `https://secure-send.vercel.app/view/${confirmedSlug}`
    );

    setCopyTimeout(
      setTimeout(() => {
        setCopyTimeout(null);
      }, 2000)
    );
  };

  // const decryptObject = (encryptedString) => {
  //   const decrypted = CryptoJS.AES.decrypt(
  //     encryptedString,
  //     process.env.NEXT_PUBLIC_SECRET
  //   ).toString(CryptoJS.enc.Utf8);

  //   return decrypted; // return decrypted string
  // };

  const submit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // if form is not valid, return

    const encrypted = encryptObject();
    console.log(encrypted);

    let sentSlug = slug;

    if (!slug) {
      sentSlug = generatePermalink();
    }

    const payload = {
      content: encrypted,
      validityPeriod,
      ...(password && { password: encryptPassword(password) }),
      slug: sentSlug,
    };

    try {
      setSubmitting(true);
      const { data } = await axios.post("/api/content", payload);

      console.log(data);

      setShowSuccess(true);
      setConfirmedSlug(sentSlug);
      setValidityPeriod(1);
      setContent("");
      setShowPassword(false);
      setPassword("");
      setConfirmPassword("");
      setSlug("");
      setFormError(null);
    } catch (error) {
      console.log(error);
      setFormError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Secure Send</title>
        <meta name="description" content="Send sensitive data securely" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <div className="w-full mt-10">
          {!showSuccess ? (
            <form
              onSubmit={submit}
              className="flex flex-col h-full max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-2 gap-5 smallTablet:grid-cols-1">
                <div className="w-full flex flex-col col-span-1">
                  <label htmlFor="validityPeriod">
                    Validity period<span className="text-red-400">*</span>
                  </label>
                  <select
                    name="validityPeriod"
                    placeholder="Select validity period"
                    className={`${
                      !validityPeriod && "text-gray-500 text-opacity-70"
                    }`}
                    value={validityPeriod}
                    onChange={(e) => setValidityPeriod(e.target.value)}
                    disabled={submitting}
                  >
                    <option className="text-black" value={1}>
                      1 hour
                    </option>
                    <option className="text-black" value={2}>
                      2 hours
                    </option>
                    <option className="text-black" value={6}>
                      6 hours
                    </option>
                    <option className="text-black" value={12}>
                      12 hours
                    </option>
                    <option className="text-black" value={24}>
                      24 hours
                    </option>
                  </select>
                  {validityPeriodError && (
                    <p className="text-sm text-red-500">
                      {validityPeriodError}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col col-span-1">
                  <label htmlFor="slug" className="flex items-center">
                    Slug{" "}
                    <QuestionCircleOutlined className="ml-1 text-gray-400" />
                  </label>
                  <input
                    name="slug"
                    type="text"
                    placeholder="Enter slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    disabled={submitting}
                  />
                </div>
                <div className="col-span-2 flex space-x-2">
                  <input
                    type="checkbox"
                    value={showPassword}
                    onChange={(e) => {
                      setShowPassword(e.target.checked);
                    }}
                    disabled={submitting}
                  />
                  <span>Use Password</span>
                </div>
                {showPassword && (
                  <>
                    <div className="w-full flex flex-col">
                      <label htmlFor="password" className="flex items-center">
                        Password<span className="text-red-400">*</span>{" "}
                        <QuestionCircleOutlined className="ml-1 text-gray-400" />
                      </label>
                      <input
                        name="password"
                        type="text"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={submitting}
                      />
                      {passwordError && (
                        <p className="text-sm text-red-500">{passwordError}</p>
                      )}
                    </div>
                    <div className="w-full flex flex-col">
                      <label
                        htmlFor="repeatPassword"
                        className="flex items-center"
                      >
                        Re-enter password<span className="text-red-400">*</span>
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
                        <p className="text-sm text-red-500">
                          {confirmPasswordError}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
              <p className="w-full mt-10">
                Enter the content you want to send
                <span className="text-red-400">*</span>
              </p>
              <textarea
                className="mono outline-none whitespace-nowrap overflow-auto w-full border-2 border-gray-300 border-dashed border-spacing-8 p-3 bg-gray-200 text-gray-500 h-52"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={submitting}
              />
              {contentError && (
                <p className="text-sm text-red-500">{contentError}</p>
              )}
              <button
                className="mt-5 bg-blue-400 text-white"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Encrypting..." : "Encrypt"}
              </button>
              {formError && <p className="text-sm text-red-500">{formError}</p>}
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto">
              <CheckCircleOutlined className="text-5xl text-green-500" />
              <p className="text-2xl mt-5">Content encrypted successfully!</p>
              <p>Copy the link bellow to share it with your teammates</p>
              <div className="bg-gray-200 w-full text-gray-500 p-3 rounded mt-2 flex justify-between">
                <a
                  className="text-sm"
                  href={`https://secure-send.vercel.app/view/${confirmedSlug}`}
                >
                  https://secure-send.vercel.app/view/{confirmedSlug}
                </a>
                <button className="p-1 text-sm" onClick={onCopy}>
                  {copyTimeout ? "Copied!" : "Copy"}
                </button>
              </div>
              <button
                className="mt-5 bg-blue-400 text-white w-min whitespace-nowrap"
                onClick={() => setShowSuccess(false)}
              >
                Make another request
              </button>
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
}
