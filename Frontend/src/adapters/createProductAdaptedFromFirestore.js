export const createProductAdaptedFromFirestore = (doc) => {
    const data = doc.data()

    
    return {
        id: doc.id,
        title: data.nombre,
        category: data.categoria,
        thumbnail: data.imagen, 
        price: data.precio,
        stock: data.stock,
        description: data.descripcion
    }
}