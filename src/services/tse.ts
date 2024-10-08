import axios from "axios";

export const fetchCandidateDetails = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do candidato:", error);
    throw error;
  }
};
export const fetchCandidateContas = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do candidato:", error);
    throw error;
  }
};
export const fetchApuracaoVotos = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do candidato:", error);
    throw error;
  }
};
