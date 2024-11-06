import React, { useEffect, useState } from "react";
import Person from "../interfaces/Person";

interface PersonCardProps {
  person: Person | null;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderDesktop = () => {
    return (
      person && (
        <div className=" flex flex-col h-full w-full relative shadow-lg ">
          <img
            src={person?.banner}
            alt=""
            className="w-full rounded-lg h-full"
          />
        </div>
      )
    );
  };

  const renderMobile = () => {
    return (
      person && (
        <div className=" flex flex-col h-[660px] w-full relative shadow-lg ">
          <img
            src={person?.banner}
            alt=""
            className="w-full rounded-lg h-full"
          />
        </div>
      )
    );
  };

  return <>{windowWidth > 800 ? renderDesktop() : <>{renderMobile()}</>}</>;
};

export default PersonCard;
