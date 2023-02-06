export default async function countAllForms(): Promise<number> {
    const response = await fetch('http://localhost:3000/forms/count');
    return await response.json();
}