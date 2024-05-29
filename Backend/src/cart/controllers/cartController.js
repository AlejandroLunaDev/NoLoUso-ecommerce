import CartDaoMongo from '../dao/cartDao.js';

class CartController {
  async createCart(req, res) {
    try {
      if (!req.user || !req.user.user._id) {
        throw new Error('User ID not found in request');
      }

      const userId = req.user.user._id;
      const cart = await CartDaoMongo.create(userId);
      res.status(201).json(cart);
    } catch (error) {
      console.error('Error creating cart:', error);
      res.status(500).json({ error: 'Error al crear el carrito' });
    }
  }

  async getCart(req, res) {
    try {
      if (!req.user || !req.user.user._id) {
        throw new Error('User ID not found in request');
      }
      const userId = req.user.user._id;
      console.log("User ID:", userId);
      const cart = await CartDaoMongo.getByUserId(userId);
      console.log("Cart:", cart);
      if (!cart) {
        console.log("Cart not found");
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }
      console.log("Returning cart:", cart);
      res.status(200).json(cart);
    } catch (error) {
      console.error('Error getting cart:', error);
      res.status(500).json({ error: 'Error al obtener el carrito' });
    }
  }
  

  async addProductToCart(req, res) {
    try {
        // Aquí se define un ID de usuario predeterminado para pruebas
        const userId = req.user.user._id;

        const { productId, quantity } = req.body;

        // Verificación de tipos de datos
        if (!productId || !quantity || typeof productId !== 'string' || typeof quantity !== 'number') {
            return res.status(400).json({ error: 'Datos inválidos' });
        }

        console.log('User ID:', userId);
        console.log('Product ID:', productId);
        console.log('Quantity:', quantity);

        // Buscar el carrito del usuario
        console.log('Buscando carrito para el usuario:', userId);
        let cart = await CartDaoMongo.getByUserId(userId);

        console.log('Carrito encontrado:', cart);

        // Si no hay carrito, crear uno nuevo
        if (!cart) {
            console.log('Carrito no encontrado. Creando uno nuevo.');
            cart = await CartDaoMongo.create(userId);
            console.log('Carrito creado:', cart);
        }

        // Ahora, agregar el producto al carrito
        console.log('Agregando producto al carrito:', productId, 'Cantidad:', quantity);
        cart = await CartDaoMongo.addProductToCart(userId, productId, quantity);

        console.log('Carrito actualizado:', cart);

        // Responder con el carrito actualizado
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: `Error al agregar el producto al carrito: ${error.message}` });
    }
}


  
  
 
  

  async updateProductQuantity(req, res) {
    try {
      if (!req.user || !req.user.user._id) {
        throw new Error('User ID not found in request');
      }
      const userId = req.user.user._id;
      const { productId, quantity } = req.body;
      const cart = await CartDaoMongo.updateProductQuantity(userId, productId, quantity);
      res.status(200).json(cart);
    } catch (error) {
      console.error('Error updating product quantity:', error);
      res.status(500).json({ error: 'Error al actualizar la cantidad del producto en el carrito' });
    }
  }

  async removeProductFromCart(req, res) {
    try {
      if (!req.user || !req.user.user._id) {
        throw new Error('User ID not found in request');
      }
      const userId = req.user.user._id;
      const { productId } = req.params;
      const cart = await CartDaoMongo.removeProductFromCart(userId, productId);
      res.status(200).json(cart);
    } catch (error) {
      console.error('Error removing product from cart:', error);
      res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
    }
  }

  async clearCart(req, res) {
    try {
      if (!req.user || !req.user.user._id) {
        throw new Error('User ID not found in request');
      }
      const userId = req.user.user._id;
      const cart = await CartDaoMongo.clearCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ error: 'Error al vaciar el carrito' });
    }
  }

  async updateCart(req, res) {
    try {
      if (!req.user || !req.user.user._id) {
        throw new Error('User ID not found in request');
      }
      const userId = req.user.user._id;
      const { products } = req.body;
      const cart = await CartDaoMongo.updateCart(userId, products);
      res.status(200).json(cart);
    } catch (error) {
      console.error('Error updating cart:', error);
      res.status(500).json({ error: 'Error al actualizar el carrito' });
    }
  }
}

export default new CartController();
