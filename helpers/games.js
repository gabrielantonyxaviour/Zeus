const games = [];

const addGame = ({ room, bet }) => {
  console.log("Adding game:");
  console.log(games);
  const newGame = { room, bet };
  games.push(newGame);

  return { newGame };
};

const removeGame = (room) => {
  const removeIndex = games.findIndex((game) => game.room === room);
  if (removeIndex !== -1) return games.splice(removeIndex, 1)[0];
};

const getGame = (room) => {
  console.log("Getting game:");
  console.log(games);
  return games.find((game) => game.room === room);
};

module.exports = { addGame, removeGame, getGame };
