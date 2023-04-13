import {Button, Checkbox, Form, Input, Select} from 'antd';
const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const App = () => (
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
            <Select placeholder="Nom d'une suite." allowClear>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
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
            <Select placeholder="Nom d'une équipe." allowClear>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
            </Select>
        </Form.Item>

        <Form.Item label="Propriétaire" name="user"
                   rules={[
                       {
                           required: true,
                           message: 'Ajouter un propriétaire.',
                       },
                   ]}
        >
            <Select placeholder="Nom du propriétaire." allowClear>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
            </Select>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8, span: 16,}}>
            <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
    </Form>
);
export default App;