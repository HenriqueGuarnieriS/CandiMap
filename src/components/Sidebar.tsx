import { GiMoneyStack } from "react-icons/gi";
import { MdHowToVote, MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import useWindowWidth from "../utils/useWindowWidth";
import { AiFillProject } from "react-icons/ai";
import { MouseEventHandler, useState } from "react";
import { RiMenuFold2Line, RiMenuFoldLine } from "react-icons/ri";

const renderMobile = () => {
  return (
    <div className=" bg-neutral-700 flex   w-full  overflow-x-auto">
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
              to="/partidos"
            >
              <AiFillProject className="text-3xl" />
              Partidos
            </Link>
          </li>
          <li className="font-semibold bg-neutral-800 text-yellow-500 px-3 py-2 shadow rounded-md w-full flex flex-col items-center">
            <Link className="z-50 flex flex-col  items-center" to="/folha">
              <MdHowToVote className="text-3xl" />
              Judiciário
            </Link>
          </li>
          <li className="font-semibold bg-neutral-800 text-yellow-500 px-3 py-2 shadow rounded-md w-full flex flex-col items-center">
            <Link className="z-50 flex flex-col  items-center" to="/educacao">
              <MdHowToVote className="text-3xl" />
              Educação
            </Link>
          </li>
          <li className="font-semibold bg-neutral-800 text-yellow-500 px-3 py-2 shadow rounded-md w-full flex flex-col items-center">
            <Link className="z-50 flex flex-col  items-center" to="/economia">
              <GiMoneyStack className="text-3xl" />
              Economia
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
const renderMobileItems = (
  handleOpenSidebar: MouseEventHandler<Element> | undefined
) => {
  return (
    <div className="  flex flex-col items-center h-full mt-14 ">
      <nav className=" w-full   ">
        <ul className=" text-sm flex flex-col gap-2 w-full justify-center items-center text-center">
          <li
            onClick={handleOpenSidebar}
            className="cursor-pointer font-semibold  bg-neutral-800  text-missaoCores-missaoYellow  p-2 shadow rounded-md w-full flex flex-col items-center"
          >
            <Link className="z-50 flex  items-center gap-2" to="/">
              <MdSpaceDashboard className="text-3xl" />
              Painel
            </Link>
          </li>
          <li
            onClick={handleOpenSidebar}
            className="cursor-pointer font-semibold bg-neutral-800  text-missaoCores-missaoYellow p-2 shadow rounded-md w-full flex flex-col items-center"
          >
            <Link className="z-50 flex   items-center gap-2" to="/partidos">
              <AiFillProject className="text-3xl" />
              Partidos
            </Link>
          </li>
          <li
            onClick={handleOpenSidebar}
            className="cursor-pointer font-semibold bg-neutral-800  text-missaoCores-missaoYellow p-2 shadow rounded-md w-full flex flex-col items-center"
          >
            <Link className="z-50 flex  items-center gap-2" to="/folha">
              <MdHowToVote className="text-3xl" />
              Judiciário
            </Link>
          </li>
          <li
            onClick={handleOpenSidebar}
            className="cursor-pointer font-semibold bg-neutral-800  text-missaoCores-missaoYellow p-2 shadow rounded-md w-full flex flex-col items-center"
          >
            <Link className="z-50 flex   items-center gap-2" to="/educacao">
              <MdHowToVote className="text-3xl" />
              Educação
            </Link>
          </li>
          <li
            onClick={handleOpenSidebar}
            className="cursor-pointer font-semibold bg-neutral-800  text-missaoCores-missaoYellow p-2 shadow rounded-md w-full flex flex-col items-center"
          >
            <Link className="z-50 flex items-center gap-2" to="/economia">
              <GiMoneyStack className="text-3xl" />
              Economia
            </Link>
          </li>
          {/* <li className="font-semibold bg-neutral-800  text-missaoCores-missaoYellow p-2 shadow rounded-md w-full flex flex-col items-center">
            <Link className="z-50 flex flex-col  items-center" to="/mapa">
              <GiBrazil className="text-3xl" />
              Mapa
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};
const renderDesktopItems = (
  handleOpenSidebar: MouseEventHandler<Element> | undefined
) => {
  return (
    <div className="  flex flex-col items-center w-full h-full mt-14 ">
      <nav className=" w-full   ">
        <ul className=" text-sm flex flex-col gap-2 justify-center items-center text-center">
          <li className="cursor-pointer font-semibold  bg-neutral-800  text-missaoCores-missaoYellow  p-2 shadow rounded-md w-full flex flex-col items-center">
            <Link className="z-50 flex  items-center gap-2" to="/">
              <MdSpaceDashboard className="text-3xl" />
              Painel
            </Link>
          </li>
          <li className="cursor-pointer font-semibold bg-neutral-800  text-missaoCores-missaoYellow p-2 shadow rounded-md w-full flex flex-col items-center">
            <Link className="z-50 flex   items-center gap-2" to="/partidos">
              <AiFillProject className="text-3xl" />
              Partidos
            </Link>
          </li>
          <li className="cursor-pointer font-semibold bg-neutral-800  text-missaoCores-missaoYellow p-2 shadow rounded-md w-full flex flex-col items-center">
            <Link className="z-50 flex  items-center gap-2" to="/folha">
              <MdHowToVote className="text-3xl" />
              Judiciário
            </Link>
          </li>
          <li className="cursor-pointer font-semibold bg-neutral-800  text-missaoCores-missaoYellow p-2 shadow rounded-md w-full flex flex-col items-center">
            <Link className="z-50 flex   items-center gap-2" to="/educacao">
              <MdHowToVote className="text-3xl" />
              Educação
            </Link>
          </li>
          <li className="cursor-pointer font-semibold bg-neutral-800  text-missaoCores-missaoYellow p-2 shadow rounded-md w-full flex flex-col items-center">
            <Link className="z-50 flex items-center gap-2" to="/economia">
              <GiMoneyStack className="text-3xl" />
              Economia
            </Link>
          </li>
          {/* <li className="font-semibold bg-neutral-800  text-missaoCores-missaoYellow p-2 shadow rounded-md w-full flex flex-col items-center">
            <Link className="z-50 flex flex-col  items-center" to="/mapa">
              <GiBrazil className="text-3xl" />
              Mapa
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

interface PropsComponent {
  isOpen: boolean;
  handleOpenSidebar: MouseEventHandler<Element> | undefined;
}

const SidebarMobile: React.FC<PropsComponent> = ({
  isOpen,
  handleOpenSidebar,
}) => {
  return (
    <div className=" bg-neutral-800 flex pb-2   relative">
      {isOpen && (
        <div className=" flex flex-col  top-0 z-50 overflow-auto fixed">
          <div className="w-[80vw] min-h-screen bg-neutral-700 relative px-3 bg-opacity-95">
            <RiMenuFoldLine
              onClick={handleOpenSidebar}
              className="w-7 h-7 text-missaoCores-missaoYellow mt-3 ml-4 absolute top-0 right-2"
            />
            {renderMobileItems(handleOpenSidebar)}
          </div>
        </div>
      )}
      <RiMenuFold2Line
        onClick={handleOpenSidebar}
        className={`w-7 h-7 text-missaoCores-missaoYellow mt-3 ml-4 ${
          isOpen ? "hidden" : ""
        }`}
      />
    </div>
  );
};
const SidebarDesktop: React.FC<PropsComponent> = ({
  isOpen,
  handleOpenSidebar,
}) => {
  return (
    <div className=" bg-neutral-700 flex relative px-2 text-cente py-4">
      {isOpen ? (
        <div className=" flex flex-col  top-0 z-50 overflow-auto relative ">
          <div className="w-60 bg-neutral-700  flex flex-col items-center h-screen px-2">
            <RiMenuFoldLine
              onClick={handleOpenSidebar}
              className=" cursor-pointer w-7 h-7 text-missaoCores-missaoYellow   absolute top-0 right-2"
            />
            {renderDesktopItems(handleOpenSidebar)}
          </div>
        </div>
      ) : (
        <RiMenuFold2Line
          onClick={handleOpenSidebar}
          className=" cursor-pointer  w-7 h-7 text-missaoCores-missaoYellow "
        />
      )}
    </div>
  );
};

const Sidebar = () => {
  const windowWidth = useWindowWidth();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSidebar = () => {
    setIsOpen((prev) => !prev);
    console.log(isOpen);
  };

  // return <>{windowWidth > 800 ? renderDesktop() : renderMobile()}</>;
  return (
    <>
      {windowWidth > 800 ? (
        <SidebarDesktop isOpen={isOpen} handleOpenSidebar={handleOpenSidebar} />
      ) : (
        <SidebarMobile isOpen={isOpen} handleOpenSidebar={handleOpenSidebar} />
      )}
    </>
  );
};

export default Sidebar;
