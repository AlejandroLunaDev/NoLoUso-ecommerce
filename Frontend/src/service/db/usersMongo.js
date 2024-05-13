const BASE_URL = 'http://localhost:8080/api/users'; 

const userMongo = {
    async createUser(userData) {
        try {
            const response = await fetch(`${BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw new Error('Error al crear usuario');
        }
    },

    async loginUser(credentials) {
        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw new Error('Error al iniciar sesión');
        }
    },

    async logoutUser() {
        try {
            const response = await fetch(`${BASE_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            throw new Error('Error al cerrar sesión');
        }
    },

    async deleteUser(userId) {
        try {
            const response = await fetch(`${BASE_URL}/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            throw new Error('Error al eliminar usuario');
        }
    },

    async updateUser(userId, userData) {
        try {
            const response = await fetch(`${BASE_URL}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw new Error('Error al actualizar usuario');
        }
    },

    async getUser(userId) {
        try {
            const response = await fetch(`${BASE_URL}/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            throw new Error('Error al obtener usuario');
        }
    },

    // Otros métodos para operaciones relacionadas con usuarios
};

export default userMongo;
