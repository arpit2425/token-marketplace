"use client";

import { getProvider, transferToken } from "@/services/service";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { ReactHTMLElement, useState } from "react";
export const Transfer = () => {
  const { connected, publicKey, signTransaction } = useWallet();
  const [formData, setFormData] = useState({
    tokenAccount: "6Wj8vT2XrxSH15xPuikZQXESjdXksE9onzKxofCPp9dH",
    receiverAccount: "",
    amount: ""
  })
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const handleOnSubmit=async()=>{
    const program=await getProvider(publicKey,signTransaction);
    if(!program || !signTransaction || !publicKey){
      return
    }
    const {tokenAccount,receiverAccount,amount}=formData;
    const response=await transferToken({program,publicKey,tokenAccount:new PublicKey(tokenAccount),receiverAccount:new PublicKey(receiverAccount),amount:+amount});
    console.log(response);
  }
  return (
    <div className="flex flex-col lg:flex-row p-4 sm:p-10 text-white w-full gap-10">
      {/* Form Section */}
      <div className="form lg:w-[60%] rounded-2xl gap-6 flex flex-col">
        <div>
          <span className="accent-chip px-4 py-2 bg-[#1a212e] text-[#4ea3ff] rounded-2xl text-[12px]">
            → MOVE BETWEEN WALLETS
          </span>
        </div>

        <h3 className="text-2xl font-bold">Transfer tokens</h3>

        <p className="text-[#9a9aa8] text-[12px]">
          Send any SPL token you hold. We auto-create the recipient's associated token account if it doesn't exist.
        </p>

        <div className="field">
          <label className="form-label">Select token</label>

          <select className="select p-2">
            <option>SOLAR — Solar Credit</option>
            <option>FORGE — Foundry Coin</option>
          </select>
        </div>

        <div className="field">
          <label className="form-label">
            Recipient address
          </label>

          <input
            className="input mono"
            placeholder="7xpejndj.....dkjnj"
            onChange={handleOnChange}
            name="receiverAccount"
          />
        </div>

        <div className="field">
          <label className="form-label">
            Amount
          </label>

          <input
            className="input mono"
            placeholder="250,000"
            onChange={handleOnChange}
            name="amount"
          />
        </div>

        <div className="field-action">
          <button
            className="
              w-full
              py-3
              rounded-2xl
              bg-gradient-to-b
               from-[#5da7f5]
                  to-[#2c81e1]
              text-black
              font-medium
              hover:opacity-90
              transition
            "
            onClick={handleOnSubmit}
          >
            → Send Transfer →
          </button>
        </div>
      </div>

      {/* Preview Card */}
      <div className="lg:w-[40%] rounded-2xl bg-[#09090a] p-4">
        <aside className="flex flex-col gap-4 text-[#9a9aa8]">
          <div
            className="
              border
              border-[#2a2a35]
              rounded-3xl
              p-5
              overflow-hidden
              bg-[radial-gradient(circle_at_10%_50%,rgba(37,99,235,0.15),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(249,115,22,0.20),transparent_25%),linear-gradient(to_right,#12121a,#0b0b10,#12121a)]
            "
          >
            {/* Header */}
            <div className="grid grid-cols-[auto_1fr] items-center gap-4 mb-8">
              <div
                className="
                  w-16
                  h-16
                  rounded-full
                  bg-gradient-to-b
                  from-[#fdd571]
                  to-[#e1a616]
                  flex
                  items-center
                  justify-center
                  text-black
                  font-bold
                  text-xl
                "
              >
                S
              </div>

              <div>
                <h4 className="text-white text-xl font-bold">
                  Solar Credit
                </h4>

                <p className="text-[#6d6d7f] tracking-widest text-[10px] uppercase">
                  Mint authority
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="bg-black/70 rounded-3xl overflow-hidden text-sm">
              <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">
                <span>From</span>
                <span className="text-white font-mono text-sm">
                  {connected ? `${publicKey?.toBase58().slice(0, 4)}...${publicKey?.toBase58().slice(-4)}` : " 1,000,000"}
                </span>
              </div>

              <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">
                <span>To</span>
                <span className="text-white font-mono text-sm">
                  1,000,000
                </span>
              </div>

              <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">
                <span>Amount</span>
                <span className="text-white font-mono text-sm">
                  1,000,000
                </span>
              </div>
              <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">
                <span>Recipient ATA</span>
                <span className="text-white font-mono text-sm">
                  1,000,000
                </span>
              </div>


            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};