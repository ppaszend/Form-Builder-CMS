interface CreateUserData {

}

export default async function createUser(newUser: CreateUserData): Promise<Response> {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });
}