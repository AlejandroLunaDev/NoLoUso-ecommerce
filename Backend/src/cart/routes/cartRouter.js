import express from 'express';
import CartController from '../controllers/cartController.js';
import authenticateToken from '../../common/middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, CartController.createCart.bind(CartController));
router.get('/', authenticateToken, CartController.getCart.bind(CartController));
router.post('/products', authenticateToken, CartController.addProductToCart.bind(CartController));
router.put('/products', authenticateToken, CartController.updateProductQuantity.bind(CartController));
router.delete('/products/:productId', authenticateToken, CartController.removeProductFromCart.bind(CartController));
router.delete('/', authenticateToken, CartController.clearCart.bind(CartController));
router.put('/', authenticateToken, CartController.updateCart.bind(CartController));

export default router;
