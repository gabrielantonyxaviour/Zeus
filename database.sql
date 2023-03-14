CREATE DATABASE my_database;

CREATE TABLE games (
    profile VARCHAR(255) PRIMARY KEY REFERENCES profiles(wallet_address),
    socketid VARCHAR(255),
    bet INT
);

CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
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