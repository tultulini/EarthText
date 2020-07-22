import React from 'react';
import { TopBarContainer, UserProfileContainer } from './css';
import UserProfileBar from '../user-profile-bar';
import { NavLink } from '../common/css';
const TopBar = (props) => {

    return <TopBarContainer>
        <UserProfileContainer>
            <UserProfileBar />
        </UserProfileContainer>
    </TopBarContainer>
}

export default TopBar