import styles from './ElementsList.module.scss';
import {FormModel} from "@/models/Form.model";
import Link from "next/link";

interface ElementsListProps {
    forms: FormModel[];
}

export default function ElementsList(props: ElementsListProps) {
    return (
        <div className={styles.elementsListContainer}>
            {props.forms.map((form) => (
                <div key={form._id} className={styles.item}>
                    <Link href={`/form/${form._id}`}>{form.name}</Link>
                </div>
            ))}
        </div>
    )
}