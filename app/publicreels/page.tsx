"use client";
import { useState, useRef, useEffect } from "react";
import { IVideo } from "../models/Video";

export default function Page({videosData}:{videosData:IVideo[]}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollY = e.currentTarget.scrollTop;
    const index = Math.round(scrollY / window.innerHeight);
    setCurrentIndex(index);
  };

  return (
    <div
      className="h-screen overflow-y-auto snap-y snap-mandatory bg-black flex justify-center"
      onScroll={handleScroll}
    >
      <div className="w-full flex flex-col items-center">
        {videosData.map((video, index) => (
          <div
            key={video._id?.toString()}
            className="relative w-full md:w-3/5 lg:w-2/5 h-screen flex justify-center items-center snap-center"
          >
            <video
              ref={(el) => {videoRefs.current[index] = el}}
              className="w-full h-full object-contain rounded-lg"
              src={video.videoUrl}
              loop
              muted
              playsInline
            />
          </div>
        ))}
      </div>
    </div>
  );
}
