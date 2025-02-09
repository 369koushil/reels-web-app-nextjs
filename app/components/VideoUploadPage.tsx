"use client"
import React,{useState} from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import FileUpload from './FileUpload'
import { IKUploadResponse } from 'imagekitio-next/dist/types/components/IKUpload/props'
import { myClient } from '../libs/api-client'
import { Loader2 } from "lucide-react";

interface VideoFormData {
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
  }
const VideoUploadPage = () => {

    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

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
            thumbnailUrl:""
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
   <form onSubmit={handleSubmit(onsubmit)}>

<div className="form-control">
        <label className="label">Title</label>
        <input
          type="text"
          className={`input input-bordered ${
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
        <label className="label">Description</label>
        <textarea
          className={`textarea textarea-bordered h-24 ${
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

      <div className="form-control">
        <label className="label">Upload Video</label>
        <FileUpload
          fileType="video"
          onSuccess={handleUploadSuccess}
          onProgress={handleUploadProgress}
        />
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={loading || uploadProgress<100}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Publishing Video...
          </>
        ) : (
          "Publish Video"
        )}
      </button>
       
   </form>
  )
}

export default VideoUploadPage
