const { Polybase } = require("@polybase/client");

const db = new Polybase({
  defaultNamespace:
    "pk/0x4962f0efb35f25decf76908dc15b02ed0c5b9f46722c8aa78efb0e4afbaf196bc9eb555ab9b1b6144400c38252f10c58ff61769a09d66dcb84416db7f2c37630/0xUNO",
});

(async () => {
  // .create(args) args array is defined by the constructor fn
  // const data = await db.collection("Users").where("room", "==", room).get();
  const data = await db
    .collection("Profiles")
    .create([
      "0x0429A2Da7884CA14E53142988D5845952fE4DF6a",
      "Gabriel Xaviour",
      "https://static.toiimg.com/photo/msid-88293744/88293744.jpg",
      "Gabriel is the king of the world",
    ]);

  console.log(data.data);
})();
