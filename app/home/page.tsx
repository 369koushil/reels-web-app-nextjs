"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import { myClient } from "../libs/api-client";
import YourReel from "../components/YourReel";
import PublicReelComponent from "../components/PublicReelComponent";
import Header from "../components/Header";
import YourReelSkeleton from "../components/YourReelSkeleton";
import Skeleton from "../components/Skeleton";
import Skeleton2 from "../components/Skeleton2";

const Page = () => {
  const { data: session } = useSession();

  const [videoData, setVideoData] = useState([]);
  const [publicVideos, setPublicVideos] = useState([]);
  const [active, setActive] = useState("your reels");
  const [loading, setLoading] = useState(true);
  const [publicReelsLoading, setPublicReelsLoading] = useState(true);

  useEffect(() => {
    if (!session?.user.id) return;

    myClient
      .getVideos()
      .then((res) => {
        setVideoData(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [session?.user.id]);

  return (
    <div className="">
      {active === "your reels" ? (
        <div className="flex flex-col gap-y-4">
          <Header />
          {loading ? <YourReelSkeleton /> : <YourReel videoData={videoData} />}
        </div>
      ) : (
        <div>
          {publicReelsLoading ? <div className="flex bg-black w-screen h-screen justify-center items-center">  <div className="skeleton h-full w-full  md:w-3/5 lg:w-[28%]"></div></div> : <PublicReelComponent videosData={publicVideos} />}
        </div>
      )}
      <Navbar setPublicReelsLoading={setPublicReelsLoading} setPublicVideos={setPublicVideos} active={active} setActive={setActive} />
    </div>
  );
};

export default Page;
