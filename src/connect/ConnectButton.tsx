"use client";

import { useEffect, useState } from "react";
import { useAccount, useBalance, useConnect } from "wagmi";
import { disconnect } from "@wagmi/core";

export default function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, isLoading, connectors } = useConnect();
  const [isClientConnected, setIsClientConnected] = useState(false);

  const { data } = useBalance({
    address,
    watch: true,
  });

  useEffect(() => {
    setIsClientConnected(isConnected);
  }, [isConnected]);

  if (isClientConnected)
    return (
      <div className="flex flex-col items-center gap-2">
        <span>
          Connected account: <span className="font-bold">{address}</span>
        </span>
        <span>
          Balance:{" "}
          <span className="font-bold">
            {data?.formatted} {data?.symbol}
          </span>
        </span>
        <button
          onClick={disconnect}
          className="px-3 py-1.5 text-sm text-red-100 duration-100 border rounded-lg bg-red-500 hover:bg-red-600 active:shadow-lg"
        >
          Disconnect
        </button>
      </div>
    );

  return (
    <button
      className="px-7 py-4 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg disabled:opacity-50"
      onClick={() => connect({ connector: connectors[0] })}
      disabled={isLoading}
    >
      Connect Wallet
    </button>
  );
}
