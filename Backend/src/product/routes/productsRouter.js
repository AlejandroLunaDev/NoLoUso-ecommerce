import express from 'express';
import ProductController from '../controllers/productController.js';

const router = express.Router();

router.post('/', ProductController.createProduct.bind(ProductController));
router.get('/', ProductController.getAllProducts.bind(ProductController));
router.get('/:id', ProductController.getProductById.bind(ProductController));
router.put('/:id', ProductController.updateProduct.bind(ProductController));
router.delete('/:id', ProductController.deleteProduct.bind(ProductController));

export default router;


