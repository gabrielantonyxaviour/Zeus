const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const { pool } = require("./db");

io.on("connection", (socket) => {
  console.log("Client connected " + socket.id);
  socket.on("join", (payload, callback) => {
    let numberOfUsersInRoom = getUsersInRoom(payload.room).length;

    const { error, newUser } = addUser({
      id: socket.id,
      name: numberOfUsersInRoom === 0 ? "Player 1" : "Player 2",
      room: payload.room,
    });

    if (error) return callback(error);

    socket.join(newUser.room);

    io.to(newUser.room).emit("roomData", {
      room: newUser.room,
      users: getUsersInRoom(newUser.room),
    });
    socket.emit("currentUserData", { name: newUser.name });
    callback();
  });

  socket.on("initGameState", (gameState) => {
    const user = getUser(socket.id);
    if (user) io.to(user.room).emit("initGameState", gameState);
  });

  socket.on("updateGameState", (gameState) => {
    const user = getUser(socket.id);
    if (user) io.to(user.room).emit("updateGameState", gameState);
  });

  socket.on("sendMessage", (payload, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", {
      user: user.name,
      text: payload.message,
    });
    callback();
  });

  socket.on("offer", (payload, callback) => {
    const { creatorSocketId, name, bet, accepterSocketId } = payload;
    console.log(payload);
    console.log(socket.id);
    if (creatorSocketId == socket.id) {
      io.to(creatorSocketId).emit("popup", {
        from: accepterSocketId,
        name,
        bet,
      });
    }
  });
  socket.on("accept", (payload, callback) => {
    const { opponentSocketId, roomCode, bet } = payload;
    if (opponentSocketId == socket.id) {
      io.to(socket.id).emit("accept", {
        roomCode,
        bet,
      });
    }
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    console.log("DISCONNECTED!");
    if (user)
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
  });
});

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// QUERIES

// Get Profile
app.get("/profile/:address", async (req, res) => {
  try {
    const { address } = req.params;
    const profile = await pool.query(
      `SELECT * FROM profiles WHERE wallet_address = $1`,
      [address]
    );
    res.json(profile.rows[0]);
  } catch (err) {
    console.log("ERROR OCCUREED!!!");
    console.log(err);
  }
});

// Get followers
app.get("/profile/followers/:address", async (req, res) => {
  try {
    const { address } = req.params;
    const profile = await pool.query(
      "SELECT * FROM follows WHERE user_walllet_address=$(1)",
      [address]
    );
    res.json(profile.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

// Get Following
app.get("/profile/following/:address", async (req, res) => {
  try {
    const { address } = req.params;
    const profile = await pool.query(
      "SELECT * FROM follows WHERE follower_wallet_address=$(1)",
      [address]
    );
    res.json(profile.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

// Get current Games
app.get("/games", async (req, res) => {
  try {
    const games = await pool.query(
      "SELECT g.profile,g.socketid,g.bet,p.name,p.image from games g inner join profiles p on g.profile = p.wallet_address"
    );
    res.json(games.rows);
  } catch (err) {
    console.log(err);
  }
});

// Create a game
app.post("/games", async (req, res) => {
  try {
    const { walletAddress, bet, socketid } = req.body;
    const newGame = await pool.query(
      "INSERT INTO games (profile, socketid, bet) VALUES ($1,$2,$3) RETURNING *",
      [walletAddress, socketid, bet]
    );
    // console.log(req.body);

    res.json(newGame.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Delete a game
app.post("/deleteGame", async (req, res) => {
  try {
    const { address } = req.body;
    const deletedGames = await pool.query(
      "DELETE FROM games WHERE profile=$(1)",
      [address]
    );
    res.json(deletedGames.rows);
  } catch (err) {
    console.log(err);
  }
});

// Create a profile
app.post("/createProfile", async (req, res) => {
  try {
    const { address, name, image_url, description } = req.body;
    const profile = await pool.query(
      "INSERT INTO profiles (wallet_address,name,image,description) VALUES ($(1),$(2),$(3),$(4)) RETURNING *",
      [address, name, image_url, description]
    );
    res.json(profile.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Update a profile
app.post("/updateProfile", async (req, res) => {
  const query = "UPDATE profiles SET ";
  const { name, image_url, description } = req.body;

  let first = false;
  if (name) {
    query += "name=" + name;
    first = true;
  }
  if (image_url) {
    if (first) query += ", ";
    query += "image=" + image_url;
    first = true;
  }

  if (description) {
    if (first) query += ", ";
    query += "description=" + description;
    first = true;
  }
  try {
    const profile = await pool.query(query);
    res.json(profile.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Follow a profile
app.post("/followProfile", async (req, res) => {
  try {
    const { following_address, user_address } = req.body;
    const follow = await pool.query(
      "INSERT INTO follows (user_wallet_address,follower_wallet_address) VALUES ($(1),$(2))",
      [following_address, user_address]
    );
    res.json(follow.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Unfollow a profile
app.post("/unfollowProfile", async (req, res) => {
  try {
    const { following_address, user_address } = req.body;
    const unfollow = await pool.query(
      "DELETE FROM follows WHERE user_wallet_address=$(1) AND follower_wallet_address=$(2))",
      [following_address, user_address]
    );
    res.json(unfollow.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// io.listen(8080, () => {
//   console.log("IO listening on port 8080");
// });
io.listen(8080);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
