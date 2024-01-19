import { useRouter } from "next/router";
import { GitHub } from "../icons/github";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="w-full flex justify-between items-center text-xs z-10 flex-wrap gap-5 py-6 px-20 tablet:px-10 tablet:py-4 smallTablet:px-4">
      <div className="flex gap-5 items-center">
        <a
          className="flex items-center gap-x-1"
          href="https://github.com/pedoch/sendfort.io"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Contribute on Github"
        >
          <span className="tablet:hidden">Repo</span>
          <GitHub />
        </a>
        <a
          href="https://assets.ochuko.space/static/DISCLAIMER_POLICY_16_11_2023_SendFort-0tvFIG.pdf"
          target="_blank"
          rel="noreferrer noopener"
          className="hover:underline"
        >
          Disclaimer
        </a>
      </div>
      <div className="flex gap-2 flex-wrap">
        <p className="flex items-center">
          Created by&nbsp;
          <a
            href="https://dev.ochuko.space"
            target="_blank"
            rel="noreferrer noopener"
            className="cst-close font-bold"
          >
            Ochuko
          </a>
        </p>
        <p className="flex items-center ml-2">
          Design by&nbsp;
          <a
            href="https://cutt.ly/Samuels-Portfolio"
            target="_blank"
            rel="noreferrer noopener"
            className="cst-close font-bold"
          >
            Samuel
          </a>
        </p>
        {router.pathname === "/" && (
          <p className="flex items-center ml-2">
            Plane animation by&nbsp;
            <a
              href="https://lottiefiles.com/628dc6ncsb"
              target="_blank"
              rel="noreferrer noopener"
              className="cst-close font-bold"
            >
              Setya
            </a>
          </p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
