import React, { ReactNode } from "react";

interface Props {
  description: ReactNode;
}

const Description: React.FC<Props> = ({ description }) => {
  return (
    <div className="flex flex-col py-4 bg-neutral-700 rounded-lg px-5 gap-2 text-center lg:text-start">
      <span className=" font-bold text-2xl"> Sobre os Dados Exibidos</span>
      <p className="font-lg max-w-[800px]  ">{description}</p>
    </div>
  );
};

export default Description;
