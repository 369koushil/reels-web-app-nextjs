import React from 'react';
import { Upload as UploadIcon } from 'lucide-react';
import VideoFeed from '../components/VideoFeed';
import { useRouter } from 'next/navigation';

const YourReel = ({ videoData }: { videoData: any }) => {
  const router = useRouter();

  return (
    <div> 
      {videoData.length === 0 ? (
        <div className="flex justify-center gap-x-2 h-full items-center">
          <UploadIcon
            onClick={() => router.push("/uploadvideos")}
            className="w-12 cursor-pointer select-none h-12 text-gray-500"
          />
          <p className="text-lg select-none text-gray-500 mt-2">Upload your first video!</p>
        </div>
      ) : (
        <VideoFeed videos={videoData} />
      )}
    </div>
  );
};

export default YourReel;
