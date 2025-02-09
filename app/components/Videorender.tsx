"use client"
import React, { useEffect, useState ,useId} from 'react'
import { IKVideo } from "imagekitio-next";
import { ImageKitProvider } from 'imagekitio-next';
import { myClient } from '../libs/api-client';


interface videoResForamt {
    controls
    :
    boolean
    createdAt
    :
    string
    description
    :
    string
    thumbnailUrl
    :
   string
    title
    :
    string
    transformation
    :
    { height: 1920, width: 1080, quality: 100 }
    updatedAt
    :
    string
    videoUrl
    :
    string
    __v
    :
    0
    _id
    :
    string
}
const Videorender = () => {
    const [videoPaths, setVideoPaths] = useState([]);
    useEffect(() => {
        myClient.getVideos().then(res => {
            console.log(res)
            setVideoPaths(res)
        })
    },[])

    return (
        <ImageKitProvider urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}>
            {
                videoPaths.map((e:videoResForamt) => {
                    return (
                        <div className="mockup-phone ">
  <div className="camera"></div>
  <div className="display">
    <div className="artboard artboard-demo phone-1">
    <IKVideo
                        key={e._id}
                            path={ e.videoUrl}
                            transformation={[{ height: `1920`, width: `1080`}]}
                            controls={true}
                        />
    </div>
  </div>
</div>
                    )
                })
            }
        </ImageKitProvider>
    )
}

export default Videorender
