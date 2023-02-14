import {Box, Button, Divider, Grid} from "@mui/material";
import UserCredentialsModel from "@/models/UserCredentials.model";
import React, {SetStateAction, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import Form from "@/components/FormBuilder/Form/Form";
import {selectUserState, setToken, setUser} from "@/stores/user";
import {getToken, getUserData} from "@/helpers/auth";
import {loginForm} from "@/helpers/formHelper";
import AlreadyLoggedInDialog from "@/components/FormBuilder/Dialogs/AlreadyLoggedInDialog/AlreadyLoggedInDialog";
import Link from "next/link";

const initialUserCredentialsState = {
    email: '',
    password: '',
}

export default function Login() {
    const router = useRouter();
    const user = useSelector(selectUserState);
    const dispatch = useDispatch();

    const [userCredentials, setUserCredentials] = useState<UserCredentialsModel>(initialUserCredentialsState);
    const [authorizationError, setAuthorizationError] = useState<string | null>(null);
    const [loggingInProgress, setLoggingInProgress] = useState<boolean>(false);

    const logout = () => {
        dispatch(setToken(null));
        dispatch(setUser(null));
    }

    if (user.data) {
        return <AlreadyLoggedInDialog
            email={user.data.email}
            onAbort={router.back}
            onLogout={logout}
        />
    }

    const handleSubmit = async () => {
        setLoggingInProgress(true);
        setAuthorizationError(null);

        const token = await getToken(userCredentials.email, userCredentials.password);
        if (!token) {
            setLoggingInProgress(false);
            setAuthorizationError('Credentials that you provided not match any user');
            return;
        }
        dispatch(setToken(token));

        const user = await getUserData(token);
        if (!user) {
            setLoggingInProgress(false);
            setAuthorizationError('There was an error, please try again');
            return;
        }
        dispatch(setUser(user));

        await router.push('/forms/1');
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Form
                onSubmit={handleSubmit}
                title="Login to CMS panel"
                fields={loginForm}
                data={userCredentials}
                onDataChange={(userData) => setUserCredentials(userData as SetStateAction<UserCredentialsModel>)}
                buttonLoading={loggingInProgress}
                buttonText="Login"
                error={authorizationError}
            >
                <Grid item xs={12}>
                    <Divider variant="fullWidth">or</Divider>
                </Grid>

                <Grid item xs={12}>
                    <Link href="/register">
                        <Button variant="outlined" size="large" fullWidth>
                            Create account
                        </Button>
                    </Link>
                </Grid>
            </Form>
        </Box>
    )
}