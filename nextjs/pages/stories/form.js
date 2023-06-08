import {Button, Form, Input, Select, Space} from 'antd';
import {API_URL} from "@/services/HttpService";
import StoryService from "@/pages/api/Story";
import {useRouter} from "next/router";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import React from 'react';

const StoryForm = ({room, story}) => {
    const router = useRouter();
    const formRef = React.useRef(null);

    formRef.current?.setFieldsValue({
        name: story.name,
        description: story.description,
        room: room.id,
        id: story.id,
    });
    const onFinish = async (values) => {
        if (values.stories !== undefined) {
            const firstStory = {name:values.name, description:values.description, room:values.room, id:values.id};
            values.stories.splice(0, 0, firstStory);
        } else {
            values.stories = [{name:values.name, description:values.description, room:values.room, id:values.id}];
        }
        for (const story1 of values.stories) {
            if(story1.id !== undefined) {
                await StoryService.update(story1);
            } else {
                await StoryService.add(story1);
            }
        }
        await router.push('/rooms/'+room.id);
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
            name="story"
            labelCol={{span: 8,}}
            wrapperCol={{span: 16,}}
            style={{maxWidth: 600,}}
            initialValues={{remember: true,}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Space
                align="baseline"
            >
                <Space.Compact direction="vertical">
                    <Form.Item label="Nom de l'US"
                               name='name'
                               rules={[
                                   {
                                       required: true,
                                       message: "Ajouter un nom à l'US.",
                                   },
                               ]}
                               initialValue={story.name}
                    >
                        <Input placeholder="Nom de l'US"/>
                    </Form.Item>

                    <Form.Item label="Description"
                               name='description'
                               initialValue={story.description}
                    >
                        <Input.TextArea placeholder="Description"/>
                    </Form.Item>
                    <Form.Item
                        name='room'
                        initialValue={room.id} hidden
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name='id'
                        initialValue={story.id} hidden
                    >
                        <Input/>
                    </Form.Item>
                </Space.Compact>
            </Space>
            {story.id === undefined ? (
            <Form.List name="stories">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space
                                key={key}
                                align="baseline"
                            >
                                <Space.Compact direction="vertical">
                                    <Form.Item label="Nom de l'US"
                                               {...restField}
                                               name={[name, 'name']}
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: "Ajouter un nom à l'US.",
                                                   },
                                               ]}
                                               initialValue=""
                                    >
                                        <Input placeholder="Nom de l'US"/>
                                    </Form.Item>

                                    <Form.Item label="Description"
                                               {...restField}
                                               name={[name, 'description']}
                                    >
                                        <Input.TextArea placeholder="Description"/>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'room']}
                                        initialValue={room.id} hidden
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'id']} hidden
                                    >
                                        <Input/>
                                    </Form.Item>
                                </Space.Compact>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        {story.id === undefined ? (
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}></Button>
                            </Form.Item>
                        ) : null}
                    </>
                )}
            </Form.List>
            ) : null}
        </Form>
    );
}

export async function getStaticProps(context) {

    const room = {
        id: "",
        name: "",
        description: "",
        points: "",
        uuid: "",
        connectedUsers: "[]",
        suite: "",
        team: "",
        user: "",
    };
    const story = {
        name: "",
        description: "",
        room: "",
        id: "",
    };

    return {
        props: {
            room,
            story,
        },
    }
}

export default StoryForm;