CREATE DATABASE my_database;

CREATE TABLE game_codes (
    id SERIAL PRIMARY KEY,
    profile VARCHAR(255) REFERENCES profiles(wallet_address),
    challenge BIGINT
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