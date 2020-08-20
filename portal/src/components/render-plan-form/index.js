import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Select } from 'antd';

import 'antd/lib/form/style/css'
import 'antd/lib/select/style/css'
import 'antd/lib/button/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/input-number/style/css'

import { FormContainer, FormTitle, ColorBox } from './css';
import { getKml } from '../../services/earth-text-services';
const Option = Select.Option
const TextArea = Input.TextArea
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
    const [kml, setKml] = useState('');
    const onFinish = async ({ planName, font, text, lat, lon, scaleFactor, rotate, color }) => {
        const request = {
            planName, font,
            actions: [{
                text, lat, lon, scaleFactor, rotate, color
            }]

        }
        console.log('Gonna send request for :', JSON.stringify(request, null, '\t'));
        const res = await getKml(request)
        setKml(res)
    };

    const renderColorOptions = () => {
        const colors = ["red", "black", "white", "magenta", "yellow", "orange", "cyan"]
        return colors.map(color => <Option value={color}><ColorBox background={color} />{color}</Option>)
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const [form] = Form.useForm();
    const debugValues = {
        planName: "The Plan",
        font: "athabasca bold",
        text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lat: "49.95",
        lon: "-100",
        scaleFactor: 0,
        rotate: 0,
        color: 'Black'
    }
    return (
        <FormContainer>
            <FormTitle>RENDER PLAN</FormTitle>

            <Form
                {...layout}
                layout={formLayout}
                name="basic"
                initialValues={{
                    scaleFactor: 0,
                    rotate: 0,
                    ...debugValues
                }}
                onFinish={onFinish}
                form={form}
                onFinishFailed={onFinishFailed}

            >
                <Form.Item
                    label="Plan Name"
                    name="planName"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Font"
                    name="font"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>


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
                    style={{ textAlign: 'left' }}
                    rules={[({ getFieldValue }) => ({
                        validator(rule, value) {
                            console.log(`***** value: ${getFieldValue('scaleFactor')}`)
                            if (value >= 0) {
                                return Promise.resolve();
                            }
                            return Promise.reject('scale factor needs to be at least 0');
                        },
                    })]}
                >
                    <InputNumber min={0} />
                </Form.Item>

                <Form.Item
                    label="Rotate [deg]"
                    name="rotate"
                    style={{ textAlign: 'left' }}
                    rules={[{ required: true }]}
                >
                    <InputNumber min={-359} max={359} />
                </Form.Item>
                <Form.Item
                    label="Color"
                    name="color"
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Select a color"
                        allowClear
                    >
                        {renderColorOptions()}
                    </Select>
                </Form.Item>


                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
            </Button>
                </Form.Item>
            </Form>
            <TextArea rows={10} value={kml} />
        </FormContainer>
    );
}

export default RenderPlanForm