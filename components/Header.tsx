import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import everywhereSyncLogo from "@/public/EverywhereSync.png";
import { ModeToggle } from "./ThemeToggler";

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-3">
        <div>
          <Image src={everywhereSyncLogo} alt="logo" width={50} height={50} />
        </div>
        <h1 className="text-xl font-bold">EverywhereSync</h1>
      </Link>
      <div className="flex items-center px-5 space-x-2">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
