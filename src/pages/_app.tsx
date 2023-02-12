import '@/styles/globals.css'
import {AppProps} from "next/app";
import Layout from "@/components/Layout/Layout";
import {wrapper} from "@/store";
import {useDispatch, useSelector} from "react-redux";
import {selectUserState, setUser} from "@/stores/user";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getUserData} from "@/helpers/auth";
import {Box, CircularProgress, Typography} from "@mui/material";
import {routesAllowedWithoutUser} from "@/helpers/constants";

function _app({ Component, pageProps }: AppProps) {
    const user = useSelector(selectUserState);
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const redirectToLoginPage = () => {
        router.push('/login').then(r => console.log(r));
    }

    useEffect(() => {
        if (!user.token && routesAllowedWithoutUser.includes(router.pathname)) {
            setLoading(false);
            // return redirectToLoginPage()
        }

        if (!user.data && user.token) {
            getUserData(user.token)
                .then((requestedUser) => {
                    if (!requestedUser) {
                        setLoading(false);
                        return redirectToLoginPage()
                    }
                    dispatch(setUser(requestedUser));
                    setLoading(false);
                });
        }
    }, [user]);

    if (loading) {
        return <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '40px',
        }}>
            <CircularProgress size="80px" />
            <Typography
                sx={{fontSize: '1.125em'}}
            >Please wait, we are downloading all required data</Typography>
        </Box>
    }


    return <Layout>
        <Component {...pageProps} />
    </Layout>
}

export default wrapper.withRedux(_app);