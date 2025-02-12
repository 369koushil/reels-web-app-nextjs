import { NextResponse,NextRequest } from "next/server";
import { connectDB } from "@/app/libs/db";
import User from "@/app/models/User";

export async function POST(req:NextRequest){

    try{
        const {email,password}=await req.json()
        if(!email||!password)return NextResponse.json({error:"email password req"},
            {status:400}
        )

        await connectDB();
        const existingUser=await User.findOne({email})
        if(existingUser){
            return NextResponse.json({
                error:"user already registered"
            },
        {status:400})
        }

        const userCreated=await User.create({email,password})
        return NextResponse.json({user:userCreated},{status:201})
    }catch(error){
        console.log(error)
        return NextResponse.json({error:"failed to create user"},{status:400})
    }
}

