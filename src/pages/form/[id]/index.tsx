"use client"

import styles from './page.module.scss';

import {FormModel} from "@/models/Form.model";
import FormComponent from "@/components/Forms/FormComponent";
import getFormById from "@/requests/forms/getFormById";
import {useEffect, useState} from "react";
import Switcher from "@/components/FormBuilder/FormElements/Switcher/Switcher";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSave} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";

export default function Index() {
    const { id } = useRouter().query;

    const [form, setForm] = useState<FormModel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [editModeEnabled, setEditModeEnabled] = useState<boolean>(true);
    const [titleEditModeEnabled, setTitleEditModeEnabled] = useState<boolean>(false);

    const editFormTitleHandler = () => {
        setTitleEditModeEnabled(!titleEditModeEnabled);
    }

    useEffect(() => {
        if (typeof id === "string") {
            getFormById(id)
                .then((data) => {
                    setForm(data);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <div>loading...</div>
    }

    if (form) {
        return <>
            <div className={styles.header}>
                <div className={styles.title}>
                    <span contentEditable={titleEditModeEnabled}
                          style={{background: titleEditModeEnabled ? '#ffffff' : 'transparent'}}
                    >
                        {form.name}
                    </span>
                    {
                        titleEditModeEnabled
                            ?
                            <button onClick={editFormTitleHandler}>
                                <FontAwesomeIcon icon={faSave} />
                            </button>
                            :
                            <button onClick={editFormTitleHandler}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                    }
                </div>

                <div className={styles.item}>
                    <span>Edit mode</span>
                    <Switcher initialState={editModeEnabled} stateChange={setEditModeEnabled} />
                </div>
            </div>
            <div className={styles.content}>
                <FormComponent form={form} editable={editModeEnabled} />
            </div>
        </>
    }

    return (<div>Form not found</div>)
}