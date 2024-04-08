import requestTokenUser from '../api-resources/user-login'

async function token() {
    const token = requestTokenUser.requestToken()
    return await token
}

export default { token }