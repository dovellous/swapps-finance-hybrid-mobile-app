import { NetworkType } from '@airgap/beacon-types';
import { DAppClientOptions } from '@airgap/beacon-dapp/dist/esm/dapp-client/DAppClientOptions';
import { SpicyToken } from 'types/SpicyToken';
import { BigNumber } from 'bignumber.js';

/* todo: refactor into one global config object for easy access and import */

export const SPICY_API_URL: string = 'https://spicyb.sdaotools.xyz/';
export const TZKT_API_URL: string = 'https://api.tzkt.io/v1/';

export const SPICY_ROUTER: string = 'KT1PwoZxyv4XkPEGnTqWYvjA1UYiPTgAGyqL';
export const WTZ_CONTRACT: string = 'KT1Pyd1r9F4nMaHy8pPZxPSq6VCn9hVbVrf4';
export const WTZ_TOKEN: string = 'KT1PnUZCp3u2KzWr93pn4DD7HAJnm3rWVrgn';

export const DAPP_NAME: string = 'SwappsFinance';
export const DAPP_ICON_URL: string =
  'https://bafybeigqka2ynrib6ytxku3nvakork5smsxni5xdqro56kd7ecsfos7z7a.ipfs.dweb.link/';

export const DEFAULT_RPC: string = 'https://mainnet.api.tez.ie';
export const DEFAULT_NETWORK_TYPE: NetworkType = NetworkType.MAINNET;

export const dappOptions: DAppClientOptions = {
  iconUrl: DAPP_ICON_URL,
  preferredNetwork: DEFAULT_NETWORK_TYPE,
  name: DAPP_NAME,
};

export const defaultPairList: string[] = [
  'KT1PnUZCp3u2KzWr93pn4DD7HAJnm3rWVrgn:0',
];

export const defaultFrom: SpicyToken = {
  decimals: 6,
  derivedUsd: 1.244648989805831,
  derivedXtz: 1,
  img: 'https://seeklogo.com/images/T/tezos-xtz-logo-C96D3F7FB9-seeklogo.com.png',
  name: 'XTZ',
  symbol: 'XTZ',
  tag: 'KT1PnUZCp3u2KzWr93pn4DD7HAJnm3rWVrgn:0',
  totalLiquidityUsd: 92874.1649167061,
  totalLiquidityXtz: 74618.76053199123,
};

export const defaultTo: SpicyToken = {
  decimals: 2,
  derivedUsd: 0.000096774597620169,
  derivedXtz: 0.00008606377324968,
  img: 'ipfs://bafybeigqka2ynrib6ytxku3nvakork5smsxni5xdqro56kd7ecsfos7z7a',
  name: 'Tezos Pepe',
  symbol: 'PEPE',
  tag: 'KT1MZg99PxMDEENwB4Fi64xkqAVh5d1rv8Z9:0',
  totalLiquidityUsd: 2147.0167050012815,
  totalLiquidityXtz: 2414.217618689571,
};

export const nonDefaultTokens: SpicyToken[] = [
  {
    name: 'Tezos',
    symbol: 'XTZ',
    decimals: 6,
    img: 'https://seeklogo.com/images/T/tezos-xtz-logo-C96D3F7FB9-seeklogo.com.png',
    tag: 'KT1PnUZCp3u2KzWr93pn4DD7HAJnm3rWVrgn:0',
    derivedXtz: 1,
    derivedUsd: 1,
    totalLiquidityXtz: 1,
    totalLiquidityUsd: 1,
  },
];

export const TEZ_DECIMALS: number = 6;
export const WTZ_PRECISION: BigNumber = new BigNumber(10).pow(18);
