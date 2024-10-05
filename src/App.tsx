import React, { useState } from "react";
import PeopleMap from "./components/PeopleMap";
import Person from "./interfaces/Person";
import PersonCard from "./components/PersonCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const handleMarkerClick = (person: Person) => {
    console.log("Pessoa clicada:", person);
    setSelectedPerson(person); // Armazena a pessoa selecionada no estado
  };
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex  w-[100vw]  h-screen p-4 gap-4 bg-neutral-800">
        <div className=" w-[60vw]">
          <PeopleMap onMarkerClick={handleMarkerClick} />
        </div>

        <div className="w-[40vw] shadow bg-white rounded-lg ">
          <PersonCard person={selectedPerson} />
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
