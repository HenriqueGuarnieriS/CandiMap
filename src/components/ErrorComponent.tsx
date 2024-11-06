import { BiSolidError } from "react-icons/bi";

const ErrorComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen max-h-screen p-4 gap-4 bg-neutral-800 relative text-white">
      <BiSolidError className=" w-32 h-32 text-missaoCores-missaoYellow" />
      <span className="text-3xl font-bold">
        Ocorreu um erro. Atualize a página.
      </span>
    </div>
  );
};

export default ErrorComponent;
