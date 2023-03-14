import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAccount, useBalance } from "wagmi";
import GameElement from "../components/GameElement";
import GameOfferPopUpModel from "../components/GameOfferPopUpModel";

const AvailableGames = () => {
  const [bet, setBet] = useState(1);
  const [showModel, setShowModel] = useState(false);

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
  return (
    <div className="Homepage select-none">
      <GameOfferPopUpModel
        title="Game request!"
        name="Benita"
        bet="10 TST"
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
                  setBet(e.target.value);
                }}
              />
              <p className=" mx-3 text-lg" style={{ display: "inline" }}>
                {bet} TST
              </p>
              <button
                className="game-button green"
                onClick={() => {
                  setShowModel(true);
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
          {sampleData.map((val) => {
            return (
              <GameElement
                name={val.name}
                image={val.profile}
                address={val.address}
                bet={val.bet}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AvailableGames;
