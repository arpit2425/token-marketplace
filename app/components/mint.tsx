import { mintToken, getProvider } from "@/services/service";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const Mint = () => {
  const { publicKey, signTransaction } = useWallet();
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedMint, setSelectedMint] = useState("");

  const tokens = useSelector((state: RootState) => state.tokens.tokens);

  const [formData, setFormData] = useState({
    receiver: "",
    amount: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const onMintToken = async () => {
    console.log("formData", formData)
    const program = await getProvider(publicKey, signTransaction);
    const { amount, receiver } = formData;
    if (!program || !publicKey || !signTransaction) {
      return
    }
    const respo = await mintToken({
      program,
      publicKey,
      tokenAccount: new PublicKey(selectedMint),
      receiverAccount: new PublicKey(receiver),
      amount: +amount,
    });
    console.log("respo", respo);

  }
  return (
    <div className="flex flex-col lg:flex-row p-4 sm:p-10 text-white w-full gap-10">
      {/* Form Section */}
      <div className="form lg:w-[60%] rounded-2xl gap-6 flex flex-col">
        <div>
          <span className="accent-chip px-4 py-2 bg-[#291a19] text-[#ffc53c] rounded-2xl text-[12px]">
            ⬡ STRIKE NEW SUPPLY
          </span>
        </div>

        <h3 className="text-2xl font-bold">Mint token</h3>

        <p className="text-[#9a9aa8] text-[12px]">
          Increase circulating supply. Requires you to hold the mint
          authority for the selected token.
        </p>

        <div className="field">
          <label className="form-label">Select token</label>

          <select className="select" value={selectedMint} onChange={(e) => setSelectedMint(e.target.value)}> 
            <option value="">Select a token</option>

            {tokens.map((token) => (
              <option key={token.mint} value={token.mint}>
                {token.symbol} — {token.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label className="form-label">
            Destination account
          </label>

          <input
            className="input mono"
            placeholder="Recipient wallet / token account"
            name="receiver"
            onChange={handleInputChange}
          />
        </div>

        <div className="field">
          <label className="form-label">
            Amount to mint
          </label>

          <input
            className="input mono"
            placeholder="250,000"
            name="amount"
            onChange={handleInputChange}
          />
        </div>

        <div className="field-action">
          <button
            className="
              w-full
              py-3
              rounded-2xl
              bg-gradient-to-b
              from-[#fcd470]
              to-[#e1a616]
              text-black
              font-medium
              hover:opacity-90
              transition
            "
            onClick={onMintToken}
          >
            ⬡ Mint To Wallet →
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
                <span>Current supply</span>
                <span className="text-white font-mono text-sm">
                  1,000,000
                </span>
              </div>

              <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">
                <span>After mint</span>
                <span className="text-white font-mono text-sm">
                  1,000,000
                </span>
              </div>

              <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">
                <span>Your balance</span>
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