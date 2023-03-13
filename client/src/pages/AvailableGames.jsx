import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAccount, useBalance } from "wagmi";
import { createGame } from "../utils/queries";
const AvailableGames = () => {
  const { address } = useAccount();
  const { data: balance, isFetched } = useBalance({
    address,
  });
  return (
    <div className="Homepage select-none">
      <div className="homepage-menu max-w-[1000px] mx-auto w-full text-center ">
        <div className="flex justify-between">
          <Link to="/">
            <button className="game-button orange">⬅️ Back</button>
          </Link>
          <p className="my-auto text-3xl">Games</p>
          {isFetched ? (
            <button className="game-button green" style={{ cursor: "default" }}>
              {"Balance ➡️" + balance.formatted + "  TST"}
            </button>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <button
          className="game-button orange"
          onClick={createGame(
            "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
            "6sdfg2kid2",
            "2"
          )}
        >
          {" "}
          Test
        </button>
      </div>
    </div>
  );
};

export default AvailableGames;
