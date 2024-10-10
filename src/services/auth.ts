import axios from "axios";

// Função para gerar o token no frontend (somente em produção)
export const generateToken = async () => {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.VITE_BACKEND_URL ||
        "https://fluxoapi-production.up.railway.app"
      : "http://localhost:3000"; // Backend local em desenvolvimento

  if (process.env.NODE_ENV === "production") {
    try {
      await axios.get(`${apiUrl}/generate-token`, {
        withCredentials: true, // Para enviar cookies junto com a requisição
      });
    } catch (error) {
      console.error("Erro ao gerar token:", error);
    }
  }
};
