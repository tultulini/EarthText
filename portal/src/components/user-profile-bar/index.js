import React from 'react';
import { getLoggedInUser } from '../../libs/auth';
import { isNullOrUndefined } from '../../utils/object';
import { stringifyObject } from '../../libs/objects';
import { firstNonEmptyString } from '../../utils/strings';
import { NavButton } from '../common/css';

const UserProfileBar = (props) => {
    const loggedInUser = getLoggedInUser()
    console.log(`~~~~~loggedInUser: ${stringifyObject(loggedInUser)}, empty: ${isNullOrUndefined(loggedInUser)}`);

    return isNullOrUndefined(loggedInUser)
        ? renderNoUser()
        : renderLoggedIn(loggedInUser)
}

const renderNoUser = () => {
    const navigateToLogin = () => {
        window.location.href = "/login"
    }
    return <div>
        <NavButton onClick={navigateToLogin}>Login</NavButton>
    </div>
}

const renderLoggedIn = (loggedInUser) => {
    return <div>Hi {firstNonEmptyString(loggedInUser.nickname, loggedInUser.email)}</div>
}

export default UserProfileBar