
const isProduction = import.meta.env.MODE === 'production';
const BASE_URL = isProduction ? import.meta.env.VITE_SOCKET_URL_PROD : import.meta.env.VITE_SOCKET_URL_DEV;
const SOCKET_URL = isProduction ? import.meta.env.VITE_SOCKET_URL_PROD : import.meta.env.VITE_SOCKET_URL_DEV;

const BASE_URL_PROFILE = `${BASE_URL}/api/users`;
const BASE_URL_AUTH = `${BASE_URL}/api/auth`;


const userAuth = {
  async createUser(userData) {
    try {
      const response = await fetch(`${BASE_URL_AUTH}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw new Error("Error al crear usuario");
    }
  },

  async loginUser(credentials) {
    try {
      const response = await fetch(`${BASE_URL_AUTH}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
      const userData = await response.json();
      if (userData.refreshToken) {
        localStorage.setItem('refreshToken', userData.refreshToken);
      }
      return userData;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw new Error("Error al iniciar sesión");
    }
  },

  async logoutUser() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await fetch(`${BASE_URL_AUTH}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
        credentials: "include",
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Logout failed:", errorText);
        throw new Error("Error al cerrar sesión");
      }
      localStorage.removeItem('refreshToken');
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";    
      return await response.json();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      throw new Error("Error al cerrar sesión");
    }
  },

  async deleteUser(userId) {
    try {
      const response = await fetch(`${BASE_URL_PROFILE}/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw new Error("Error al eliminar usuario");
    }
  },

  async updateUser(userId, userData) {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }
      const response = await fetch(`${BASE_URL_PROFILE}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw new Error("Error al actualizar usuario");
    }
  },

  async getUser(userId) {
    try {
      const response = await fetch(`${BASE_URL_PROFILE}/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      throw new Error("Error al obtener usuario");
    }
  },

  async getAllUsers() {
    try {
      const token = localStorage.getItem('refreshToken');
      if (!token) {
        throw new Error("No access token available");
      }
      const response = await fetch(`${BASE_URL_PROFILE}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const data = await response.json();
      return data.users;
    } catch (error) {
      console.error("Error al obtener la lista de usuarios:", error);
      throw new Error("Error al obtener la lista de usuarios");
    }
  },

  async refreshAccessToken(refreshToken) {
    try {
      const response = await fetch(`${BASE_URL_AUTH}/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Error al refrescar el token");
      }
      return data.accessToken;
    } catch (error) {
      throw new Error("Error al refrescar el token");
    }
  },

  async loginWithGitHub() {
    console.log("Enviando petición GET a:", `${BASE_URL}/auth/github`);
    window.location.href = `${BASE_URL}/auth/github`;
  },

  async handleGitHubCallback() {
    try {
      
      const response = await fetch(`${BASE_URL}github/callback`, {
        method: "GET",
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Error al manejar la callback de GitHub");
      }
  
      const { accessToken, refreshToken } = await response.json();
  
      // Guarda los tokens en localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
  
      await this.login({ accessToken, refreshToken });
  
     
    } catch (error) {
      console.error("Error al manejar la callback de GitHub:", error);
      throw new Error("Error al manejar la callback de GitHub");
    }
  },
  


};

export default userAuth;
