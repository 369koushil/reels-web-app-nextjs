"use client"
import VideoUploadPage from "@/app/components/VideoUploadPage";
import React from 'react'
import Providers from "../components/Providers";
const page = () => {
  return (
    <div className="h-screen w-screen">
    <Providers>
    <VideoUploadPage/>
    </Providers>
    </div>
  )
}

export default page
