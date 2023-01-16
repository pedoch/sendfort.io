import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full p-3 flex justify-between">
      <p className="flex items-center">
        <strong>Created</strong>&nbsp;by&nbsp;
        <a
          href="https://twitter.com/deltanboi"
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center"
        >
          <Image
            src="/twitter.svg"
            className="ml-2 mr-1"
            alt="twitter icon"
            width={25}
            height={25}
          />
          @deltanboi
        </a>
      </p>
      <a
        className="flex items-center"
        href="https://github.com/pedoch/secure-send"
        target="_blank"
        rel="noreferrer noopener"
      >
        Contribute:{" "}
        <Image
          src="/github.svg"
          className="ml-2"
          alt="Github icon"
          width={25}
          height={25}
        />
      </a>
    </footer>
  );
};

export default Footer;
