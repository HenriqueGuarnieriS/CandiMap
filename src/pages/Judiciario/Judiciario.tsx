import { fetchFolhasTribunais } from "../../services/judiciario";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import ErrorComponent from "../../components/ErrorComponent";
import { spinner } from "../../mockdata/spinner";

const Judiciario = () => {
  const { data, isLoading, isError }: UseQueryResult<any, Error> = useQuery({
    queryKey: ["folha-pagamento"],
    queryFn: fetchFolhasTribunais,
  });

  if (isLoading)
    return (
      <div className="w-full h-fill flex justify-center items-center bg-neutral-800 min-h-screen">
        <Lottie animationData={spinner} />
      </div>
    );
  const formatToBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };
  if (isError) return <ErrorComponent />;
  return (
    <div className="flex flex-col gap-4 w-full px-4 py-6 bg-neutral-800 max-h-screen text-white overflow-auto">
      <h1 className="text-start font-extrabold text-4xl py-4 bg-neutral-700 rounded-lg px-2">
        Dados Tribunais
      </h1>
      <div className="flex flex-col py-4 bg-neutral-700 rounded-lg px-5 gap-2">
        <span className=" font-bold text-2xl"> Sobre os Dados Exibidos</span>
        <p className="font-lg max-w-[800px] ">
          Nesta página, você encontra os 10 maiores valores pagos na folha de
          pagamento de cada tribunal listado: <b>TJRS</b>, <b>TJPR</b>,
          <b>TJMA</b> e <b>TJMG</b>. Os valores apresentados correspondem ao
          total recebido, que incluem as verbas eventuais, conforme informações
          fornecidas diretamente pelos próprios tribunais, em cumprimento à
          Resolução nº 102/2009 do CNJ. Os dados são organizados mensalmente e,
          no momento, estão disponíveis apenas as informações referentes ao mês{" "}
          <b>10/2024</b>.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        {data &&
          data.map((tribunal: any) => (
            <div className=" flex flex-col bg-neutral-700 min-h-96 rounded-lg  gap-4">
              <h3 className="text-2xl font-semibold text-center bg-neutral-900 py-1 ">
                {tribunal[0]?.entity}
              </h3>
              <div className="p-2 flex flex-col  gap-2 ">
                <span className=" italic text-missaoCores-missaoYellow">
                  * Mês de referência 10/2024
                </span>
                {tribunal.map((person: any) => (
                  <div className=" flex justify-between items-center shadow-lg px-4 py-2 bg-neutral-900 rounded-lg">
                    <div className="flex flex-col">
                      <span>{person.name}</span>
                      <span className=" text-neutral-400">
                        {person.position}
                      </span>
                    </div>
                    <span className=" text-missaoCores-missaoYellow font-semibold">
                      {formatToBRL(person.earnings[0].amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Judiciario;
