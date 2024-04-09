import userResources from '../api-resources/users-resources'

async function createUser(userName, password) {
    const NewUser = userResources.userCreation(userName, password)
    return await NewUser
}

async function authorizeUser(userName, password) {
    const AuthorizedUser = userResources.userAuthorization(userName, password)
    return await AuthorizedUser
}

async function createToken(userName, password) {
    const token = userResources.tokenCreation(userName, password)
    return await token
}
async function deleteUser(userId, token) {
    const deleteUser = userResources.deletingUser(userId, token)
    return await deleteUser
}
export default { createUser, createToken, authorizeUser, deleteUser }