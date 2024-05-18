import { useState, useEffect } from "react"

export const useAsync = (asyncFunction, dependencies = []) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        asyncFunction()
            .then(data => {
                setData(data)
            })
            .catch(error => {
                console.error('Error en la solicitud asíncrona:', error); // Agregar esta línea para depuración
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, dependencies)

    return {
        data,
        loading,
        error
    }
}
