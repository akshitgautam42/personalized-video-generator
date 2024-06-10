// pages/generated-videos.tsx (or app/generated-videos/page.tsx)
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PlayIcon from "@/components/Icons/PlayIcon";

export default function GeneratedVideos() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 min-h-screen">
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              Explore Our Video Collection
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl">
              Discover a curated selection of captivating videos across a
              variety of topics.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoData.map((video, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link
                  href="#"
                  className="absolute inset-0 z-10"
                  prefetch={false}
                >
                  <span className="sr-only">Watch Video</span>
                </Link>
                <img
                  src={video.thumbnail}
                  alt="Video Thumbnail"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="ghost" size="icon" className="text-white">
                    <PlayIcon className="w-10 h-10" />
                  </Button>
                </div>
                <div className="p-4 bg-white dark:bg-gray-900">
                  <h3 className="text-lg font-semibold line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const videoData = [
  {
    title: "Exploring the Wonders of Nature",
    description:
      "Join us on an awe-inspiring journey through the breathtaking landscapes of our planet.",
    thumbnail: "/placeholder.svg",
  },
  {
    title: "The Art of Storytelling",
    description:
      "Dive into the captivating world of storytelling and learn how to craft compelling narratives.",
    thumbnail: "/placeholder.svg",
  },
  {
    title: "The Science of Happiness",
    description:
      "Explore the latest research and insights on how to cultivate a happier, more fulfilling life.",
    thumbnail: "/placeholder.svg",
  },
  {
    title: "The Future of Technology",
    description:
      "Discover the latest advancements and trends shaping the technological landscape.",
    thumbnail: "/placeholder.svg",
  },
  {
    title: "The Art of Mindfulness",
    description:
      "Learn how to cultivate a mindful, present-moment awareness and improve your well-being.",
    thumbnail: "/placeholder.svg",
  },
  {
    title: "The Power of Creativity",
    description:
      "Unlock your creative potential and learn how to harness the transformative power of creativity.",
    thumbnail: "/placeholder.svg",
  },
];
