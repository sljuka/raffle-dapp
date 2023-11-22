import ConnectButton from "@/connect/ConnectButton";
import { Raffle } from "@/raffle/Raffle";
import NoSSR from "@/utils/NoSSR";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-24">
      <ConnectButton />
      <NoSSR>
        <Raffle />
      </NoSSR>
    </main>
  );
}
