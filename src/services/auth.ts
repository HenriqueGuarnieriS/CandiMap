import axios from "axios";

// Função para gerar o token no frontend (somente em produção)
export const generateToken = async () => {
  if (process.env.NODE_ENV === "production") {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/generate-token`, {
        withCredentials: true, // Para enviar cookies junto com a requisição
      });
    } catch (error) {
      console.error("Erro ao gerar token:", error);
    }
  }
};
