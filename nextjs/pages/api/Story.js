import HttpService from "@/services/HttpService";

export default class StoryService {

    /*static getAll() {
        return HttpService.get('story');
    }*/

    static add(story) {
        return HttpService.post('story', story);
    }

    static delete(id) {
        return HttpService.delete('story/'+id);
    }
}