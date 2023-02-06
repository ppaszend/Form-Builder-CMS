import {FormModel} from "@/models/Form.model";

export default async function getFormById(formId: string): Promise<FormModel | null> {
    const response = await fetch(`http://localhost:3000/forms/${formId}`);
    if (response.status === 200) {
        return await response.json();
    } else {
        return null;
    }
}