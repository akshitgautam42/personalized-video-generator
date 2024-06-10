import React from 'react';
import LoaderIcon from "@/components/Icons/LoaderIcon";
import { Progress } from "@/components/ui/progress";

interface LoadingProps {
  statusMessage: string;
  progress: number;
}

const Loading: React.FC<LoadingProps> = ({ statusMessage, progress }) => (
  <div className="flex flex-col items-center">
    <LoaderIcon className="h-12 w-12 animate-spin text-blue-500" />
    <Progress value={progress} className="w-[60%] mt-4" />
    <div className="mt-4 text-center">
      <p>{statusMessage}</p>
      <p className="mt-2 text-gray-600">
        Generating your video, please wait...
      </p>
    </div>
  </div>
);

export default Loading;
