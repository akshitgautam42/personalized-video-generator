import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import VideoIcon from "@/components/Icons/VideoIcon";
import { Button } from "./ui/button";

const Header = () => {
  const router = useRouter();

  return (
    <header className="bg-gray-900 text-white py-6 px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <VideoIcon className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">Video Generator</h1>
        </div>
        <nav className="flex justify-center">
          <SignedIn>
            <Button
              onClick={() => router.push("/videos-list")}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-4 h-8"
            >
              See All Videos
            </Button>
            <div className="ml-4">
            <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </nav>
      </div>
    </header>
  );
};

export default Header;
