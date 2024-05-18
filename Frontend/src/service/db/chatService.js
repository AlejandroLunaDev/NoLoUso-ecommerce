const BASE_URL_CHAT = `${import.meta.env.VITE_BACK_PORT}/api/messages`;

const chatService = {
  async createMessage(messageData) {
    try {
      const accessToken = localStorage.getItem('refreshToken');
      if (!accessToken) {
        throw new Error("No access token available");
      }
      const response = await fetch(`${BASE_URL_CHAT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(messageData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Error al crear el mensaje");
      }
      return data;
    } catch (error) {
      console.error("Error al crear el mensaje:", error);
      throw new Error("Error al crear el mensaje");
    }
  },

  async getMessages() {
    try {
      const accessToken = localStorage.getItem('refreshToken');
      if (!accessToken) {
        throw new Error("No access token available");
      }
      const response = await fetch(`${BASE_URL_CHAT}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
      });
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.error || "Error al obtener los mensajes");
      }
      return data;

    } catch (error) {
      console.error("Error al obtener los mensajes:", error);
      throw new Error("Error al obtener los mensajes");
    }
  },

  async getMessagesByUser(userId) {
    try {
      const accessToken = localStorage.getItem('refreshToken');
      if (!accessToken) {
        throw new Error("No access token available");
      }
      const response = await fetch(`${BASE_URL_CHAT}/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Error al obtener los mensajes del usuario");
      }
      return data.messages;
    } catch (error) {
      console.error("Error al obtener los mensajes del usuario:", error);
      throw new Error("Error al obtener los mensajes del usuario");
    }
  },
};

export default chatService;
