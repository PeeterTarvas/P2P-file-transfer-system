import ENDPOINTS from './endpoinst.tsx'


const getHeaders = () => {

    const getToken = () => {
        return sessionStorage?.getItem('token') || null;
    }

    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
    }
}

class ApiMethods {
    static apiRequest(method: string, url: any , body?: any) {
        url = ENDPOINTS.BASE_URL + url;
        if (body) {
            return new Promise((resolve, reject) => {
                fetch(url ,{
                    method,
                    body: JSON.stringify(body),
                    headers: getHeaders()
                })
                    .then(response => resolve(response))
                    .catch(reject);
            });
        } else {
            return new Promise((resolve, reject) => {
                fetch(url ,{
                    method,
                })
                    .then(response => resolve(response))
                    .catch(reject);
            });
        }

    }

    static get(url: string) {
        return this.apiRequest('GET', url);
    }

    static post(url: string, data: any) {
        return this.apiRequest('POST', url, data);
    }

    static put(url: string, data: any) {
        return this.apiRequest('PUT', url, data);
    }

    static delete(url: string) {
        return this.apiRequest('DELETE', url);
    }
}

export default ApiMethods;
