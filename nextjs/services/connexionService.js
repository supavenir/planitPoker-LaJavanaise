import {API_URL} from "@/services/HttpService";

class connexionService {

    static connexion() {
        const dataConnect = new URLSearchParams();
        dataConnect.append('username', 'qperrier'); // valeur de test
        dataConnect.append('password', '0000'); // valeur de test
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