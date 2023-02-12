import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Link from "@mui/material/Link";
import resendActivationMail from "@/requests/auth/resendActivationMail";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose?: () => void;
}

interface ConfirmMailDialogProps {
    open: boolean;
    email?: string;
    password?: string;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

const resendActivationMailHandler = async (email: string, password: string): Promise<boolean> => {
    const response = await resendActivationMail(email, password);
    return response.ok;
}

export default function ConfirmMailDialog(props: ConfirmMailDialogProps) {
    return (
        <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={props.open}
        >
            <BootstrapDialogTitle id="customized-dialog-title">
                Mail confirmation required
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    We sent mail to your E-mail address{
                    props.email ?
                        <> (<Link href={`https://${props.email.split('@')[1]}`} target="_blank">{props.email}</Link>)</> :
                        ''
                    }, please check your mail inbox and follow the instructions.
                    If you don&apos;t see mail, check spam folder or click button below to resend.
                </Typography>
                {(props.email && props.password) && (
                    <Button
                        sx={{marginLeft: 'auto', marginRight: 'auto'}}
                        variant="outlined"
                        onClick={() => resendActivationMailHandler(props.email || '', props.password || '')}
                    >
                        Resend E-Mail
                    </Button>
                )}
            </DialogContent>
        </BootstrapDialog>
    );
}