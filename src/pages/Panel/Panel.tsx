import { useState, useEffect } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import Lottie from "lottie-react";
import { spinner } from "../../mockdata/spinner";
import CustomChart from "../../components/CustomChart";
import { MdAccountCircle } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import AccountCard from "./components/AccountCard";
import { generateToken } from "../../services/auth";
import { fetchInstagramData } from "../../services/socialBlade";
import InstagramProfile from "../../interfaces/Instagram";

const Panel = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPeople, setFilteredPeople] = useState<InstagramProfile[]>();
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    generateToken();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const {
    data: accountsQueries,
    isLoading,
    isError,
  }: UseQueryResult<InstagramProfile[], Error> = useQuery({
    queryKey: ["instagram-data"],
    queryFn: () =>
      fetchInstagramData().then((data) => {
        setFilteredPeople(data);
        return data;
      }),
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filtered = accountsQueries?.filter((accounts) =>
      accounts.id.display_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPeople(filtered);
  };

  const handleSelectedAccount = (account: any): void => {
    setSelectedAccount(account);
    setIsModalOpen(true); // abre o modal quando uma conta é selecionada
  };

  const closeModal = () => {
    setIsModalOpen(false); // fecha o modal
  };

  if (isLoading)
    return (
      <div className="w-full h-fill flex justify-center items-center bg-neutral-800 min-h-screen">
        <Lottie animationData={spinner} />
      </div>
    );
  if (isError) return <div>Erro ao carregar os detalhes.</div>;

  // Determine if the layout should be desktop or mobile based on screen width
  const isDesktop = windowWidth >= 800;
  return (
    <div className="flex flex-col w-full min-h-screen max-h-screen p-4 gap-4 bg-neutral-800 relative">
      <div className="shadow bg-neutral-700 rounded-lg p-4 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar conta"
          className="p-2 border border-neutral-900 rounded w-full bg-neutral-800 text-white"
        />
      </div>

      {isDesktop ? (
        // Desktop Layout
        <div className="flex gap-4 max-h-screen overflow-hidden">
          <div className="w-[60%] h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto scrollbar scrollbar-thumb-neutral-700 scrollbar-track-neutral-900 scroll-smooth max-h-screen">
            {filteredPeople?.map((account, index) => {
              return (
                <AccountCard
                  key={`${account.id.username}-${index}`}
                  socialBlade={account}
                  handleSelectedAccount={handleSelectedAccount}
                  account={selectedAccount}
                />
              );
            })}
          </div>
          <div className="w-[40%] h-full shadow bg-neutral-700 rounded-lg p-4 overflow-y-auto scrollbar scrollbar-thumb-neutral-700 scrollbar-track-neutral-900 scroll-smooth">
            {selectedAccount ? (
              <div className="text-white">
                <h2 className="text-2xl font-bold">
                  {selectedAccount.id?.display_name}
                </h2>
                <p className="text-xl">@{selectedAccount.id?.username}</p>
                <p className="text-xl">
                  Followers:{" "}
                  {selectedAccount.statistics?.total?.followers.toLocaleString(
                    "pt-BR"
                  )}
                </p>
                <p className=" text-missaoCores-missaoYellow  mt-4 italic text-end ">
                  Os dados referem-se aos últimos 30 dias.
                </p>
                <div className="flex flex-col gap-1 my-4">
                  <CustomChart data={selectedAccount.daily.slice().reverse()} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full w-full items-center text-white gap-3 p-4">
                <MdAccountCircle className="text-9xl" />
                <span className="text-5xl font-bold ">Selecione uma conta</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Mobile Layout
        <div className="grid-cols-1 p-4 overflow-y-auto scrollbar scrollbar-thumb-neutral-700 scrollbar-track-neutral-900 scroll-smooth ">
          {filteredPeople?.map((account, index) => {
            return (
              <AccountCard
                key={`${account.id.username}-${index}`}
                socialBlade={account}
                handleSelectedAccount={handleSelectedAccount}
                account={selectedAccount}
                isMobile={true}
              />
            );
          })}

          {/* Modal for selected account in mobile */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
              <div className="bg-neutral-800 text-white rounded-lg p-6 w-[90%] max-h-[90%] overflow-auto scrollbar scrollbar-thumb-neutral-700 scrollbar-track-neutral-900 scroll-smooth relative">
                <button
                  className="absolute top-3 right-3 text-2xl"
                  onClick={closeModal}
                >
                  <AiOutlineClose />
                </button>
                {selectedAccount && (
                  <>
                    <h2 className="text-2xl font-bold mb-2">
                      {selectedAccount.id?.display_name}
                    </h2>
                    <p className="text-xl">@{selectedAccount.id?.username}</p>
                    <p className="text-xl mb-4">
                      Followers:{" "}
                      {selectedAccount.statistics?.total?.followers.toLocaleString(
                        "pt-BR"
                      )}
                    </p>

                    {/* Gráficos exibidos no modal */}
                    <div className="flex flex-col gap-1 my-4">
                      <CustomChart
                        data={selectedAccount.daily.slice().reverse()}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Panel;
