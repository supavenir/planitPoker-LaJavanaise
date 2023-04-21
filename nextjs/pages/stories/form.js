import {Button, Form, Input, Select} from 'antd';
import {API_URL} from "@/services/HttpService";
import StoryService from "@/pages/api/Story";
const onFinish = async (values) => {
    await StoryService.add(values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const App = ({rooms}) => (
    <Form
        name="basic"
        labelCol={{span: 8,}}
        wrapperCol={{span: 16,}}
        style={{maxWidth: 600,}}
        initialValues={{remember: true,}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >

        <Form.Item label="Nom de la Story" name="name"
                   rules={[
                       {
                           required: true,
                           message: 'Ajouter un nom à la Story.',
                       },
                   ]}
        >
            <Input placeholder="Nom de la Story"/>
        </Form.Item>

        <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Description"/>
        </Form.Item>

        <Form.Item label="Room" name="room"
                   rules={[
                       {
                           required: true,
                           message: 'Ajouter une suite.',
                       },
                   ]}
        >
            <Select placeholder="Nom d'une room." onChange={handleChange}>
                {rooms.map((room) => (
                    <Select.Option value={room.id}>{room.name}</Select.Option>
                ))}
            </Select>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8, span: 16,}}>
            <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
    </Form>
);

export async function getStaticProps(context) {

    const resRooms = await fetch(API_URL+'rooms');
    const rooms = await resRooms.json();

    return {
        props: {
            rooms,
        },
    }
}

export default App;