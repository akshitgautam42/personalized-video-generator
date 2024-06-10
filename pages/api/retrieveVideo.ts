import sdk from "@api/synthesia";

sdk.auth(process.env.SYNTHESIA_API_KEY || "");

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    const { videoId } = req.query;

    if (!videoId) {
      return res
        .status(400)
        .json({ success: false, error: "Missing videoId parameter" });
    }

    try {
      const { data } = await sdk.retrieveAVideo({ video_id: videoId });
      if (data?.download) {
        return res
          .status(200)
          .json({ success: true, videoData: data.download });
      }

      return res.status(404).json({ success: false });
    } catch (err) {
      console.error("Error retrieving video data from Synthesia:", err);
      return res
        .status(500)
        .json({ success: false, error: "Error retrieving video data" });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }
}
