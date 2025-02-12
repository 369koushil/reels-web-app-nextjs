import React from 'react';
import { Upload as UploadIcon } from 'lucide-react';
import VideoFeed from '../components/VideoFeed';
import { useRouter } from 'next/navigation';
import { IVideo } from '../models/Video';

const YourReel = ({ videoData }: { videoData:IVideo[] }) => {
  const router = useRouter();

  return (
    <div > 
      {videoData.length === 0 ? (
        <div className='fixed top-[45%] left-[40%] flex p-4 bg-lime-600 rounded-lg text-black justify-center gap-x-2 h-full cursor-pointer  items-center' onClick={() => router.push("/uploadvideos")} >
          <UploadIcon
            
            className="w-12 select-none h-12 "
          />
          <p className="text-lg select-none font-semibold mt-2">Upload your first video!</p>
        </div>
      ) : (
        <VideoFeed videos={videoData} />
      )}
    </div>
  );
};

export default YourReel;
