// pages/api/video-callback.js
import { storeVideoData } from "@/lib/videoData";

async function updateVideoDownloadUrl(videoId:any, downloadUrl:any) {
  try {
    storeVideoData(videoId, downloadUrl);
  } catch (error) {
    console.error("Error updating video download URL:", error);
  }
}

export default async function handler(req:any, res:any) {
  if (req.method === "POST") {
    const { type, data } = req.body;

    if (type === "video.completed" && data.status === "complete") {
      const { id, download } = data;

      // Update video download URL using the imported function
      await updateVideoDownloadUrl(id, download);

      res.status(200).json({ success: true });
    } else {
      res
        .status(400)
        .json({ success: false, error: "Invalid event type or status" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
