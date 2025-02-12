"use client"
import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import { useSession } from 'next-auth/react';
import { myClient } from '../libs/api-client';
import YourReel from '../components/YourReel';
import PublicReelComponent from '../components/PublicReelComponent';
const page = () => {
  const {data:session}=useSession();

  const[videoData,setVideoData]=useState([]);
  const [active, setActive] = useState("your reels");
  useEffect(()=>{
    console.log(session?.user.id)
     myClient.getVideos().then(res=>{
      console.log(res)
     setVideoData(res)
     console.log(videoData.length)
    }).catch(err=>console.log(err))
  },[])
  return (
    <div className='h-screen'>
      {
        active==="your reels"?(
          <YourReel videoData={videoData}></YourReel>
        ):(
          <PublicReelComponent></PublicReelComponent>
        )
      }
      <Navbar active={active} setActive={setActive}/>
    </div>
  )
}



export default page
