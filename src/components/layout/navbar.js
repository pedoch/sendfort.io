import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between space-x-5  p-3">
      <p className="font-semibold text-2xl text-blue-400">Secure Send</p>
      <a
        className="p-1 border rounded flex items-center space-x-2"
        target="_blank"
        href="https://www.buymeacoffee.com/deltanboi"
        rel="noreferrer"
      >
        <Image
          src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
          alt="Buy me a coffee"
          width={17.5}
          height={25}
        />
        <p>Buy me a coffee</p>
      </a>
    </nav>
  );
};

export default Navbar;
