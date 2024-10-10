const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.VITE_BACKEND_URL // Variável de ambiente para o backend em produção
    : "http://localhost:3000"; // URL do backend local durante o desenvolvimento

export const fetchInstagramData = async (username: string) => {
  try {
    const response = await fetch(`${apiUrl}/tracking/${username}`, {
      credentials: "include", // Inclui cookies nas requisições
    });
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
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
