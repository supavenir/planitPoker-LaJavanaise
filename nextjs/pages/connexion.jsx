import { Button, Form, Input } from 'antd';
import React from 'react';
import connexionService from "@/services/connexionService";
import cookie from "js-cookie";
import {useRouter} from "next/router";

const App = () => {

    const router = useRouter();
    const onFinish = async (values) => {
        console.log('Success:', values);
        const username = ['username', values.username];
        const password = ['password', values.password];
        await connexionService.connexion(username, password).then(r => {
            cookie.set('token', r.access_token, { expires: 1/24 });
            cookie.set('id', r.user.id, { expires: 1/24 });
            cookie.set('username', r.user.username, { expires: 1/24 });
        });
        await router.push('/');
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Nom d'utilisateur"
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Entrez un nom d'utilisateur",
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Mot de passe"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Saisissez un mot de passe',
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Valider
                </Button>
            </Form.Item>
        </Form>
    );
};
export default App;