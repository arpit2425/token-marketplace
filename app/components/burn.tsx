import { useState } from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { burnToken, getProvider } from "@/services/service";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { TokenInfo } from "@/services/types";

export const Burn = () => {
    const [selectedMint, setSelectedMint] = useState("");
    const [mint, setMint] = useState<TokenInfo| null>(null);
    const {publicKey,signAllTransactions,signTransaction}=useWallet();
    const [showBanner, setShowBanner]=useState(false);
    const [formData, setFormData] = useState({
    mint: "",
    amount: "",
  });
  
  const [supplyData,setSupplyData]=useState({
    your_balance:0,
    burning:0,
    new_supply:0,
    new_balance:0,
  })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const tokens = useSelector((state: RootState) => state.tokens.tokens);
  const handleOnBurn=async()=>{
    try {
       if ( !publicKey || !signTransaction) {
      return
    }
    const program = await getProvider(publicKey, signTransaction);
    const { amount } = formData;
    if (!program || !publicKey || !signTransaction) {
      return
    }
    const respo = await burnToken({
      program,
      publicKey,
      mint: new PublicKey(selectedMint),
      amount: +amount,
    });
    console.log("respo", respo);
    const mintData=tokens.filter(token=>token.mint===selectedMint)[0];
    setMint(mintData);
    if(!mint) return 
    const {amount:your_balance, decimals}=mint;
    let new_balance=+your_balance-(+amount);
    setSupplyData(prev=>({
      ...prev,
      your_balance:+your_balance,
      burning:+amount,
      new_balance,
      new_supply:(new_balance/(10 ** decimals))
    }))
    setShowBanner(true);
    } catch (error) {
      console.log("error ",error)
      
    }
  }
  return (
    <div className="flex flex-col lg:flex-row p-4 sm:p-10 text-white w-full gap-10">
      {/* Form Section */}
      <div className="form lg:w-[60%] rounded-2xl gap-6 flex flex-col">
        <div>
          <span className="accent-chip px-4 py-2 bg-[#2b181b] text-[#d8271c] rounded-2xl text-[12px]">
            ▲ MELT DOWN SUPPLY
          </span>
        </div>

        <h3 className="text-2xl font-bold">Burn tokens</h3>

        <p className="text-[#9a9aa8] text-[12px]">
          Permanently remove tokens from circulation. This reduces total supply and cannot be undone.
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
           Amount to burn
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
               from-[#f75b50]
                  to-[#d8271c]
              text-black
              font-medium
              hover:opacity-90
              transition
            "
            onClick={handleOnBurn}
          >
            ▲ Burn Forever →
          </button>
        </div>
      </div>

      {showBanner &&
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
                  {mint?.name}
                </h4>

                <p className="text-[#6d6d7f] tracking-widest text-[10px] uppercase">
                  Mint authority
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="bg-black/70 rounded-3xl overflow-hidden text-sm">
              <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">
                <span>Your balance</span>
                <span className="text-white font-mono text-sm">
                   {supplyData.your_balance}
                </span>
              </div>

              <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">
                <span>Burning</span>
                <span className="text-white font-mono text-sm">
                  {supplyData.burning}
                </span>
              </div>

              <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">
                <span>New balance</span>
                <span className="text-white font-mono text-sm">
                {supplyData.new_balance}
                </span>
              </div>
                    <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">
                <span>New supply</span>
                <span className="text-white font-mono text-sm">
                  {supplyData.new_supply}
                </span>
              </div>

              
            </div>
          </div>
        </aside>
      </div>
      }
    </div>
  );
};