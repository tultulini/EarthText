import isemail from 'isemail'
import phone from 'phone'
export function validateEmail(email) {
    return email && isemail.validate(email)

}

export function validatePhone(phoneNumber) {
    const result = phone(phoneNumber)
    console.log(`phoneNumber res:${result}`)
    return result && result.length > 0
}
export function simplifyPhoneNumber(phoneNumber) {
    if (!phoneNumber)
        return null
    const result = phone(phoneNumber)

    return result && result.length > 0 ? result[0] : null

}