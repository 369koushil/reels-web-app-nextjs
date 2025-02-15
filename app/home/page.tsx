"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import { myClient } from "../libs/api-client";
import YourReel from "../components/YourReel";
import PublicReelComponent from "../components/PublicReelComponent";
import Header from "../components/Header";
import YourReelSkeleton from "../components/YourReelSkeleton";
import { IVideo } from "../models/Video";

const Page = () => {
  const { data: session } = useSession();

  const [videoData, setVideoData] = useState<IVideo[]>([]);
  const [publicVideos, setPublicVideos] = useState<IVideo[]>([]);
  const [active, setActive] = useState("your reels");
  const [loading, setLoading] = useState(true);
  const [publicReelsLoading, setPublicReelsLoading] = useState(true);


  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res: IVideo[] = await myClient.getVideos(); 
      setVideoData(res);
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchVideos();
  }, []);
  

  return (
    <div className={`h-screen ${active==="your reels"?'bg-primarybg ':'bg-black '}`}>
      {active === "your reels" ? (
        <div className="flex flex-col gap-y-4">
          <Header />
          {loading ? <YourReelSkeleton /> : <YourReel videoData={videoData} />}
        </div>
      ) : (
        <div className="bg-primarybg">
          {publicReelsLoading ? <div className="flex bg-primarybg w-screen h-screen justify-center items-center">  <div className="skeleton bg-primarybg h-full w-full  md:w-3/5 lg:w-[28%]"></div></div> : <PublicReelComponent videosData={publicVideos} />}
        </div>
      )}
      <Navbar setPublicReelsLoading={setPublicReelsLoading} setPublicVideos={setPublicVideos} active={active} setActive={setActive} />
    </div>
  );
};

export default Page;
