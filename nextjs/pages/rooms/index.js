import {Button, Divider, Modal, Space, Table} from 'antd';
import {DeleteFilled, EditFilled, EyeFilled} from "@ant-design/icons";
import RoomService from "@/pages/api/Room";
import {useState} from "react";
import RoomForm from "@/pages/rooms/form";
import {useRouter} from "next/router";
import {API_URL} from "@/services/HttpService";

const App = ({rooms, suites, teams, user}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [objectDelete, setObjectDelete] = useState({});
    const router = useRouter();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showModalDelete = (id) => {
        setIsModalDelete(true);
        rooms.forEach((room) => {
            if (room.id === id) {
                setObjectDelete(room);
            }
        });
    };
    const handleOkDelete = async (value) => {
        setIsModalDelete(false);
        setObjectDelete({});
        await RoomService.delete(value);
        await router.push('/rooms');
    };
    const handleCancelDelete = () => {
        setIsModalDelete(false);
    };

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
                    <Button type="primary" shape="circle" icon={<DeleteFilled />} onClick={(e) => showModalDelete(id)} danger />
                </Space>
            ),
        },
    ];

    return (
        <>
            <Divider orientation="left">Liste de mes Rooms</Divider>
            <Button type="primary" onClick={showModal}>Ajouter une Room</Button>
            <Table columns={columns} pagination={{ position: ['none', 'bottomCenter'] }} dataSource={rooms}/>
            <Modal title="Ajouter une Room" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                   footer={
                        [<Button key="1" form="room" type="primary" htmlType="submit" onClick={handleOk}>Submit</Button>]
                    }
            >
                <RoomForm suites={suites} teams={teams} user={user}/>
            </Modal>
            <Modal title={"Supprimer une Room ?"} open={isModalDelete} onOk={handleOkDelete} onCancel={handleCancelDelete}
                   footer={
                       [
                           <Button key="1" type="primary" htmlType="submit" onClick={(e) => handleOkDelete(objectDelete.id)} danger>Supprimer</Button>,
                           <Button key="2" type="primary" htmlType="submit" onClick={handleCancelDelete}>Fermer</Button>
                       ]
                   }
            >
                <p>Êtes-vous sûr de vouloir supprimer la Room <b>{objectDelete.name}</b> ?</p>
            </Modal>
        </>
    );
}

export async function getServerSideProps({req, res}) {
    const resRooms = await fetch(API_URL+'room');
    const roomsAll = await resRooms.json();
    const roomsBase = await roomsAll.filter(room => room.user === parseInt(req.cookies.id));
    const rooms = await roomsBase.map(room => {
        return {
            key : room.id,
            id: room.id,
            name: room.name,
            description: room.description,
            points: room.points,
            uuid: room.uuid,
            connectedUsers: room.connectedUsers,
            suite: room.suite,
            team: room.team,
            user: room.user,
        }
    });
    const resSuites = await fetch(API_URL+'suites');
    const suitesBase = await resSuites.json();
    const suites = await suitesBase.map(suite => {
        return {
            key : suite.id,
            id: suite.id,
            name: suite.name,
            public: suite.public,
            suitevalues: suite.suitevalues,
        }
    });
    const resTeams = await fetch(API_URL+'teams');
    const teamsBase = await resTeams.json();
    const teams = await teamsBase.map(team => {
        return {
            key : team.id,
            id: team.id,
            name: team.name,
            user: team.user,
        }
    });
    const resUsers = await fetch(API_URL+'users');
    const usersBase = await resUsers.json();
    const userFilter = usersBase.filter(user => user.id === parseInt(req.cookies.id));
    const user = userFilter[0];

    return {
        props: {
            rooms,
            suites,
            teams,
            user,
        },
    }
}

export default App;