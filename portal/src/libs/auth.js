import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { stringify } from 'querystring'
import {
    CognitoUserPool,
    CognitoUserAttribute,
    AuthenticationDetails,
    CognitoUser
} from "amazon-cognito-identity-js";

import { jwtExpired, decodeJwt } from "./jwt";
import { stringifyObject } from "./objects";
import axios from 'axios'
import { proper } from 'propert'

import { safeLength } from "../utils/strings";

const ID_TOKEN_KEY = "SDH_ID"
const EXPIRATION_DELTA_SECONDS = 60 * 5

const config = {
    region: 'us-east-1',
    UserPoolId: 'us-east-1_TGu7D63Dx',
    IdentityPoolId: "us-east-1:383c1df1-3c74-40ed-b8a1-2b69b0487afa",
    ClientId: '1olsthqmccj9h35loepvhgmisn',

}

const getRedirectUri = () => {
    console.log(`window.location: ${JSON.stringify(window.location, null, '\t')}`);

    const url = `${window.location.protocol}//${window.location.host}/auth-return`
    return url
}

Config.region = config.region
Config.credentials = new CognitoIdentityCredentials({
    IdentityPoolId: config.IdentityPoolId
})
const userPool = new CognitoUserPool({
    UserPoolId: config.UserPoolId,
    ClientId: config.ClientId
})

/**
 *
 * @param {Object} details
 * @param {string} details.email
 * @param {string} details.password
 * @param {string} details.nickname
 * @param {string} details.phoneNumber
 */
export function registerNewUser({ email, password, nickname, phoneNumber }) {
    console.log(`registerNewUser: ${{ email, password, nickname, phoneNumber }}`)
    if (!email) {
        throw new Error("Need email")
    }
    if (!password) {
        throw new Error("Missing password")
    }
    if (!nickname) {
        throw new Error("Missing nickname")
    }

    const attributeList = [
        new CognitoUserAttribute({
            Name: 'email',
            Value: email,
        })

    ];
    if (phoneNumber) {
        attributeList.push(new CognitoUserAttribute({
            Name: 'phone_number',
            Value: phoneNumber
        }))
    }

    if (nickname) {
        attributeList.push(new CognitoUserAttribute({
            Name: 'nickname',
            Value: nickname,
        })
        )
    }

    return new Promise((resolve, reject) => {
        console.log(`gonna sign up`)
        userPool.signUp(email, password, attributeList, null, (err, result) => {
            if (err) {
                console.log(err);
                reject(err)
                return;
            }
            console.log('user name is ' + result.user.getUsername());
            console.log('call result: ' + result);

            resolve('success')
        });
    })

}

export const jwtExists = () => {
    const token = getToken()

    if (safeLength(token) === 0) {
        return false
    }

    if (jwtExpired({ jwt: token, expirationDelta: EXPIRATION_DELTA_SECONDS })) {
        return false
    }

    return true
}


export const checkLoggedIn = () => {
    if (jwtExists()) {
        console.log(`jwt exists`);

        return true
    }
    console.log(`jwt doesn't exist`);

    return false
    //clear storage
    // clearTokenFromStorage()

}

const clearTokenFromStorage = () => localStorage.setItem(ID_TOKEN_KEY, null)

export const checkLoggedIn_ = () => {
    console.log(`checkLoggedIn - start`);

    const idToken = getToken()
    Config.region = config.region
    let logins = {}
    logins[`cognito-idp.${config.region}.amazonaws.com/${config.UserPoolId}`] = idToken

    Config.credentials = new CognitoIdentityCredentials({
        IdentityPoolId: config.IdentityPoolId,
        Logins: logins
    }, { region: config.region })

    return new Promise((resolve, reject) => {
        if (Config.credentials.needsRefresh()) {
            Config.credentials.refresh((error) => {
                if (error) {
                    console.error(error);
                    reject(`refresh cradentials failed: ${error}`)
                } else {
                    // Instantiate aws sdk service objects now that the credentials have been updated.
                    // example: var s3 = new AWS.S3();
                    console.log('Successfully logged!~~!');
                    console.log(`Config.credentials: ${stringifyObject(Config.credentials)}`);

                    resolve(true)

                }
            });
        }
        else {
            resolve(true)
        }
    })
}

