import {Box, Button, Divider, Grid} from '@mui/material';
import React, {FormEvent, SetStateAction, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUserState, setToken, setUser} from "@/stores/user";
import createUser from "@/requests/auth/createUser";
import ConfirmMailDialog from "@/components/FormBuilder/Dialogs/ConfirmMailDialog/ConfirmMailDialog";
import UserModel from "@/models/User.model";
import Form from "../../components/FormBuilder/Form/Form";
import {RegisterForm as RegisterFormModel} from "@/models/RegisterForm.model";
import {registerForm} from "@/helpers/formHelper";
import {useRouter} from "next/router";
import AlreadyLoggedInDialog from "@/components/FormBuilder/Dialogs/AlreadyLoggedInDialog/AlreadyLoggedInDialog";
import Link from "next/link";

const userDataInitialState = {
    email: '',
    password: '',
    repeatPassword: '',
}

export default function Register() {
    const user = useSelector(selectUserState);
    const dispatch = useDispatch();
    const router = useRouter();

    const [loggingInProgress, setLoggingInProgress] = useState<boolean>(false);
    const [confirmMailDialog, setConfirmMailDialog] = useState<boolean>(false);
    const [createdUser, setCreatedUser] = useState<UserModel | null>(null);
    const [userData, setUserData] = useState<RegisterFormModel>(userDataInitialState);

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

    const handleSubmit = async (event: FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        setLoggingInProgress(true);

        const response = await createUser({ ...userData, repeatPassword: undefined });
        if (!response.ok) {
            return;
        }

        const newUser = await response.json();
        setCreatedUser(newUser);
        setLoggingInProgress(false);
        setConfirmMailDialog(true);
    }

    return (<>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Form
                onSubmit={handleSubmit}
                title="Create new account"
                fields={registerForm}
                data={userData}
                onDataChange={(userData) => setUserData(userData as SetStateAction<RegisterFormModel>)}
                buttonLoading={loggingInProgress}
                buttonText="Create Account"
                // todo: error handling by "error" prop here
            >
                <Grid item xs={12}>
                    <Divider variant="fullWidth">or</Divider>
                </Grid>

                <Grid item xs={12}>
                    <Link href="/login">
                        <Button variant="outlined" size="large" fullWidth>
                            I have account
                        </Button>
                    </Link>
                </Grid>
            </Form>
        </Box>

        <ConfirmMailDialog
            open={confirmMailDialog}
            email={createdUser?.email}
            password={userData.password}
        />
    </>)
}