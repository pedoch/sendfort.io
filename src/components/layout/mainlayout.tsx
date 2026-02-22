import { ReactNode } from "react";
import { Eclipse1, Eclipse2 } from "../icons/blobs";
import { Star } from "../icons/star";
import Footer from "./footer";
import Navbar from "./navbar";

interface MainLayoutProps {
  children: ReactNode;
  childrenSectionRelative?: boolean;
}

const MainLayout = ({ children, childrenSectionRelative }: MainLayoutProps) => {
  const stars = [
    {
      top: "top-[17%]",
      left: "left-[4%]",
      width: "w-[4px]",
    },
    {
      top: "top-[12%]",
      left: "left-[37%]",
      width: "w-[4px]",
    },
    {
      top: "top-[26%]",
      left: "left-[42%]",
      width: "w-[4px]",
    },
    {
      top: "top-[47%]",
      left: "left-[12%]",
      width: "w-[8px]",
    },
    {
      top: "top-[77%]",
      left: "left-[25%]",
      width: "w-[4px]",
    },
    {
      top: "top-[86%]",
      left: "left-[41%]",
      width: "w-[4px]",
    },
    {
      top: "top-[76%]",
      left: "left-[52%]",
      width: "w-[4px]",
    },
    {
      top: "top-[87%]",
      left: "left-[61%]",
      width: "w-[4px]",
    },
    {
      top: "top-[86%]",
      left: "left-[75%]",
      width: "w-[4px]",
    },
    {
      top: "top-[64%]",
      left: "left-[69%]",
      width: "w-[4px]",
    },
    {
      top: "top-[27%]",
      left: "left-[66%]",
      width: "w-[8px]",
    },
    {
      top: "top-[14%]",
      left: "left-[69%]",
      width: "w-[4px]",
    },
    {
      top: "top-[28%]",
      left: "left-[92%]",
      width: "w-[4px]",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main
        className={`flex-grow px-3 h-full mb-5 z-10${
          childrenSectionRelative ? " relative" : ""
        }`}
      >
        {children}
      </main>
      <Footer />
      {stars.map((star, i) => (
        <Star
          className={`fixed ${star.top} ${star.left} ${star.width} h-auto`}
          key={i}
        />
      ))}
      <Eclipse1 className="fixed top-0 -left-10 smallTablet:-left-[40%] pointer-events-none" />
      <Eclipse2 className="fixed bottom-0 right-0 smallTablet:-bottom-[10%] pointer-events-none" />
    </div>
  );
};

export default MainLayout;
