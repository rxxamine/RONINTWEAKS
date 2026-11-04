export interface CryptoOption {
  id: string;
  coinName: string;
  symbol: string;
  iconColor: string;
  networks: {
    networkName: string;
    networkStandard: string;
    address: string;
    recommended?: boolean;
    memoRequired?: boolean;
  }[];
}

export const CRYPTO_PAYMENT_OPTIONS: CryptoOption[] = [
  {
    id: 'usdt',
    coinName: 'Tether USD',
    symbol: 'USDT',
    iconColor: '#26A17B',
    networks: [
      {
        networkName: 'TRON',
        networkStandard: 'TRC20',
        address: 'TJ9VUm7fapNZHexKbeX2dUGvzUeETPnjto',
        recommended: true,
      },
      {
        networkName: 'BNB Smart Chain',
        networkStandard: 'BEP20 / BSC',
        address: '0xadabc0cdb3ce3bbddecbf3b368da30a0a290f7de',
        recommended: true,
      },
      {
        networkName: 'Polygon',
        networkStandard: 'POL / MATIC',
        address: '0xadabc0cdb3ce3bbddecbf3b368da30a0a290f7de',
      },
      {
        networkName: 'Ethereum',
        networkStandard: 'ERC20',
        address: '0xadabc0cdb3ce3bbddecbf3b368da30a0a290f7de',
      },
      {
        networkName: 'Solana',
        networkStandard: 'SPL',
        address: 'C9Xb2yiYDVpBbuKegzMzJHn1sUBwXXhTkXyseQotpuGR',
      },
    ],
  },
  {
    id: 'ltc',
    coinName: 'Litecoin',
    symbol: 'LTC',
    iconColor: '#345D9D',
    networks: [
      {
        networkName: 'Litecoin Core',
        networkStandard: 'Native Network',
        address: 'Lg91zzntUAbmDksqx5jnfSRayqumuaxiZm',
        recommended: true,
      },
      {
        networkName: 'BNB Smart Chain',
        networkStandard: 'BEP20 / BSC',
        address: '0xadabc0cdb3ce3bbddecbf3b368da30a0a290f7de',
      },
    ],
  },
  {
    id: 'sol',
    coinName: 'Solana',
    symbol: 'SOL',
    iconColor: '#9945FF',
    networks: [
      {
        networkName: 'Solana',
        networkStandard: 'Native Network',
        address: 'C9Xb2yiYDVpBbuKegzMzJHn1sUBwXXhTkXyseQotpuGR',
        recommended: true,
      },
      {
        networkName: 'BNB Smart Chain',
        networkStandard: 'BEP20',
        address: '0xadabc0cdb3ce3bbddecbf3b368da30a0a290f7de',
      },
    ],
  },
];

export const UNIQUE_WALLETS_SUMMARY = [
  {
    networkGroup: 'EVM Chains (BSC / Polygon / Ethereum)',
    address: '0xadabc0cdb3ce3bbddecbf3b368da30a0a290f7de',
    tokens: 'USDT (BEP20, ERC20, Polygon), LTC (BEP20), SOL (BEP20)',
  },
  {
    networkGroup: 'TRON Network (TRC20)',
    address: 'TJ9VUm7fapNZHexKbeX2dUGvzUeETPnjto',
    tokens: 'USDT (TRC20)',
  },
  {
    networkGroup: 'Litecoin Core Network',
    address: 'Lg91zzntUAbmDksqx5jnfSRayqumuaxiZm',
    tokens: 'LTC (Native)',
  },
  {
    networkGroup: 'Solana Network (SPL & Native)',
    address: 'C9Xb2yiYDVpBbuKegzMzJHn1sUBwXXhTkXyseQotpuGR',
    tokens: 'SOL (Native), USDT (SPL)',
  },
];
