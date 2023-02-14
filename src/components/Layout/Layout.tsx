import NavigationDrawer from "@/components/FormBuilder/NavigationDrawer/NavigationDrawer";
import Box from '@mui/material/Box';
import {styled} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import {selectUserState, setUser} from "@/stores/user";
import {useRouter} from "next/router";
import {routesAllowedWithoutUser} from "@/helpers/constants";
import {useEffect, useState} from "react";
import {getUserData} from "@/helpers/auth";
import {CircularProgress, Typography} from "@mui/material";

interface LayoutProps {
    children: JSX.Element | JSX.Element[];
}

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

export default function Layout(props: LayoutProps) {
    const router = useRouter();
    const user = useSelector(selectUserState);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const redirectToLoginPage = () => {
        router.push('/login');
    }

    useEffect(() => {
        if (!user.token && !routesAllowedWithoutUser.includes(router.pathname)) {
            setLoading(false);
            return redirectToLoginPage()
        } else if (!user.data && user.token) {
            setLoading(true);
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

    if (loading && router.pathname !== "/_error") {
        return (
            <Box
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

                <Typography sx={{fontSize: '1.125em'}}>
                    Please wait, we are downloading all required data
                </Typography>
            </Box>
        )
    }

    return <Box sx={{display: 'flex'}}>
        <>
            {user.data && !routesAllowedWithoutUser.includes(router.pathname) && <NavigationDrawer DrawerHeader={DrawerHeader} />}
            {(user.data || routesAllowedWithoutUser.includes(router.pathname)) && (
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    {props.children}
                </Box>
            )}
        </>
    </Box>
}