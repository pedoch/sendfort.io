import Link from "next/link";
import { Coffee } from "../icons/coffee";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between space-x-5 py-6 px-20 z-10 tablet:px-10 tablet:py-4 smallTablet:px-4">
      <Link href="/">
        <p className="font-semibold text-3xl phone:text-xl cst-font-900 ">
          <span className="text-white">Send</span>
          <span className="cst-fort">Fort</span>
        </p>
      </Link>
      <a
        className="flex items-center text-xs text-white space-x-1"
        target="_blank"
        rel="noreferrer noopener"
        href="https://www.buymeacoffee.com/ochukodotspace"
        aria-label="Buy me a coffee"
      >
        <p className="smallTablet:hidden">Buy me a coffee</p>
        <Coffee className="smallTablet:!w-5 smallTablet:h-auto" />
      </a>
    </nav>
  );
};

export default Navbar;
