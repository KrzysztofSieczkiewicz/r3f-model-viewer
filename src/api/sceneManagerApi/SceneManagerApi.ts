import { ApiClient } from "../ApiClient";

// TODO: replace this by getting this from centralized env variables
const BASE_URL = "localhost:9090";

const defaultHeaders = {
    'Content-Type': 'application/json',
} as Record<string, string>

const request = async <T>(
    path: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    headers?: Record<string, string>,
    body?: any,
): Promise<T> => {
    const url = `${BASE_URL}${path}`;
    const bodyString = body ? JSON.stringify(body) : "";

    const options: RequestInit = {
        method,
        headers: {...defaultHeaders, ...headers },
        body: bodyString,
    };

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`${method} request failed with status ${response.status}.\nError message: ${response.statusText}`)
    }

    return response.json() as Promise<T>
}

const get = <T>(path: string, headers?: Record<string,string>,  body?: any) => {
    return request<T>(
        path,
        "GET",
        headers,
        body,
    )
}

export const apiClient = new ApiClient('localhost:9090');