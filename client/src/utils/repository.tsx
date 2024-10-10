import * as axios from "axios";



class ApiMethods {
    static apiRequest(method: string, url: any, body = {}) {
        return new Promise((resolve, reject) => {
            fetch({
                method,
                url,
                data: body
            })
                .then(response => resolve(response.data))
                .catch(reject);
        });
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
