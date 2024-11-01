import React, { useState } from "react";
import { PartidoInterface } from "../../interfaces/Partidos";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchPartidosData } from "../../services/partidos";
import PartidoCard from "./components/PartidoCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import SearchInput from "../../components/SearchInput";
import { FaInfinity } from "react-icons/fa6";

const Partidos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPartidos, setFilteredPartidos] =
    useState<PartidoInterface[]>();

  const {
    data,
    isLoading,
    isError,
  }: UseQueryResult<PartidoInterface[], Error> = useQuery({
    queryKey: ["partidos-data"],
    queryFn: () =>
      fetchPartidosData().then((data) => {
        setFilteredPartidos(data); // Define os partidos filtrados inicialmente
        return data;
      }),
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = data?.filter((partido) =>
      partido.sigla_partido.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPartidos(filtered);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Erro ao carregar os detalhes.</div>;

  return (
    <div className="flex flex-col gap-4 w-full px-4 lg:px-10  py-6 bg-neutral-800 max-h-screen text-white overflow-auto">
      <h1 className="text-center font-extrabold text-4xl py-4 bg-neutral-700 rounded-lg">
        Vereadores por partido (2024)
      </h1>

      {/* Campo de pesquisa */}
      <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
      {/* https://static.poder360.com.br/2023/11/missao-partido-mbl-1.png */}
      {/* https://static.poder360.com.br/2023/11/missao-logo-2.png */}

      {/* <PartidoCard key={partido.sigla_partido} partido={partido} /> */}
      {/* Grid de partidos filtrados */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
          {!searchTerm && (
            <div className="shadow rounded-lg flex flex-col bg-neutral-700">
              <div className="grid grid-cols-2 place-items-center text-2xl font-bold p-4 gap-4">
                <div
                  className="bg-neutral-900 w-full text-center h-40 shadow flex items-center justify-center rounded-lg"
                  style={{
                    backgroundImage:
                      "url('https://th.bing.com/th/id/OIP.G5gk6E_3g4aqrLs0ZbqrEwHaEI?rs=1&pid=ImgDetMain')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Conteúdo opcional ou texto sobre a imagem */}
                </div>
                <div className="bg-neutral-900 w-full text-center h-40 shadow flex items-center justify-center rounded-lg">
                  <span className="text-5xl text-yellow-300 flex items-center gap-2">
                    <FaInfinity className="w-24 h-24" />
                  </span>
                </div>
              </div>
              <img
                className="h-[360px] rounded-b-lg"
                src="https://static.poder360.com.br/2023/11/missao-partido-mbl-1.png"
              />
            </div>
          )}
          {filteredPartidos?.map((partido) => (
            <PartidoCard key={partido.sigla_partido} partido={partido} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partidos;
