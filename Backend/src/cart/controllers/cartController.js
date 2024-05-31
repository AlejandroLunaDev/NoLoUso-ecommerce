import CartDaoMongo from '../dao/cartDao.js';

class CartController {
  async createCart(req, res) {
    console.log("id de usuario al crear el carrito:", req.user.user._id);
    try {
      if (!req.user || !req.user.user._id) {
        throw new Error('User ID not found in request');
      }

      const userId = req.user.user._id;
      let cart = await CartDaoMongo.getByUserId(userId);
      if (cart) {
        console.log("Carrito ya existe para el usuario:", userId);
        return res.status(200).json(cart);
      }

      console.log("Carrito no encontrado. Creando uno nuevo.");
      cart = await CartDaoMongo.create(userId);
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
        console.log("Inicio de addProductToCart");
       if (!req.user || !req.user.user._id) {
            console.log("User ID not found in request");
            throw new Error('User ID not found in request');
        } 
        
        const userId = req.user.user._id;
        const { productId, quantity } = req.body;

        console.log("Datos del producto recibidos:", { productId, quantity });

        if (!productId || !quantity || typeof productId !== 'string' || typeof quantity !== 'number') {
            console.log("Datos inválidos recibidos en addProductToCart:", { productId, quantity });
            return res.status(400).json({ error: 'Datos inválidos' });
        }

        console.log("Verificando existencia del carrito para el usuario:", userId);
        let cart = await CartDaoMongo.getByUserId(userId);
        console.log("Carrito encontrado:", cart);

        if (!cart) {
            console.log("Carrito no encontrado. Creando uno nuevo.");
            cart = await CartDaoMongo.create(userId);
            console.log("Carrito creado:", cart);
        }

        console.log("Agregando producto al carrito:", { productId, quantity });
        cart = await CartDaoMongo.addProductToCart(userId, productId, quantity);
        console.log("Carrito actualizado:", cart);
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
