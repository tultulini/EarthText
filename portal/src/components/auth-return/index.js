import React, { useState } from 'react';
import { getQuerystringParam } from '../../utils/url';
import { SuccessfulLoginContainer, ErrorLoginContainer } from './css';
import { safeLength } from '../../utils/strings';
import { getTokenByCode } from '../../libs/auth';

const AuthenticationCallback = () => {
    const code = getQuerystringParam('code')

    const [isError, setIsError] = useState(false)

    if (safeLength(code) === 0) {
        console.log(`gonna move on`)
        window.location.href = `${window.location.origin}/login`
        return <div />
    }
    getTokenByCode(code).then(res => {
        window.location.href = `${window.location.origin}/`

    }
    ).catch(err => {
        console.error(`error occured: ${err}`);

    })
    return isError
        ?
        <ErrorLoginContainer>Something went wrong trying to obtain user detail</ErrorLoginContainer>
        :
        <SuccessfulLoginContainer>Fetching user details</SuccessfulLoginContainer>

}

export default AuthenticationCallback