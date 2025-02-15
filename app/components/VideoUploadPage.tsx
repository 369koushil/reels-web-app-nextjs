"use client"
import React,{useState,useEffect} from 'react'
import { useForm } from "react-hook-form"
import FileUpload from './FileUpload'
import { IKUploadResponse } from 'imagekitio-next/dist/types/components/IKUpload/props'
import { myClient } from '../libs/api-client'
import { Loader2 } from "lucide-react";
import { useSession } from 'next-auth/react'
import mongoose from 'mongoose'
import { useRouter } from "next/navigation";
import { House } from 'lucide-react'

interface VideoFormData {
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    user:mongoose.Types.ObjectId
    isPublic:boolean
  }
const VideoUploadPage = () => {
   const router=useRouter()
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const {data:session}=useSession();

    useEffect(() => {
      if (session?.user?.id) {
          try {
              const userId = new mongoose.Types.ObjectId(session.user.id);
              setValue("user", userId);
          } catch (error) {
              console.error("Invalid user ID:", error);
          }
      }
  }, []);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } =useForm<VideoFormData>({
        defaultValues:{
            title:"",
            description:"",
            videoUrl:"",
            thumbnailUrl:"",
            user:new mongoose.Types.ObjectId(),
            isPublic:false
        }
    })

    const onsubmit=async(data:VideoFormData)=>{
        
        if(!data.videoUrl){
            console.log("Please upload a video first", "error")
            return;
        }

        setLoading(true);
        try{
           await myClient.createVideos(data);
      setValue("title", "");
      setValue("description", "");
      setValue("videoUrl", "");
      setValue("thumbnailUrl", "");
      setUploadProgress(0);
      router.push("/home")
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }

    }


    const handleUploadSuccess = (response: IKUploadResponse) => {
        setValue("videoUrl", response.filePath);
        setValue("thumbnailUrl", response.thumbnailUrl || response.filePath);
       "success";
      };

      const handleUploadProgress = (progress: number) => {
        setUploadProgress(progress);
      };

   
  return (
    
  <div className='flex bg-primarybg h-full justify-center gap-y-4 flex-col'>
    <House onClick={()=>router.push("/home")}  className=' cursor-pointer fixed text-primaryh top-4 right-8'/>
   
    <h1 className='text-2xl font-medium flex justify-center  text-primaryh select-none '>Upload here</h1>

    <div className='flex justify-center '>
     <form className='w-[40%] border-2 border-black  bg-white p-4 rounded-lg' onSubmit={handleSubmit(onsubmit)}>

<div className="form-control  ">
        <label className="label text-primaryh text-lg">Title</label>
        <input
          type="text"
          className={`input border-2 border-gray-200 bg-white input-bordered ${
            errors.title ? "input-error" : ""
          }`}
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <span className="text-error text-sm mt-1">
            {errors.title.message}
          </span>
        )}
      </div>

      <div className="form-control">
        <label className="label text-primaryh text-lg">Description</label>
        <textarea
          className={`textarea border-2 border-gray-200 bg-white max-h-36 textarea-bordered h-24 ${
            errors.description ? "textarea-error" : ""
          }`}
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className="text-error text-sm mt-1">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className='flex gap-y-4 flex-col'>
      <div className="form-control">
        <label className="label text-primaryh text-lg">Upload Video</label>
        <FileUpload
          fileType="video"
          onSuccess={handleUploadSuccess}
          onProgress={handleUploadProgress}
        />
        {uploadProgress > 0 && (
          <div className="w-full  rounded-full h-2.5 mt-2">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>

      <div className='flex gap-y-4 flex-col'>
      <button
        type="submit"
        className="btn text-black hover:bg-cardbg2 bg-cardbg"
        disabled={loading || uploadProgress<100}
      >
        <div className='flex gap-y-4'>
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
           " Publishing Video..."
          </>
        ) : (
          "Publish Video"
        )}
        </div>
      </button>
      </div>
       
      </div>

      
   </form>
  </div>
  </div>
  )
}

export default VideoUploadPage