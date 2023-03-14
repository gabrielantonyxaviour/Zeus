import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAccount, useBalance } from "wagmi";
import GameOfferPopUpModel from "../components/GameOfferPopUpModel";
import io from "socket.io-client";
import NormalPopup from "../components/NormalPopup";
let socket;
const ENDPOINT = "http://localhost:8080";
const AvailableGames = () => {
  const [bet, setBet] = useState(1);
  const [showModel, setShowModel] = useState(false);
  const [showAcknowledge, setShowAcknowledge] = useState(false);
  const [games, setGames] = useState([]);
  const [profile, setProfile] = useState({});
  const [offerName, setOfferName] = useState("");
  const [offerPrice, setOfferPrice] = useState(0);
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
  const { address } = useAccount();
  const { data: balance, isFetched } = useBalance({
    address,
  });

  useEffect(() => {
    (async function () {
      try {
        const response1 = await fetch("http://localhost:5000/games");
        setGames(await response1.json());
        const response2 = await fetch(
          "http://localhost:5000/profile/" + address
        );
        setProfile(await response2.json());
      } catch (err) {
        console.error(err.message);
      }
    })();

    const connectionOptions = {
      reconnect: true,
      forceNew: true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    };
    socket = io.connect(ENDPOINT, connectionOptions);
    //cleanup on component unmount
    return function cleanup() {
      socket.disconnect();
      //shut down connnection instance
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("popup", ({ from, name, bet }) => {
      setOfferName(name);
      setOfferPrice(bet);
      setShowModel(true);
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
                max={balance.formatted - 1}
                // max="20"
                step="1"
                value={bet}
                style={{ accentColor: "yellow" }}
                onChange={(e) => {
                  setBet(e.target.value);
                }}
              />
              <p className=" mx-3 text-lg" style={{ display: "inline" }}>
                {bet} TST
              </p>
              <button
                className="game-button green"
                onClick={async () => {
                  let id = socket.id;
                  console.log(id);
                  try {
                    const body = {
                      walletAddress: address,
                      bet,
                      socketid: String(id),
                    };
                    console.log(body);
                    const response = await fetch(
                      "http://localhost:5000/games",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                      }
                    );
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
          {games.map((val) => {
            let name = val.name;
            let image = val.image;
            let address = val.profile;
            let bet = val.bet;
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
                  <button
                    className="game-button green"
                    onClick={() => {
                      socket.emit("offer", {
                        accepterSocketId: socket.id,
                        creatorSocketId: val.socketid,
                        name: profile.name,
                        bet,
                      });
                      // console.log(socket.id);
                    }}
                  >{`Stake 💸 ${bet} TST `}</button>
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
