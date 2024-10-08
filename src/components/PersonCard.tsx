import React, { useEffect, useState } from "react";
import Person from "../interfaces/Person";
import { useQuery } from "@tanstack/react-query";
import { fetchCandidateDetails } from "../services/tse";
import { CandidateDetails } from "../interfaces/TSEDetails";
import { PrestacaoDeContas } from "../interfaces/TSEContas";

import { spinner } from "../mockdata/spinner";
import Lottie from "lottie-react";
interface PersonCardProps {
  person: Person | null;
}

const CardDetails = () => {
  return <div></div>;
};

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Função para atualizar a largura da janela
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Adicionar o listener de redimensionamento
    window.addEventListener("resize", handleResize);

    // Limpar o listener ao desmontar o componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const candiInfoUrl = person?.tseUrls?.candiInfo;
  const candiContasUrl = person?.tseUrls?.candiContas;
  const formatCurrency = (value: number | undefined) => {
    if (value) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    }
  };
  // Condicionalmente dispara a query apenas se o candidateNumber estiver definido
  const {
    data: candidateDetails,
    error,
    isLoading,
  } = useQuery<CandidateDetails>({
    queryKey: [`${person?.name}-${person?.number}-info`],
    queryFn: () => fetchCandidateDetails(candiInfoUrl!),
    enabled: !!candiInfoUrl, // Habilita a query apenas se candidateNumber estiver definido
  });

  const {
    data: candidateContas,
    error: errorContas,
    isLoading: isLoadingContas,
  } = useQuery<PrestacaoDeContas>({
    queryKey: [`${person?.name}-${person?.number}-contas`],
    queryFn: () => fetchCandidateDetails(candiContasUrl!),
    enabled: !!candiContasUrl, // Habilita a query apenas se candidateNumber estiver definido
  });

  const renderDesktop = () => {
    return (
      person && (
        <div className=" flex flex-col h-full w-full relative shadow-lg ">
          <img
            src={person?.banner}
            alt=""
            className="w-full rounded-lg h-full"
          />

          <div className="absolute bottom-0 h-[40vh] bg-opacity-90 bg-white w-full overflow-y-auto shadow">
            {candidateDetails && (
              <div className="px-3  py-4 flex flex-col gap-1 ">
                <div className="flex flex-col gap-1 border-b-2 pb-2 border-gray-300">
                  <h2 className="font-bold text-3xl ">Gastos</h2>

                  <div className=" flex  gap-2 w-full justify-between">
                    <div className="flex flex-col ">
                      <span className="font-semibold  text-xl">Limite</span>
                      <span className=" text-orange-500 text-2xl font-bold ">
                        {formatCurrency(
                          candidateContas?.despesas.valorLimiteDeGastos
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col  ">
                      <span className="font-semibold text-xl">Recebido</span>
                      <span className=" text-orange-500 text-2xl font-bold ">
                        {formatCurrency(
                          candidateContas?.dadosConsolidados.totalRecebido
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col ">
                      <span className="font-semibold  text-xl">Usado</span>
                      <span className=" text-orange-500 text-2xl font-bold ">
                        {formatCurrency(
                          candidateContas?.despesas.totalDespesasPagas
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className=" flex flex-col gap-1 w-full overflow-hidden">
                  <h2 className="font-bold text-3xl">Rankings</h2>
                  <span className="font-bold text-lg">Doadores</span>
                  <div className="flex flex-col  ">
                    {candidateContas?.rankingDoadores.map((doador) => (
                      <div className="flex flex-col">
                        <span className="">{doador.nome}</span>
                        <span className="text-sm">{doador.cpfCnpj}</span>
                        <span className=" text-orange-500 text-xl font-bold ">
                          {formatCurrency(doador.valor)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    );
  };

  const renderMobile = () => {
    return (
      person && (
        <div className=" flex flex-col h-[660px] w-full relative shadow-lg ">
          <img
            src={person?.banner}
            alt=""
            className="w-full rounded-lg h-full"
          />

          <div className="absolute bottom-0 h-[40vh] bg-opacity-95 bg-white w-full overflow-y-auto shadow">
            {candidateDetails && (
              <div className="px-3  py-4 flex flex-col gap-1 ">
                <div className="flex flex-col gap-1 border-b-2 pb-2 border-gray-300">
                  <h2 className="font-bold text-2xl ">Gastos</h2>

                  <div className=" flex  gap-2 w-full justify-between">
                    <div className="flex flex-col ">
                      <span className="font-semibold  text-lg">Limite</span>
                      <span className=" text-orange-500  font-bold ">
                        {formatCurrency(
                          candidateContas?.despesas.valorLimiteDeGastos
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col  ">
                      <span className="font-semibold text-lg">Recebido</span>
                      <span className=" text-orange-500  font-bold ">
                        {formatCurrency(
                          candidateContas?.dadosConsolidados.totalRecebido
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col ">
                      <span className="font-semibold  text-lg">Usado</span>
                      <span className=" text-orange-500  font-bold ">
                        {formatCurrency(
                          candidateContas?.despesas.totalDespesasPagas
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className=" flex flex-col gap-1 w-full overflow-hidden">
                  <h2 className="font-bold text-2xl">Rankings</h2>
                  <span className="font-semibold text-lg">Doadores</span>
                  <div className="flex flex-col  ">
                    {candidateContas?.rankingDoadores.map((doador) => (
                      <div className="flex flex-col">
                        <span>{doador.nome}</span>
                        <span className="text-sm">{doador.cpfCnpj}</span>
                        <span className=" text-orange-500 text-lg font-bold ">
                          {formatCurrency(doador.valor)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    );
  };

  if (isLoading || isLoadingContas)
    return (
      <div>
        <Lottie animationData={spinner} />
      </div>
    );
  if (error || errorContas) return <div>Erro ao carregar os detalhes.</div>;

  return <>{windowWidth > 800 ? renderDesktop() : <>{renderMobile()}</>}</>;
};

export default PersonCard;
