import React from "react";

interface Props {
  title: string;
}

const HeaderPage: React.FC<Props> = ({ title }) => {
  return (
    <h1 className="text-center font-extrabold text-4xl py-4 bg-neutral-700 rounded-lg">
      {title}
    </h1>
  );
};

export default HeaderPage;
