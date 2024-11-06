import React, { useState, Suspense, useCallback } from "react";
import { MdPerson } from "react-icons/md";
import { PartidoInterface } from "../../../interfaces/Partidos";
import { GrAnalytics } from "react-icons/gr";
import useWindowWidth from "../../../utils/useWindowWidth";
import LoadingSpinner from "../../../components/LoadingSpinner";

// Lazy load dos componentes Modal e InfoCharts
const PartidoEstadoChart = React.lazy(() => import("./PartidosChart"));
const Modal = React.lazy(() => import("../../../components/Modal"));
const InfoCharts = React.lazy(() => import("./InfoCharts"));

interface PartidoCardProps {
  partido: PartidoInterface;
}

const PartidoCard: React.FC<PartidoCardProps> = ({ partido }) => {
  const windowWidth = useWindowWidth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir e fechar o modal usando `useCallback`
  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  return (
    <div className="shadow rounded-lg flex flex-col bg-neutral-700">
      <div className="grid grid-cols-2 place-items-center text-2xl font-bold p-4 gap-4">
        <div className="bg-neutral-900 w-full text-center h-40 shadow flex items-center justify-center rounded-lg">
          <span className="text-xl md:text-4xl">{partido.sigla_partido}</span>
        </div>
        <div className="bg-neutral-900 w-full text-center h-40 shadow flex items-center justify-center rounded-lg">
          <span className="text-2xl md:text-5xl text-yellow-300 flex items-center gap-2">
            {partido.total_eleitos_nacional}
            <MdPerson className="w-8 h-8 md:w-14 md:h-14" />
          </span>
        </div>
      </div>
      <div className="flex justify-start px-5">
        <button
          className="bg-neutral-900 hover:bg-missaoCores-missaoYellow hover:text-neutral-800 text-white py-2 px-4 mt-4 self-center flex items-center gap-2 font-semibold rounded-xl"
          onClick={toggleModal}
        >
          Análise Demográfica
          <GrAnalytics />
        </button>
      </div>

      {/* Suspense para carregar Modal e InfoCharts dinamicamente */}
      <Suspense fallback={<LoadingSpinner />}>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={toggleModal} position="center">
            <div className="text-white text-center">
              <h2 className="text-4xl font-bold py-3">
                {partido.sigla_partido}
              </h2>
              <Suspense fallback={<LoadingSpinner />}>
                <InfoCharts data={partido} />
              </Suspense>
            </div>
          </Modal>
        )}
      </Suspense>

      {/* Gráfico para o partido específico com Suspense */}
      <Suspense fallback={<LoadingSpinner />}>
        <PartidoEstadoChart
          data={partido.eleitos_por_estado}
          orientation={windowWidth >= 800 ? "horizontal" : "vertical"}
        />
      </Suspense>
    </div>
  );
};

export default React.memo(PartidoCard);
