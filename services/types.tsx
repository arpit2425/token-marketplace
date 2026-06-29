export interface TokenInfo {
  mint: string;
  tokenAccount: string;
  owner: string;

  name: string;
  symbol: string;
  description: string;
  image: string;
  uri: string;

  amount: string;
  balance: number;
  decimals: number;

  totalSupply: string;
  uiTotalSupply: number;
}