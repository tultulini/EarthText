import React from 'react';
import { Form, Input, Button } from 'antd';

import 'antd/lib/form/style/css'
import 'antd/lib/button/style/css'
import 'antd/lib/input/style/css'

const RenderPlanForm = () => {
    const formLayout = "horizontal"
    const layout = formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        }
        : null

    const tailLayout = formLayout === "horizontal"
        ? {
            wrapperCol: { offset: 14, span: 4 },
        }
        : null

    const onFinish = values => {
        console.log('Success:', values);
    };

    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const [form] = Form.useForm();
    return (
        <Form
            {...layout}
            layout={formLayout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
            onFinishFailed={onFinishFailed}
            
        >
            <Form.Item
                label="Text"
                name="text"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Lat"
                name="lat"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Lon"
                name="lon"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Scale Factor"
                name="scaleFactor"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Rotate"
                name="rotate"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Color"
                name="color"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>


            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
            </Button>
            </Form.Item>
        </Form>
    );
}

export default RenderPlanForm