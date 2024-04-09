import userResources from '../api-resources/users-resources'

async function createUser(userName, password) {
    const user = userResources.userCreation(userName, password)
    return await user
}

async function authorizeUser(userName, password) {
    const user = userResources.userAuthorization(userName, password)
    return await user
}

async function createToken(userName, password) {
    const token = userResources.tokenCreation(userName, password)
    return await token
}

export default { createUser, createToken, authorizeUser }