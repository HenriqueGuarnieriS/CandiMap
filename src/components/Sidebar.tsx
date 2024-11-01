import { GiBrazil } from "react-icons/gi";
import { MdHowToVote, MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import useWindowWidth from "../utils/useWindowWidth";
import { AiFillProject } from "react-icons/ai";

const renderMobile = () => {
  return (
    <div className=" bg-neutral-700 flex   w-full ">
      <nav className="  px-4 py-2 ">
        <ul className="flex  gap-4 w-full  justify-center items-center   ">
          <li className="font-semibold  bg-neutral-800 text-yellow-500  px-3 py-2 shadow rounded-md w-full flex flex-col items-center">
            <Link className="z-50 flex flex-col  items-center text-sm " to="/">
              <MdSpaceDashboard className="w-7 h-7" />
              Painel
            </Link>
          </li>
          <li className="font-semibold bg-neutral-800 text-yellow-500 px-3 py-2 shadow rounded-md w-full flex flex-col items-center">
            <Link
              className="z-50 flex flex-col  items-center text-sm "
              to="/mapa"
            >
              <GiBrazil className="w-7 h-7" />
              Mapa
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
const renderDesktop = () => {
  return (
    <div className="w-24 bg-neutral-700  flex flex-col items-center h-screen ">
      <nav className=" w-16  py-4 ">
        <ul className=" text-sm flex flex-col gap-4 w-full justify-center items-center text-center">
          <li className="font-semibold  bg-neutral-800  text-missaoCores-missaoYellow  p-2 shadow rounded-md w-full flex flex-col items-center">
            <Link className="z-50 flex flex-col  items-center" to="/">
              <MdSpaceDashboard className="text-3xl" />
              Painel
            </Link>
          </li>
          <li className="font-semibold bg-neutral-800  text-missaoCores-missaoYellow p-2 shadow rounded-md w-full flex flex-col items-center">
            <Link className="z-50 flex flex-col  items-center" to="/partidos">
              <AiFillProject className="text-3xl" />
              Partidos
            </Link>
          </li>
          {/* <li className="font-semibold bg-neutral-800  text-missaoCores-missaoYellow p-2 shadow rounded-md w-full flex flex-col items-center">
            <Link className="z-50 flex flex-col  items-center" to="/eleicoes">
              <MdHowToVote className="text-3xl" />
              Eleições
            </Link>
          </li> */}
          <li className="font-semibold bg-neutral-800  text-missaoCores-missaoYellow p-2 shadow rounded-md w-full flex flex-col items-center">
            <Link className="z-50 flex flex-col  items-center" to="/mapa">
              <GiBrazil className="text-3xl" />
              Mapa
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const Sidebar = () => {
  // useEffect(() => {
  //   const handlePopState = (e: PopStateEvent) => {
  //     console.log(e);
  //   };
  //   console.log(window.location.href);
  //   window.addEventListener("popstate", handlePopState);
  // }, [window.location.href]);

  const windowWidth = useWindowWidth();

  return <>{windowWidth > 800 ? renderDesktop() : renderMobile()}</>;
};

export default Sidebar;
