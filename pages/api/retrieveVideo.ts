// pages/api/video-url.js
import { getVideoData } from "../../lib/videoData";

export default async function handler(req:any, res:any) {
  if (req.method === "GET") {
    const { videoId } = req.query;

    if (!videoId) {
      return res
        .status(400)
        .json({ success: false, error: "Missing videoId parameter" });
    }

    const videoData = getVideoData(videoId);

    if (videoData) {
      res.status(200).json({ success: true, videoData });
    } else {
      res.status(404).json({ success: false, error: "Video data not found" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
