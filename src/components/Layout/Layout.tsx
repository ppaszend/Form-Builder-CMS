import NavigationDrawer from "@/components/FormBuilder/NavigationDrawer/NavigationDrawer";
import Box from '@mui/material/Box';
import {styled} from "@mui/material/styles";

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
    return <Box sx={{display: 'flex'}}>
        <NavigationDrawer DrawerHeader={DrawerHeader} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            {props.children}
        </Box>
    </Box>
}