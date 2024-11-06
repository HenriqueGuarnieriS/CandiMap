import React, { useState, Suspense } from "react";
import PersonCard from "../../components/PersonCard";
import { person as personData } from "../../mockdata/person";
import Person from "../../interfaces/Person";
import LoadingSpinner from "../../components/LoadingSpinner"; // Componente de loading
import useWindowWidth from "../../utils/useWindowWidth";

// Lazy load do componente PeopleMap
const PeopleMap = React.lazy(() => import("../../components/PeopleMap"));

const Home: React.FC = () => {
  const windowWidth = useWindowWidth();

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(personData);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filtered = personData.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPeople(filtered);
  };

  const handleSelectPerson = (person: Person) => {
    setSelectedPerson(person);
    setSearchTerm("");
  };

  const handleMarkerClick = (person: Person) => {
    setSelectedPerson(person);
    setSearchTerm("");
  };

  const renderMobile = () => {
    return (
      <div className="flex flex-col w-full min-h-screen p-4 gap-4 bg-neutral-800">
        <div className="flex flex-col gap-2 w-full">
          <div className="shadow bg-white rounded-lg p-4 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Buscar Candidato"
              className="p-2 border border-gray-400 rounded w-full"
            />
            {searchTerm && (
              <ul className="border border-gray-400 rounded bg-white shadow-md mb-4 fixed z-50">
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
          <div className="w-full h-[60vh]">
            <Suspense fallback={<LoadingSpinner />}>
              <PeopleMap onMarkerClick={handleMarkerClick} />
            </Suspense>
          </div>
          <div className="shadow bg-white rounded-lg p-4 h-full">
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
        <div className="w-[60%]">
          <Suspense fallback={<LoadingSpinner />}>
            <PeopleMap onMarkerClick={handleMarkerClick} />
          </Suspense>
        </div>
        <div className="flex flex-col gap-2 w-[40%]">
          <div className="shadow bg-white rounded-lg p-4 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Buscar Candidato"
              className="p-2 border border-gray-400 rounded w-full"
            />
            {searchTerm && (
              <ul className="border border-gray-400 rounded w-full bg-white shadow-md mb-4 fixed z-50">
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
          <div className="shadow bg-white rounded-lg p-4 h-full">
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

  return <>{windowWidth > 800 ? renderDesktop() : renderMobile()}</>;
};

export default Home;
