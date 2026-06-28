import { AnchorProvider, BN, Program, Wallet } from "@coral-xyz/anchor";
import { Keypair, PublicKey, Connection, SystemProgram,TransactionSignature,
  Transaction,
  AccountMeta, } from "@solana/web3.js";
import type { SplBackend } from "@/spl_backend";
import idlJson from "@/spl_backend.json";
import { 
  TOKEN_2022_PROGRAM_ID, 
  ASSOCIATED_TOKEN_PROGRAM_ID, 
  getAssociatedTokenAddressSync 
} from "@solana/spl-token";
import { getClusterURL } from "@/utils/helper";



// Interface for the function parameters
interface CreateTokenParams {
  program: Program<SplBackend>;
  publicKey: PublicKey;
  decimals: number;
  name: string;
  symbol: string;
  amount: number; // Base amount (e.g., 500 tokens)
  uri: string;     // Off-chain metadata JSON link
}
interface MintTokenParams {
  program: Program<SplBackend>;
  publicKey: PublicKey;
  amount: number; 
  receiverAccount: PublicKey;
  tokenAccount: PublicKey;
}
interface TransferParams{
 program: Program<SplBackend>;
  publicKey: PublicKey;
  amount: number; 
  receiverAccount: PublicKey;
  tokenAccount: PublicKey;
}
 
const idl = idlJson as SplBackend;
const Program_id = new PublicKey(idlJson.address);
const cluster = process.env.NEXT_PUBLIC_CLUSTER || "devnet";
const RPC_URL = getClusterURL(cluster);
console.log("rpc_url",RPC_URL)
interface SignerWallet {
  publicKey: PublicKey;
  signTransaction: (tx: Transaction) => Promise<Transaction>;
  signAllTransactions: (txs: Transaction[]) => Promise<Transaction[]>;
}
/**
 * Singleton/Helper to initialize the Anchor Program instance.
 * Ensures we pull values dynamically from Next.js runtime environment variables safely.
 */

export const getProvider = (
  publicKey: PublicKey | null,
  signTransaction: (tx: Transaction) => Promise<Transaction>,
): Program<SplBackend> | null => {
  if (!publicKey || !signTransaction) {
    console.error("Wallet not connected or missing signTransaction");
    return null;
  }

  if (
    !RPC_URL ||
    (!RPC_URL.startsWith("http://") && !RPC_URL.startsWith("https://"))
  ) {
    console.error("Invalid RPC URL:", RPC_URL);
    throw new Error(
      `Invalid RPC endpoint: ${RPC_URL}. It must start with http: or https:. Check NEXT_PUBLIC_CLUSTER env var.`,
    );
  }

  const connection = new Connection(RPC_URL, "confirmed");

  const wallet: SignerWallet = {
    publicKey,
    signTransaction,
    signAllTransactions: async (txs: Transaction[]) => {
      const signed: Transaction[] = [];
      for (const tx of txs) {
        signed.push(await signTransaction(tx));
      }
      return signed;
    },
  };

  const provider = new AnchorProvider(connection, wallet as unknown as Wallet, {
    commitment: "processed",
  });

  return new Program(idl, provider);
};

/**
 * Service function to create a Token-2022 Mint with built-in metadata 
 * and mint an initial supply directly to the payer's ATA.
 * * @returns Object containing the transaction signature, mint address, and destination ATA
 */
export async function createAndMintToken({
  program,
  publicKey,
  decimals,
  name,
  symbol,
  amount,
  uri
}:CreateTokenParams) {
  try {
   

    // 1. Generate a brand new, unique keypair for this specific Token Mint
    const mintKeypair = Keypair.generate();

    // 2. Compute the precise Token-2022 Associated Token Account destination target
    const ataAddress = getAssociatedTokenAddressSync(
      mintKeypair.publicKey,
      publicKey,
      false,
      TOKEN_2022_PROGRAM_ID
    );

    // 3. Convert numbers to Anchor compatible structures
    const tokenAmountBN = new BN(amount);

    console.log(`[TokenService] Initializing mint: ${mintKeypair.publicKey.toBase58()}`);

    // 4. Dispatch the RPC instruction transaction string 
    const txSignature = await program.methods
      .createAndMint(decimals, name, symbol, tokenAmountBN, uri)
      .accounts({
        payer: publicKey,
        mint: mintKeypair.publicKey,
        ata: ataAddress,
        tokenProgram: TOKEN_2022_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([mintKeypair]) // The Mint keypair MUST sign to initialize the account from scratch
      .rpc();

    return {
      success: true,
      txSignature,
      mintAddress: mintKeypair.publicKey.toBase58(),
      ataAddress: ataAddress.toBase58(),
    };

  } catch (error: any) {
    console.error("[TokenService] Failed executing createAndMintToken:", error);
    throw new Error(error?.message || "Internal Solana transaction execution failed.");
  }
}

export async function mintToken({
  program,
  publicKey,
  tokenAccount,
  receiverAccount,
  amount
}:MintTokenParams){
  try {
      const ataAddress = getAssociatedTokenAddressSync(
      tokenAccount,
      receiverAccount,
      false,
      TOKEN_2022_PROGRAM_ID
    );
    console.log("ataAddress",ataAddress)
    let amountBn=new BN(amount)
  const txSignature = await  program.methods.mintToken(amountBn).accounts({
      signer:publicKey,
      receiver: receiverAccount,
      mintToken:tokenAccount,
      tokenAccount:ataAddress,
       tokenProgram: TOKEN_2022_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
    }).signers([]).rpc();
    return {
       success: true,
      txSignature,
      ataAddress: ataAddress.toBase58(),
    }
  } catch (error) {
    console.log("error :", error)
    
  }

}

export async function transferToken({
  program,
  publicKey,
  tokenAccount,
  receiverAccount,
  amount
}:TransferParams) {
  try {
    const ataAddress=await getAssociatedTokenAddressSync(
       tokenAccount,
      receiverAccount,
      false,
      TOKEN_2022_PROGRAM_ID
    );
    const senderAta=await getAssociatedTokenAddressSync(
      tokenAccount,
      publicKey,
      false,
    TOKEN_2022_PROGRAM_ID
    )
        let amountBn=new BN(amount)
        const txSignature=await program.methods.transferToken(amountBn).accounts({
          signer:publicKey,
          mint:tokenAccount,
          senderTokenAccount:senderAta,
          receiver:receiverAccount,
          recipientTokenAccount:ataAddress,

        }).signers([]).rpc();
         return {
       success: true,
      txSignature,
      ataAddress: ataAddress.toBase58(),
    }


    
  } catch (error) {
     console.log("error :", error)
  }
  
}