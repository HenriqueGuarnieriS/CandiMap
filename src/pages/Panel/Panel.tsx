import { person as personData } from "../../mockdata/person";
import Person from "../../interfaces/Person";
import { useState, useEffect } from "react";
import { fetchInstagramSocialBlade } from "../../services/socialBlade";
import { useQueries, UseQueryResult } from "@tanstack/react-query";
import Lottie from "lottie-react";
import { spinner } from "../../mockdata/spinner";
import CustomChart from "../../components/CustomChart";
import { instagramAccounts } from "../../mockdata/instagrams";
// Atualizando o componente Card para aceitar as props corretamente
const Card = ({ socialBlade, handleSelectedAccount }: any) => {
  return (
    <div
      onClick={() => handleSelectedAccount(socialBlade)} // Passa o socialBlade para a função de seleção
      className="text-white h-96 rounded-lg p-4 flex flex-col justify-around items-center text-center bg-neutral-700 cursor-pointer"
    >
      <img
        src={socialBlade?.general?.branding?.avatar}
        alt=""
        className="w-32 h-32 shadow-lg object-cover rounded-full"
      />
      <div className="flex flex-col px-4 py-1">
        <h4 className="text-xl ">{socialBlade?.id?.display_name}</h4>
        <h4 className="text-xl font-bold">@{socialBlade?.id?.username}</h4>

        <div className="flex flex-col  w-full my-3">
          <span className="font-semibold">Followers</span>
          <span className="text-yellow-400 font-bold text-3xl items-center justify-center">
            {socialBlade?.statistics?.total?.followers}
          </span>
        </div>
      </div>
    </div>
  );
};

const Panel = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(personData);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);

  const accountsQueries: UseQueryResult<any, Error>[] = useQueries({
    queries: filteredPeople.map((person) => {
      return {
        queryKey: [person.name],
        queryFn: () => fetchInstagramSocialBlade("socialblade"),
        enabled: !!person.username, // Habilita a query se o username existir
      };
    }),
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filtered = personData.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPeople(filtered);
  };

  const handleSelectedAccount = (account: any): void => {
    console.log(account);
    setSelectedAccount(account);
  };

  if (accountsQueries.some((query) => query.isLoading))
    return (
      <div>
        <Lottie animationData={spinner} />
      </div>
    );
  if (accountsQueries.some((query) => query.isError))
    return <div>Erro ao carregar os detalhes.</div>;

  return (
    <div className="flex flex-col w-full  min-h-screen  max-h-screen p-4 gap-4 bg-neutral-800  relative">
      <div className="shadow bg-white rounded-lg p-4 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar Candidato"
          className="p-2 border border-gray-400 rounded w-full"
        />
      </div>
      <div className="flex gap-4 max-h-screen overflow-hidden">
        <div className="w-[60%] h-full grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-neutral-700  scrollbar-track-neutral-900 scroll-smooth max-h-screen">
          {filteredPeople &&
            accountsQueries.map((query, index) => {
              const personData = query.data;
              return (
                <Card
                  key={`${filteredPeople[index].number}-${index}`}
                  socialBlade={personData}
                  handleSelectedAccount={handleSelectedAccount}
                />
              );
            })}
        </div>
        <div className="w-[40%] h-full max-h-screen shadow bg-neutral-700 rounded-lg p-4  overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-neutral-700  scrollbar-track-neutral-900 scroll-smooth  ">
          {selectedAccount ? (
            <div className="text-white">
              <h2 className="text-2xl font-bold">
                {selectedAccount.id?.display_name}
              </h2>
              <p className="text-xl">
                Username: {selectedAccount.id?.username}
              </p>
              <p className="text-xl">
                Followers: {selectedAccount.statistics?.total?.followers}
              </p>

              {/* Exibir o gráfico passando os dados diários */}
              <div className="flex flex-col gap-1 my-4">
                <CustomChart data={selectedAccount.daily.slice().reverse()} />{" "}
                {/* Certifique-se de inverter os dados */}
              </div>
            </div>
          ) : (
            <div className="text-white">Selecione uma conta</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Panel;
