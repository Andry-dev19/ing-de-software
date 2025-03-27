import React, { useEffect, useState } from "react";
import { getProviders, createProvider, deleteProvider } from "../api/providerService";

const ProviderList = () => {
    const [providers, setProviders] = useState([]);
    const [newProvider, setNewProvider] = useState({ name: "", email: "", phone: "" });

    useEffect(() => {
        fetchProviders();
    }, []);

    const fetchProviders = async () => {
    try {
        const data = await getProviders();
        console.log("Datos recibidos de la API:", data); // Depuración

        setProviders(data.map(provider => ({
            id: provider.id, // Asegurar que el ID se mantenga
            name: provider.nombre?.trim() || "Sin nombre",
            email: provider.email || "Correo inválido",
            phone: provider.telefono?.trim() || "Sin teléfono"
        })));
    } catch (error) {
        console.error("Error al obtener proveedores:", error);
    }
};

    const handleCreate = async () => {
        console.log("Datos a enviar:", newProvider); // Verifica los datos antes de enviarlos

        if (!newProvider.name || !newProvider.phone) {
            alert("Por favor, ingresa un nombre y un teléfono.");
            return;
        }

        try {
            await createProvider(newProvider);
            setNewProvider({ name: "", email: "", phone: "" });
            setTimeout(fetchProviders, 500);
        } catch (error) {
            console.error("Error al crear proveedor:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProvider(id);
            await fetchProviders();
        } catch (error) {
            console.error("Error deleting provider:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Proveedores</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={newProvider.name}
                    onChange={(e) => setNewProvider({ ...newProvider, name: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={newProvider.email}
                    onChange={(e) => setNewProvider({ ...newProvider, email: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Teléfono"
                    value={newProvider.phone}
                    onChange={(e) => setNewProvider({ ...newProvider, phone: e.target.value })}
                    className="border p-2 mr-2"
                />
                <button
                    onClick={handleCreate}
                    className="bg-green-500 text-white p-2 rounded"
                >
                    Agregar Proveedor
                </button>
            </div>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Nombre</th>
                        <th className="border p-2">Correo Electrónico</th>
                        <th className="border p-2">Teléfono</th>
                        <th className="border p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {providers.map((provider, index) => (
                        <tr key={index}>
                            <td>{provider.name}</td>
                            <td>{provider.email}</td>
                            <td>{provider.phone}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(provider.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProviderList;