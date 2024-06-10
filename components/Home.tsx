// components/Home.tsx
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import LoaderIcon from "@/components/Icons/LoaderIcon";
import VideoIcon from "@/components/Icons/VideoIcon";
import ReactPlayer from "react-player";
import { Progress } from "@/components/ui/progress";
import { CopyIcon } from "@/components/Icons/CopyIcon";
import { DownloadIcon } from "@/components/Icons/DownloadIcon";

const Home = () => {
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

  const handleSubmit = async (e) => {
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
      console.error("Error generating video:", error);
      setStatusMessage("Error generating video.");
      setIsGenerating(false); // Hide loading progress bar
    }
  };

  const incrementProgress = () => {
    setProgress((prev) => Math.min(prev + 20, 95)); // Increase progress but cap it to 95%
  };

  const checkVideoStatus = async (videoId: string) => {
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
      console.error("Error fetching video URL:", error?.message);
    }
  };

  const downloadVideo = async () => {
    try {
      const response = await axios.get(videoUrl, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
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
      <header className="bg-gray-900 text-white py-6 px-4 md:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <VideoIcon className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">Video Generator</h1>
          </div>
        </div>
      </header>
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
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <Label htmlFor="company-info">Company Information</Label>
                  <Textarea
                    id="company-info"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Tell us about your company..."
                    value={companyInfo}
                    onChange={(e) => setCompanyInfo(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="product-info">Product Information</Label>
                  <Textarea
                    id="product-info"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Describe your product or service..."
                    value={productInfo}
                    onChange={(e) => setProductInfo(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <Label htmlFor="target-group">Target Group Profile</Label>
                  <Textarea
                    id="target-group"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Who are you trying to reach?"
                    value={targetGroup}
                    onChange={(e) => setTargetGroup(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    type="submit"
                    className="bg-gray-700 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                  >
                    Generate Video
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center">
                <LoaderIcon className="h-12 w-12 animate-spin text-blue-500" />
                <Progress value={progress} className="w-[60%] mt-4" />
                <div className="mt-4 text-center">
                  <p>{statusMessage}</p>
                  <p className="mt-2 text-gray-600">
                    Generating your video, please wait...
                  </p>
                </div>
              </div>
            )
          ) : (
            <div className="mt-4 flex flex-col items-center gap-8">
              <div className="mx-auto ">
                <ReactPlayer
                  url={videoUrl}
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="flex gap-8 px-2">
                <Button variant="outline" onClick={downloadVideo}>
                  <DownloadIcon className="h-5 w-5 mr-2" />
                  Download
                </Button>
                <Button variant="outline" onClick={copyToClipboard}>
                  <CopyIcon className="h-5 w-5 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-6 px-4 md:px-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Video Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
