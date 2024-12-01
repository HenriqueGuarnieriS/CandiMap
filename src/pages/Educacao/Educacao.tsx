import { UseQueryResult, useQuery } from "@tanstack/react-query";
import EduEscolasEstado from "../../interfaces/Edu";
import Lottie from "lottie-react";
import { spinner } from "../../mockdata/spinner";
import ErrorComponent from "../../components/ErrorComponent";
import { fetchEduEscolas } from "../../services/edu";
import EduCharts from "./components/EduCharts";
import { Suspense, useState } from "react";
import SearchInput from "../../components/SearchInput";
import Description from "../../components/Description";
import HeaderPage from "../../components/HeaderPage";

const Educacao = () => {
  const [filteredStates, setFilteredStates] = useState<EduEscolasEstado[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState<EduEscolasEstado>();
  const [selectedCat, setSelectedCat] = useState<string>("Estrutura");
  const categories = ["Água", "Estrutura", "Energia"];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = data?.filter((estado) =>
      estado.id.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredStates(filtered);
    if (filtered?.length === 1) setSelectedState(filtered[0]);
  };

  const handleSelectedState = (estado: EduEscolasEstado) => {
    setSelectedState(estado);

    setSearchTerm("");
  };

  const handleSelectCat = (cat: string) => {
    setSelectedCat(cat);
  };

  const {
    data,
    isLoading,
    isError,
  }: UseQueryResult<EduEscolasEstado[], Error> = useQuery({
    queryKey: ["edu-escola-estados"],
    queryFn: () =>
      fetchEduEscolas().then((data) => {
        setFilteredStates(data); // Define os partidos filtrados inicialmente
        setSelectedState(data[0]);
        return data;
      }),
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
      O Censo Escolar é o principal levantamento de dados
      estatístico-educacionais do Brasil, realizado anualmente e coordenado pelo
      Inep. Ele conta com a colaboração das secretarias estaduais e municipais
      de Educação, além da participação de escolas públicas e privadas de todo o
      país. Nesta página, as informações estão organizadas por estado, e no
      momento estão disponíveis 3 categorias principais: <b>Água</b>,{" "}
      <b>Estrutura</b> e <b>Energia</b>. Explore os dados para conhecer mais
      sobre a infraestrutura educacional no Brasil
    </div>
  );

  return (
    <div className="flex flex-col gap-4 w-full px-4 lg:px-10 py-6 bg-neutral-800 max-h-screen text-white overflow-auto">
      <HeaderPage title="Dados Educação INEP" />
      <Description description={description()} />
      <div className="sticky -top-6 z-10 bg-neutral-800 py-2">
        <Suspense fallback={<div>Loading search...</div>}>
          <SearchInput
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            placeholder="Buscar estado"
          />
        </Suspense>
      </div>
      <div className="shadow rounded-lg flex flex-col bg-neutral-700 p-2 ">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar scrollbar-thumb-neutral-700 scrollbar-track-neutral-900 scroll-smooth ">
          {filteredStates &&
            filteredStates.map((estado) => (
              <button
                key={estado.id}
                onClick={() => handleSelectedState(estado)}
                className={`px-5 py-1 rounded-lg text-bold ${
                  searchTerm.toLocaleUpperCase() === estado.id ||
                  selectedState?.id === estado.id
                    ? "bg-missaoCores-missaoYellow text-white"
                    : "bg-neutral-900 text-white"
                } hover:bg-missaoCores-missaoYellow hover:text-white`}
              >
                {estado.id}
              </button>
            ))}
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        {categories.map((cat) => (
          <button
            onClick={() => handleSelectCat(cat)}
            className={`font-lg px-4 py-1 ${
              selectedCat === cat
                ? " bg-black  text-white font-semibold "
                : "bg-missaoCores-missaoYellow text-black font-semibold hover:bg-black hover:text-white"
            } rounded-lg `}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="shadow rounded-lg flex flex-col bg-neutral-700 p-2 lg:p-4 ">
        <div className="flex flex-col gap-4 overflow-x-auto  scrollbar scrollbar-thumb-neutral-700 scrollbar-track-neutral-900 scroll-smooth ">
          {selectedState && selectedCat === "Estrutura" && (
            <div className="flex flex-col bg-neutral-800 p-2 lg:p-4">
              <h3 className=" text-xl lg:text-3xl font-bold">
                Dados relacionados a estrutura
              </h3>

              <EduCharts
                data={selectedState.laboratorio_ciencias}
                topic={"Laboratório de ciências"}
              />
              <EduCharts
                data={selectedState.laboratorio_informatica}
                topic={"Laboratório de informática"}
              />
              <EduCharts
                data={selectedState.quadra_esportes}
                topic={"Quadra de esporte"}
              />
              <EduCharts data={selectedState.refeitorio} topic={"Refeitório"} />
              <EduCharts
                data={selectedState.acessibilidade_inexistente}
                topic={"Acessibilidade inexistente"}
              />
              <EduCharts data={selectedState.banheiro} topic={"Banheiro"} />
              <EduCharts
                data={selectedState.banheiro_pne}
                topic={"Banheiro PNE"}
              />
            </div>
          )}
          {selectedState && selectedCat === "Água" && (
            <div className="flex flex-col bg-neutral-800 p-2 lg:p-4">
              <h3 className=" text-xl lg:text-3xl font-bold">
                Dados relacionados a água
              </h3>

              <EduCharts
                data={selectedState.agua_potavel}
                topic={"Água potável"}
              />
              <EduCharts
                data={selectedState.agua_inexistente}
                topic={"Água inexistente"}
              />
            </div>
          )}
          {selectedState && selectedCat === "Energia" && (
            <div className="flex flex-col bg-neutral-800 p-2 lg:p-4">
              <h3 className=" text-xl lg:text-3xl font-bold">
                Dados relacionados a energia
              </h3>

              <EduCharts
                data={selectedState.energia_inexistente}
                topic={"Energia inexistente"}
              />
              <EduCharts
                data={selectedState.energia_rede_publica}
                topic={"Energia rede pública"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Educacao;
