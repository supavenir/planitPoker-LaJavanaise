import {API_URL} from "@/services/HttpService";

class connexionService {

    static connexion(username, password) {
        const dataConnect = new URLSearchParams();
        dataConnect.append(username[0], username[1]);
        dataConnect.append(password[0], password[1]);
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