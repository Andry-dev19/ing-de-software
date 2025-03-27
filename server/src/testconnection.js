import { connectionSQL } from './db';

(async () => {
    try {
        const connection = await connectionSQL();
        console.log('✅ Conexión exitosa al fin');

        // Prueba si la tabla 'proveedores' existe y tiene datos
        const result = await connection.request().query('SELECT TOP 5 * FROM dbo.proveedores');
        
        console.log('🔎 Datos de prueba:', result.recordset.length > 0 ? result.recordset : '⚠️ No hay datos en la tabla proveedores.');

        await connection.close();
    } catch (error) {
        console.error('❌ Error al conectar:', error.message);
    }
})();