"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth, SignedIn, SignedOut } from "@clerk/nextjs";
import Header from "@/components/Header";
import Form from "@/components/Form";
import Loading from "@/components/Loading";
import Footer from "@/components/Footer";

function Generate() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const [companyInfo, setCompanyInfo] = useState("");
  const [productInfo, setProductInfo] = useState("");
  const [targetGroup, setTargetGroup] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/login");
    }
  }, [isLoaded, userId, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage("Generating video...");
    setIsGenerating(true); // Show loading progress bar
    setProgress(10); // Initial progress
    try {
      const response = await axios.post("/api/generateVideo", {
        companyInfo,
        productInfo,
        targetGroup,
        userId
      });
      if (response.data.success) {
        setVideoId(response.data.videoId);
        setStatusMessage("Video is being generated...");
        incrementProgress();
        router.push(`/video?id=${response.data.videoId}`);
      } else {
        setStatusMessage("Failed to generate video.");
        setIsGenerating(false); // Hide loading progress bar
      }
    } catch (error: any) {
      console.error("Error generating video:", error?.message);
      setStatusMessage("An error occurred while generating the video.");
      setIsGenerating(false); // Hide loading progress bar
    }
  };

  const incrementProgress = () => {
    setProgress((prev) => Math.min(prev + 20, 95)); // Increase progress but cap it to 95%
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4 md:px-8">
        <div className="container mx-auto max-w-3xl">
          <SignedOut>
            <p>Redirecting...</p>
          </SignedOut>
          <SignedIn>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Create Stunning Videos in Minutes
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our video generation tool makes it easy to create
                professional-looking videos for your business. Simply provide
                some information about your company, product, and target
                audience, and we&apos;ll do the rest.
              </p>
            </div>
            {!isGenerating ? (
              <Form
                handleSubmit={handleSubmit}
                companyInfo={companyInfo}
                setCompanyInfo={setCompanyInfo}
                productInfo={productInfo}
                setProductInfo={setProductInfo}
                targetGroup={targetGroup}
                setTargetGroup={setTargetGroup}
              />
            ) : (
              <Loading statusMessage={statusMessage} progress={progress} />
            )}
          </SignedIn>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Generate;
