"use client";

import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { localhost } from "wagmi/chains";
import React from "react";
import { InjectedConnector } from "wagmi/connectors/injected";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [localhost],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [new InjectedConnector({ chains })],
});

type Props = {
  children: React.ReactNode;
};

export const Web3Provider = ({ children }: Props) => (
  <WagmiConfig config={config}>{children}</WagmiConfig>
);
