import HttpService from "@/services/HttpService";

export default class UserService{
    /*static getAll(){
        return HttpService.get('users');
    }*/

    static add(user){
        return HttpService.post('users', user);
    }

    static update(story) {
        return HttpService.put('story/'+story.id, story);
    }

    static delete(id){
        return HttpService.delete('users/'+id);
    }
}