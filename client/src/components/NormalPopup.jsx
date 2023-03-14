import React from "react";

const NormalPopup = ({ title, description, visible, onClose }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0  bg-black text-4xl text-black text-center bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div
        className="game-button orange w-[300px] h-[100px]"
        style={{ cursor: "default", position: "fixed" }}
      >
        <div className="flex justify-between mb-3">
          <p className="ml-3 text-slate-600 text-lg">{title}</p>
          <button
            onClick={() => {
              onClose();
            }}
          >
            ❌
          </button>
        </div>
        <p className="my-auto  text-white mx-auto text-xl">{description}</p>
      </div>
    </div>
  );
};
export default NormalPopup;
