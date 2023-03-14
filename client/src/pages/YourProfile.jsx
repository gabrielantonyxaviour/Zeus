import React from "react";
import { Link, useParams } from "react-router-dom";

const YourProfile = () => {
  const { address } = useParams();
  const sampleData = {
    address: address,
    image: "https://picsum.photos/200/200",
    name: "Gabriel",
    description: "I am a newbie in this game",
  };
  return (
    <div className="Homepage select-none">
      <div className="homepage-menu max-w-[1000px] mx-auto w-full text-center ">
        <div className="flex justify-around">
          <Link to="/">
            <button className="game-button orange">⬅️ Home</button>
          </Link>
          <p className="my-auto text-3xl">Profile</p>
          <div className="w-[100px]"></div>
        </div>
        <div className="flex flex-col text-center">
          <img
            className="rounded-full mx-auto"
            height={150}
            width={150}
            src={sampleData.image}
          ></img>
          <div className="flex justify-center">
            <div
              className="game-button orange w-[90%]"
              style={{ cursor: "default" }}
            >
              <div className="flex justify-around">
                <div>
                  <div className="text-xl mt-2 mb-1 text-slate-600">Name</div>

                  <p className="min-w-[300px]">{sampleData.name}</p>
                </div>
                <div>
                  <div className="text-xl mt-2 mb-1 text-slate-600">
                    Address
                  </div>

                  <p>{sampleData.address}</p>
                </div>
              </div>
              <div>
                <div className="text-xl mt-4 mb-1 text-slate-600">
                  Description
                </div>

                <p className="min-w-[300px]">{sampleData.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourProfile;
