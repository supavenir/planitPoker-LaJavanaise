import {API_URL} from "@/services/HttpService";

class connexionService {

    static connexion() {
        const dataConnect = new URLSearchParams();
        dataConnect.append('username', 'qperrier');
        dataConnect.append('password', '0000');
        return fetch(API_URL+'connect', {
            method: 'POST',
            body: dataConnect,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(response => {
            return response.json();
        });
    }

}
export default connexionService;