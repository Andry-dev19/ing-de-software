const url = "http://localhost:3000/records";
export const getAllRecords = async () => {
    try {
        const data = await fetch(url);
        if (!data.ok) {
            throw new Error("Error al obtener recursos");
        }
        return data.json();
    } catch (error) {
        console.error(error);
    }
}

export const newRecord = async (record) => {
    try {
        const response = await fetch("http://localhost:3000/records", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record)
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        return await response.json(); // 📌 Asegurar que devuelve una respuesta JSON
    } catch (error) {
        console.error("Error en newRecord:", error);
        return { success: false, message: error.message };
    }
};
