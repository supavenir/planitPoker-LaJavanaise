import {Button, Divider, List, Modal, Space, Table, Tag} from 'antd';
import {DeleteFilled, EditFilled, EyeFilled} from "@ant-design/icons";
import RoomService from "@/pages/api/Room";
import {useState} from "react";

async function handleChange(value) {
    console.log(`selected ${value}`);
    await RoomService.delete(value);
}

const [isModalOpen, setIsModalOpen] = useState(false);
const showModal = () => {
    setIsModalOpen(true);
};
const handleOk = () => {
    setIsModalOpen(false);
};
const handleCancel = () => {
    setIsModalOpen(false);
};

const App = ({rooms}) => (
    <>
        <Divider orientation="left">Liste des Rooms</Divider>
        <Button type="primary" onClick={showModal}>Ajouter une Room</Button>
        <Table columns={columns} pagination={{ position: ['none', 'bottomCenter'] }} dataSource={rooms}/>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
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
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        render: (id) => (
            <Space size="middle">
                <Button type="primary" shape="circle" icon={<EditFilled />} />
                <Button href={"/rooms/"+id} type="primary" shape="circle" icon={<EyeFilled />} style={{background: "#73d13d"}} />
                <Button type="primary" shape="circle" icon={<DeleteFilled />} onClick={(e) => handleChange(id)} danger />
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