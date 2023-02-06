import getFormsList from "@/requests/forms/getFormsList";
import ElementsList from "@/components/FormBuilder/ElementsList/ElementsList";
import {FormModel} from "@/models/Form.model";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const formsPerPage = 10;

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

    return forms && <ElementsList forms={forms} />
}