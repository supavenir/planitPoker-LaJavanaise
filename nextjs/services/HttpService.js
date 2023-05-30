export const API_URL = 'http://127.0.0.1:8090/api/';
//Wrapper for the fetch api
class HttpService {
    static get(url, headers) {
        return fetch(API_URL+url, {
            method: 'GET',
            headers: headers
        }).then(response => {
            return response.json();
        });
    }

    static post(url, data, headers) {
        return fetch(API_URL+url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        });
    }

    static delete(url, headers) {
        return fetch(API_URL+url, {
            method: 'DELETE',
            headers: headers
        }).then(response => {
            return response.json();
        });
    }
}
export default HttpService;
