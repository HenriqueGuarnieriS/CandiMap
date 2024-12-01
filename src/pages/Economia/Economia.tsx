import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Indicador } from "../../interfaces/Eco";
import { fetchEcoInd } from "../../services/eco";
import { ecoData } from "./data/quarters_values";
import Lottie from "lottie-react";
import ErrorComponent from "../../components/ErrorComponent";
import { spinner } from "../../mockdata/spinner";
import EcoChart from "./components/EcoChart";
import EcoIndChart from "./components/EcoIndChart";
import HeaderPage from "../../components/HeaderPage";
import Description from "../../components/Description";

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

  const description = () => (
    <div>
      Nesta página, você encontrará <b>indicadores econômicos</b> e informações
      relevantes sobre a economia, reunindo dados de diversas fontes confiáveis,
      como o IBGE, FGV e outras instituições. Os gráficos e análises
      apresentados abrangem produtividade, variações mensais e outros fatores
      que ajudam a entender o cenário econômico do Brasil. Novos dados e
      indicadores serão adicionados.
    </div>
  );

  return (
    <div className="flex flex-col gap-4  w-full px-2  md:px-10 py-6 bg-neutral-800 max-h-screen text-white overflow-auto">
      <HeaderPage title="Dados Economia" />
      <Description description={description()} />

      <div className="flex flex-col gap-2  bg-neutral-700 p-2  rounded-lg ">
        <div className="flex flex-col bg-neutral-800 p-2 lg:p-4">
          <div className="flex flex-col mb-2">
            <h3 className=" text-lg lg:text-3xl font-bold ">
              Dados relacionados a produtividade
            </h3>
            <span className=" text-sm lg:text-lg font-normal text-neutral-300">
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
          </div>

          <EcoChart data={ecoData} />
        </div>
        <div className="flex flex-col bg-neutral-800 p-2 md:p-4">
          <div className="flex flex-col mb-2">
            <h3 className=" text-lg lg:text-3xl font-bold ">
              Indicadores economicos
            </h3>
            <span className=" text-sm lg:text-lg font-normal text-neutral-300">
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
          </div>

          {data && <EcoIndChart data={data} />}
        </div>
      </div>
    </div>
  );
};
export default Economia;
