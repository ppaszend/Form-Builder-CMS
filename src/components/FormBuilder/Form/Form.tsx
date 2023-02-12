import {Alert, Button, Card, CardContent, CircularProgress, Grid, TextField, Typography} from "@mui/material";
import React, {FormEvent} from "react";
import {green} from "@mui/material/colors";

export interface FieldProps {
    name: string;
    type: string;
    label: string;
    autoComplete?: string;
}

interface FormProps {
    onSubmit: (event: FormEvent<HTMLDivElement>) => void;
    title: string;
    fields: FieldProps[];
    userData: object;
    onUserDataChange: (userData: object) => void;
    buttonLoading: boolean;
    error?: string | false | null;
    buttonText: string;
    children?: JSX.Element | JSX.Element[];
}

export default function Form(props: FormProps) {
    const fieldInputHandler = (name: string, value: string) => {
        props.onUserDataChange({...props.userData, [name]: value});
    }

    const submitHandler = (event: FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        props.onSubmit(event);
    }

    return (
        <Card
            sx={{width: '100%', maxWidth: 500}}
            variant="outlined"
            component="form"
            noValidate
            onSubmit={submitHandler}
        >
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography fontWeight="600"
                                    fontSize="1.5em"
                                    variant="h1"
                                    gutterBottom
                        >
                            {props.title}
                        </Typography>
                    </Grid>

                    {props.fields.map((field) => (
                        <Grid item xs={12} key={field.name}>
                            <TextField
                                id={field.name}
                                type={field.type}
                                fullWidth
                                label={field.label}
                                onInput={($event: React.ChangeEvent<HTMLInputElement>) => fieldInputHandler(field.name, $event.target.value)}
                                autoComplete={field.autoComplete || field.name}
                            />
                        </Grid>
                    ))}

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={props.buttonLoading}
                            type="submit"
                        >
                            {props.buttonText}
                            {props.buttonLoading && <CircularProgress
                                size={24}
                                sx={{
                                    color: green[500],
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />}
                        </Button>
                    </Grid>

                    {props.error && <Grid item xs={12}>
                        <Alert severity="error">{props.error}</Alert>
                    </Grid>}

                    {props.children}
                </Grid>
            </CardContent>
        </Card>
    )
}