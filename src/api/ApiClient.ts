interface ApiError extends Error {
    status?: number;
    statusText?: string;
    responseBody?: any;
}

export class ApiClient {
    private baseUrl: string;
    private defaultHeaders: Record<string, string>;

    constructor(baseUrl: string, commonHeaders?: Record<string,string>) {
        // TODO: replace this and constructor parameter with getting a value from env
        this.baseUrl = baseUrl;
        this.defaultHeaders = {
            "Content-Type": "application/json",
            ...commonHeaders
        };
    }

    private async request<T>(
        path: string,
        method: "GET" | "POST" | "PUT" | "DELETE",
        headers?: Record<string, string>,
        body?: any,
    ): Promise<T> {
        const url = `${this.baseUrl}${path}`;
        const options: RequestInit = {
            method,
            headers: {
                ...this.defaultHeaders,
                ...headers
            },
            ...(body ? { body: JSON.stringify(body) } : {})
        };

        try {
            const response = await fetch(url, options);
            const contentType = response.headers.get("Content-Type");
            const isJson = contentType?.includes("application/json");

            if (!response.ok) {
                const errorBody = isJson ? await response.json() : await response.text();
                const error: ApiError = new Error(`Request failed with status ${response.status}: ${response.statusText}`);
                error.status = response.status;
                error.statusText = response.statusText;
                error.responseBody = errorBody;
                throw error;
            }
            
            console.log({body: response.json()})

            return isJson ? await response.json() : ({} as T); // Ensure correct type for empty responses
        } catch (error) {
            console.error('Network request failed:', error);
            throw error;
        }
    }


    async get<T>(path: string, headers?: Record<string, string>, body?: any) {
        // TODO: Make sure that passing headers and body like this will not cause errors
        const response = this.request<T>(
            path,
            "GET",
            headers,
            body,
        );

        // Add additional checks here
        return response;
    }

    async post<T>(path: string, headers?: Record<string, string>, body?: any) {
        const response = this.request<T>(
            path,
            "POST",
            headers,
            body,
        );

        return response;
    }

    async put<T>(path: string, headers?: Record<string, string>, body?: any) {
        const response = this.request<T>(
            path,
            "PUT",
            headers,
            body,
        );

        return response;
    }

    async delete<T>(path: string, headers?: Record<string, string>, body?: any) {
        const response = this.request<T>(
            path,
            "DELETE",
            headers,
            body,
        );

        return response;
    }
}