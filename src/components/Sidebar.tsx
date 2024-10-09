import { GiBrazil } from "react-icons/gi";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import useWindowWidth from "../utils/useWindowWidth";

const renderMobile = () => {
  return (
    <div className=" bg-yellow-400 flex   w-full ">
      <nav className="  px-4 w-full ">
        <ul className="flex  gap-4 w-full py-1  ">
          <li className="">
            <Link
              className="z-50 font-semibold bg-white p-2 shadow rounded-md w-full flex flex-col items-center"
              to="/"
            >
              <GiBrazil className="text-2xl" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              className="z-50 font-semibold bg-white p-2 shadow rounded-md w-full flex flex-col items-center"
              to="/panel"
            >
              <MdSpaceDashboard className="text-2xl" />
              <span>Panel</span>
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
        <ul className="flex flex-col gap-4 w-full justify-center items-center text-center">
          <li className="font-semibold  bg-neutral-800 text-yellow-500  p-2 shadow rounded-md w-full flex flex-col items-center">
            <Link className="z-50 flex flex-col  items-center" to="/">
              <MdSpaceDashboard className="text-4xl" />
              Painel
            </Link>
          </li>
          <li className="font-semibold bg-neutral-800 text-yellow-500 p-2 shadow rounded-md w-full flex flex-col items-center">
            <Link className="z-50 flex flex-col  items-center" to="/mapa">
              <GiBrazil className="text-4xl" />
              Mapa
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const Sidebar = () => {
  const windowWidth = useWindowWidth();

  return <>{windowWidth > 800 ? renderDesktop() : renderMobile()}</>;
};

export default Sidebar;
