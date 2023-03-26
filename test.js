const { Polybase } = require("@polybase/client");

const db = new Polybase({
  defaultNamespace:
    "pk/0x4962f0efb35f25decf76908dc15b02ed0c5b9f46722c8aa78efb0e4afbaf196bc9eb555ab9b1b6144400c38252f10c58ff61769a09d66dcb84416db7f2c37630/0xUNO",
});

(async () => {
  // .create(args) args array is defined by the constructor fn
  // const data = await db
  //   .collection("Games")
  //   .where("roomCode", "==", "PRgrZxn")
  //   .get();
  let games = await db.collection("Games").get();
  games = games.data;

  for (let i = 0; i < games.length; i++) {
    await db.collection("Games").record(games[i].data.id).call("del", []);
  }
  // const data = await db
  //   .collection("Games")
  //   .record("4_AT149fG6vHPMBjAAAC")
  //   .call("setStake", ["0x67D2B5848a8c9960C5CBEc3d36bFee7637c98797"]);

  console.log(data);
  // console.log(data.data[0].data);
})();
