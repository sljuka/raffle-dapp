"use client";

import { useRaffleEnterRaffle, useRaffleGetEntranceFee } from "@/generated";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";

export const Raffle = () => {
  const { data: enteranceFee, isLoading, isError } = useRaffleGetEntranceFee();
  const { isConnected } = useAccount();
  const { write, isLoading: isLoadingEnterRaffle } = useRaffleEnterRaffle();

  if (!isConnected) return null;

  if (isLoading || isError) return <p className="text-lg">Loading...</p>;

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 p-24">
      <p className="text-lg">Hi! Welcome to raffle.</p>
      {enteranceFee !== undefined && (
        <>
          <p className="text-lg">
            Enterance fee is {formatUnits(enteranceFee, 18)} ETH
          </p>
          <button
            disabled={isLoadingEnterRaffle}
            onClick={() => write({ value: enteranceFee })}
            className="px-7 py-4 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg disabled:opacity-50"
          >
            Enter Raffle
          </button>
        </>
      )}
    </div>
  );
};
