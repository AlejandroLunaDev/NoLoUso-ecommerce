const BASE_URL_PROFILE = 'http://localhost:8080/api/users';
const BASE_URL_AUTH = 'http://localhost:8080/api/auth'; 

const userAuth = {
    async createUser(userData) {
        try {
            const response = await fetch(`${BASE_URL_AUTH}/register`, {
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
            const response = await fetch(`${BASE_URL_AUTH}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials),
                credentials: 'include' // Enviar cookies en la solicitud
            });
            const userData = await response.json();
            return userData;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw new Error('Error al iniciar sesión');
        }
    },
        
    async logoutUser() {
        try {
            const response = await fetch(`${BASE_URL_PROFILE}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // Enviar cookies en la solicitud
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            throw new Error('Error al cerrar sesión');
        }
    },
    async deleteUser(userId) {
        try {
            const response = await fetch(`${BASE_URL_PROFILE}/${userId}`, {
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
            const response = await fetch(`${BASE_URL_PROFILE}/${userId}`, {
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
            const response = await fetch(`${BASE_URL_PROFILE}/${userId}`, {
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
    async getAllUsers() {
        try {
            const response = await fetch(`${BASE_URL_PROFILE}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data.users;
        } catch (error) {
            console.error('Error al obtener la lista de usuarios:', error);
            throw new Error('Error al obtener la lista de usuarios');
        }
    }
    
};

export default userAuth;
