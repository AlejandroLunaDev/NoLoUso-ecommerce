export const mongoAdapter = (id,title,category,thumbnails,price,stock,description) => {

    return {    
        _id: id,   
        nombre: title,
        categoria: category,
        imagen: thumbnails,
        precio: price,
        stock: stock,
        descripcion: description
    }
}