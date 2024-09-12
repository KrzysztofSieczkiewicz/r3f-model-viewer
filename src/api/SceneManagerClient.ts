

export const SceneManagerClient = async (url: string, options: RequestInit = {}) => {

    const baseUrl = 'localhost:9090';

    try {
        const response = await fetch(`${baseUrl}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: \nreceived status ${response.status}\n with message ${response.statusText}`);
        }

        return await response.json();

    } catch (error: any) {
        console.error('API request failed: ', error.message);
        throw error;
    }
};