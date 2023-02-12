import styles from './ElementsList.module.scss';
import {FormModel} from "@/models/Form.model";
import Link from "@mui/material/Link";
import {Grid, Pagination, Paper, Stack} from "@mui/material";
import {styled} from "@mui/material/styles";
import Box from '@mui/material/Box';

interface ElementsListProps {
    forms: FormModel[];
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ElementsList(props: ElementsListProps) {
    return (
        <>


            <Box>
                <Stack spacing={2}>
                    {props.forms.map((form) => (
                        <Item key={form._id}>
                            <Grid container>
                                <Grid item>
                                    <Link
                                        href={`/forms/${form._id}`}
                                        underline="none"
                                        color="#000000"
                                    >
                                        {form.name}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Item>
                    ))}
                </Stack>
            </Box>

            <Box mt={5} display="flex" justifyContent="center">
                <Pagination count={10} />
            </Box>
        </>
    )
}