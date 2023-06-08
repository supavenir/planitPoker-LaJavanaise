import connexionService from "@/services/connexionService";
import cookie from "js-cookie";

export const API_URL = 'http://srv2-vm-2102.sts-sio-caen.info/api/';
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
        return fetch(API_URL + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.get('token')}`,
            },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        });
    }

    static async put(url, data) {
        return fetch(API_URL + url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.get('token')}`,
            },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        });
    }

    static async delete(url) {
        return fetch(API_URL + url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie.get('token')}`,
            },
        }).then(response => {
            return response.json();
        });
    }

}
export default HttpService;