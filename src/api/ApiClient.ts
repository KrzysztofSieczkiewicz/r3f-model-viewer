
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

        console.log('Fetching URL:', url);

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
            }
            return response.json() as Promise<T>;
        } catch (error) {
            console.error('Fetch failed:', error);
            throw new Error(`Network request failed with error: ${error}`);
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