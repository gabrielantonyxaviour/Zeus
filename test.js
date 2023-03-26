const { Polybase } = require("@polybase/client");

const db = new Polybase({
  defaultNamespace:
    "pk/0x4962f0efb35f25decf76908dc15b02ed0c5b9f46722c8aa78efb0e4afbaf196bc9eb555ab9b1b6144400c38252f10c58ff61769a09d66dcb84416db7f2c37630/0xUNO",
});

(async () => {
  // .create(args) args array is defined by the constructor fn
  // const data = await db.collection("Users").where("room", "==", room).get();
  const data = await db
    .collection("Games")
    .record("_jtIgAA9hVjdZTVgAAAE")
    .call("del", []);

  console.log(data.data);
})();
