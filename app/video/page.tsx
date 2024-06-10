"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import VideoPlayerWithControls from "@/components/VideoPlayerWithControls";
import Footer from "@/components/Footer";

function VideoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoId = searchParams?.get("id");
  const [videoUrl, setVideoUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);

  const checkVideoStatus = useCallback(async () => {
    if (!videoId) return;

    try {
      const response = await axios.get(`/api/retrieveVideo?videoId=${videoId}`);
      if (response?.data?.success) {
        const { videoData } = response.data;
        setVideoUrl(videoData);
        setStatusMessage("Video URL fetched successfully.");
        setProgress(100); // Set progress to 100% when video is ready
        setIsGenerating(false); // Hide loading progress bar
        return true; // Indicate that the video is ready
      } else {
        setStatusMessage("Video is still processing...");
        incrementProgress(); // Increment progress if video is still processing
        return false; // Indicate that the video is still processing
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setStatusMessage("Video is still processing...");
        incrementProgress(); // Increment progress if video is still processing
      } else {
        console.error("Error checking video status:", error);
        setStatusMessage("Error retrieving video data.");
        setIsGenerating(false); // Stop loader on non-404 error
      }
      return false; // Indicate that the video is still processing or an error occurred
    }
  }, [videoId]);

  useEffect(() => {
    if (videoId) {
      let interval: any;
      const checkAndSetInterval = async () => {
        const isVideoReady = await checkVideoStatus();
        if (!isVideoReady) {
          interval = setInterval(async () => {
            const isVideoReady = await checkVideoStatus();
            if (isVideoReady) {
              clearInterval(interval); // Stop polling if video is ready
            }
          }, 30000); // Poll every 30 seconds
        }
      };

      checkAndSetInterval();

      return () => clearInterval(interval);
    }
  }, [videoId, checkVideoStatus]);

  const incrementProgress = () => {
    setProgress((prev) => Math.min(prev + 10, 95)); // Increase progress but cap it to 95%
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
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Error downloading video:", error);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(videoUrl);
      console.log("Video URL copied to clipboard.");
    } catch (error) {
      console.error("Error copying URL:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4 md:px-8">
        <div className="container mx-auto max-w-3xl">
          {isGenerating ? (
            <Loading statusMessage={statusMessage} progress={progress} />
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

export default VideoPage;
