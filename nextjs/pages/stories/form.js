import {Button, Form, Input, Select} from 'antd';
import {API_URL} from "@/services/HttpService";
import StoryService from "@/pages/api/Story";
import {useRouter} from "next/router";

const StoryForm = ({room}) => {
    const router = useRouter();
    const onFinish = async (values) => {
        await StoryService.add(values);
        await router.push('/rooms'+room.id); // à modifier
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <Form
            name="story"
            labelCol={{span: 8,}}
            wrapperCol={{span: 16,}}
            style={{maxWidth: 600,}}
            initialValues={{remember: true,}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >

            <Form.Item label="Nom de l'US" name="name"
                       rules={[
                           {
                               required: true,
                               message: "Ajouter un nom à l'US.",
                           },
                       ]}
            >
                <Input placeholder="Nom de l'US"/>
            </Form.Item>

            <Form.Item label="Description" name="description">
                <Input.TextArea placeholder="Description"/>
            </Form.Item>
            <Form.Item name="room" initialValue={room.id} hidden>
                <Input/>
            </Form.Item>
        </Form>
    );
}

export async function getStaticProps(context) {

    const resRooms = await fetch(API_URL+'rooms');
    const rooms = await resRooms.json();
    const room = rooms[0];

    return {
        props: {
            room,
        },
    }
}

export default StoryForm;