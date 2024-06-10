import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import VideoIcon from "@/components/Icons/VideoIcon";

const Header = () => (
  <header className="bg-gray-900 text-white py-6 px-4 md:px-8">
    <div className="container mx-auto flex items-center justify-between">
      <div className="flex items-center">
        <VideoIcon className="h-8 w-8 mr-2" />
        <h1 className="text-2xl font-bold">Video Generator</h1>
      </div>
      <nav>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </div>
  </header>
);

export default Header;
