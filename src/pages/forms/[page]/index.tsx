import getFormsList from "@/requests/forms/getFormsList";
import {FormModel} from "@/models/Form.model";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import MaterialLink from '@mui/material/Link';
import Link from 'next/link'
import {Button, Paper, Typography} from "@mui/material";
import {GetServerSideProps} from "next";
import countAllForms from "@/requests/forms/countAllForms";
import Head from "next/head";

const formsPerPage = 10;

interface FormsProps {
    formsAmount: number;
    forms: FormModel[];
    error: boolean;
    page: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = typeof context.params?.page === "string" ? parseInt(context.params.page) : null

    if (page) {
        const formsAmount = await countAllForms();
        const forms = await getFormsList(formsPerPage * (page - 1), formsPerPage);

        if (forms.length > 0) {
            return { props: { formsAmount, forms, page, error: false } }
        }

    }

    return { notFound: true }
}

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
            <Link href={`/form/${params.row._id}`}>
                <MaterialLink component="span">{params.row.name}</MaterialLink>
            </Link>
        )
    },
];

export default function Index({ pageProps }: { pageProps: FormsProps }) {
    if (pageProps.error) {
        return <Paper
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
            There was an error
        </Paper>
    }

    if (pageProps.forms && pageProps.formsAmount === 0) {
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

    return pageProps.forms && (
        <>
            <Head>
                <title>Master Forms - Forms list - page {pageProps.page}</title>
            </Head>
            <div style={{height: '500px', width: '100%', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto'}}>
                <DataGrid
                    rows={pageProps.forms.map((form, id) => ({id: id + 1, name: form.name, _id: form._id}))}
                    columns={columns}
                    pageSize={formsPerPage}
                    rowsPerPageOptions={[formsPerPage]}
                    checkboxSelection
                />
            </div>
        </>
    );
}