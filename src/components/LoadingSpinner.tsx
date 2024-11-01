import React from "react";
import Lottie from "lottie-react";
import { spinner } from "../mockdata/spinner";
const LoadingSpinner: React.FC = () => (
  <div className="w-full h-fill flex justify-center items-center bg-neutral-800 min-h-screen">
    <Lottie animationData={spinner} />
  </div>
);

export default LoadingSpinner;
