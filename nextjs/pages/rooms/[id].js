import {Divider, List} from "antd";
import {API_URL} from "@/services/HttpService";

const App = ({room}) => (
    <>
        <Divider orientation="center">Liste des Rooms</Divider>
        <p>{room.name}</p>
    </>
);

export async function getStaticPaths() {

        const resRooms = await fetch(API_URL+'rooms');
        const rooms = await resRooms.json();

        const paths = rooms.map(room => {
            return {
                params: {
                    id: room.id.toString()
                }
            }
        });

        return {
            paths,
            fallback: false
        }

}

export async function getStaticProps(context) {

    const id = context.params.id;
    const resRoom = await fetch(API_URL+'rooms/'+id);
    const room = await resRoom.json();

    return {
        props: {
            room
        },
    }

}

export default App;