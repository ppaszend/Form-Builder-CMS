export default async function resendActivationMail(email: string, password: string): Promise<Response> {
    return fetch('http://localhost:3000/users/resend-confirmation-mail', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}