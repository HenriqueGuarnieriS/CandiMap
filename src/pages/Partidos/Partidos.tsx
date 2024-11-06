import React, { useState, Suspense } from "react";
import { PartidoInterface } from "../../interfaces/Partidos";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchPartidosData } from "../../services/partidos";
import { FaInfinity } from "react-icons/fa6";
import LoadingSpinner from "../../components/LoadingSpinner";

// Imports dinâmicos
const PartidoCard = React.lazy(() => import("./components/PartidoCard"));
const SearchInput = React.lazy(() => import("../../components/SearchInput"));
const ErrorComponent = React.lazy(
  () => import("../../components/ErrorComponent")
);

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

  if (isLoading) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <LoadingSpinner />
      </Suspense>
    );
  }

  if (isError) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <ErrorComponent />
      </Suspense>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full px-4 lg:px-10 py-6 bg-neutral-800 max-h-screen text-white overflow-auto">
      <h1 className="text-center font-extrabold text-4xl py-4 bg-neutral-700 rounded-lg">
        Vereadores por partido (2024)
      </h1>

      {/* Campo de pesquisa */}
      <div className="sticky -top-6 z-10 bg-neutral-800 py-2">
        <Suspense fallback={<div>Loading search...</div>}>
          <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
        </Suspense>
      </div>

      {/* Grid de partidos filtrados */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
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
            <Suspense
              key={partido.sigla_partido}
              fallback={<div>Loading partido...</div>}
            >
              <PartidoCard partido={partido} />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partidos;
