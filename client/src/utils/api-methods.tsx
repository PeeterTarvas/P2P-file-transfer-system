import ENDPOINTS from './endpoinst.tsx'


export const getHeaders = () => {

    const getToken = () => {
        return sessionStorage?.getItem('token') || undefined;
    }

    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
    }
}

class ApiMethods {
    static async apiRequest(method: string, url: string, body?: any, headers?: any) {
        url = ENDPOINTS.BASE_URL + url;

        const options: RequestInit = {
            method,
        };

        if (headers) {
            options.headers = headers;
        }

        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.json();
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    }

    static get(url: string, headers?: any) {
        return this.apiRequest('GET', url, undefined, headers);
    }

    static post(url: string, data: any, headers?: any) {
        return this.apiRequest('POST', url, data, headers);
    }

    static put(url: string, data: any, headers?: any) {
        return this.apiRequest('PUT', url, data, headers);
    }

    static delete(url: string, headers?: any) {
        return this.apiRequest('DELETE', url, headers);
    }
}

export default ApiMethods;
