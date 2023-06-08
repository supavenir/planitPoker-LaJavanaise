import {Button, Divider, Form, List, Modal, Space, Table} from "antd";
import {API_URL} from "@/services/HttpService";
import {DeleteFilled, EditFilled, EyeFilled} from "@ant-design/icons";
import {useState} from "react";
import {useRouter} from "next/router";
import StoryService from "@/pages/api/Story";
import RoomForm from "@/pages/rooms/form";
import StoryForm from "@/pages/stories/form";

const App = ({room, stories, votes}) => {

    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalCreateTitle, setIsModalCreateTitle] = useState('Ajouter une US');
    const [objectModify, setObjectModify] = useState({});
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [objectDelete, setObjectDelete] = useState({});
    const [objectStory, setObjectStory] = useState("");
    const router = useRouter();

    const showModalCreate = (id) => {
        setIsModalCreate(true);
        if(id !== {}) {
            stories.forEach((story) => {
                if (story.id === id) {
                    setIsModalCreateTitle('Modifier une US');
                    setObjectModify(story);
                }
            });
        } else {
            setIsModalCreateTitle('Ajouter une US');
            setObjectModify({});
        }
    };
    const handleOkCreate = () => {
        setIsModalCreate(false);
        setObjectModify({});
    };
    const handleCancelCreate = () => {
        setIsModalCreate(false);
        setObjectModify({});
    };

    const showModalDelete = (id) => {
        setIsModalDelete(true);
        stories.forEach((story) => {
            if (story.id === id) {
                setObjectDelete(story);
            }
        });
    };
    const handleOkDelete = async (value) => {
        setIsModalDelete(false);
        setObjectDelete({});
        await StoryService.delete(value);
        await router.push('/rooms/'+room.id);
    };
    const handleCancelDelete = () => {
        setIsModalDelete(false);
        setObjectDelete({});
    };

    const activeVote = (value) => {
        console.log(value[0]);
        setObjectStory(value[0].name);
    }

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
                    <Button type="primary" shape="circle" icon={<EditFilled />} onClick={(e) => showModalCreate(id)} />
                    <Button type="primary" shape="circle" icon={<EyeFilled />} style={{background: "#73d13d"}} />
                    <Button type="primary" shape="circle" icon={<DeleteFilled />} onClick={(e) => showModalDelete(id)} danger />
                </Space>
            ),
        },
    ];

    return (
        <>
            <Divider orientation="center">{room.name}</Divider>
            <Button type="primary" onClick={(e) => activeVote(stories)}>Lancer les votes</Button>
            <h1>{objectStory}</h1>
            <Button type="primary" onClick={(e) => showModalCreate({})}>Ajouter une US</Button>
            <Table columns={columns} pagination={{ position: ['none', 'bottomCenter'] }} dataSource={stories}/>
            <Modal title={isModalCreateTitle} open={isModalCreate} onOk={handleOkCreate} onCancel={handleCancelCreate}
                   footer={
                       [<Button key="1" form="story" type="primary" htmlType="submit" onClick={handleOkCreate}>Submit</Button>]
                   }
            >
                <StoryForm room={room} story={objectModify}/>
            </Modal>
            <Modal title={"Supprimer un US ?"} open={isModalDelete} onOk={handleOkDelete} onCancel={handleCancelDelete}
                   footer={
                       [
                           <Button key="1" type="primary" htmlType="submit" onClick={(e) => handleOkDelete(objectDelete.id)} danger>Supprimer</Button>,
                           <Button key="2" type="primary" htmlType="submit" onClick={handleCancelDelete}>Fermer</Button>
                       ]
                   }
            >
                <p>Êtes-vous sûr de vouloir supprimer le US <b>{objectDelete.name}</b> ?</p>
            </Modal>
        </>
    );
}

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
    const storiesAll = await resStories.json();
    const storiesBase = storiesAll.filter(story => story.room === room.id);
    const stories = storiesBase.map(story => {
        return {
            key: story.id,
            id: story.id,
            name: story.name,
            description: story.description,
            points: story.points,
            completed: story.completed,
            room: story.room,
        }
    });
    const resVotes = await fetch(API_URL+'voter');
    const votesAll = await resVotes.json();
    const votesBase = votesAll.filter(vote => stories.map(story => story.id).includes(vote.story));
    const votes = votesBase.map(vote => {
        return {
            key: vote.user,
            user: vote.user,
            story: vote.story,
            points: vote.points,
        }
    });

    return {
        props: {
            room,
            stories,
            votes,
        },
    }

}

export default App;