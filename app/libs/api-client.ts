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

    async getVideos() {
        return this.fetch<IVideo[]>("/videos");
    }

    async createVideos(videoData: VideoFormData) {
        return this.fetch("/videos", {
            method: "POST",
            body: videoData,
        });
    }

    async getPublicVideos() {
        return this.fetch<IVideo[]>("/videos/public");
    }
}

export const myClient = new myApiClient();
