import express from 'express';
import CartController from '../controllers/cartController.js';
import authenticateToken from '../../common/middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API endpoints for managing carts
 */

/**
 * @swagger
 * /api/carts:
 *   post:
 *     summary: Create a new cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: Cart created successfully
 *       '401':
 *         description: Unauthorized, token is missing or invalid
 */
router.post('/', authenticateToken, CartController.createCart.bind(CartController));

/**
 * @swagger
 * /api/carts:
 *   get:
 *     summary: Get the current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Current user's cart retrieved successfully
 *       '401':
 *         description: Unauthorized, token is missing or invalid
 *       '404':
 *         description: Cart not found
 */
router.get('/', authenticateToken, CartController.getCart.bind(CartController));

/**
 * @swagger
 * /api/carts/products:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Product added to cart successfully
 *       '401':
 *         description: Unauthorized, token is missing or invalid
 *       '404':
 *         description: Cart not found
 */
router.post('/products', authenticateToken, CartController.addProductToCart.bind(CartController));

/**
 * @swagger
 * /api/carts/products:
 *   put:
 *     summary: Update product quantity in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Product quantity updated in cart successfully
 *       '401':
 *         description: Unauthorized, token is missing or invalid
 *       '404':
 *         description: Cart not found
 */
router.put('/products', authenticateToken, CartController.updateProductQuantity.bind(CartController));

/**
 * @swagger
 * /api/carts/products/{productId}:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to remove from the cart
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product removed from cart successfully
 *       '401':
 *         description: Unauthorized, token is missing or invalid
 *       '404':
 *         description: Cart not found or product not in cart
 */
router.delete('/products/:productId', authenticateToken, CartController.removeProductFromCart.bind(CartController));

/**
 * @swagger
 * /api/carts:
 *   delete:
 *     summary: Clear the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Cart cleared successfully
 *       '401':
 *         description: Unauthorized, token is missing or invalid
 *       '404':
 *         description: Cart not found
 */
router.delete('/', authenticateToken, CartController.clearCart.bind(CartController));

/**
 * @swagger
 * /api/carts:
 *   put:
 *     summary: Update the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Cart updated successfully
 *       '401':
 *         description: Unauthorized, token is missing or invalid
 *       '404':
 *         description: Cart not found
 */
router.put('/', authenticateToken, CartController.updateCart.bind(CartController));

export default router;
