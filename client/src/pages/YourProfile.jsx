import React from "react";
import { Link, useParams } from "react-router-dom";
import { usePolybase, useDocument } from "@polybase/react";

const YourProfile = () => {
  const { address } = useParams();

  // Get prfile data from Polybase
  const polybase = usePolybase();
  const { data, error, loading } = useDocument(
    polybase.collection("Profiles").record(address)
  );

  // const sampleData = {
  //   address: address,
  //   image: "https://picsum.photos/200/200",
  //   name: "Gabriel",
  //   description: "I am a newbie in this game",
  // };

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
        {!loading ? (
          <div className="flex flex-col text-center">
            <img
              className="rounded-full mx-auto"
              height={150}
              width={150}
              alt="profile"
              src={data.data.image}
            ></img>
            <div className="flex justify-center">
              <div
                className="game-button orange w-[90%]"
                style={{ cursor: "default" }}
              >
                <div className="flex justify-around">
                  <div>
                    <div className="text-xl mt-2 mb-1 text-slate-600">Name</div>
                    <p className="min-w-[300px]">{data.data.name}</p>
                  </div>
                  <div>
                    <div className="text-xl mt-2 mb-1 text-slate-600">
                      Address
                    </div>

                    <p>{data.data.wallet_address}</p>
                  </div>
                </div>
                <div>
                  <div className="text-xl mt-4 mb-1 text-slate-600">
                    Description
                  </div>

                  <p className="min-w-[300px]">{data.data.description}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default YourProfile;
