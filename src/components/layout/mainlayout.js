import Footer from "./footer";
import Navbar from "./navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />
      <main className="flex-grow px-3 overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
