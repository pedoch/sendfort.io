import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
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
          href="https://assets.ochuko.space/static/SendFort_Box_Logo-YTyZFx.png"
        />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
