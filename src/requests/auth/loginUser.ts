export default async function loginUser(email: string, password: string): Promise<Response> {
    return fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}