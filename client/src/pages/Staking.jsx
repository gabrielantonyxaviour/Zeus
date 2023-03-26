import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { usePolybase } from "@polybase/react";
import { useAccount } from "wagmi";

const Staking = (props) => {
  const polybase = usePolybase();
  const { address } = useAccount();

  const data = queryString.parse(props.location.search);
  const { roomCode } = data;

  const [gameData, setGameData] = useState(null);
  const [gameNotFound, setGameNotFound] = useState(true);

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
          let gameRecord = games.data[0].data;
          console.log(gameRecord);

          setGameData(gameRecord);

          if (gameRecord.player1_address === address) {
            console.log("You are player one");
          } else if (gameRecord.player2_address === address) {
            console.log("You are player two");
          } else {
            console.log("You are not a player");
            // window.location.href = "/games";
          }
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return <div className="Homepage select-none">Staking</div>;
};

export default Staking;
