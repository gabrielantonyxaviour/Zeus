import React from "react";

const FriendElement = ({ name, image, description, address }) => {
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
            <p className="text-slate-600 ">{name}</p>
            <p className="text-sm">{address}</p>
            <p className="text-sm text-black">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendElement;
