import React from "react";
import { useNetwork } from "wagmi";
import { tokenName } from "../contract/constants";

const GameOfferPopUpModel = ({
  title,
  bet,
  name,
  visible,
  onClose,
  onAccept,
  onReject,
}) => {
  const { chain } = useNetwork();
  if (!visible) return null;
  return (
    <div className="fixed inset-0  bg-black text-4xl text-black text-center bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div
        className="game-button orange max-w-[500px]"
        style={{ cursor: "default", position: "fixed" }}
      >
        <div className="flex justify-between">
          <p className="ml-3 text-slate-600 text-lg">{title}</p>
          <button
            onClick={() => {
              onClose();
            }}
          >
            ❌
          </button>
        </div>
        <div className="flex justify-between">
          <p className="my-auto  text-white mx-auto text-xl">{name}</p>
          <p className="game-button blue" style={{ cursor: "default" }}>
            {` Bet 💸 ${bet} ${tokenName[chain.id]}`}
          </p>
        </div>
        <div className="flex justify-around">
          <button
            className="game-button green"
            onClick={() => {
              onAccept();
            }}
          >
            Accept ✅
          </button>
          <button
            className="game-button red"
            onClick={() => {
              onReject();
            }}
          >
            Reject 🚫
          </button>
        </div>
      </div>
    </div>
  );
};
export default GameOfferPopUpModel;
