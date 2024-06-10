"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Form from "@/components/Form";
import Loading from "@/components/Loading";
import VideoPlayerWithControls from "@/components/VideoPlayerWithControls";
import Footer from "@/components/Footer";

export default function Home() {
  const [companyInfo, setCompanyInfo] = useState("");
  const [productInfo, setProductInfo] = useState("");
  const [targetGroup, setTargetGroup] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (videoId) {
      const interval = setInterval(() => {
        checkVideoStatus(videoId);
      }, 10000); // Poll every 10 seconds

      return () => clearInterval(interval);
    }
  }, [videoId]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setStatusMessage("Generating video...");
    setIsGenerating(true); // Show loading progress bar
    setProgress(10); // Initial progress
    try {
      const response = await axios.post("/api/generateVideo", {
        companyInfo,
        productInfo,
        targetGroup,
      });
      if (response.data.success) {
        setVideoId(response.data.videoId);
        setStatusMessage("Video is being generated...");
        incrementProgress();
      } else {
        setStatusMessage("Failed to generate video.");
        setIsGenerating(false); // Hide loading progress bar
      }
    } catch (error) {
      setIsGenerating(false); // Hide loading progress bar
    }
  };

  const incrementProgress = () => {
    setProgress((prev) => Math.min(prev + 20, 95)); // Increase progress but cap it to 95%
  };

  const checkVideoStatus = async (videoId:any) => {
    try {
      const response = await axios.get(`/api/retrieveVideo?videoId=${videoId}`);
      if (response.data.success) {
        const { videoData } = response.data;
        setVideoUrl(videoData.downloadUrl);
        setStatusMessage("Video URL fetched successfully.");
        setProgress(100); // Set progress to 100% when video is ready
        setVideoId(null); // Stop polling
        setIsGenerating(false); // Hide loading progress bar
      } else {
        setStatusMessage("Video is still processing...");
        incrementProgress(); // Increment progress if video is still processing
      }
    } catch (error) {
      // console.error("Error fetching video URL:", error?.message);
    }
  };

  const downloadVideo = async () => {
    try {
      const response = await axios.get(videoUrl, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link:any = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "video.mp4");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading video:", error);
      setStatusMessage("Error downloading video.");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(videoUrl);
      setStatusMessage("Video URL copied to clipboard.");
    } catch (error) {
      console.error("Error copying URL:", error);
      setStatusMessage("Error copying URL.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4 md:px-8">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Create Stunning Videos in Minutes
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our video generation tool makes it easy to create
              professional-looking videos for your business. Simply provide some
              information about your company, product, and target audience, and
              we'll do the rest.
            </p>
          </div>
          {!videoUrl ? (
            !isGenerating ? (
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
            )
          ) : (
            <VideoPlayerWithControls
              videoUrl={videoUrl}
              downloadVideo={downloadVideo}
              copyToClipboard={copyToClipboard}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
