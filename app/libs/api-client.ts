import axios, { Method, AxiosRequestConfig } from "axios";
import { IVideo } from "../models/Video";

export type VideoFormData = Omit<IVideo, "_id">;

type fetchOptions<T = any> = {
    method?: Method;
    body?: T;
    headers?: Record<string, string>;
};

class myApiClient {
    private async fetch<T>(endpoint: string, options: fetchOptions<T> = {}) {
        const { method = "GET", body, headers } = options;
        const config: AxiosRequestConfig = {
            method,
            url: `/api${endpoint}`,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            ...(method !== "GET" ? { data: body } : {}),
        };

        try {
            const response = await axios(config);
            return response.data as T;
        } catch (error) {
            return error;
        }
    }

    async getVideos():Promise<IVideo[]> {
        const response=await this.fetch("/videos");
        return response as IVideo[];
    }

    async createVideos(videoData: VideoFormData) {
        return await this.fetch("/videos", {
            method: "POST",
            body: videoData,
        });
    }

    async getPublicVideos():Promise<IVideo[]> {
        const response= await this.fetch<IVideo[]>("/videos/public");
        return response as IVideo[];
    }
}

export const myClient = new myApiClient();
