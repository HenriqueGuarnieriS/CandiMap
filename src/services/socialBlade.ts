import axios from "axios";

// Função para montar a URL dinamicamente com base na cidade e estado
const montarUrl = (estado: string, cidade: string) => {
  // Transforme a cidade e estado para o formato esperado pela API
  const cidadeFormatada = cidade.split(" ").join("_");
  const estadoFormatado = estado.toUpperCase();

  // Monta a URL com base nos parâmetros dinâmicos
  return `https://s.glbimg.com/jo/el/2024/apuracao/1-turno/${estadoFormatado}/semantica.globo.com/base/Cidade_${cidadeFormatada}_${estadoFormatado}/vereador.json`;
};

export const fetchG1Apuracao = async (estado: string, cidade: string) => {
  try {
    // Montar a URL com base nos parâmetros
    const url = montarUrl(estado, cidade);
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do candidato:", error);
    throw error;
  }
};

export const fetchInstagramSocialBlade = async (username: string) => {
  try {
    const response = await axios.get(
      `https://fluxoapi-production.up.railway.app/socialblade/${username}`
    );
    // const response = await axios.get(
    //   `http://localhost:3000/socialblade/${username}`
    // );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do candidato:", error);
    throw error;
  }
};
