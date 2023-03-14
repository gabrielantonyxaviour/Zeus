import React from "react";

const GameElement = ({ name, image, bet, address }) => {
  return (
    <div className="flex justify-center">
      <div
        className="game-button orange w-[80%] h-[100px] flex justify-between"
        style={{ cursor: "default" }}
      >
        <div className="flex">
          <img
            className="rounded-full"
            src={image}
            height={80}
            width={80}
          ></img>
          <div className="flex flex-col ml-5 text-left justify-center">
            <p className="text-slate-600 mb-1">{name}</p>
            <p>{address}</p>
          </div>
        </div>
        <button className="game-button green">{`Stake 💸 ${bet} TST `}</button>
      </div>
    </div>
  );
};

export default GameElement;
