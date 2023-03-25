import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAccount, useBalance } from "wagmi";
import GameOfferPopUpModel from "../components/GameOfferPopUpModel";
import io from "socket.io-client";
import NormalPopup from "../components/NormalPopup";
import randomCodeGenerator from "../utils/randomCodeGenerator";
import { usePolybase, useDocument } from "@polybase/react";

let socket;
const ENDPOINT = "http://localhost:8080";

const sampleData = [
  {
    id: 1,
    address: "0xE2172c474F2E95419754140d4ac19045A70Bc93F",
    name: "Gabriel",
    profile: "https://picsum.photos/200/200",
    bet: 3,
  },
  {
    id: 2,
    address: "0x2994E3240D7bb19A890a449A5dc8DDC374d3C08a",
    name: "Benita",
    profile: "https://picsum.photos/200/200",
    bet: 12,
  },
  {
    id: 3,
    address: "0x1D902011c8b17de771165f116095B3307cFb33F4",
    name: "Jasmine",
    profile: "https://picsum.photos/200/200",
    bet: 30,
  },
  {
    id: 3,
    address: "0x1D902011c8b17de771165f116095B3307cFb33F4",
    name: "Jasmine",
    profile: "https://picsum.photos/200/200",
    bet: 30,
  },
  {
    id: 3,
    address: "0x1D902011c8b17de771165f116095B3307cFb33F4",
    name: "Jasmine",
    profile: "https://picsum.photos/200/200",
    bet: 30,
  },
  {
    id: 3,
    address: "0x1D902011c8b17de771165f116095B3307cFb33F4",
    name: "Jasmine",
    profile: "https://picsum.photos/200/200",
    bet: 30,
  },
  {
    id: 3,
    address: "0x1D902011c8b17de771165f116095B3307cFb33F4",
    name: "Marshmallow",
    profile: "https://picsum.photos/200/200",
    bet: 30,
  },
];

const AvailableGames = () => {
  // Get prfile data from Polybase
  const polybase = usePolybase();

  const [bet, setBet] = useState(1);
  const [showModel, setShowModel] = useState(false);
  const [showAcknowledge, setShowAcknowledge] = useState(false);
  const [games, setGames] = useState([]);
  const [profile, setProfile] = useState({});
  const [offerName, setOfferName] = useState("");
  const [offerPrice, setOfferPrice] = useState(0);
  const [offerSocketId, setOfferSocketId] = useState("");

  const { address } = useAccount();
  const { data: balance, isFetched } = useBalance({
    address,
  });

  useEffect(() => {
    (async function () {
      try {
        const profile_data = await polybase
          .collection("Profiles")
          .record(address)
          .get();
        setProfile(profile_data.data);

        const games_data = await polybase.collection("Games").get();
        setGames(games_data.data);
      } catch (err) {
        console.error(err.message);
      }
    })();

    socket = io.connect(ENDPOINT, {
      reconnect: true,
      forceNew: true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    });

    //cleanup on component unmount
    return function cleanup() {
      socket.disconnect();
      //shut down connnection instance
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("popup", ({ from, name, bet }) => {
      setOfferSocketId(from);
      setOfferName(name);
      setOfferPrice(bet);
      setShowModel(true);
    });

    socket.on("accept", async ({ roomCode, bet }) => {
      try {
        const newGameResponse = await polybase
          .collection("Games")
          .create([roomCode, address, String(socket.id), bet]);
        console.log("New Game Response: ", newGameResponse);
      } catch (err) {
        console.error(err.message);
      }
      window.location = `/play?roomCode=${roomCode}`;
    });
  }, []);

  return (
    <div className="Homepage select-none">
      <div className="homepage-menu max-w-[1000px] mx-auto w-full text-center ">
        <div className="flex justify-around">
          <Link to="/">
            <button className="game-button orange">⬅️ Back</button>
          </Link>

          <p className="my-auto text-3xl">Games</p>
          {isFetched ? (
            <div>
              <input
                type="range"
                min="1"
                // max={balance.formatted - 1}
                max="20"
                step="1"
                value={bet}
                style={{ accentColor: "yellow" }}
                onChange={(e) => {
                  console.log(socket.id);
                  setBet(e.target.value);
                }}
              />
              <p className=" mx-3 text-lg" style={{ display: "inline" }}>
                {bet} TST
              </p>
              <button
                className="game-button green"
                onClick={async () => {
                  try {
                    const response = await polybase
                      .collection("Games")
                      .create([address, String(socket.id), bet]);
                    console.log("New Game Response: ", response);

                    if (response) {
                      setShowAcknowledge(true);
                    }
                    console.log(response);
                  } catch (err) {
                    console.error(err.message);
                  }
                }}
              >
                Choose Bet
              </button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div
          className="overflow-y-auto"
          style={{ height: window.innerHeight - 220 }}
        >
          {games.map((val, index) => {
            let name = val.id;
            let image = "https://picsum.photos/200";
            let address = val.profile;
            let bet = val.bet;

            return (
              <div className="flex justify-center" key={index}>
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
                      alt="profile"
                    ></img>
                    <div className="flex flex-col ml-5 text-left justify-center">
                      <p className="text-slate-600 mb-1">{profile.name}</p>
                      <p>{address}</p>
                    </div>
                  </div>
                  <button
                    className="game-button green"
                    onClick={() => {
                      socket.emit("offer", {
                        accepterSocketId: socket.id,
                        creatorSocketId: val.data.socketid,
                        name: profile.name,
                        bet,
                      });
                      // console.log(socket.id);
                    }}
                  >{`Stake 💸 ${val.data.bet} TST `}</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <GameOfferPopUpModel
        title="Game request!"
        name={offerName}
        bet={offerPrice}
        onClose={() => {
          setShowModel(false);
        }}
        onAccept={() => {
          let roomCode = randomCodeGenerator(7);
          socket.emit("accept", {
            opponentSocketId: offerSocketId,
            roomCode,
            bet,
          });
          window.location = `/play?roomCode=${roomCode}`;
          setShowModel(false);
        }}
        onReject={() => {
          setShowModel(false);
        }}
        visible={showModel}
      />
      <NormalPopup
        title={"Game Offer created!"}
        description={bet + " TST game is offered."}
        onClose={() => {
          setShowAcknowledge(false);
        }}
        visible={showAcknowledge}
      />
    </div>
  );
};

export default AvailableGames;
