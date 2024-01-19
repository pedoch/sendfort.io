import { Button } from "@/components/button";
import { MainLayout } from "@/components/layout";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout childrenSectionRelative>
      <div className="flex flex-col items-center justify-center min-h-full mx-auto mt-[18vh] relative">
        <h1 className="text-6xl text-white text-center cst-font-900 mt-20 relative smallTablet:text-4xl phone:text-2xl z-10">
          <span
            className="absolute top-1.5 left-0 smallTablet:top-1"
            aria-hidden
          >
            <span className="cst-fort-2">Send</span>{" "}
            <span className="cst-fort-2">Sensitive</span>{" "}
            <span className="cst-fort-2">Data</span>{" "}
            <span className="cst-fort-2">Securely</span>
          </span>
          <span
            className="absolute left-0"
            aria-hidden
          >
            <span>Send</span> <span>Sensitive</span> <span>Data</span>{" "}
            <span>Securely</span>
          </span>
          <span className="invisible">
            <span>Send</span> <span>Sensitive</span> <span>Data</span>{" "}
            <span>Securely</span>
          </span>
        </h1>
        <p className="max-w-lg text-center mt-10">
          Send messages, lines of code, and small documents as text privately
          and securely for free on SendFort.
        </p>
        <div className="mt-10 z-10">
          <Link href="/send">
            <Button>Send Something</Button>
          </Link>
        </div>
        <div className="absolute w-full h-full flex justify-center items-center">
          <Player
            autoplay
            loop
            src="/lottie-animation/plane-animation.json"
            className="w-8/12 h-8/12 tablet:w-full tablet:h-full"
          >
            <Controls
              visible={false}
              // buttons={["play", "repeat", "frame", "debug"]}
            />
          </Player>
        </div>
      </div>
    </MainLayout>
  );
}
