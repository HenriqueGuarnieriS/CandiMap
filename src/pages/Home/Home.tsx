import React, { useEffect, useState } from "react";
import PeopleMap from "../../components/PeopleMap";
import PersonCard from "../../components/PersonCard";
import { person as personData } from "../../mockdata/person";
import Person from "../../interfaces/Person";

const Home: any = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(personData); // Estado para armazenar as pessoas filtradas

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

  // Função para lidar com a busca
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    // Filtra as pessoas com base no termo de busca
    const filtered = personData.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPeople(filtered);
  };

  // Função para lidar com a seleção de um candidato no resultado da busca
  const handleSelectPerson = (person: Person) => {
    setSelectedPerson(person);
    setSearchTerm(""); // Limpa o campo de busca após a seleção
  };

  // Função para lidar com o clique em um marcador no mapa
  const handleMarkerClick = (person: Person) => {
    setSelectedPerson(person);
    setSearchTerm("");
  };

  const renderMobile = () => {
    return (
      <div className="flex flex-col w-full min-h-screen p-4 gap-4 bg-neutral-800">
        {/* Painel à direita com busca e detalhes */}
        <div className="flex flex-col gap-2 w-full">
          <div className=" shadow bg-white rounded-lg p-4 relative">
            {/* Campo de busca */}
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Buscar Candidato"
              className="p-2 border border-gray-400 rounded w-full "
            />

            {/* Resultados da busca */}
            {searchTerm && (
              <ul className="border border-gray-400 rounded a bg-white shadow-md mb-4 fixed  z-50">
                {filteredPeople.map((person) => (
                  <li
                    key={person.number}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSelectPerson(person)}
                  >
                    {person.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Mapa */}
          <div className="w-full h-[60vh]">
            <PeopleMap onMarkerClick={handleMarkerClick} />
          </div>

          <div className=" shadow bg-white rounded-lg p-4 h-full">
            {/* Exibe os detalhes do PersonCard após seleção */}
            {selectedPerson ? (
              <PersonCard person={selectedPerson} />
            ) : (
              <div className="text-center text-gray-500">
                Selecione um candidato para ver os detalhes
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDesktop = () => {
    return (
      <div className="flex w-full h-screen p-4 gap-4 bg-neutral-800">
        {/* Mapa */}
        <div className="w-[60%]">
          <PeopleMap onMarkerClick={handleMarkerClick} />
        </div>

        {/* Painel à direita com busca e detalhes */}
        <div className="flex flex-col gap-2 w-[40%]">
          <div className=" shadow bg-white rounded-lg p-4 relative">
            {/* Campo de busca */}
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Buscar Candidato"
              className="p-2 border border-gray-400 rounded w-full "
            />

            {/* Resultados da busca */}
            {searchTerm && (
              <ul className="border border-gray-400 rounded w-full bg-white shadow-md mb-4 fixed  z-50">
                {filteredPeople.map((person) => (
                  <li
                    key={person.number}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSelectPerson(person)}
                  >
                    {person.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className=" shadow bg-white rounded-lg p-4 h-full">
            {/* Exibe os detalhes do PersonCard após seleção */}
            {selectedPerson ? (
              <PersonCard person={selectedPerson} />
            ) : (
              <div className="text-center text-gray-500">
                Selecione um candidato para ver os detalhes
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  return <>{windowWidth > 800 ? renderDesktop() : <>{renderMobile()}</>}</>;
};
export default Home;
