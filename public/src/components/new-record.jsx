import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "./form";
import Input from "./input";
import Button from "./button";
import { getProductByCode, newRecord, addStock } from "../api"; 

const NewRecord = () => {
    const { code } = useParams();
    const [product, setProduct] = useState(null);
    const [cantidad, setCantidad] = useState(""); 
    const [cantidadStock, setCantidadStock] = useState(""); 

    useEffect(() => {
        (async () => {
            setProduct(await getProductByCode(code));
        })();
    }, []); 

    const reloadPage = () => {
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    const sendForm = async (e) => {
        e.preventDefault();
        if (!cantidad || cantidad <= 0) {
            alert("⚠️ La cantidad de venta debe ser mayor a 0.");
            return;
        }

        if (cantidad > product.existencia) {
            alert("❌ No hay suficiente stock disponible.");
            return;
        }

        const record = {
            fecha_venta: new Date().toISOString().split('T')[0],
            producto_id: Number(product.id),
            cantidad: Number(cantidad),
            precio_unitario: Number(product.precio),
            user_id: JSON.parse(sessionStorage.getItem('user')).id
        };

        await newRecord(record);
        alert("✅ Venta procesada con éxito.");
        reloadPage();
    };

    const handleAddStock = async (e) => {
        e.preventDefault();
        if (!cantidadStock || cantidadStock <= 0) {
            alert("⚠️ La cantidad de stock a agregar debe ser mayor a 0.");
            return;
        }

        await addStock(product.codigo_producto, cantidadStock);
        alert("📦 Stock agregado con éxito.");
        reloadPage();
    };

    return product && (
        <>
            <Form className="bg-transparent m-auto shadow" event={sendForm}>
                <div>
                    <img className="w-full lg:w-3/5 lg:m-auto" src={product.img} alt={product.nombre} />
                    <div className="flex flex-wrap justify-between lg:text-xl py-4">
                        <p className="w-full md:w-auto">Productos en almacén: {product.existencia}</p>
                        <p>Precio por unidad: {product.precio}$</p>
                    </div>
                </div>

                <p className="text-xl lg:text-2xl text-center font-semibold pb-4">Vender Producto</p>
                <Input 
                    className="text-black" 
                    title="Cantidad" 
                    placeholder="Ingrese la cantidad de productos a vender" 
                    type="number" 
                    value={cantidad} 
                    event={(e) => {
                        const value = e.trim() === "" ? "" : Math.max(0, parseInt(e) || ""); 
                        setCantidad(value);
                    }} 
                />
                <Button className="text-black bg-green-500 hover:bg-green-500/70 duration-300" title="Procesar venta" />
            </Form>

            <Form className="bg-transparent m-auto shadow" event={handleAddStock}>
                <p className="text-xl lg:text-2xl text-center font-semibold pb-4">Agregar Stock</p>
                <Input 
                    className="text-black" 
                    title="Cantidad de stock" 
                    placeholder="Ingrese la cantidad a agregar" 
                    type="number" 
                    value={cantidadStock} 
                    event={(e) => {
                        const value = e.trim() === "" ? "" : Math.max(0, parseInt(e) || ""); 
                        setCantidadStock(value);
                    }} 
                />
                <Button className="text-black bg-blue-500 hover:bg-blue-500/70 duration-300" title="Agregar Stock" />
            </Form>
        </>
    );
};

export default NewRecord;
