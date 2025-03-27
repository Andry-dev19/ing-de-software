import { Router } from "express";
import { getProducts, newProduct, getProduct, deleteProduct, updateProduct, addStock } from "../controllers/products"; // Importar función

const router = Router();

router.get('/products', getProducts);
router.get('/products/code/:code', getProduct);
router.post('/products', newProduct);
router.put('/products', updateProduct);
router.put('/products/add-stock', addStock); // Nueva ruta para agregar stock
router.delete('/products/code/:code', deleteProduct);

export default router;
