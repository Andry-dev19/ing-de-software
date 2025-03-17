import { connectionSQL } from './db';

(async () => {
    try {
        const connection = await connectionSQL();
        console.log('  ConexiÃ³n exitosa al fin');
        await connection.close();
    } catch (error) {
        console.error('  Error al conectar:', error.message);
    }
});
