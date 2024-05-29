import { cartModel } from '../models/cartModel.js';

class CartDaoMongo {
  static async create(userId) {
    try {
      return await cartModel.create({ user: userId, products: [] });
    } catch (error) {
      throw new Error('Error al crear el carrito');
    }
  }

  static async getByUserId(userId) {
    try {
      return await cartModel.findOne({ user: userId })
    } catch (error) {
      throw new Error('Error al obtener el carrito del usuario');
    }
  }

  static async addProductToCart(userId, productId, quantity) {
    try {
        // Verificar si el carrito existe
        console.log("Buscando carrito para el usuario:", userId);
        let cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            console.log("Carrito no encontrado. Creando uno nuevo.");
            // Si el carrito no existe, crear uno nuevo para el usuario
            cart = await cartModel.create({ user: userId, products: [] });
        }

        // Encontrar el índice del producto en el carrito
        console.log("Buscando índice del producto en el carrito:", productId);
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex > -1) {
            // Si el producto ya existe en el carrito, actualizar la cantidad
            console.log("Producto encontrado en el carrito. Actualizando cantidad.");
            cart.products[productIndex].quantity += quantity;
        } else {
            // Si el producto no existe, agregarlo al carrito
            console.log("Producto no encontrado en el carrito. Agregándolo.");
            cart.products.push({ product: productId, quantity });
        }

        // Guardar el carrito actualizado
        console.log("Guardando carrito actualizado:", cart);
        await cart.save();
        console.log("Carrito guardado correctamente.");

        return cart;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw new Error(`Error al agregar el producto al carrito: ${error.message}`);
    }
}

  
  
  


  static async updateProductQuantity(userId, productId, quantity) {
    try {
      const cart = await cartModel.findOne({ user: userId }).populate('products.product');
      const productIndex = cart.products.findIndex(p => p.product._id.toString() === productId);

      if (productIndex !== -1) {
        cart.products[productIndex].quantity = quantity;
      } else {
        throw new Error('Producto no encontrado en el carrito');
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error al actualizar la cantidad del producto en el carrito');
    }
  }

  static async removeProductFromCart(userId, productId) {
    try {
      const cart = await cartModel.findOne({ user: userId }).populate('products.product');
      cart.products = cart.products.filter(p => p.product._id.toString() !== productId);

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error al eliminar el producto del carrito');
    }
  }

  static async clearCart(userId) {
    try {
      const cart = await cartModel.findOne({ user: userId });
      cart.products = [];

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error al vaciar el carrito');
    }
  }

  static async updateCart(userId, products) {
    try {
      const cart = await cartModel.findOne({ user: userId }).populate('products.product');
      cart.products = products;

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error al actualizar el carrito');
    }
  }
}

export default CartDaoMongo;
