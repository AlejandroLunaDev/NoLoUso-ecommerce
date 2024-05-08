import { productModel } from '../models/productModel.js';
import { ObjectId } from 'mongoose';


class ProductDaoMongo {
  static async create(newProduct) {
    try {
      newProduct.created_at = new Date(); // Agregar la fecha y hora actual al producto
      return await productModel.create(newProduct);
    } catch (error) {
      throw new Error('Error al crear el producto');
    }
  }

  static async get() { 
    try {
      console.log('Obteniendo todos los productos...');
      return await productModel.find().exec();
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  }

  static async getBy(id) {
    try {
      return await productModel.findById(id);
    } catch (error) {
      throw new Error('Error al obtener el producto');
    }
  }
  

  static async update(id, updateBody) {
    try {
      return await productModel.updateOne({ _id: id }, updateBody);
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }

  static async delete(productId) {
    try {
      console.log('Eliminando el producto...', productId);
      return await productModel.findOneAndDelete(productId);
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }
  
   
}

export default ProductDaoMongo;
