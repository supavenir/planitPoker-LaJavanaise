import {Button, Divider, List, Space, Table, Tag} from 'antd';
import {DeleteFilled, EditFilled, EyeFilled} from "@ant-design/icons";
const App = ({rooms}) => (
    <>
        <Divider orientation="left">Liste des Rooms</Divider>
        <Table columns={columns} pagination={{ position: ['none', 'bottomCenter'] }} dataSource={rooms}/>
    </>
);

const columns = [
    {
        title: 'Nom des rooms',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Action',
        key: 'action',
        align: 'center',
        render: (_, room) => (
            <Space size="middle">
                <Button type="primary" shape="circle" icon={<EditFilled />} />
                <Button type="primary" shape="circle" icon={<EyeFilled />} style={{background: "#73d13d"}} />
                <Button type="primary" shape="circle" icon={<DeleteFilled />} danger />
            </Space>
        ),
    },
];

export async function getStaticProps(context) {

    const API_URL = 'http://127.0.0.1:8090/api/';
    const resRooms = await fetch(API_URL+'room');
    const rooms = await resRooms.json();

    return {
        props: {
            rooms
        },
    }
}

export default App;