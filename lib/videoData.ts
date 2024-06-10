// lib/videoData.js
import Cookies from "js-cookie";

// Store video data in cookies
export function storeVideoData(videoId: any, videoData: any) {
  Cookies.set(`videoData-${videoId}`, videoData, { expires: 7 }); // Expires in 7 days
}

// Get video data from cookies
export function getVideoData(videoId: any) {
  return Cookies.get(`videoData-${videoId}`);
}
