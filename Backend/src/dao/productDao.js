import { productModel } from '../models/productModel.js';

class ProductDaoMongo {
  static async create(newProduct) {
    try {
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
      return await productModel.findOne({id:id });
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

  static async delete(id) {
    try {
      return await productModel.deleteOne({ _id: id });
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }
}

export default ProductDaoMongo;
