import React from "react";
import { MdPerson } from "react-icons/md";
import PartidoEstadoChart from "./PartidosChart";
import { PartidoInterface } from "../../../interfaces/Partidos";

interface PartidoCardProps {
  partido: PartidoInterface;
}

const PartidoCard: React.FC<PartidoCardProps> = React.memo(({ partido }) => (
  <div className="shadow rounded-lg flex flex-col bg-neutral-700">
    <div className="grid grid-cols-2 place-items-center text-2xl font-bold p-4 gap-4">
      <div className="bg-neutral-900 w-full text-center h-40 shadow flex items-center justify-center rounded-lg">
        <span className="text-4xl">{partido.sigla_partido}</span>
      </div>
      <div className="bg-neutral-900 w-full text-center h-40 shadow flex items-center justify-center rounded-lg">
        <span className="text-5xl text-yellow-300 flex items-center gap-2">
          {partido.total_eleitos_nacional}
          <MdPerson className="w-14 h-14" />
        </span>
      </div>
    </div>

    {/* Gráfico para o partido específico */}
    <PartidoEstadoChart data={partido.eleitos_por_estado} />
  </div>
));

export default PartidoCard;
