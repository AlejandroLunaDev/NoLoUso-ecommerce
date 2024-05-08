import { getDocs, collection, query, where, doc, getDoc} from 'firebase/firestore'
import { db } from '../firebase'
import { createProductAdaptedFromFirestore } from '@/adapters/createProductAdaptedFromFirestore'

export const getProducts = async (categoryId) => {
    let productsCollection;
    if (categoryId) {
        // Asegúrate de que el filtro coincida exactamente con las categorías en Firestore
        productsCollection = query(collection(db, 'products'), where('categoria', '==', categoryId));
      } else {
        productsCollection = collection(db, 'products');
      }
     


    return getDocs(productsCollection)
        .then(querySnapshot => {
           /*  console.log(querySnapshot) */
            const productsAdapted = querySnapshot.docs.map(doc => {
                return createProductAdaptedFromFirestore(doc)
            })
            return productsAdapted
        })
        .catch(error => {
            return error
        })        
}

export const getProductById = async (itemId) => {
    const productDoc = doc(db, 'products', itemId)

    return getDoc(productDoc)
        .then(queryDocumentSnapshot => {
            const productAdapted = createProductAdaptedFromFirestore(queryDocumentSnapshot)

            return productAdapted
        })
        .catch(error => {
            return error
        })
}


