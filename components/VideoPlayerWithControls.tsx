import React from 'react';
import ReactPlayer from 'react-player';
import { Button } from '@/components/ui/button';
import { CopyIcon } from '@/components/Icons/CopyIcon';
import { DownloadIcon } from '@/components/Icons/DownloadIcon';

interface VideoPlayerWithControlsProps {
  videoUrl: string;
  downloadVideo: () => void;
  copyToClipboard: () => void;
}

const VideoPlayerWithControls: React.FC<VideoPlayerWithControlsProps> = ({
  videoUrl,
  downloadVideo,
  copyToClipboard,
}) => (
  <div className="mt-4 flex flex-col items-center gap-8">
    <div className="mx-auto">
      <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
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
);

export default VideoPlayerWithControls;
