import {Button, Divider, List, Modal, Space, Table, Tag} from 'antd';
import {DeleteFilled, EditFilled, EyeFilled} from "@ant-design/icons";
import RoomService from "@/pages/api/Room";
import {useState} from "react";
import RoomForm from "@/pages/rooms/form";

async function handleChange(value) {
    console.log(`selected ${value}`);
    await RoomService.delete(value);
}

const App = ({rooms, suites, teams, users}) => {

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

    return (
        <>
            <Divider orientation="left">Liste des Rooms</Divider>
            <Button type="primary" onClick={showModal}>Ajouter une Room</Button>
            <Table columns={columns} pagination={{ position: ['none', 'bottomCenter'] }} dataSource={rooms}/>
            <Modal title="Ajouter une Room" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                   footer={
                        [<Button form="room" type="primary" htmlType="submit" onClick={handleOk}>Submit</Button>]
                    }
            >
                <RoomForm suites={suites} teams={teams} users={users}/>
            </Modal>
        </>
    );
}

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
    const resSuites = await fetch(API_URL+'suites');
    const suites = await resSuites.json();
    const resTeams = await fetch(API_URL+'teams');
    const teams = await resTeams.json();
    const resUsers = await fetch(API_URL+'users');
    const users = await resUsers.json();

    return {
        props: {
            rooms,
            suites,
            teams,
            users,
        },
    }
}

export default App;