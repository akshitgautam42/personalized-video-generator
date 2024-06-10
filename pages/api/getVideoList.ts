// pages/api/getVideoList.ts
import { NextApiRequest, NextApiResponse } from "next";
import sdk from "@api/synthesia";
import dotenv from "dotenv";

dotenv.config();

sdk.auth(process.env.SYNTHESIA_API_KEY || "");

const getVideoList = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = req.query;

    const response: any = await sdk.listVideos({
      LIMIT: 100,
      OFFSET: 0,
    });

    const allVideos = response?.data?.videos;
    const filteredVideos = allVideos.filter(
      (video: any) => video.callbackId === userId && video.status == "complete"
    );

    res.status(200).json({
      success: true,
      data: { videos: filteredVideos, total: filteredVideos.length },
    });
  } catch (error: any) {
    console.error("Error retrieving video list:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export default getVideoList;
