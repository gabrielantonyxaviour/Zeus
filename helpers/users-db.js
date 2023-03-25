const { Polybase } = require("@polybase/client");

const db = new Polybase({
  defaultNamespace:
    "pk/0x4962f0efb35f25decf76908dc15b02ed0c5b9f46722c8aa78efb0e4afbaf196bc9eb555ab9b1b6144400c38252f10c58ff61769a09d66dcb84416db7f2c37630/0xUNO",
});

const users = [];

const addUser = async ({ id, name, room, address, isStaked }) => {
  // const numberOfUsersInRoom = users.filter((user) => user.room === room);
  const numberOfUsersInRoom = await db
    .collection("Users")
    .where("room", "==", room)
    .get();

  if (numberOfUsersInRoom.data.length === 2) return { error: "Room full" };

  const { newUser } = await db
    .collection("Users")
    .create([id, name, room, address, isStaked]);
  console.log("New User Data:", newUser);

  return newUser;
};

const stakeUser = async ({ address, room }) => {
  const setStake = await db
    .collection("Users")
    .record(address)
    .call("setStake", [true]);

  console.log("Stake User Data:", setStake);
};

const isEveryoneStaked = async (room) => {
  const users = await getUsersInRoom(room);
  for (let i = 0; i < users.length; i++) {
    if (users[i].isStaked == false) return false;
  }
  return true;
};

const removeUser = async (id) => {
  const removeUser = await db.collection("Users").call("del", [id]);
  const { data } = await db.collection("Users").get();

  console.log("Remove User Data:", removeUser);

  return data;
};

const getUser = async (id) => {
  const user = await db.collection("Users").record(id).get();
  return user;
};

const getUsersInRoom = async (room) => {
  const users = await db.collection("Users").where("room", "==", room).get();
  return users;
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  stakeUser,
  isEveryoneStaked,
};
