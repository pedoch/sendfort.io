import { Analytics } from "@vercel/analytics/react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const NextSeoConfig = {
  title: "SendFort",
  description: "Send sensitive data securely",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://www.sendfort.io/",
    site_name: "SendFort",
    images: [
      {
        url: "https://assets.ochuko.space/static/SendFort_Thumbnail-1d1lgZ.png",
        alt: "SendFort Logo",
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo {...NextSeoConfig} />
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
