import HttpService from "@/services/HttpService";

export default class RoomService {

    /*static getUserRooms(idUser) {
        return HttpService.get('rooms/?filter=idOwner='+idUser);
    }*/

    /*static getAll() {
        return HttpService.get('rooms');
    }*/

    static add(room) {
        return HttpService.post('rooms', room);
    }

    static delete(id) {
        return HttpService.delete('rooms/'+id);
    }
}