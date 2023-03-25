import React from "react";
import { Link, useParams } from "react-router-dom";
import FriendElement from "../components/FriendElement";

const YourFriends = () => {
  const { address } = useParams();

  const sampleData = [
    {
      key: 1,
      address: "0xE2172c474F2E95419754140d4ac19045A70Bc93F",
      name: "Gabriel",
      profile: "https://picsum.photos/200/200",
      description: "I am the hottest man on Earth",
    },
    {
      key: 2,
      address: "0x2994E3240D7bb19A890a449A5dc8DDC374d3C08a",
      name: "Benita",
      profile: "https://picsum.photos/200/200",
      description: "I am the hottest man on Earth",
    },
    {
      key: 3,
      address: "0x1D902011c8b17de771165f116095B3307cFb33F4",
      name: "Jasmine",
      profile: "https://picsum.photos/200/200",
      description: "I am the hottest man on Earth",
    },
    {
      key: 3,
      address: "0x1D902011c8b17de771165f116095B3307cFb33F4",
      name: "Jasmine",
      profile: "https://picsum.photos/200/200",
      description: "I am the hottest man on Earth",
    },
    {
      key: 3,
      address: "0x1D902011c8b17de771165f116095B3307cFb33F4",
      name: "Jasmine",
      profile: "https://picsum.photos/200/200",
      description: "I am the hottest man on Earth",
    },
    {
      key: 3,
      address: "0x1D902011c8b17de771165f116095B3307cFb33F4",
      name: "Jasmine",
      profile: "https://picsum.photos/200/200",
      description: "I am the hottest man on Earth",
    },
    {
      key: 3,
      address: "0x1D902011c8b17de771165f116095B3307cFb33F4",
      name: "Jasmine",
      profile: "https://picsum.photos/200/200",
      description: "I am the hottest man on Earth",
    },
  ];
  return (
    <div className="Homepage select-none">
      <div className="homepage-menu max-w-[1000px] mx-auto w-full text-center ">
        <div className="flex justify-around">
          <Link to="/">
            <button className="game-button orange">⬅️ Home</button>
          </Link>
          <p className="my-auto text-3xl">Your Friends</p>
          <div className="w-[100px]"></div>
        </div>
        <div
          className="overflow-y-auto"
          style={{ height: window.innerHeight - 220 }}
        >
          {sampleData.map((val, index) => {
            return (
              <FriendElement
                key={index}
                name={val.name}
                image={val.profile}
                address={val.address}
                description={val.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default YourFriends;
