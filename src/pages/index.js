import { Button } from "@/components/button";
import { MainLayout } from "@/components/layout";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout childrenSectionRelative>
      <div className="flex flex-col items-center justify-center min-h-full mx-auto mt-[18vh]">
        <h1 className="text-6xl text-white text-center cst-font-900 mt-20 relative smallTablet:text-4xl phone:text-2xl">
          <span
            className="absolute top-1.5 left-0 cst-fort-2 smallTablet:top-1"
            aria-hidden
          >
            Send Sensitive Data Securely
          </span>
          <span
            className="absolute left-0"
            aria-hidden
          >
            Send Sensitive Data Securely
          </span>
          Send Sensitive Data Securely
        </h1>
        <p className="max-w-lg text-center mt-10">
          Send messages, lines of code, and small documents as text privately
          and securely for free on SendFort.
        </p>
        <div className="mt-10 ">
          <Link href="/send">
            <Button>Send Something</Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
