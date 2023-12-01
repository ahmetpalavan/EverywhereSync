import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-3">
        <div>
          <Image
            src="https://play-lh.googleusercontent.com/b1-MIBjlMD9kvl0Okeglm9BL9ejRpOXMio303W0tiLb8Ul5WuVzBDoDKgGRcALOsCdw"
            alt="logo"
            width={50}
            height={50}
          />
        </div>
        <h1 className="text-xl font-bold">Dropbox</h1>
      </Link>
      <div className="flex items-center px-5 space-x-2">
        {/* Theme Toggler */}
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
