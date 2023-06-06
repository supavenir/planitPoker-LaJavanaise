import connexionService from "@/services/connexionService";
import cookie from "js-cookie";

export const API_URL = 'http://127.0.0.1:8090/api/';
class HttpService {

    /*static get(url) {
        return fetch(API_URL+url, {
            method: 'GET',
            headers: headers
        }).then(response => {
            return response.json();
        });
    }*/

    static async post(url, data) {
        const dataToken = JSON.parse(cookie.get('userConnect'));
        return fetch(API_URL + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${dataToken.access_token}`,
            },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        });
    }

    static async put(url, data) {
        const dataToken = JSON.parse(cookie.get('userConnect'));
        return fetch(API_URL + url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${dataToken.access_token}`,
            },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        });
    }

    static async delete(url) {
        const dataToken = JSON.parse(cookie.get('userConnect'));
        return fetch(API_URL + url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${dataToken.access_token}`,
            },
        }).then(response => {
            return response.json();
        });
    }

}
export default HttpService;