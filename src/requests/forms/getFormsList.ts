import {FormModel} from "@/models/Form.model";

export default async function getFormsList(skip?: number, limit?: number): Promise<FormModel[]> {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/forms`);
    if (skip) url.searchParams.append("skip", skip.toString());
    if (limit) url.searchParams.append("limit", limit.toString());

    const response = await fetch(url.href);
    return response.json()
}