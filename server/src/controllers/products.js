import { connectionSQL, SQL, procedures } from "../db";

// Obtener todos los productos
export const getProducts = async (req, res) => {
    let connection;
    try {
        connection = await connectionSQL();
        const result = await connection.request().query(procedures.getAllProducts);
        res.json(result.recordset);
    } catch (error) {
        console.error("Error en getProducts:", error); // Log para depuración
        res.status(500).json({ msg: "Error al obtener los productos" });
    } finally {
        if (connection) {
            connection.close(); // Cerrar la conexión
        }
    }
};

// Obtener un producto por su código
export const getProduct = async (req, res) => {
    const { code } = req.params;
    let connection;
    try {
        connection = await connectionSQL();
        const result = await connection.request()
            .input('codigo_producto', SQL.VarChar, code)
            .query(procedures.getProductByCode);
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }
        
        res.json(result.recordset[0]);
    } catch (error) {
        console.error("Error en getProduct:", error); // Log para depuración
        res.status(500).json({ msg: "Error al obtener el producto" });
    } finally {
        if (connection) {
            connection.close(); // Cerrar la conexión
        }
    }
};

// Crear un nuevo producto
export const newProduct = async (req, res) => {
    const { codigo_producto, nombre, existencia, precio, img } = req.body;
    let connection;

    // Validar campos obligatorios
    if (!codigo_producto || !nombre || existencia == null) {
        return res.status(400).json({ msg: "Complete todos los campos" });
    }

    // Validar que existencia sea un número positivo
    if (typeof existencia !== 'number' || existencia < 0) {
        return res.status(400).json({ msg: "La existencia debe ser un número positivo" });
    }

    // Validar que precio sea un número (si es obligatorio)
    if (precio && isNaN(parseFloat(precio))) {
        return res.status(400).json({ msg: "El precio debe ser un número válido" });
    }

    try {
        connection = await connectionSQL();

        // Verificar si el producto ya existe
        const checkProduct = await connection.request()
            .input('codigo_producto', SQL.VarChar, codigo_producto)
            .query('SELECT 1 FROM productos WHERE codigo_producto = @codigo_producto');
        
        if (checkProduct.recordset.length > 0) {
            return res.status(400).json({ msg: "El producto ya existe" });
        }

        // Insertar el producto
        await connection.request()
            .input('codigo_producto', SQL.VarChar, codigo_producto)
            .input('nombre', SQL.VarChar, nombre)
            .input('existencia', SQL.Int, existencia)
            .input('precio', SQL.Decimal(10, 2), precio)
            .input('img', SQL.VarChar, img)
            .query(procedures.insertProduct);
        
        res.status(201).json({ msg: "Producto agregado" });
    } catch (error) {
        console.error("Error en newProduct:", error); // Log para depuración
        res.status(500).json({ msg: "Error al agregar el producto", error: error.message });
    } finally {
        if (connection) {
            connection.close(); // Cerrar la conexión
        }
    }
};

// Actualizar un producto existente
export const updateProduct = async (req, res) => {
    const { codigo_producto, existencia } = req.body; // Solo requerimos código y stock
    let connection;

    if (!codigo_producto || existencia === undefined) {
        return res.status(400).json({ success: false, message: "Código del producto y stock son requeridos" });
    }

    try {
        connection = await connectionSQL();

        // Actualizar solo el stock en la base de datos
        const result = await connection.request()
            .input('codigo_producto', SQL.VarChar, codigo_producto)
            .input('existencia', SQL.Int, existencia)
            .query("UPDATE productos SET existencia = @existencia WHERE codigo_producto = @codigo_producto");

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ success: false, message: "Producto no encontrado" });
        }

        // Obtener el nuevo stock actualizado
        const updatedStock = await connection.request()
            .input('codigo_producto', SQL.VarChar, codigo_producto)
            .query("SELECT existencia FROM productos WHERE codigo_producto = @codigo_producto");

        res.status(200).json({
            success: true,
            newStock: updatedStock.recordset[0].existencia  // Solo enviamos el nuevo stock
        });
    } catch (error) {
        console.error("Error en updateProduct:", error);
        res.status(500).json({ success: false, message: "Error al actualizar el stock" });
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

// Eliminar un producto por su código
export const deleteProduct = async (req, res) => {
    const { code } = req.params;
    let connection;
    console.log(`Intentando eliminar producto con código: ${code}`); // Log para depuración

    try {
        connection = await connectionSQL();
        const result = await connection.request()
            .input('codigo_producto', SQL.VarChar, code)
            .query(procedures.deleteProductByCode);
        
        console.log(`Resultado de la eliminación:`, result); // Log para depuración

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }
        
        res.json({ msg: `El producto con código ${code} fue eliminado` });
    } catch (error) {
        console.error("Error en deleteProduct:", error); // Log para depuración
        res.status(500).json({ msg: "Error al eliminar el producto" });
    } finally {
        if (connection) {
            connection.close(); // Cerrar la conexión
        }
    }
};

export const addStock = async (req, res) => {
    const { codigo_producto, cantidad } = req.body;
    let connection;

    if (!codigo_producto || cantidad === undefined || cantidad <= 0) {
        return res.status(400).json({ success: false, message: "Código de producto y cantidad válida son requeridos" });
    }

    try {
        connection = await connectionSQL();

        // Verificar si el producto existe
        const productExists = await connection.request()
            .input('codigo_producto', SQL.VarChar, codigo_producto)
            .query("SELECT existencia FROM productos WHERE codigo_producto = @codigo_producto");

        if (productExists.recordset.length === 0) {
            return res.status(404).json({ success: false, message: "Producto no encontrado" });
        }

        // Llamar al procedimiento almacenado `SP_SumarExistencias`
        await connection.request()
            .input('CodProducto', SQL.VarChar, codigo_producto)
            .input('Cantidad', SQL.Int, cantidad)
            .execute("SP_SumarExistencias");

        // Obtener el nuevo stock actualizado
        const updatedStock = await connection.request()
            .input('codigo_producto', SQL.VarChar, codigo_producto)
            .query("SELECT existencia FROM productos WHERE codigo_producto = @codigo_producto");

        res.status(200).json({
            success: true,
            message: "Stock actualizado correctamente",
            newStock: updatedStock.recordset[0].existencia
        });
    } catch (error) {
        console.error("Error en addStock:", error);
        res.status(500).json({ success: false, message: "Error al actualizar el stock" });
    } finally {
        if (connection) {
            connection.close();
        }
    }
};
