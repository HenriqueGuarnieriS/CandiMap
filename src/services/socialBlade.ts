import axios from "axios";

export const fetchInstagramData = async (username: string) => {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.VITE_BACKEND_URL // URL de produção
      : "http://localhost:3000"; // URL de desenvolvimento

  try {
    const response = await axios.get(`${apiUrl}/tracking/${username}`, {
      withCredentials: true, // Habilita o envio de cookies
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do SocialBlade:", error);
    throw error;
  }
};
// export const fetchInstagramSocialBlade = async (username: string) => {
//   try {
//     // const response = await axios.get(
//     //   `https://fluxoapi-production.up.railway.app/tracking/${username}`
//     // );
//     const response = await axios.get(
//       `http://localhost:3000/tracking/${username}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Erro ao buscar detalhes do candidato:", error);
//     throw error;
//   }
// };
