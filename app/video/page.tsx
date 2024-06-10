"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import VideoPlayerWithControls from "@/components/VideoPlayerWithControls";
import Footer from "@/components/Footer";
import { getVideoData, storeVideoData } from "@/lib/videoData";

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
      if (response.data.success) {
        const { videoData } = response.data;
        setVideoUrl(videoData);
        setStatusMessage("Video URL fetched successfully.");
        setProgress(100); // Set progress to 100% when video is ready
        setIsGenerating(false); // Hide loading progress bar
        storeVideoData(videoId, videoData); // Store video data
      } else {
        setStatusMessage("Video is still processing...");
        incrementProgress(); // Increment progress if video is still processing
      }
    } catch (error) {
      console.error("Error checking video status:", error);
    }
  }, [videoId]);

  useEffect(() => {
    if (videoId) {
      const storedVideoData = getVideoData(videoId);
      if (storedVideoData) {
        setVideoUrl(storedVideoData);
        setStatusMessage("Video URL fetched from cache.");
        setProgress(100); 
        setIsGenerating(false); 
      } else {
        const interval = setInterval(() => {
          checkVideoStatus();
        }, 10000); // Poll every 10 seconds

        return () => clearInterval(interval);
      }
    }
  }, [videoId, checkVideoStatus]);

  const incrementProgress = () => {
    setProgress((prev) => Math.min(prev + 20, 95)); // Increase progress but cap it to 95%
  };

  const downloadVideo = async () => {
    try {
      const response = await axios.get(videoUrl, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link: HTMLAnchorElement = document.createElement("a");
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
          { isGenerating? (
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
