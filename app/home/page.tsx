
import React from 'react'
import Navbar from "../components/Navbar";
import { getServerSession } from 'next-auth';
import { authOptions } from '../libs/auth';
import { redirect } from "next/navigation";
import Video from '../models/Video';
import VideoFeed from '../components/VideoFeed';
import { Upload as UploadIcon } from 'lucide-react';
const page = async() => {
  const session =await getServerSession(authOptions);
  if(!session){
     return {
      redirect: {
        destination: "/login",  // Client-side route
        permanent: false,
      },
    };
  }
  
    let videoData=[]
    try{
     videoData=await Video.find({user:session.user.id})
    }catch(err){
      console.log(err)
    }
  return (
    <div>
      {videoData.length === 0 ? (
          <div className="flex justify-center items-center">
          <UploadIcon className="w-12 h-12 text-gray-500" /> {/* Adjust the icon size and color as needed */}
          <p className="text-lg text-gray-500 mt-2">Upload your first video!</p>
        </div>
      ) : (
        <VideoFeed videos={videoData} />
      )}
      <Navbar/>
    </div>
  )
}



export default page
