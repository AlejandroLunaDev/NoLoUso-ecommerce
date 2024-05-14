import ProductDaoMongo from '../dao/productDao.js';
 

class ProductController {
  async createProduct(req, res) {
    try {
      const newProduct = req.body;
      const createdProduct = await ProductDaoMongo.create(newProduct);
      res.status(201).json(createdProduct);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  }

  async getAllProducts(req, res) {
    try {
      const sortOrder = req.query.sort || 'desc'; 
      const products = await ProductDaoMongo.get(sortOrder); 
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  }
  
  async getProductById(req, res) {
    try {
      const productId = req.params.id;
      const product = await ProductDaoMongo.getBy(productId);
      if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      console.error('Error al obtener el producto por ID:', error);
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  }
  
  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const updateBody = req.body;
      const updatedProduct = await ProductDaoMongo.update(productId, updateBody);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  }

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const deletedProduct = await ProductDaoMongo.delete(productId);
      console.log(productId)
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  }
    }

export default new ProductController();
