import NavigationDrawer from "@/components/FormBuilder/NavigationDrawer/NavigationDrawer";
import Box from '@mui/material/Box';
import {styled} from "@mui/material/styles";
import {useSelector} from "react-redux";
import {selectUserState} from "@/stores/user";
import {useRouter} from "next/router";
import {routesAllowedWithoutUser} from "@/helpers/constants";

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
    const user = useSelector(selectUserState);
    const router = useRouter();

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