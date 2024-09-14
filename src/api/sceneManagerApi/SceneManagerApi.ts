import { ApiClient } from "../ApiClient";

// TODO: replace this by getting this from centralized env variables
const BASE_URL = "localhost:9090";

const defaultHeaders = {
    'Content-Type': 'application/json',
} as Record<string, string>

export const apiClient = new ApiClient(BASE_URL, defaultHeaders);