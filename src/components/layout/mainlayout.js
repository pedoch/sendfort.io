import Footer from "./footer";
import Navbar from "./navbar";

const MainLayout = ({ children, childrenSectionRelative }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main
        className={`flex-grow px-3 mb-5${
          childrenSectionRelative ? " relative" : ""
        }`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
