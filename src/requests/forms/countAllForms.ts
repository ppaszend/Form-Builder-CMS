export default async function countAllForms(): Promise<number | null> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forms/count`);
    if (!response.ok) {
        return null;
    }
    return await response.json();
}