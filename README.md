# Raffle (lottery) dapp

This is a tutorial project for learning how to build dapps with [Ethereum](https://ethereum.org/en/) and [Next.js](https://nextjs.org/).
It is continuation to [smart contracts tutorial](https://github.com/smartcontractkit/full-blockchain-solidity-course-js#lesson-9-hardhat-smart-contract-lottery) by Patrick Collins.

Instead of using react-moralis and other web3 tools from the tutorial. This one is using [Wagmi](https://wagmi.sh/) which seems like a better [alternative](https://wagmi.sh/react/comparison).

Tutorial covers:

- connecting to injected metamask wallet
- connecting to local hardhat network via metamask
- retrieving network info, account info, balance info...
- retrieving data from smart contract
- sending transactions to smart contract
- listening to events from smart contract
- e2e type safety with wagmi CLI and contract ABI
- styling using [Tailwind CSS](https://tailwindcss.com/) and Radix UI

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
