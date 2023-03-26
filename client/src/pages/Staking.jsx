import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { usePolybase } from "@polybase/react";
import { useAccount, useBalance, useNetwork } from "wagmi";
import {
  contractAddress,
  OxReceiverUNO_ABI,
  OxSenderUNO_ABI,
  tokenName,
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
            ethers.utils.hexlify(ethers.utils.toUtf8Bytes(roomCode)),
            ethers.utils.parseEther("0.0001"),
            9991,
            ethers.utils.parseEther("0.0001"),
          ]
        : [ethers.utils.hexlify(ethers.utils.toUtf8Bytes(roomCode))],
    overrides: {
      value: ethers.utils.parseEther("0.0001"),
    },
    onSuccess(data) {
      console.log("Success");
    },
    onError(error) {
      console.log("Error", error);
    },
  });
  const {
    data: stakeReturnData,
    isLoading: stakeReturnDataIsLoading,
    isSuccess: stakeReturnDataIsSuccess,
    write: stake,
  } = useContractWrite(stakeConfig);
  useEffect(() => {
    console.log(ethers.utils.hexlify(ethers.utils.toUtf8Bytes(roomCode)));
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
    if (stakeReturnDataIsSuccess) {
      (async function () {
        const updatedGame = await polybase
          .collection("Games")
          .record(gameData?.id)
          .call("setStake", [address]);

        console.log(updatedGame);

        setGameData(updatedGame.data);
      })();
    }
  }, [stakeReturnDataIsSuccess]);
  useEffect(() => {
    if (
      gameData?.player1_isStaked === true &&
      gameData?.player2_isStaked === true
    ) {
      console.log("Creating provider...");
      const provider = new ethers.providers.JsonRpcProvider(
        apiUrls[chain.id],
        chain.id
      );
      console.log("Creating signer...");
      const signer = new ethers.Wallet(
        process.env.REACT_APP_PRIVATE_KEY,
        provider
      );
      console.log("Creating contract...");
      const OxReceiverUNO = new ethers.Contract(
        contractAddress[chain.id],
        OxReceiverUNO_ABI,
        signer
      );
      console.log("Starting Game...");

      await OxReceiverUNO.startGame(
       roomCode
      );
      window.location = `/play?roomCode=${roomCode}`;
    }
  }, [gameData]);
  useEffect(() => {
    (function () {
      polybase
        .collection("Games")
        .record(gameData?.id)
        .onSnapshot(
          (newDoc) => {
            // Handle the change
            console.log(newDoc);
            if (
              newDoc.player1_isStaked === true &&
              newDoc.player2_isStaked === true
            ) {
              window.location = `/play?roomCode=${roomCode}`;
            }
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
        {gameData != null ? (
          <>
            <div className="flex justify-between mb-10">
              <button className="w-[100px]"></button>
              <p className="text-3xl">Staking</p>
              <div className="game-button blue" style={{ cursor: "default" }}>
                {" Balance 💵 " + balance.formatted + " " + tokenName[chain.id]}
              </div>
            </div>
            <div className="flex justify-between w-[60%] mx-auto">
              <p className="text-white my-auto">{gameData.player1_name}</p>
              {gameData?.player1_isStaked == true ? (
                <button
                  className="game-button green"
                  style={{ cursor: "default" }}
                >
                  Staked ✅
                </button>
              ) : gameData.player1_address == address ? (
                <button
                  className="game-button orange"
                  onClick={() => {
                    stake();
                  }}
                >
                  Stake 💵
                </button>
              ) : (
                <button
                  className="game-button red"
                  style={{ cursor: "default" }}
                >
                  Waiting to Stake
                </button>
              )}
            </div>
            <div className="flex justify-between w-[60%] mx-auto">
              <p className="text-white my-auto">{gameData.player2_name}</p>
              {gameData?.player2_isStaked == true ? (
                <button
                  className="game-button green"
                  style={{ cursor: "default" }}
                >
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
                <button
                  className="game-button red"
                  style={{ cursor: "default" }}
                >
                  Waiting to Stake
                </button>
              )}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Staking;
