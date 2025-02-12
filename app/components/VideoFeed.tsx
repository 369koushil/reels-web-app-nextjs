import { IVideo } from "../models/Video";
import VideoComponent from "./VideoComponent";
import { ImageKitProvider } from "imagekitio-next";

interface VideoFeedProps {
  videos: IVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  return (
    <ImageKitProvider urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}>
       <div className="grid grid-cols-1
        pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {videos.map((video) => (
       <div className="w-72"> <VideoComponent  key={video._id?.toString()} video={video} /></div>
      ))}
    </div>
    </ImageKitProvider>
  );
}
