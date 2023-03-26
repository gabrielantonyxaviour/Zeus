const users = [];

const addUser = ({ id, name, room, address, isStaked }) => {
  const numberOfUsersInRoom = users.filter((user) => user.room === room).length;
  if (numberOfUsersInRoom === 2) return { error: "Room full" };

  const newUser = { id, name, room, address, isStaked };
  users.push(newUser);
  return { newUser };
};

const stakeUser = ({ address, room }) => {
  const userIndex = users.findIndex((user) => user.address == address);
  users[userIndex].isStaked = true;
};
const isEveryoneStaked = (room) => {
  const users = getUsersInRoom(room);
  for (let i = 0; i < users.length; i++) {
    if (users[i].isStaked == false) return false;
  }
  return true;
};

const removeUser = (id) => {
  const removeIndex = users.findIndex((user) => user.id === id);

  if (removeIndex !== -1) return users.splice(removeIndex, 1)[0];
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUserWithAddress = (address) => {
  return users.find((user) => user.address === address);
};

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUserWithAddress,
  getUsersInRoom,
  stakeUser,
  isEveryoneStaked,
};
