export default async function getUser(accessToken: string): Promise<Response> {
    return fetch('http://localhost:3000/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
}