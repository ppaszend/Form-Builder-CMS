import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import {MUIStyledCommonProps} from "@mui/system";
import MuiDrawer from '@mui/material/Drawer';
import {DetailedHTMLProps, HTMLAttributes, useState} from "react";
import IconButton from "@mui/material/IconButton";
import {
    CssBaseline,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox'
import {StyledComponent} from "@emotion/styled";
import Navbar from "@/components/FormBuilder/Navbar/Navbar";
import {drawerWidth} from "@/helpers/constants";
import {useRouter} from "next/router";
import Link from "next/link";

interface NavigationDrawerProps {
    DrawerHeader: StyledComponent<MUIStyledCommonProps<Theme>, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>
}

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflow: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const menuElements = [
    { title: 'Forms', href: '/forms/1', pathname: '/forms/[page]' },
    { title: 'Themes', href: '/themes/1', pathname: '/themes/[page]' },
];

export default function NavigationDrawer({DrawerHeader}: NavigationDrawerProps) {
    const theme = useTheme();
    const [open, setOpen] = useState<boolean>(false);
    const [allowClose, setAllowClose] = useState<boolean>(false);
    const router = useRouter();

    return <>
        <CssBaseline />
        <Navbar open={!allowClose || open} setOpen={setOpen} />
        <Drawer variant="permanent" open={!allowClose || open}>
            {allowClose && (<>
                <DrawerHeader>
                    <IconButton onClick={() => setOpen(false)}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
            </>)}
            <List>
                {menuElements.map((item) => (
                        <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
                            <Link href={item.href}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: (!allowClose || open) ? 'initial' : 'center',
                                        px: 2.5,
                                        color: '#000000',
                                    }}
                                    selected={item.pathname === router.pathname}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: (!allowClose || open) ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.title}
                                        sx={{
                                            opacity: (!allowClose || open) ? 1 : 0 ,
                                            textDecoration: 'none',
                                        }}
                                    />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                ))}
            </List>
        </Drawer>
    </>;
}