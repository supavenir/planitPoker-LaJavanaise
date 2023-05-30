import HttpService from "@/services/HttpService";

export interface User{
    id;
    username;
    email;
    password;
    completeName;
}
export default class UserService{
    static getAll(){
        return HttpService.get('users');
    }

    static add(user){
        return HttpService.post('users', user);
    }

    static delete(id){
        return HttpService.delete('users/'+id);
    }
}