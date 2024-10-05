import axios from "axios";

const BASE_URL =
  "https://divulgacandcontas.tse.jus.br/divulga/rest/v1/prestador/consulta"; // URL base do TSE

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
