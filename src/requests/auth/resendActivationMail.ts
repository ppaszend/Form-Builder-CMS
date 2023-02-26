export default async function resendActivationMail(email: string, password: string): Promise<Response> {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/resend-confirmation-mail`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}