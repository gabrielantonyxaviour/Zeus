pragma solidity ^0.8.9;

import "./RandomLibrary.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Zeus is Ownable {
    struct Game {
        address[2] players;
        uint totalStake;
        uint startedAt;
        address winner;
        bool isStarting;
        bool isFinished;
    }
    mapping(string => Game) gameStakes;

    uint private royaltyFunds;

    event GameStarted(string gamecode, uint shufflingfactor);
    event GameOver(
        address player1,
        address player2,
        address winner,
        uint prize
    );
    event RoyaltiesClaimed();

    constructor() {
        royaltyFunds = 0;
    }

    function stake(string calldata gamecode) public payable {
        require(
            gameStakes[gamecode].players[1] ==
                address(0x00000000000000000000000000000000),
            "Game is full"
        );
        if (gameStakes[gamecode].isStarting == true) {
            gameStakes[gamecode].players[1] = msg.sender;
            gameStakes[gamecode].totalStake += (msg.value * 95) / 100;
            royaltyFunds += (msg.value * 5) / 100;
        } else {
            gameStakes[gamecode].players[0] = msg.sender;
            gameStakes[gamecode].isStarting = true;
            gameStakes[gamecode].totalStake += (msg.value * 95) / 100;
            royaltyFunds += (msg.value * 5) / 100;
        }
    }

    function endGame(string calldata gamecode, address winner)
        public
        onlyOwner
    {
        require(
            winner == gameStakes[gamecode].players[0] ||
                winner == gameStakes[gamecode].players[1],
            "Winner did not play"
        );
        require(gameStakes[gamecode].isFinished == false, "Game ended");
        gameStakes[gamecode].isFinished = true;
        gameStakes[gamecode].winner = winner;
        (bool success, bytes memory data) = payable(winner).call{
            value: gameStakes[gamecode].totalStake
        }("");
        if (success) {
            emit GameOver(
                gameStakes[gamecode].players[0],
                gameStakes[gamecode].players[1],
                winner,
                gameStakes[gamecode].totalStake
            );
        } else {
            revert("Error occured");
        }
    }

    function startGame(string calldata gamecode)
        public
        onlyOwner
        returns (uint256)
    {
        require(msg.sender == tx.origin);
        require(
            gameStakes[gamecode].players[1] !=
                address(0x00000000000000000000000000000000),
            "Waiting for players"
        );
        gameStakes[gamecode].startedAt = block.timestamp;
        uint256 randomNumber = LibThunderRNG.rand();

        emit GameStarted(gamecode, randomNumber);
        return randomNumber;
    }
}
