import React, { useEffect } from "react";
import queryString from "query-string";
import { usePolybase } from "@polybase/react";

const Staking = (props) => {
  const data = queryString.parse(props.location.search);

  const { roomCode } = data;
  const polybase = usePolybase();

  useEffect(() => {
    console.log(data);
    (async function () {
      // Fetch game record
      try {
        const gameRecord = await polybase
          .collection("Games")
          .where("roomCode", "==", roomCode)
          .get();

        console.log(gameRecord.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return <div className="Homepage select-none">Staking</div>;
};

export default Staking;
