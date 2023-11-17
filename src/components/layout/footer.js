import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full p-3 flex justify-between items-center flex-wrap gap-5 border-t border-white/20">
      <p className="flex items-center">
        <strong className="mr-2 phone:hidden">Created by&nbsp;</strong>
        <a
          href="https://twitter.com/ochukodotspace"
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center"
        >
          <Image
            src="/twitter.svg"
            className="mr-1"
            alt="twitter icon"
            width={25}
            height={25}
          />
        </a>
      </p>
      <a
        href="https://assets.ochuko.space/static/DISCLAIMER_POLICY_16_11_2023_SendFort-0tvFIG.pdf"
        target="_blank"
        rel="noreferrer noopener"
        className="hover:underline"
      >
        Disclaimer
      </a>
      <a
        className="rounded flex items-center bg-primary text-white px-2 py-1.5 space-x-1"
        target="_blank"
        rel="noreferrer noopener"
        href="https://www.buymeacoffee.com/ochukodotspace"
        aria-label="Buy me a coffee"
      >
        <Image
          src="/buy-me-a-coffee.png"
          alt="Buy me a coffee logo"
          width={17.5}
          height={25}
        />
        <p className="phone:hidden">Buy me a coffee</p>
      </a>
    </footer>
  );
};

export default Footer;
