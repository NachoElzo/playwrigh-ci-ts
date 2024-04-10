import userResources from '../api-resources/users-resources'

async function createUser(userName: string, password: string) {
    const NewUser = userResources.userCreation(userName, password)
    return await NewUser
}

async function authorizeUser(userName: string, password: string) {
    const AuthorizedUser = userResources.userAuthorization(userName, password)
    return await AuthorizedUser
}

async function createToken(userName: string, password: string) {
    const token = userResources.tokenCreation(userName, password)
    return await token
}
async function deleteUser(userId: string, token: string) {
    const deleteUser = userResources.deletingUser(userId, token)
    return await deleteUser
}
export default { createUser, createToken, authorizeUser, deleteUser }