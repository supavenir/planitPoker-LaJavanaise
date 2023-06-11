import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import UserService from "@/pages/api/User";
import {useRouter} from "next/router";

const App = () => {

    const router = useRouter();
    const onFinish = async (values) => {
        await UserService.add(values);
        await router.push('/connexion');
    };
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
                label="Nom complet"
                name="completName"
                rules={[
                    {
                        required: true,
                        message: 'Entrez votre nom complet',
                    },
                ]}
            >
                <Input />
            </Form.Item>

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
                <Input />
            </Form.Item>

            <Form.Item
                label="Adresse courriel"
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Entrez une adresse courriel valide",
                    },
                ]}
            >
                <Input />
            </Form.Item>


            <Form.Item
                label="Mot de passe"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Saisissez un mot de passe, fort de preference.',
                    },
                ]}
            >
                <Input.Password />
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
}
export default App;