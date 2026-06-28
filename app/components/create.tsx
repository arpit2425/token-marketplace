"use client";

import { createAndMintToken, getProvider } from "@/services/service";
import { useWallet } from "@solana/wallet-adapter-react";
import {  useState } from "react";


export const Create = () => {
 const [logo, setLogo] = useState<string>("");
const [logoUrl, setLogoUrl] = useState<string>("");
const [isUploading, setIsUploading] = useState(false);
 const { publicKey, signTransaction } = useWallet();
 const [formData, setFormData] = useState({
  name: "",
  symbol: "",
  decimals: 9,
  supply: "",
  description: "",
});
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
}
const handleFileChange = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  // Local preview
  setLogo(URL.createObjectURL(file));

  try {
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();

    console.log("CID:", data.cid);
    console.log("IPFS URL:", data.url);

    // Save URL for metadata.json creation later
    setLogoUrl(data.url);
    setFormData((prevData) => ({
      ...prevData,
      logoUrl: data.url,
    }));
  } catch (error) {
    console.error("Upload error:", error);
    alert("Failed to upload image");
  } finally {
    setIsUploading(false);
  }
};
const handleOnSubmit = async () => {
  console.log("Form Data:", formData);
  const metadata = {
    name: formData.name,
    symbol: formData.symbol,
    description: formData.description,
    image: logoUrl, // Use the uploaded logo URL
  };
  const program=await getProvider(publicKey,signTransaction);
  const {name,symbol,decimals,description, supply}=formData;
  if(!program || !signTransaction || !publicKey){
    return;
  }
  console.log("program ",program)


   const response = await fetch("/api/upload-metadata", {
      method: "POST",
      body: JSON.stringify(metadata),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Metadata upload response:", response);
    if (!response.ok) {
      console.error("Failed to upload metadata");
      return;
    }

    const data = await response.json();
    console.log("Metadata IPFS URL:", data.uri);
   const chainResponse= await createAndMintToken({
    program,
    publicKey,
    decimals,
    name,
    symbol,
    uri:data.uri,
    amount: +supply,

   });
   console.log("chainResponse",chainResponse)



  // Here you would typically send the formData to your backend or Solana program
};
  return (
    <div className="flex flex-col lg:flex-row p-4 sm:p-10 text-white min-h-full w-full gap-10">
      <div className="form h-full lg:w-[60%] rounded-2xl gap-6 flex flex-col">

        <div><span className="accent-chip px-4  py-2 bg-[#291a19] text-[#fe6a1a]  rounded-2xl text-[12px] " >⬡ FORGE A NEW MINT</span>
        </div>
        <h3 className="text-2xl font-bold">Create token</h3>
        <p className="lead text-[#9a9aa8] text-[12px]">Define the asset. We initialise the mint account, set authorities and (optionally) upload Metaplex metadata.</p>
        <div className="row2 ">
          <div className="field"><label className="form-label">Token name</label><input className="input hint-label" placeholder="Solar Credit" name="name" onChange={handleInputChange} /></div>
          <div className="field"><label className="form-label">Symbol <span className="hint">≤ 10</span></label><input className="input mono hint-label" placeholder="SOLAR" name="symbol" onChange={handleInputChange} /></div>
        </div>
        <div className="row2 ">
          <div className="field"><label className="form-label">Decimals <span className="hint">0–9</span></label><input className="input mono hint-label"  name="decimals" onChange={handleInputChange} /></div>
          <div className="field"><label className="form-label">Initial supply</label><input className="input mono hint-label" placeholder="1,000,000" name="supply" onChange={handleInputChange} /></div>
        </div>
        <div className="field"><label className="block form-label">Description</label><input className="input block hint-label" placeholder="What does this token represent?" name="description" onChange={handleInputChange} /></div>
        <div className="field-action"><button className="btn w-full py-3 items-center mb-4 rounded-2xl bg-gradient-to-b from-[#FF8A3D] to-[#E5500A] text-black font-medium" onClick={handleOnSubmit}>⬡ Forge token →</button></div>

      </div>
      <div className="p-4 h-full lg:w-[40%] bg-[#09090a] rounded-2xl">
        <aside className="aside flex flex-col text-[#9a9aa8] gap-3" >
          <h4 className="uppercase">Token logo</h4>
          <label className="upload border-dotted border-[#9a9aa8] hover:border-[#fe6a1a] rounded-2xl border-2 flex flex-col justify-center items-center p-8 gap-4 duration-300">
            {logo ? (
              <img
                src={logoUrl || logo}
                alt="logo"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <>
                <div className="border border-dotted border-[#9a9aa8] rounded-full w-10 h-10 flex justify-center items-center">
                  ↑
                </div>

                <p>Drop logo or click</p>
                <small>PNG / SVG · 512×512</small>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                console.log(file);
              }}
            />
          </label>
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
            <div className="tc-top grid grid-cols-[auto_1fr] mb-6"><div className="tc-logo bg-gradient-to-b from-[#FF8A3D] to-[#E5500A] p-4 rounded-full w-10 h-10 flex justify-center items-center text-black font-bold mr-2">S</div><div ><b className="row-span-1 text-white font-extrabold">Solar Credit</b><span className="block row-span-2 text-[#9a9aa8] text-[10px]">SOLAR</span></div></div>
            <div className="tc-rows bg-black rounded-2xl">
              <div className="tc-row"><span className="block">Decimals</span><b className="text-white block">9</b></div>
              <div className="tc-row"><span>Supply</span><b className="text-white block">1,000,000</b></div>
              <div className="tc-row"><span>Mint authority</span><b className="text-white block">You</b></div>
              <div className="tc-row"><span>Est. rent</span><b className="text-white block">0.0014 ◎</b></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}