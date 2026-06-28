"use client";

import { useEffect, useState } from "react"; // 1. Added state hooks
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export default function Navbar() {
  const { connected, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  
  // 2. Track whether the component has successfully mounted in the browser
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 3. Render a static, visual skeleton version of the button while loading on server.
  // This maintains your exact layout grid and layout styling without visual pop-in.
  const renderButtonContent = () => {
    if (!mounted) return "◈ Connect Wallet";
    if (connected && publicKey) {
      return `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`;
    }
    return "◈ Connect Wallet";
  };

  return (
    <div className="navbar sticky top-0 z-50 backdrop-blur-md flex justify-between px-7 h-17 bg-[linear-gradient(to_right,#0d0b0c_0%,#0d0b0c_40%,transparent_50%,#0d0b0c_60%,#0d0b0c_100%)] text-[#807f8a] items-center">
      <div className="logo">
        <div className="brand font-extrabold text-xl text-white">
          <span className="seal w-7 h-7 rounded-full border-amber-600 border-5 p-1 mr-1 text-sm">
            <b className="p-1 text-amber-600 font-medium">F</b>
          </span>{" "}
          FOUNDRY
        </div>
      </div>
      <div className="nav-links hidden lg:flex gap-6">
        <a href="#tools">Tools</a>
        <a href="#features">How it works</a>
        <a href="#">Docs</a>
        <a href="#">Explorer</a>
      </div>
      <button
        // Disabled interaction safely while mounting to protect script bindings
        disabled={!mounted}
        className="btn btn-molten text-black sm:px-5 py-3 bg-gradient-to-b from-[#FF8A3D] to-[#E5500A] rounded-lg w-32 sm:w-43 h-11 text-[12px] sm:text-s font-bold hover:cursor-pointer hover:from-[#E5500A] hover:to-[#FF8A3D] transition-colors duration-300 disabled:opacity-50"
        onClick={async () => {
          if (!connected) {
            setVisible(true);
          } else {
            await disconnect();
          }
        }}
      >
        {renderButtonContent()}
      </button>
    </div>
  );
}