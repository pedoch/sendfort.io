import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between space-x-5  p-3">
      <Link href="/">
        <p className="font-semibold text-2xl text-primary phone:text-xl">
          <span className="text-primary">S</span>
          <span className="text-secondary">F</span>
        </p>
      </Link>
      <a
        className="flex items-center"
        href="https://github.com/pedoch/sendfort.io"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Contribute on Github"
      >
        <Image
          src="/github.svg"
          className="ml-2"
          alt="Github icon"
          width={25}
          height={25}
        />
      </a>
    </nav>
  );
};

export default Navbar;
