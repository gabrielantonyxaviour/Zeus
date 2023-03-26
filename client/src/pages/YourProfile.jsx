import React from "react";
import { Link, useParams } from "react-router-dom";
import { usePolybase } from "@polybase/react";

import { useEffect, useState } from "react";

const YourProfile = () => {
  const { address } = useParams();
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    wallet_address: address,
    image: "https://picsum.photos/200",
    name: "Anonymous",
    description: "I am a newbie in this game",
  });

  // Get prfile data from Polybase
  const polybase = usePolybase();

  useEffect(() => {
    (async function () {
      try {
        const profile_data = await polybase
          .collection("Profiles")
          .record(address)
          .get();
        setProfile(profile_data.data);
        setLoading(false);
      } catch (e) {
        if (e.code === "not-found") {
          const profile_data = await polybase
            .collection("Profiles")
            .create([
              profile.wallet_address,
              profile.name,
              profile.image,
              profile.description,
            ]);
          console.log("Profile created", profile_data);
        }
        console.log(e.code);
        setLoading(false);
      }
    })();
  }, []);

  async function saveProfile() {
    try {
      const updated_profile_data = await polybase
        .collection("Profiles")
        .record(address)
        .call("updateProfile", [profile.name, profile.description]);
      console.log(updated_profile_data);
    } catch (e) {
      console.log(e);
    }
  }

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
              src={profile.image}
            ></img>
            <div className="flex justify-center">
              <div
                className="game-button orange w-[90%]"
                style={{ cursor: "default" }}
              >
                <div className="mt-5 pt-5">
                  <div className="text-xl mt-2 mb-1 text-slate-600">Name</div>
                  <input
                    className="min-w-[300px] text-black"
                    value={profile.name}
                    onChange={(e) => {
                      setProfile({ ...profile, name: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <div className="text-xl mt-2 mb-1 text-slate-600">
                    Address
                  </div>

                  <p disabled className="text-black">
                    {profile.wallet_address}
                  </p>
                </div>
                <div>
                  <div className="text-xl mt-4 mb-1 text-slate-600">
                    Description
                  </div>

                  <input
                    className="min-w-[500px] text-black "
                    value={profile.description}
                    onChange={(e) => {
                      setProfile({ ...profile, description: e.target.value });
                    }}
                  />
                </div>

                <div className="flex justify-center">
                  <button className="game-button yellow" onClick={saveProfile}>
                    Save
                  </button>
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
