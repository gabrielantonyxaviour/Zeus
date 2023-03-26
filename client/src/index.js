import "@rainbow-me/rainbowkit/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { polygonMumbai, goerli } from "wagmi/chains";
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

const scrollChain = {
  id: 534353,
  name: "Scroll Testnet",
  network: "scroll-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Scroll Alpha Testnet",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["https://alpha-rpc.scroll.io/l2"] },
  },
  blockExplorers: {
    default: {
      name: "explorer-scroll-alpha",
      url: "https://blockscout.scroll.io/",
    },
  },
  testnet: true,
};

const taikoChain = {
  id: 167004,
  name: "Taiko (Alpha-2 Testnet)",
  network: "taiko-alpha-2-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Taiko (Alpha-2 Testnet)",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["https://rpc.a2.taiko.xyz"] },
  },
  blockExplorers: {
    default: {
      name: "explorer-taiko-alpha-2",
      url: "https://explorer.a2.taiko.xyz/",
    },
  },
  testnet: true,
};

const chiado = {
  id: 10200,
  name: "Chiado Testnet",
  network: "chiado-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Chiado Testnet",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["https://rpc.chiadochain.net/"] },
  },
  blockExplorers: {
    default: {
      name: "explorer-chiado-alpha-2",
      url: "https://blockscout.chiadochain.net/",
    },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [polygonMumbai, goerli, scrollChain, taikoChain, chiado],
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
