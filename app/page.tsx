import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col lg:flex-row items-center  bg-[#1E1919] dark:bg-slate-800">
        <div className="flex flex-col p-10 space-y-5 dark:bg-slate-800 text-white">
          <h1 className="text-4xl font-bold">
            EverywhereSync
            <br />
            <span className="text-2xl font-normal">Sync your files everywhere</span>
          </h1>
          <p className="font-light pb-20">
            EverywhereSync is a file syncing service that allows you to sync your files across all your devices. It is a work in progress.
            It is not ready for production use.
          </p>
          <Link
            href="/dashboard"
            className="w-fit bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 space-y-5 rounded-sm inline-flex items-center"
          >
            Try it for free
            <ArrowRight className="" />
          </Link>
        </div>
        <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
          <video className="rounded-lg" autoPlay loop muted>
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <p className="text-center font-bold text-xl pt-5">Disclaimer : This is a work in progress. It is not ready for production use.</p>
      <p className="text-center font-light p-2">
        This video is a demo of the current state of the project. It is not representative of the final product. The UI will change. The
        features will change. The name will change.
      </p>
    </main>
  );
}
