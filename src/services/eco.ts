import axios from "axios";
import { Indicador } from "../interfaces/Eco";

export const fetchEcoInd = async (): Promise<Indicador[]> => {
  //   const apiUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const urls = [
    "https://servicodados.ibge.gov.br/api/v3/agregados/1737/periodos/-12/variaveis/63?&localidades=N1",
    "https://servicodados.ibge.gov.br/api/v3/agregados/1736/periodos/-12/variaveis/44?&localidades=N1",
    "https://servicodados.ibge.gov.br/api/v3/agregados/3065/periodos/-12/variaveis/355?&localidades=N1",
  ];

  const result = await Promise.all(
    urls.map((url) => axios.get(url).then((response) => response.data[0]))
  );
  return result;
};
