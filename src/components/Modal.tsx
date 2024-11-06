import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import { IoMdCloseCircle } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  position?:
    | "center"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  position = "center",
  children,
}) => {
  if (!isOpen) return null;

  const getPositionStyle = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "top-right":
        return "top-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      default:
        return "min-w-[90vw] lg:min-w-[80vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
    }
  };

  const handleOutsideClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
        onClose();
      }
    },
    [onClose]
  );

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-overlay"
      onClick={handleOutsideClick}
    >
      <div
        className={`absolute ${getPositionStyle()} bg-neutral-800 p-2 rounded-lg shadow-lg overflow-auto max-h-[90vh]`}
      >
        <button
          className="absolute top-6 right-5 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <IoMdCloseCircle className="text-missaoCores-missaoYellow w-8 h-8" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
