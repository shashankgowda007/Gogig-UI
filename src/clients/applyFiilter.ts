import { busurl } from "./baseurls";

export async function getAllFilterGmg() {
    const url = `${busurl}/getAllFilterGmg`;

    try {
        const response = await fetch(url, {
            method: 'GET',
        });

        if (response.ok) {
            await response.json();

        } else {
            console.error(`Request failed with status: ${response.status}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
