import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Raffle
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const raffleABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'vrfCoordinatorV2', internalType: 'address', type: 'address' },
      { name: 'subscriptionId', internalType: 'uint64', type: 'uint64' },
      { name: 'gasLane', internalType: 'bytes32', type: 'bytes32' },
      { name: 'interval', internalType: 'uint256', type: 'uint256' },
      { name: 'entranceFee', internalType: 'uint256', type: 'uint256' },
      { name: 'callbackGasLimit', internalType: 'uint32', type: 'uint32' },
    ],
  },
  {
    type: 'error',
    inputs: [
      { name: 'have', internalType: 'address', type: 'address' },
      { name: 'want', internalType: 'address', type: 'address' },
    ],
    name: 'OnlyCoordinatorCanFulfill',
  },
  { type: 'error', inputs: [], name: 'Raffle__RaffleNotOpen' },
  { type: 'error', inputs: [], name: 'Raffle__SendMoreToEnterRaffle' },
  { type: 'error', inputs: [], name: 'Raffle__TransferFailed' },
  {
    type: 'error',
    inputs: [
      { name: 'currentBalance', internalType: 'uint256', type: 'uint256' },
      { name: 'numPlayers', internalType: 'uint256', type: 'uint256' },
      { name: 'raffleState', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'Raffle__UpkeepNotNeeded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RaffleEnter',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'requestId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'RequestedRaffleWinner',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'WinnerPicked',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    name: 'checkUpkeep',
    outputs: [
      { name: 'upkeepNeeded', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [],
    name: 'enterRaffle',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getEntranceFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getInterval',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getLastTimeStamp',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'getNumWords',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getNumberOfPlayers',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'getPlayer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getRaffleState',
    outputs: [
      { name: '', internalType: 'enum Raffle.RaffleState', type: 'uint8' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getRecentWinner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'getRequestConfirmations',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    name: 'performUpkeep',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'requestId', internalType: 'uint256', type: 'uint256' },
      { name: 'randomWords', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'rawFulfillRandomWords',
    outputs: [],
  },
] as const

export const raffleAddress =
  '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9' as const

export const raffleConfig = { address: raffleAddress, abi: raffleABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raffleABI}__.
 */
export function useRaffleRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof raffleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > = {} as any,
) {
  return useContractRead({
    abi: raffleABI,
    address: raffleAddress,
    ...config,
  } as UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raffleABI}__ and `functionName` set to `"checkUpkeep"`.
 */
export function useRaffleCheckUpkeep<
  TFunctionName extends 'checkUpkeep',
  TSelectData = ReadContractResult<typeof raffleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raffleABI,
    address: raffleAddress,
    functionName: 'checkUpkeep',
    ...config,
  } as UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raffleABI}__ and `functionName` set to `"getEntranceFee"`.
 */
export function useRaffleGetEntranceFee<
  TFunctionName extends 'getEntranceFee',
  TSelectData = ReadContractResult<typeof raffleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raffleABI,
    address: raffleAddress,
    functionName: 'getEntranceFee',
    ...config,
  } as UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raffleABI}__ and `functionName` set to `"getInterval"`.
 */
export function useRaffleGetInterval<
  TFunctionName extends 'getInterval',
  TSelectData = ReadContractResult<typeof raffleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raffleABI,
    address: raffleAddress,
    functionName: 'getInterval',
    ...config,
  } as UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raffleABI}__ and `functionName` set to `"getLastTimeStamp"`.
 */
export function useRaffleGetLastTimeStamp<
  TFunctionName extends 'getLastTimeStamp',
  TSelectData = ReadContractResult<typeof raffleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raffleABI,
    address: raffleAddress,
    functionName: 'getLastTimeStamp',
    ...config,
  } as UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raffleABI}__ and `functionName` set to `"getNumWords"`.
 */
export function useRaffleGetNumWords<
  TFunctionName extends 'getNumWords',
  TSelectData = ReadContractResult<typeof raffleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raffleABI,
    address: raffleAddress,
    functionName: 'getNumWords',
    ...config,
  } as UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raffleABI}__ and `functionName` set to `"getNumberOfPlayers"`.
 */
export function useRaffleGetNumberOfPlayers<
  TFunctionName extends 'getNumberOfPlayers',
  TSelectData = ReadContractResult<typeof raffleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raffleABI,
    address: raffleAddress,
    functionName: 'getNumberOfPlayers',
    ...config,
  } as UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raffleABI}__ and `functionName` set to `"getPlayer"`.
 */
export function useRaffleGetPlayer<
  TFunctionName extends 'getPlayer',
  TSelectData = ReadContractResult<typeof raffleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raffleABI,
    address: raffleAddress,
    functionName: 'getPlayer',
    ...config,
  } as UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raffleABI}__ and `functionName` set to `"getRaffleState"`.
 */
export function useRaffleGetRaffleState<
  TFunctionName extends 'getRaffleState',
  TSelectData = ReadContractResult<typeof raffleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raffleABI,
    address: raffleAddress,
    functionName: 'getRaffleState',
    ...config,
  } as UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raffleABI}__ and `functionName` set to `"getRecentWinner"`.
 */
export function useRaffleGetRecentWinner<
  TFunctionName extends 'getRecentWinner',
  TSelectData = ReadContractResult<typeof raffleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raffleABI,
    address: raffleAddress,
    functionName: 'getRecentWinner',
    ...config,
  } as UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link raffleABI}__ and `functionName` set to `"getRequestConfirmations"`.
 */
export function useRaffleGetRequestConfirmations<
  TFunctionName extends 'getRequestConfirmations',
  TSelectData = ReadContractResult<typeof raffleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: raffleABI,
    address: raffleAddress,
    functionName: 'getRequestConfirmations',
    ...config,
  } as UseContractReadConfig<typeof raffleABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link raffleABI}__.
 */
