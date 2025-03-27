import { connectionSQL, SQL } from "../db/connection"; // ✅ Importa la conexión correctamente

class Provider {
    static async getAll() {
        try {
            const pool = await connectionSQL(); // ✅ Usa la conexión correcta
            if (!pool) throw new Error("No se pudo establecer conexión a la BD.");

            const result = await pool.request().execute("dbo.sp_GetAllProveedores");
            return result.recordset;
        } catch (error) {
            console.error("❌ Error en getAll:", error.message);
            throw new Error("Error fetching providers");
        }
    }

    static async getById(id) {
        try {
            const pool = await connectionSQL();
            if (!pool) throw new Error("No se pudo establecer conexión a la BD.");

            const result = await pool.request()
                .input("id", SQL.Int, id)
                .execute("dbo.sp_GetProveedorById");
            return result.recordset[0];
        } catch (error) {
            console.error("❌ Error en getById:", error.message);
            throw new Error("Error fetching provider");
        }
    }

    static async create({ name, email, phone }) {
        try {
            const pool = await connectionSQL();
            if (!pool) throw new Error("No se pudo establecer conexión a la BD.");

            await pool.request()
                .input("nombre", SQL.VarChar, name)
                .input("email", SQL.VarChar, email)
                .input("telefono", SQL.VarChar, phone)
                .execute("dbo.sp_InsertProveedor");
        } catch (error) {
            console.error("❌ Error en create:", error.message);
            throw new Error("Error creating provider");
        }
    }

    static async update({ id, name, email, phone }) {
        try {
            const pool = await connectionSQL();
            if (!pool) throw new Error("No se pudo establecer conexión a la BD.");

            await pool.request()
                .input("id", SQL.Int, id)
                .input("nombre", SQL.VarChar, name)
                .input("email", SQL.VarChar, email)
                .input("telefono", SQL.VarChar, phone)
                .execute("dbo.sp_UpdateProveedor");
        } catch (error) {
            console.error("❌ Error en update:", error.message);
            throw new Error("Error updating provider");
        }
    }

    static async delete(id) {
        try {
            const pool = await connectionSQL();
            if (!pool) throw new Error("No se pudo establecer conexión a la BD.");

            await pool.request()
                .input("id", SQL.Int, id)
                .execute("dbo.sp_DeleteProveedor");
        } catch (error) {
            console.error("❌ Error en delete:", error.message);
            throw new Error("Error deleting provider");
        }
    }
}

export default Provider;