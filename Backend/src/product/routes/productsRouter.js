import express from 'express';
import ProductController from '../controllers/productController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *               price:
 *                 type: number
 *                 description: The price of the product
 *     responses:
 *       '201':
 *         description: Product created successfully
 *       '400':
 *         description: Invalid request body
 */
router.post('/', ProductController.createProduct.bind(ProductController));

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: A list of products
 *       '404':
 *         description: Products not found
 */
router.get('/', ProductController.getAllProducts.bind(ProductController));

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to get
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product retrieved successfully
 *       '404':
 *         description: Product not found
 */
router.get('/:id', ProductController.getProductById.bind(ProductController));

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the product
 *               price:
 *                 type: number
 *                 description: The updated price of the product
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *       '404':
 *         description: Product not found
 */
router.put('/:id', ProductController.updateProduct.bind(ProductController));

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product deleted successfully
 *       '404':
 *         description: Product not found
 */
router.delete('/:id', ProductController.deleteProduct.bind(ProductController));

export default router;
