import mongoose from "mongoose";
import User from "./User";

export interface IVideo{
    _id?:mongoose.Types.ObjectId,
    title:string,
    description:string,
    thumbnailUrl:string,
    videoUrl:string,
    controls?:boolean,
    transformation?:{
        height:number,
        width:number,
        quality?:number
    },
    isPublic:boolean,
    user:mongoose.Types.ObjectId

    
}

export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920,
  } as const;

const videoSchema= new mongoose.Schema<IVideo>(
    {
        title:{type:String,required:true},
        description: { type: String, required: true },
        videoUrl: { type: String, required: true },
        thumbnailUrl: { type: String, required: true },
        controls: { type: Boolean, default: true },
        transformation: {
          height: { type: Number, default: VIDEO_DIMENSIONS.height },
          width: { type: Number, default: VIDEO_DIMENSIONS.width },
          quality: { type: Number, min: 1, max: 100 },
        },
        isPublic:{type:Boolean,default:false},
        user:{type:mongoose.Schema.Types.ObjectId , ref:"User",required:true}
      },

      { timestamps: true }
    
)


const Video = mongoose.models?.Video || mongoose.model<IVideo>("Video", videoSchema);

export default Video;