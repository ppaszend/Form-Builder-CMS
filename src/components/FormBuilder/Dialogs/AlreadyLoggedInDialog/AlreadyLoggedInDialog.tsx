import {Button, Card, Typography} from "@mui/material";
import React from "react";

interface AlreadyLoggedInDialogProps {
    email: string;
    onAbort: () => any;
    onLogout: () => any;
}

export default function AlreadyLoggedInDialog(props: AlreadyLoggedInDialogProps) {
    return (
        <Card variant="outlined" sx={{p: 4}}>
            <Typography gutterBottom>You are already logged in as {props.email}. What you want to do?</Typography>

            <Button variant="outlined" onClick={props.onAbort} sx={{marginRight: '10px'}}>Back to previous page</Button>
            <Button variant="outlined" onClick={props.onLogout}>Logout</Button>
        </Card>
    )
}