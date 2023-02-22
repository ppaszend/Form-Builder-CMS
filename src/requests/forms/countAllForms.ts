export default async function countAllForms(): Promise<number | null> {
    const response = await fetch('http://localhost:3000/forms/count');
    if (!response.ok) {
        return null;
    }
    return await response.json();
}