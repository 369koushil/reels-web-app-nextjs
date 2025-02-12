import { authOptions } from "@/app/libs/auth";
import { connectDB } from "@/app/libs/db";
import Video from "@/app/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { IVideo } from "@/app/models/Video";
import mongoose from "mongoose";

export async function GET(req:NextRequest){
     try{
      const session= await getServerSession(authOptions)
      console.log(session?.user.id.length)
      if(!session)return NextResponse.json({msg:"user unauthorizsed"},{status:200})
        await connectDB();
        const userId=new mongoose.Types.ObjectId(session.user.id)
        const videos=await Video.find({user:userId}).sort({createdAt:-1})
        if(!videos||videos.length===0)return NextResponse.json([],{status:200})
            return NextResponse.json(videos,{status:200})
     }catch(err){
      console.log(err)
        return NextResponse.json({error:"failed to get video"},{status:200})
     }
}

export async function POST(req:NextRequest){
    try{
      const session= await getServerSession(authOptions)
      if(!session)return NextResponse.json({msg:"user unauthorizsed"},{status:200})
    await connectDB();
      const body: IVideo = await req.json();

      if (
        !body.title ||
        !body.description ||
        !body.videoUrl ||
        !body.thumbnailUrl
      ) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }
  
      // Create new video with default values
      const videoData = {
        ...body,
        controls: body.controls ?? true,
        transformation: {
          height: 1920,
          width: 1080,
          quality: body.transformation?.quality ?? 100,
        },
        user:session.user.id
        
      };

      const newVideo = await Video.create(videoData);
      return NextResponse.json(newVideo);

    }catch(err){
        return NextResponse.json({error:"failed to create video"},{status:200})
     }
}