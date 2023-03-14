CREATE DATABASE my_database;

CREATE TABLE games (
    profile VARCHAR(255) PRIMARY KEY REFERENCES profiles(wallet_address),
    socketid VARCHAR(255),
    bet INT
);

CREATE TABLE profiles (
    wallet_address VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    image VARCHAR(255),
    description TEXT
);

CREATE TABLE follows (
    id SERIAL PRIMARY KEY,
    user_wallet_address VARCHAR(255) REFERENCES profiles(wallet_address),
    follower_wallet_address VARCHAR(255) REFERENCES profiles(wallet_address)
);

SELECT g.profile,g.socketid,g.bet,p.name,p.image from games g inner join profiles p on g.profile = p.wallet_address;