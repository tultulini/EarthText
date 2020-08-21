import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Select, Row, Col, Space } from 'antd';

import 'antd/lib/form/style/css'
import 'antd/lib/row/style/css'
import 'antd/lib/col/style/css'
import 'antd/lib/select/style/css'
import 'antd/lib/button/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/input-number/style/css'

import { FormContainer, FormTitle, ColorBox, ActionGroupBox, ActionContainer } from './css';
import { getKml } from '../../services/earth-text-services';
const Option = Select.Option
const TextArea = Input.TextArea
const RenderPlanForm = () => {
    const formLayout = "vertical"
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
    const onFinish = async (fields) => {
        const { planName, font, actions } = fields
        const allActions = actions.map(action => {
            const { text, lat, lon, scaleFactor, rotate, color } = action
            return { text, lat, lon, scaleFactor, rotate, color }
        })
        console.log('Gonna send request for :', JSON.stringify(allActions, null, '\t'));
        const request = {
            planName, font,
            actions: allActions

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
        actions: [{
            text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lat: "49.95",
            lon: "-100",
            scaleFactor: 0,
            rotate: 0,
            color: 'Black'
        }]
    }

    const renderActionRow = (field, remove) => {
        return <ActionContainer>
            <Row gutter={12}>
                <Col xl={{ span: 6 }} xs={{ span: 8 }} >
                    <Form.Item
                        {...field}
                        label="Text"
                        name={[field.name, "text"]}
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Col>
                <Col xl={{ span: 2 }} xs={{ span: 8 }} >
                    <Form.Item
                        {...field}
                        label="Lat"

                        name={[field.name, "lat"]}
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col xl={{ span: 2 }} xs={{ span: 8 }} >
                    <Form.Item
                        {...field}
                        label="Lon"
                        name={[field.name, "lon"]}
                        rules={[{ required: true }]}
                    >
                        <Input />

                    </Form.Item>
                </Col>
                <Col xl={{ span: 3 }} xs={{ span: 8 }} >
                    <Form.Item
                        {...field}
                        label="Scale Factor"
                        name={[field.name, "scaleFactor"]}
                        style={{ textAlign: 'left' }}
                        rules={[({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (value >= 0) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('scale factor needs to be at least 0');
                            },
                        })]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>
                </Col>

                <Col xl={{ span: 3 }} xs={{ span: 8 }} >
                    <Form.Item
                        {...field}
                        label="Rotate"
                        name={[field.name, "rotate"]}
                        style={{ textAlign: 'left' }}
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={-359} max={359} />
                    </Form.Item>
                </Col>
                <Col xl={{ span: 3 }} xs={{ span: 8 }} >
                    <Form.Item
                        {...field}
                        label="Color"
                        name={[field.name, "color"]}
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder="Select a color"
                            allowClear
                        >
                            {renderColorOptions()}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </ActionContainer>
    }
    return (
        <FormContainer>
            <FormTitle>RENDER PLAN</FormTitle>

            <Form
                {...layout}
                layout={formLayout}
                name="basic"
                initialValues={debugValues}
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
                <Form.List name="actions">
                    {(fields, { add, remove }) => {
                        return <ActionGroupBox>{fields.map(field => renderActionRow(field, remove))}<Button onClick={add}>Add Action</Button></ActionGroupBox>
                    }}
                </Form.List>


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