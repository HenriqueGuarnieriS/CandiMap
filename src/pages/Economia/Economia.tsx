import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Indicador } from "../../interfaces/Eco";
import { fetchEcoInd } from "../../services/eco";
import { ecoData } from "./data/quarters_values";
import Lottie from "lottie-react";
import ErrorComponent from "../../components/ErrorComponent";
import { spinner } from "../../mockdata/spinner";
import EcoChart from "./components/EcoChart";
import EcoIndChart from "./components/EcoIndChart";

const Economia = () => {
  const { data, isLoading, isError }: UseQueryResult<Indicador[], Error> =
    useQuery({
      queryKey: ["indicadors"],
      queryFn: fetchEcoInd,
    });

  if (isLoading)
    return (
      <div className="w-full h-fill flex justify-center items-center bg-neutral-800 min-h-screen">
        <Lottie animationData={spinner} />
      </div>
    );

  if (isError) return <ErrorComponent />;

  return (
    <div className="flex flex-col gap-4  w-full px-10 py-6 bg-neutral-800 max-h-screen text-white overflow-auto">
      <h1 className="text-center font-extrabold text-4xl py-4 bg-neutral-700 rounded-lg">
        Dados Economia
      </h1>
      <div className="flex flex-col py-4 bg-neutral-700 rounded-lg px-5 gap-2">
        <span className=" font-bold text-2xl"> Sobre os Dados Exibidos</span>
        <p className="font-lg max-w-[800px] ">
          Nesta página, você encontrará <b>indicadores econômicos</b> e
          informações relevantes sobre a economia, reunindo dados de diversas
          fontes confiáveis, como o IBGE, FGV e outras instituições. Os gráficos
          e análises apresentados abrangem produtividade, variações mensais e
          outros fatores que ajudam a entender o cenário econômico do Brasil.
          Novos dados e indicadores serão adicionados.
        </p>
      </div>
      <div className="flex flex-col gap-2  bg-neutral-700 p-2  rounded-lg ">
        <div className="flex flex-col bg-neutral-800 p-4">
          <h3 className=" text-3xl font-bold">
            Dados relacionados a produtividade
            <span className="ml-2 text-lg font-normal text-neutral-300">
              ( fonte:{" "}
              <a
                target="_blank"
                className=""
                href="https://ibre.fgv.br/observatorio-produtividade/temas/categorias/pt-trimestral"
              >
                observatório-produtividade - FGV
              </a>
              )
            </span>
          </h3>

          <EcoChart data={ecoData} />
        </div>
        <div className="flex flex-col bg-neutral-800 p-4">
          <h3 className=" text-3xl font-bold">
            Indicadores economicos
            <span className="ml-2 text-lg font-normal text-neutral-300">
              ( fonte:{" "}
              <a
                target="_blank"
                className=""
                href="https://www.ibge.gov.br/indicadores"
              >
                IBGE
              </a>
              )
            </span>
          </h3>

          {data && <EcoIndChart data={data} />}
        </div>
      </div>
    </div>
  );
};
export default Economia;
