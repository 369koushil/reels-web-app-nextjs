import { IKVideo } from "imagekitio-next";
import { IVideo } from "../models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {


  return (
    <div className="card bg-cardbg hover:shadow-cardbg text-primaryh shadow-2xl transition-all duration-300">
      <figure className="relative px-4 pt-4">
        
          <div
            className="rounded-xl overflow-hidden relative w-full"
            style={{ aspectRatio: "9/16" }}
          >
            <IKVideo
              path={video.videoUrl}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              controls={video.controls}
              className="w-full h-full object-cover"
            />
          
          </div>
      </figure>

      <div className="card-body p-4">
          <h2 className="card-title text-lg">{video.title}</h2>
      </div>
    </div>
  );
}
