import axios from 'axios';

const API_URL = 'http://localhost:3000/api/providers';

export const getProviders = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const fetchProviders = async () => {
    try {
        const data = await getProviders();
        console.log("Datos recibidos:", data); // Verifica la estructura de los datos
        setProviders(data);
    } catch (error) {
        console.error("Error fetching providers:", error);
    }
};


export const getProviderById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createProvider = async (providerData) => {
    const response = await axios.post(API_URL, providerData);
    return response.data;
};

export const updateProvider = async (id, providerData) => {
    const response = await axios.put(`${API_URL}/${id}`, providerData);
    return response.data;
};

export const deleteProvider = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
