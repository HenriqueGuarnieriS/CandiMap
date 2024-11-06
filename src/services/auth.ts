// services/auth.ts
import axios from "axios";

export const generateToken = async (): Promise<string | null> => {
  try {
    const response = await axios.get("http://localhost:3000/generate-token", {
      withCredentials: true,
    });

    const token = response.data.token;
    if (token) {
      localStorage.setItem("authToken", token);
    }
    return token;
  } catch (error) {
    console.error("Erro ao gerar token:", error);
    return null;
  }
};
