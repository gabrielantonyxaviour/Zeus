<h1 align="center">0xUNO</h1>
<h2 align="center">Two player online game of UNO</h2>
<h2 align="center">Play now at https://0xuno.vercel.app/</h2>


<img src="client/src/assets/logo.png" alt="UNO Logo" width="33%" align="center" />

## 🤔 What is UNO?

UNO is the classic and beloved card game that’s easy to pick up and impossible to put down! Players take turns matching a card in their hand with the current card shown on top of the deck either by color or number. Special action cards deliver game-changing moments as they each perform a function to help you defeat your opponents. These include skips, reverses, draw twos, color-changing wild and draw four wild cards.

## ⚠️ Game Rules

Read the complete rules of UNO [here](https://www.unorules.com/).

<h2 align="center">Contracts at https://github.com/gabrielantonyxaviour/0xuno_contracts/</h2>

 - MUMBAI_CONTRACT_ADDRESS = "0x31a70eb8990ccc7fdb4f96a62f5c1aa6e314c88b";
 - CHIADO_CONTRACT_ADDRESS = "0x16CBC6Cb38D19B73A3b545109c70b2031d20EA37";
 - TAIKO_CONTRACT_ADDRESS = "0x16CBC6Cb38D19B73A3b545109c70b2031d20EA37";
 - SCROLL_CONTRACT_ADDRESS = "0xC044FCe37927A0Cb55C7e57425Fe3772181228a6"; 
 - GOERLI_CONTRACT_ADDRESS = "0xF1D62f668340323a6533307Bb0e44600783BE5CA";
 - GNOSIS_CONRACT_ADDRESS = "0x16CBC6Cb38D19B73A3b545109c70b2031d20EA37";

## 🎮 Screenshots

<img src="screenshots/Screenshot-1.png" alt="Screenshot 1" width="75%" align="center" />
<img src="screenshots/Screenshot-2.png" alt="Screenshot 2" width="75%" align="center" />
<img src="screenshots/Screenshot-3.png" alt="Screenshot 3" width="75%" align="center" />
<img src="screenshots/Screenshot-4.png" alt="Screenshot 3" width="75%" align="center" />
<img src="screenshots/Screenshot-5.png" alt="Screenshot 3" width="75%" align="center" />
<img src="screenshots/Screenshot-6.png" alt="Screenshot 3" width="75%" align="center" />
<img src="screenshots/Screenshot-7.png" alt="Screenshot 3" width="75%" align="center" />

## Inspiration

UNO is a very popular game and my main motive towards building this project is to onboard more web2 users to web3 through gaming. UNO being a very fun game when played in groups , I wanted to take up the challenge to play this game remotely with a random person in a trust-free manner.

## What it does

This project contains a frontend where a user interacts to create his profile and get signed up to play the game. The player can either create a new bet in the Games Dashboard or he can accept the bet created by some other user. If the other user also accepts the offer they will move to a Staking page. In this page both the players are expected to stake to start the game. After both of them completed their stake, they will be directed to the Game page where they play the UNO game.  

## How we built it

We built the front end with React + TailwindCSS. Our backend architecture consists of socket.io for multiplayer gameplay, chat messaging and match initialization. New games created are stored in a Polybase data solution and the backend server is built with react for the database and socket.io. We deployed our smart contract which handles the staking and winner-rewarding mechanism in 5 different chains making us a multi-chain P2E game - Taiko, Gnosis, Mumbai Testnet and the Scroll Chain. We implemented cross-chain gameplay feature with Connext where a user can play with an opponent in Mumbai Testnet from Goerli Testnet.

## Challenges we ran into

I ran into a lot of challenges with Socket.io since it was not working most of the time and failed to connect with the server causing a lot of time wasted into fixing it. The experience and seamless integrations was amazing and since it was EVM compatible I found no problem with integrating with my application.

## Accomplishments that we're proud of

I am proud of building my application which is fully functional. Even though some parts might break in my dApp, it is a successful prototype that functions the entire workflow without any issues and I'm proud of that accomplishment.

## What's next for 0xUNO

Looking foward to add fiat onramping to stake tokens and play the game so that I could onboard more web2 users to this game. Also the UI / UX needs to fine tuned to make it production ready.
