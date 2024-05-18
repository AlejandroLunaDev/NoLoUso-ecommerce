import { useState, useEffect } from "react"

export const useAsync = (asyncFunction, dependencies = []) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        console.log('Iniciando solicitud asíncrona...'); // Agregar esta línea para depuración
        asyncFunction()
            .then(data => {
                console.log('Solicitud asíncrona completada con éxito:', data); // Agregar esta línea para depuración
                setData(data)
            })
            .catch(error => {
                console.error('Error en la solicitud asíncrona:', error); // Agregar esta línea para depuración
                setError(error)
            })
            .finally(() => {
                setLoading(false)
                console.log('Solicitud asíncrona finalizada'); // Agregar esta línea para depuración
            })
    }, dependencies)

    return {
        data,
        loading,
        error
    }
}
