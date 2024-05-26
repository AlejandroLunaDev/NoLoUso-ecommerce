import { productModel } from '../models/productModel.js';

class ProductDaoMongo {
  static async create(newProduct) {
    try {
      newProduct.created_at = new Date(); 
      return await productModel.create(newProduct);
    } catch (error) {
      throw new Error('Error al crear el producto');
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
      return await productModel.findOneAndDelete({ _id: productId });
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }
  static async get({ page = 1, limit = 10, sort = 'desc', query = {} }) {
    try {
      const sortOrder = sort === 'asc' ? 1 : -1;
      const options = {
        page,
        limit,
        sort: { price: sortOrder },
      };

      return await productModel.paginate(query, options);
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  }
}

export default ProductDaoMongo;