export function login(email, password) {
    const authenticationData = {
        Username: email,
        Password: password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = getCognitoUser(email)

    return new Promise((resolve, reject) => {

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                var accessToken = result.getAccessToken().getJwtToken();
                console.log(`accessToken: ${accessToken}`)

                var idToken = result.getIdToken().getJwtToken();
                localStorage.setItem(ID_TOKEN_KEY, idToken)
                //  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
                console.log(`idToken: ${idToken}`)
                resolve(true)

            },

            onFailure: function (err) {
                console.error(err.message || JSON.stringify(err));
                reject(`authenticateUser failed: ${err}`)

            },

        });
    })
}

function getCognitoUser(email) {
    var poolData = {
        UserPoolId: config.UserPoolId,
        ClientId: config.ClientId // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);
    var userData = {
        Username: email,
        Pool: userPool
    };
    var cognitoUser = new CognitoUser(userData);
    return cognitoUser;
}

export function forgotPassword(email) {
    const cognitoUser = getCognitoUser(email);
    return new Promise((resolve, reject) => {
        cognitoUser.forgotPassword({
            onSuccess: (data) => {
                console.log('CodeDeliveryData from forgotPassword:', JSON.stringify(data));
                resolve(data)
            },
            onFailure: (err) => {
                console.log(`forgotPassword failed: ${err}`)
                reject(err)
            }
        })
    })
}

export function confirmNewPassword(email, verificationCode, newPassword) {
    const cognitoUser = getCognitoUser(email)
    return new Promise((resolve, reject) => {
        cognitoUser.confirmPassword(verificationCode, newPassword, {
            onSuccess() {
                console.log('Password confirmed!');
                resolve()
            },
            onFailure(err) {
                console.log(`Password not confirmed! Error:${err}`);
                reject(err)
            }
        });
    })
}
export const PasswordStrength = { Low: 0, Medium: 1, High: 2 }
export function getPasswordStrength(password) {
    /*

    ^	                The password string will start this way
    (?=.*[a-z])	        The string must contain at least 1 lowercase alphabetical character
    (?=.*[A-Z])	        The string must contain at least 1 uppercase alphabetical character
    (?=.*[0-9])	        The string must contain at least 1 numeric character
    (?=.[!@#\$%\^&])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
    (?=.{8,})	        The string must be eight characters or longer

    */
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    return strongRegex.test(password)
        ? PasswordStrength.High
        : mediumRegex.test(password)
            ? PasswordStrength.Medium
            : PasswordStrength.Low
}

export const GetExternalLoginUrl = () => {
    const options = {
        "client_id": config.ClientId,
        "response_type": "code",
        "scope": "aws.cognito.signin.user.admin email openid profile",
        "redirect_uri": getRedirectUri()
    }

    const url = `${process.env.REACT_APP_AUTH_LOGIN_URL}?${stringify(options)}`
    return url
}

export const getTokenByCode = async (code) => {
    const data = {
        grant_type: 'authorization_code',
        code,
        client_id: config.ClientId,
        redirect_uri: getRedirectUri()
    }

    const options = {
        method: 'POST',
        url: process.env.REACT_APP_AUTH_TOKEN_URL,
        data: stringify(data),
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }
    console.log(`gonna get token by code. data:${JSON.stringify(data, null, '\t')}\r\noptions:${JSON.stringify(options, null, '\t')} `)
    const res = (await axios(options))
    console.log(`get res: ${JSON.stringify(res, null, '\t')}`);

    let succes = false
    console.log(`res, ( data, id_token): ${JSON.stringify(res.data.id_token, null, '\t')}`);

    proper(res, (data, id_token) => {
        console.log('success');

        succes = true
        localStorage.setItem(ID_TOKEN_KEY, id_token)
    }).else(() => {
        console.log('else');
        localStorage.setItem(ID_TOKEN_KEY, '')
    }).catch((prop, step) => {
        console.log(`catch - error: prop: ${prop}, step: ${step}!!!`);
        localStorage.setItem(ID_TOKEN_KEY, '')
    })
    return succes
}

export const getToken = () => localStorage.getItem(ID_TOKEN_KEY)

export const getLoggedInUser = () => {
    if (!jwtExists()) {
        return null
    }
    const token = getToken()
    const tokenObject = decodeJwt(token)
    // console.log(`*********** tokenObject: ${stringifyObject(tokenObject)}`);
    

    return { email: tokenObject.email, nickname: tokenObject.nickname }

}