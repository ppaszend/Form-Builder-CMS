import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {ManageAccounts, Settings} from "@mui/icons-material";
import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {drawerWidth} from "@/helpers/constants";
import React, {Dispatch, SetStateAction} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUserState, setToken, setUser} from "@/stores/user";
import {useRouter} from "next/router";
import {Avatar} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "@mui/material/Link";

interface NavbarProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    if (name.split(' ').length === 1) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: name.slice(0, 2),
        };
    }
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

export default function Navbar(props: NavbarProps) {
    const user = useSelector(selectUserState);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const userMenuOpen = Boolean(anchorEl);
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        dispatch(setUser(null));
        dispatch(setToken(null));
        router.push('/login');
    };

    return (
        <AppBar position="fixed" open={props.open} variant="outlined" elevation={0} color="transparent" sx={{borderLeft: 0, borderTop: 0}}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => props.setOpen(true)}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(props.open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                {user.data && (
                    <Button
                        variant="text"
                        sx={{color: '#ffffff', marginLeft: 'auto'}}
                        onClick={handleClick}
                    >
                        <Avatar {...stringAvatar(user.data.fullName ?? user.data.email)} />
                    </Button>
                )}
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={userMenuOpen}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem>
                        <ListItemText>{user.data?.email}</ListItemText>
                    </MenuItem>
                    <Divider />
                    <Link href="/account">
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon><ManageAccounts /></ListItemIcon>
                            <ListItemText>My account</ListItemText>
                        </MenuItem>
                    </Link>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon><Settings /></ListItemIcon>
                        <ListItemText>Settings</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon><LogoutIcon /></ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}