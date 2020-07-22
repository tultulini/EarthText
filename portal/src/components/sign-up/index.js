import {
    Form,
    Input,
    Tooltip,
    Icon,
    Select,
    Button
} from 'antd';

import React, { useState } from 'react';
import 'antd/lib/button/style/css'
import 'antd/lib/select/style/css'
import 'antd/lib/form/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/icon/style/css'
import 'antd/lib/tooltip/style/css'

// import { setupCognito, registerUser } from 'react-cognito'
import { validatePhone, simplifyPhoneNumber } from '../../libs/ValidationUstils';
import { getCountryPhonePrefixes } from '../../libs/resources';
import { registerNewUser, getPasswordStrength, PasswordStrength } from '../../libs/auth';
import { stringifyObject } from '../../libs/objects';

const { Option } = Select;


const Signup = (props) => {
    const [state, setState] = useState({
        validationError: null, confirmDirty: false,
        autoCompleteResult: [],
    })
    const setDiffState = (diffState) => setState({ ...state, ...diffState })

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form - : ', values);
                const phoneNumber = values.phone
                    ? simplifyPhoneNumber(`${values.prefix}${values.phone}`)
                    : null

                const { email, password, nickname } = values

                registerNewUser({ email, password, nickname, phoneNumber })
                    .then(res => {
                        console.log(`successfully registered user. Result:${res}`)
                        window.location.href = "/auth/login"
                    })
                    .catch(err => console.error(`failed to register user: ${stringifyObject(err)}`))
                // // setupCognito(config).then(resolve=>{

                // //     registerUser()
                // })
            }
            else {

            }

        });
    };


    const handleConfirmBlur = e => {
        const { value } = e.target;
        setDiffState({ confirmDirty: state.confirmDirty || !!value });
    };

    const compareToFirstPassword = (rule, value, callback) => {
        const { form } = props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Passwords don\'t match');
        } else {
            callback();
        }
    };

    const validateToNextPassword = (rule, value, callback) => {
        const { form } = props;
        if (value) {
            if (getPasswordStrength(value) != PasswordStrength.High) {
                callback("Password too weak")
            }
            else if (state.confirmDirty) {
                form.validateFields(['confirm'], { force: true });
            }
        }
        callback();
    };

    const validatePhoneNumber = (rule, value, callback) => {
        const { form } = props;

        const prefix = form.getFieldValue('prefix')
        if (!value || validatePhone(`${prefix}${value}`)) {
            callback()
        }
        else {
            callback("Phone not valid")
        }

    }
    const render = () => {
        const { getFieldDecorator } = props.form;
        const { autoCompleteResult } = state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '+1',
        })(
            <Select showSearch style={{ width: 100 }}>
                {getCountryPhonePrefixes().sort((p1, p2) => p1.n > p2.n ? 1 : -1).map(prefix => {
                    return <Option key={prefix.n} value={prefix.n}>{prefix.n}</Option>
                })}

            </Select>,
        );
        return (<div className="signup-container">
            <div className="signup-form">
                <div className="signup-title">Join Contracto</div>
                <div className="signup-login">Already have an account? <a href="/auth/login">Log In</a></div>

                <Form {...formItemLayout} onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                            initialValue: 'fisher.tal@gmail.com'
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label={
                        <span>
                            Password&nbsp;
                    <Tooltip title={
                                <div><b>Password must</b>:
                                    <li>- be 8 characters or longer</li>
                                    <li>- contain at least 1 lowercase character</li>
                                    <li>- contain at least 1 uppercase character</li>
                                    <li>- contain at least 1 numeric character</li>
                                </div>
                            }>
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    } hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    validator: validateToNextPassword,
                                },
                            ],
                            initialValue: 'nHab5vhn!'

                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: compareToFirstPassword,
                                },
                            ],
                            initialValue: 'nHab5vhn!'

                        })(<Input.Password onBlur={handleConfirmBlur} />)}
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                Nickname&nbsp;
                    <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                    >
                        {getFieldDecorator('nickname', {
                            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                            initialValue: 'tultulini'

                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Phone Number">
                        {getFieldDecorator('phone', {
                            rules: [{ validator: validatePhoneNumber }],
                        })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                    </Form.Item>
                    {/* <Form.Item {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>
                                I have read the <a href="">agreement</a>
                            </Checkbox>,
                        )}
                    </Form.Item> */}
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
        );



    }

    return render()


}


const RegistrationForm = Form.create({ name: 'register' })(Signup)

export default RegistrationForm