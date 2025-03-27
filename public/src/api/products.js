const url = "http://localhost:3000/products";
export const getProducts = async () => {
    try {
        const data = await fetch(url);
        if (!data.ok) {
            throw new Error('No se pudo obtener el recurso');
        }
        return data.json();
    } catch (error) {
        console.error(error);
    }
}

export const getProductByCode = async (code) => {
    try {
        const data = await fetch(`${url}/code/${code}`);
        if (!data.ok) {
            throw new Error('No se pudo obtener el recurso');
        }
        return data.json();
    } catch (error) {
        console.error(error);
    }
}

export const newProduct = async (product) => {
    try {
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
    } catch (error) {
        console.error(error);
    }
}

export const updateProduct = async (product) => {
    try {
        fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
    } catch (error) {
        console.error(error);
    }
}

export const deleteProductByCode=async(code)=>{
    try {
        fetch(`${url}/code/${code}`,{
            method:"DELETE"
        })
    } catch (error) {
        console.error(error);
    }
}

export const addStock = async (codigo_producto, cantidad) => {
    try {
        const response = await fetch(`${url}/add-stock`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ codigo_producto, cantidad })
        });

        if (!response.ok) {
            throw new Error("Error al agregar stock");
        }

        return response.json();
    } catch (error) {
        console.error("Error en addStock:", error);
    }
};
