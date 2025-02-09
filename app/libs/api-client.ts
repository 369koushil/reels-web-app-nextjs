
import axios, { Method, AxiosRequestConfig } from "axios";
import { IVideo } from "../models/Video";

export type VideoFormData = Omit<IVideo, "_id">;

type fetchOptions = {
    method?: Method
    body?: any,
    headers?: Record<string, string>
}

class myApiClient {
    private async fetch(endpoint: string, options: fetchOptions = {}) {
        const { method = "GET", body, headers } = options
        const config: AxiosRequestConfig = {
            method,
            url: `/api${endpoint}`,
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            ...(method !== "GET" ? { data: body } : {})
        }

        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            return error
        }
    }

    async getVideos() {
        return this.fetch("/videos")
    }

    async createVideos(videoData: VideoFormData) {
        return this.fetch("/videos", {
            method: "POST",
            body: videoData
        })
    }
}


 export const myClient =new myApiClient();