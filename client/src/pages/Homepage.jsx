import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import randomCodeGenerator from "../utils/randomCodeGenerator";
import Logo from "../assets/logo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { disconnect } from "@wagmi/core";

const Homepage = () => {
  const { address, isConnected } = useAccount();

  const { data: balance, isFetched } = useBalance({
    address,
  });

  //   const dataFetchedRef = useRef(false);
  //   useEffect(() => {
  //     if (dataFetchedRef.current) return;
  //     dataFetchedRef.current = true;
  //     fetchBalance(address).then((val)=>{})
  // },[])

  return (
    <div className="Homepage select-none">
      <div className="homepage-menu max-w-[1240px] mx-auto w-full text-center ">
        {!isConnected ? (
          <div>
            <img src={Logo} width="200px" className="mx-auto" />

            <div className="my-10 flex justify-center ">
              <ConnectButton />
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5 flex justify-center ">
              <img src={Logo} width="200px" />
              <div className="my-auto mx-10">
                <ConnectButton />
              </div>
            </div>

            <div className="flex justify-center ">
              <Link to={`/games`}>
                <button className="game-button orange" onClick={() => {}}>
                  START GAME
                </button>
              </Link>

              <Link to={`/profile/${address}`}>
                <button className="game-button orange">YOUR PROFILE</button>
              </Link>
              <Link to={`/friends/${address}`}>
                <button className="game-button orange">YOUR FRIENDS</button>
              </Link>
              <div>
                <button
                  className="game-button orange"
                  onClick={() => {
                    disconnect();
                  }}
                >
                  QUIT GAME
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
