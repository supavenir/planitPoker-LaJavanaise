import {Button, Checkbox, Form, Input, Select} from 'antd';
const onFinish = async (values) => {
    const jsonConnect = JSON.stringify({username: 'qperrier', password: '0000'});

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonConnect,
    };
    const resUsers = await fetch('http://127.0.0.1:8090/api/connect', options);

    /*console.log('Success:', values);
    const jsonData = JSON.stringify(values);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData,
    };
    const resUsers = await fetch('http://127.0.0.1:8090/api/rooms', options);*/
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const App = ({suites, teams, users}) => (
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
            <Select placeholder="Nom d'une suite." onChange={handleChange}>
                {suites.map((suite) => (
                    <Select.Option value={suite.id}>{suite.name}</Select.Option>
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
                    <Select.Option value={team.id}>{team.name}</Select.Option>
                ))}
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
            <Select placeholder="Nom du propriétaire." onChange={handleChange}>
                {users.map((user) => (
                    <Select.Option value={user.id}>{user.username}</Select.Option>
                ))}
            </Select>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8, span: 16,}}>
            <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
    </Form>
);

export async function getStaticProps(context) {

    const API_URL = 'http://127.0.0.1:8090/api/';
    const resSuites = await fetch(API_URL+'suites');
    const suites = await resSuites.json();
    const resTeams = await fetch(API_URL+'teams');
    const teams = await resTeams.json();
    const resUsers = await fetch(API_URL+'users');
    const users = await resUsers.json();

    return {
        props: {
            suites,
            teams,
            users,
        },
    }
}

export default App;