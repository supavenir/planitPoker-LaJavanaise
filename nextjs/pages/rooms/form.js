import {Button, Form, Input, Select} from 'antd';
import RoomService from "@/pages/api/Room";
import {useRouter} from "next/router";
import {API_URL} from "@/services/HttpService";
import React from 'react';

const onFinish = async (values) => {
    await RoomService.add(values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const handleChange = (value) => {
    console.log(`selected ${value}`);
};

const RoomForm = ({suites, teams, user}) => {
    const router = useRouter();
    const formRef = React.useRef(null);

    formRef.current?.setFieldsValue({
        name: "",
        description: "",
        points: "",
        suite: "",
        team: "",
        user: user.id,
    });
    const onFinish = async (values) => {
        await RoomService.add(values);
        await router.push('/rooms');
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <Form
            ref={formRef}
            name="room"
            labelCol={{span: 8,}}
            wrapperCol={{span: 16,}}
            style={{maxWidth: 600,}}
            initialValues={{remember: true,}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"

        >

            <Form.Item label="Nom de la Salle" name="name"
                       rules={[
                           {
                               required: true,
                               message: 'Ajouter un nom de salle.',
                           },
                       ]}
            >
                <Input placeholder="Nom de la Salle"/>
            </Form.Item>

            <Form.Item label="Description" name="description">
                <Input.TextArea placeholder="Description"/>
            </Form.Item>

            <Form.Item label="Points" name="points">
                <Input placeholder="Points"/>
            </Form.Item>

            <Form.Item label="Suite" name="suite"
                       rules={[
                           {
                               required: true,
                               message: 'Ajouter une suite.',
                           },
                       ]}
            >
                <Select placeholder="Nom d'une suite." onChange={handleChange}>
                    {suites.map((suite) => (
                        <Select.Option key={suite.key} value={suite.id}>{suite.name}</Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="Équipe" name="team"
                       rules={[
                           {
                               required: true,
                               message: 'Ajouter un équipe.',
                           },
                       ]}
            >
                <Select placeholder="Nom d'une équipe." onChange={handleChange}>
                    {teams.map((team) => (
                        <Select.Option key={team.key} value={team.id}>{team.name}</Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name='user'
                initialValue={user.id} hidden
            >
                <Input/>
            </Form.Item>
        </Form>
    );
}

export async function getStaticProps(context) {

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
    const user = {
        id: "",
        username: "",
        email: "",
        password: "",
        completeName: "",
    }

    return {
        props: {
            suites,
            teams,
            user,
        },
    }
}

export default RoomForm;