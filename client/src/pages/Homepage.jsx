import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import randomCodeGenerator from "../utils/randomCodeGenerator";
import Logo from "../assets/logo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { disconnect } from "@wagmi/core";
const Homepage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [bid, setBid] = useState(0);
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
        <img src={Logo} width="200px" className="mx-auto" />
        {!isConnected ? (
          <div className="my-10 flex justify-center ">
            <ConnectButton />
          </div>
        ) : (
          <div className="flex flex-col ">
            <div className="my-5 flex justify-center ">
              <ConnectButton />
            </div>
            <Link to={`/games`}>
              <button
                className="game-button orange"
                onClick={console.log("CLICKED!!!!!!!!!")}
              >
                START GAME
              </button>
            </Link>

            <div className="flex justify-center my-2">
              <p className="my-auto mx-3 text-lg">Choose Bid</p>
              {isFetched ? (
                <input
                  type="range"
                  min="1"
                  max={balance.formatted - 1}
                  step="1"
                  value={bid}
                  style={{ accentColor: "yellow" }}
                  onChange={(e) => {
                    setBid(e.target.value);
                  }}
                />
              ) : (
                <p>Loading...</p>
              )}
              <p className="my-auto mx-3 text-lg">{bid} TST</p>
            </div>
            <Link to={`/games`}>
              <button className="game-button orange">YOUR PROFILE</button>
            </Link>
            <Link to={`/games`}>
              <button className="game-button orange">YOUR FRIENDS</button>
            </Link>
            <div>
              <button className="game-button orange" onClick={disconnect}>
                QUIT GAME
              </button>
            </div>
          </div>
        )}

        {/* <div className="homepage-form">
          <div className="homepage-join">
            <input
              type="text"
              placeholder="Game Code"
              onChange={(event) => setRoomCode(event.target.value)}
            />
            <Link to={`/play?roomCode=${roomCode}`}>
              <button className="game-button green">JOIN GAME</button>
            </Link>
          </div>
          <h1>OR</h1>
          <div className="homepage-create">
            <Link to={`/play?roomCode=${randomCodeGenerator(5)}`}>
              <button className="game-button orange">CREATE GAME</button>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Homepage;