export function useRaffleWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof raffleABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof raffleABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof raffleABI, TFunctionName, TMode>({
    abi: raffleABI,
    address: raffleAddress,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link raffleABI}__ and `functionName` set to `"enterRaffle"`.
 */
export function useRaffleEnterRaffle<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof raffleABI,
          'enterRaffle'
        >['request']['abi'],
        'enterRaffle',
        TMode
      > & { functionName?: 'enterRaffle' }
    : UseContractWriteConfig<typeof raffleABI, 'enterRaffle', TMode> & {
        abi?: never
        functionName?: 'enterRaffle'
      } = {} as any,
) {
  return useContractWrite<typeof raffleABI, 'enterRaffle', TMode>({
    abi: raffleABI,
    address: raffleAddress,
    functionName: 'enterRaffle',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link raffleABI}__ and `functionName` set to `"performUpkeep"`.
 */
export function useRafflePerformUpkeep<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof raffleABI,
          'performUpkeep'
        >['request']['abi'],
        'performUpkeep',
        TMode
      > & { functionName?: 'performUpkeep' }
    : UseContractWriteConfig<typeof raffleABI, 'performUpkeep', TMode> & {
        abi?: never
        functionName?: 'performUpkeep'
      } = {} as any,
) {
  return useContractWrite<typeof raffleABI, 'performUpkeep', TMode>({
    abi: raffleABI,
    address: raffleAddress,
    functionName: 'performUpkeep',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link raffleABI}__ and `functionName` set to `"rawFulfillRandomWords"`.
 */
export function useRaffleRawFulfillRandomWords<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof raffleABI,
          'rawFulfillRandomWords'
        >['request']['abi'],
        'rawFulfillRandomWords',
        TMode
      > & { functionName?: 'rawFulfillRandomWords' }
    : UseContractWriteConfig<
        typeof raffleABI,
        'rawFulfillRandomWords',
        TMode
      > & {
        abi?: never
        functionName?: 'rawFulfillRandomWords'
      } = {} as any,
) {
  return useContractWrite<typeof raffleABI, 'rawFulfillRandomWords', TMode>({
    abi: raffleABI,
    address: raffleAddress,
    functionName: 'rawFulfillRandomWords',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link raffleABI}__.
 */
export function usePrepareRaffleWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof raffleABI, TFunctionName>,
    'abi' | 'address'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: raffleABI,
    address: raffleAddress,
    ...config,
  } as UsePrepareContractWriteConfig<typeof raffleABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link raffleABI}__ and `functionName` set to `"enterRaffle"`.
 */
export function usePrepareRaffleEnterRaffle(
  config: Omit<
    UsePrepareContractWriteConfig<typeof raffleABI, 'enterRaffle'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: raffleABI,
    address: raffleAddress,
    functionName: 'enterRaffle',
    ...config,
  } as UsePrepareContractWriteConfig<typeof raffleABI, 'enterRaffle'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link raffleABI}__ and `functionName` set to `"performUpkeep"`.
 */
export function usePrepareRafflePerformUpkeep(
  config: Omit<
    UsePrepareContractWriteConfig<typeof raffleABI, 'performUpkeep'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: raffleABI,
    address: raffleAddress,
    functionName: 'performUpkeep',
    ...config,
  } as UsePrepareContractWriteConfig<typeof raffleABI, 'performUpkeep'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link raffleABI}__ and `functionName` set to `"rawFulfillRandomWords"`.
 */
export function usePrepareRaffleRawFulfillRandomWords(
  config: Omit<
    UsePrepareContractWriteConfig<typeof raffleABI, 'rawFulfillRandomWords'>,
    'abi' | 'address' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: raffleABI,
    address: raffleAddress,
    functionName: 'rawFulfillRandomWords',
    ...config,
  } as UsePrepareContractWriteConfig<typeof raffleABI, 'rawFulfillRandomWords'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link raffleABI}__.
 */
export function useRaffleEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof raffleABI, TEventName>,
    'abi' | 'address'
  > = {} as any,
) {
  return useContractEvent({
    abi: raffleABI,
    address: raffleAddress,
    ...config,
  } as UseContractEventConfig<typeof raffleABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link raffleABI}__ and `eventName` set to `"RaffleEnter"`.
 */
export function useRaffleRaffleEnterEvent(
  config: Omit<
    UseContractEventConfig<typeof raffleABI, 'RaffleEnter'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: raffleABI,
    address: raffleAddress,
    eventName: 'RaffleEnter',
    ...config,
  } as UseContractEventConfig<typeof raffleABI, 'RaffleEnter'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link raffleABI}__ and `eventName` set to `"RequestedRaffleWinner"`.
 */
export function useRaffleRequestedRaffleWinnerEvent(
  config: Omit<
    UseContractEventConfig<typeof raffleABI, 'RequestedRaffleWinner'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: raffleABI,
    address: raffleAddress,
    eventName: 'RequestedRaffleWinner',
    ...config,
  } as UseContractEventConfig<typeof raffleABI, 'RequestedRaffleWinner'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link raffleABI}__ and `eventName` set to `"WinnerPicked"`.
 */
export function useRaffleWinnerPickedEvent(
  config: Omit<
    UseContractEventConfig<typeof raffleABI, 'WinnerPicked'>,
    'abi' | 'address' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: raffleABI,
    address: raffleAddress,
    eventName: 'WinnerPicked',
    ...config,
  } as UseContractEventConfig<typeof raffleABI, 'WinnerPicked'>)
}
