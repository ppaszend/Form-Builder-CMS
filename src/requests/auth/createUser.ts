interface CreateUserData {

}

export default async function createUser(newUser: CreateUserData): Promise<Response> {
    return fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });
}