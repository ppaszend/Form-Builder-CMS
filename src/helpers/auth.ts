import loginUser from "@/requests/auth/loginUser";
import UserModel from "@/models/User.model";
import getUser from "@/requests/auth/getUser";


export const getToken = async (email: string, password: string): Promise<string | null> => {
    const response = await loginUser(email, password);
    if (!response.ok) {
        return null
    }
    return (await response.json()).access_token;
}

export const getUserData = async (token: string): Promise<UserModel | null> => {
    const response = await getUser(token);
    if (!response.ok) {
        return null;
    }
    return await response.json();
}