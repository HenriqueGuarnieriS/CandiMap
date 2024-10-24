import axios from "axios";
import InstagramProfile from "../interfaces/Instagram";

export const fetchInstagramData = async (): Promise<InstagramProfile[]> => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  try {
    const response = await axios.get(`${apiUrl}/api/instagrams`, {
      withCredentials: true, // Para enviar cookies
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do SocialBlade:", error);
    throw error;
  }
};
