import Form from "../../components/FormBuilder/Form/Form";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectUserState} from "../../stores/user";
import {userDataForm} from "../../helpers/formHelper";
import {Box} from "@mui/material";

const initialUserDataState = () => ({
    email: '',
    fullName: '',
    address: '',
    city: '',
});

export default function Account() {
    const user = useSelector(selectUserState);
    const [userData, setUserData] = useState(initialUserDataState());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user.data) {
            setUserData({
                ...userData,
                email: user.data.email
            });
            setLoading(false);
        }
    }, [user]);

    console.log(userData);

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {!loading && (
                <Form
                    onSubmit={() => {}}
                    title="Account Informations"
                    fields={userDataForm}
                    data={userData}
                    onDataChange={() => {}}
                    buttonLoading={false}
                    buttonText="Save"
                    maxWidth={800}
                />
            )}
        </Box>
    )
}