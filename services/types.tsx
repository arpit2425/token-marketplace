import { SplBackend } from "@/spl_backend";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

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

export interface BurnRequest{
   program: Program<SplBackend>;
  publicKey: PublicKey;
  amount: number;
  mint: PublicKey;
  
}

export interface CreateTokenParams {
  program: Program<SplBackend>;
  publicKey: PublicKey;
  decimals: number;
  name: string;
  symbol: string;
  amount: number; // Base amount (e.g., 500 tokens)
  uri: string;     // Off-chain metadata JSON link
}
export interface MintTokenParams {
  program: Program<SplBackend>;
  publicKey: PublicKey;
  amount: number;
  receiverAccount: PublicKey;
  tokenAccount: PublicKey;
}
export interface TransferParams {
  program: Program<SplBackend>;
  publicKey: PublicKey;
  amount: number;
  receiverAccount: PublicKey;
  tokenAccount: PublicKey;
}