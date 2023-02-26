export default async function getUser(accessToken: string): Promise<Response> {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
}