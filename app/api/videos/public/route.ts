import { connectDB } from "@/app/libs/db";
import Video from "@/app/models/Video";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
import { NextResponse } from "next/server";  // Correct way to send API responses
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            console.error("User unauthorized");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const videos = await Video.find({ isPublic: true });
        await delay(2000); 
        return NextResponse.json(videos, { status: 200 });
    } catch (err) {
        console.error("Failed to fetch public videos:", err);
        return NextResponse.json({ error: "Failed to fetch public videos" }, { status: 500 });
    }
}
