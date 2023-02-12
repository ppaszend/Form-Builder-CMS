import getFormsList from "@/requests/forms/getFormsList";
import {FormModel} from "@/models/Form.model";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import Link from '@mui/material/Link';
import {Button, Paper, Typography} from "@mui/material";

const formsPerPage = 10;

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 50
    },
    {
        field: 'name',
        headerName: 'Form name',
        width: 240,
        renderCell: (params) => (
            <Link href={`/form/${params.row._id}`}>{params.row.name}</Link>
        )
    },
];

export default function Index() {
    const { page } = useRouter().query;

    const [forms, setForms] = useState<FormModel[] | null>(null);

    useEffect(() => {
        if (typeof page === "string") {
            getFormsList(formsPerPage * (parseInt(page) - 1), formsPerPage)
                .then((forms) => {
                    setForms(forms);
                })
        }
    }, [page]);

    if (forms && forms.length === 0) {
        return (
            <Paper
                elevation={0}
                variant="outlined"
                sx={{
                    p: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: '800px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '60px',
                }}
            >
                <Typography gutterBottom>You don&apos;t have any forms yet. You can create one by clicking button below.</Typography>
                <Button variant="contained">Create new form</Button>
            </Paper>
        )
    }

    return forms && (
        <div style={{height: '500px', width: '100%', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto'}}>
            <DataGrid
                rows={forms.map((form, id) => ({id: id + 1, name: form.name, _id: form._id}))}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );

    // return forms && <ElementsList forms={forms} />
}