import "@rainbow-me/rainbowkit/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";

const thundercoreChain = {
  id: 18,
  name: "ThunderCore Testnet",
  network: "thundercore-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ThunderCore Testnet",
    symbol: "TST",
  },
  rpcUrls: {
    default: { http: ["https://testnet-rpc.thundercore.com"] },
  },
  blockExplorers: {
    default: {
      name: "explorer-thundercore",
      url: "https://explorer-testnet.thundercore.com/",
    },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [thundercoreChain],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Zeus",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        coolMode
        chains={chains}
        theme={darkTheme({
          accentColor: "#4CBB17",
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "rounded",
          overlayBlur: "small",
        })}
      >
        <Router>
          <App />
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
