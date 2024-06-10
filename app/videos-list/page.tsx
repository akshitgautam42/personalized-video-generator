"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth, SignedIn, SignedOut } from "@clerk/nextjs";
import VideoPlayerWithControls from "@/components/VideoPlayerWithControls";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

const fetchVideoList = async (userId: string) => {
  try {
    const response = await axios.get(`/api/getVideoList`, {
      params: { userId },
    });
    return response.data.data.videos;
  } catch (error) {
    console.error("Error fetching video list:", error);
    return [];
  }
};

const VideoPage: React.FC = () => {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const [videos, setVideos] = useState<any[]>([]);
  const [statusMessage, setStatusMessage] = useState("Loading videos...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/login");
    } else if (isLoaded && userId) {
      const getVideos = async () => {
        const videoList = await fetchVideoList(userId);
        setVideos(videoList);
        setIsLoading(false);
        setStatusMessage(videoList.length ? "" : "No videos found.");
      };

      getVideos();
    }
  }, [isLoaded, userId, router]);

  const downloadVideo = async (videoUrl: string) => {
    try {
      const response = await axios.get(videoUrl, { responseType: "blob" });
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

  const copyToClipboard = async (videoUrl: string) => {
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
        <div className="container mx-auto w-full">
          <SignedOut>
            <p>Redirecting...</p>
          </SignedOut>
          <SignedIn>
            {isLoading ? (
              <Loading statusMessage={statusMessage} progress={0} />
            ) : (
                <div>
                 <h2 className="text-3xl font-bold mb-4">Get all you Videos here ...</h2>
              <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all"
                  >
                    <VideoPlayerWithControls
                      videoUrl={video.download}
                      downloadVideo={() => downloadVideo(video.download)}
                      copyToClipboard={() => copyToClipboard(video.download)}
                    />
                    <div className="p-4 bg-white dark:bg-gray-950">
                      <h3 className="text-lg font-bold line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                        {video.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              </div>
            )}
          </SignedIn>
        </div>
      </main>
      
      <Footer />
    </div>
    
    
  );
};

export default VideoPage;
