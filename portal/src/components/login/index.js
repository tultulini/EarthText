import React from 'react'
// import {
//     Form,
//     Input,
//     Tooltip,
//     Icon,
//     Select,
//     Button
// } from 'antd';
import 'antd/lib/form/style/css'
import 'antd/lib/input/style/css'

import { login, GetExternalLoginUrl } from '../../libs/auth';
import { FieldLable } from './css';
const Login = (props) => {

    window.location.href = GetExternalLoginUrl()
}

export default Login