import {FormModel} from "@/models/Form.model";

export default async function getFormById(formId: string): Promise<FormModel | null> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}`);
    if (response.status === 200) {
        return await response.json();
    } else {
        return null;
    }
}