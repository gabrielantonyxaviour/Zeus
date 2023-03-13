const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.USER_NAME,
  host: "localhost",
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

const getCurrentGames = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM game_codes", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getCurrentGamesWithFilter = (start, end) => {
  // TODO
};

const getFollowers = (address) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT * FROM follows WHERE user_walllet_address=${address}`,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const getFollowing = (address) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT * FROM follows WHERE follower_wallet_address=${address}`,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const getProfile = (address) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT * FROM profiles WHERE wallet_address=${address}`,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const createGame = (address, code, amount) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      `INSERT INTO game_codes (code,profile,challenge) VALUES (${code},${address},${amount})`,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const createProfile = (address, name, image_url, description) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      `INSERT INTO profiles (wallet_address,name,image,description) VALUES (${address},${name},${image_url},${description})`,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const editProfile = (name, image_url, description) => {
  const query = `UPDATE profiles SET `;
  let first = false;
  if (name) {
    query += `name=${name}`;
    first = true;
  }
  if (image_url) {
    if (first) query += `, `;
    query += `image=${image_url}`;
    first = true;
  }

  if (description) {
    if (first) query += `, `;
    query += `description=${description}, `;
    first = true;
  }
  return new Promise(function (resolve, reject) {
    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const followProfile = (following_address, user_address) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      `INSERT INTO follows (user_wallet_address,follower_wallet_address) VALUES (${following_address},${user_address})`,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};
const unfollowProfile = (following_address, user_address) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      `DELETE FROM follows WHERE user_wallet_address=${following_address} AND follower_wallet_address=${user_address})`,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

module.exports = {
  getCurrentGames,
  getProfile,
  getFollowers,
  getFollowing,
  createGame,
  createProfile,
  editProfile,
  followProfile,
  unfollowProfile,
};
