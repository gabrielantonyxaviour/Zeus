import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { usePolybase } from "@polybase/react";
import { useAccount, useBalance, useNetwork } from "wagmi";
import {
  contractAddress,
  OxReceiverUNO_ABI,
  OxSenderUNO_ABI,
} from "../contract/constants";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ethers } from "ethers";

const Staking = (props) => {
  const polybase = usePolybase();
  const { address } = useAccount();
  const { data: balance, isFetched } = useBalance({
    address,
  });
  const { chain } = useNetwork();
  const data = queryString.parse(props.location.search);
  const { roomCode } = data;

  const [gameData, setGameData] = useState(null);
  const [gameNotFound, setGameNotFound] = useState(true);
  const { config: stakeConfig } = usePrepareContractWrite({
    address: contractAddress[chain.id],
    abi: chain.id == 5 ? OxSenderUNO_ABI : OxReceiverUNO_ABI,
    functionName: chain.id == 5 ? "xStake" : "stake",
    args:
      chain.id == 5
        ? [
            roomCode,
            ethers.utils.parseEther("0.0001"),
            9991,
            ethers.utils.parseEther("0.0001"),
          ]
        : [roomCode],
    overrides: {
      value: ethers.utils.parseEther("0.0001"),
    },
  });
  const {
    data: stakeReturnData,
    isLoading: stakeReturnDataIsLoading,
    isSuccess: stakeReturnDataIsSuccess,
    write: stake,
  } = useContractWrite(stakeConfig);
  useEffect(() => {
    console.log(data);
    (async function () {
      // Fetch game record
      try {
        const games = await polybase
          .collection("Games")
          .where("roomCode", "==", roomCode)
          .get();

        if (games.data.length === 0) {
          setGameNotFound(true);
        } else {
          setGameNotFound(false);
          let gameData = games.data[0].data;
          console.log(gameData);

          setGameData(gameData);

          if (gameData.player1_address === address) {
            console.log("You are player one");
          } else if (gameData.player2_address === address) {
            console.log("You are player two");
          } else {
            console.log("You are not a player");
            window.location.href = "/games";
          }
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    // TODO
    if (stakeReturnDataIsSuccess) {
      (async function () {
        const updatedGame = await polybase
          .collection("Games")
          .record(gameData.id)
          .call("setStake", [address]);

        console.log(updatedGame);
      })();
    }
  }, [stakeReturnDataIsSuccess]);

  useEffect(() => {
    (async function () {
      await polybase
        .collection("Games")
        .record(gameData.id)
        .onSnapshot(
          (newDoc) => {
            // Handle the change
            console.log(newDoc);
            // setGameData({ ...gameData, newDoc });
          },
          (err) => {
            // Optional error handler
          }
        );
    })();
  }, []);

  return (
    <div className="Homepage select-none">
      <div className="homepage-menu max-w-[1240px] mx-auto w-full text-center ">
        <div className="flex justify-between mb-10">
          <button className="w-[100px]"></button>
          <p className="text-3xl">Staking</p>
          <div className="game-button blue" style={{ cursor: "default" }}>
            {" Balance 💵 " + balance.formatted + " TST"}
          </div>
        </div>
        <div className="flex justify-between w-[60%] mx-auto">
          <p className="text-white my-auto">{gameData.player1_name}</p>
          {stakeReturnDataIsSuccess && gameData.player1_address == address ? (
            <button className="game-button green" style={{ cursor: "default" }}>
              Staked ✅
            </button>
          ) : gameData.player2_address == address ? (
            <button
              className="game-button orange"
              onClick={() => {
                stake();
              }}
            >
              Stake 💵
            </button>
          ) : (
            <button className="game-button red" style={{ cursor: "default" }}>
              Waiting to Stake
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Staking;
