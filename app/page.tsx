"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, SignedIn, SignedOut } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Home() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/login");
    }
  }, [isLoaded, userId, router]);

  useEffect(() => {
    if (userId) {
      router.push("/generate");
    }
  }, [userId, router]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4 md:px-8">
        <div className="container mx-auto max-w-3xl">
          <SignedOut>
            <p>Redirecting...</p>
          </SignedOut>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
