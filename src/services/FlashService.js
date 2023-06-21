import axios from 'axios';

export async function GetAllData() {
    const response = await axios.get('https://localhost:44344/newsflashes/index/');
    return response.data;
}

export async function AddFlash(title) {
    const response = await axios.post(`https://localhost:44344/newsflashes/Create/`, {title: title});
    return response.data;
}

export async function EditFlash(flash) {
    const response = await axios.put(`https://localhost:44344/newsflashes/Edit/}`, flash);
    return response.data;
}
export async function DeleteFlash(flashId) {
    const response = await axios.delete(`https://localhost:44344/newsflashes/Delete/${flashId}`);
    return response.data;
}