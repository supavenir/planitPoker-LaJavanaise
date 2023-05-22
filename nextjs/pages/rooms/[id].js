import {Button, Divider, List, Space, Table} from "antd";
import {API_URL} from "@/services/HttpService";
import {DeleteFilled, EditFilled, EyeFilled} from "@ant-design/icons";

const App = ({room, stories}) => (
    <>
        <Divider orientation="center">{room.name}</Divider>
        <Table columns={columns} pagination={{ position: ['none', 'bottomCenter'] }} dataSource={stories}/>
    </>
);

const columns = [
    {
        title: 'US',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Action',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        render: (id) => (
            <Space size="middle">
                <Button type="primary" shape="circle" icon={<EditFilled />} />
                <Button type="primary" shape="circle" icon={<EyeFilled />} style={{background: "#73d13d"}} />
                <Button type="primary" shape="circle" icon={<DeleteFilled />} danger />
            </Space>
        ),
    },
];

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
    const resStories = await fetch(API_URL+'story');
    const stories = await resStories.json();

    return {
        props: {
            room,
            stories,
        },
    }

}

export default App;