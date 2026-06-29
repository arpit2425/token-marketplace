"use client";

import { Create } from "./create"
import { Transfer } from "./transfer"
import { Burn } from "./burn"
import { Mint } from "./mint"
import { useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react";
import { getAllTokens } from "@/services/service";

import { useDispatch } from "react-redux";
import { setTokens } from "../store/tokenSlice";



export const BrowserWindow = () => {
    const [active, setActive] = useState("create");
    const { publicKey } = useWallet();
    const dispatch=useDispatch();
    useEffect(() => {
        const fetchTokens = async () => {
            if (!publicKey) return;

            const response = await getAllTokens(publicKey);
            console.log(response);
            dispatch(setTokens(response));
        };

        fetchTokens();
    }, [publicKey]);

    return (

        <div className="browser-window border-1 rounded-3xl border-slate-600 w-full min-h-screen md:min-h-[640px] mt-4 grid grid-rows-[1fr_4fr_24fr] sm:grid-rows-[1fr_3fr_12fr]  md:grid-rows-[68px_60px_1fr] grid-cols-1">
            <div className="b-header w-full rounded-t-3xl bg-[#131317] p-3 flex justify-start items-center">
                <div className="icons flex gap-2 mr-4 ">
                    <div className="orange h-3 w-3 rounded-full bg-orange-500"></div>
                    <div className="yellow h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="green h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="title inline text-slate-400">spl-token-program</div>

            </div>
            <div className="b-nav  w-full bg-[#0e0e10] grid grid-cols-1 grid-rows-4   md:grid-rows-1 md:grid-cols-[25%_25%_25%_25%] text-slate-400 ">
                <button onClick={() => setActive("create")} className={`create hover:bg-[#131317] hover:text-white cursor-pointer transition-colors duration-200 ease-in-out flex items-center justify-center gap-4 hover:border-b-1 hover:border-[#fe6a1a] ${active === 'create' ? 'border-b-1 border-[#fe6a1a]' : ''}`} >
                    <div className="icon "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    </div>
                    <div className="action" >Create</div>

                </button>
                <div onClick={() => setActive("mint")} className={`mint hover:bg-[#131317] hover:text-white hover:border-b-1 hover:border-amber-200 cursor-pointer transition-colors duration-200 ease-in-out flex items-center justify-center gap-4 ${active === 'mint' ? 'border-b-1 border-amber-200' : ''}`} >
                    <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    </div>
                    <div className="action " >Mint</div>

                </div>
                <div onClick={() => setActive("burn")} className={`burn hover:bg-[#131317] hover:text-white cursor-pointer transition-colors duration-200 ease-in-out flex items-center justify-center gap-4 hover:border-b-1 hover:border-[#f5594e] ${active === 'burn' ? 'border-b-1 border-[#f5594e]' : ''}`}>
                    <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                    </svg></div>
                    <div className="action" >Burn</div>
                </div>
                <button onClick={() => { console.log("transfer"); setActive("transfer") }} className={`transfer hover:bg-[#131317] hover:text-white cursor-pointer transition-colors duration-200 ease-in-out flex items-center justify-center gap-4 hover:border-b-1 hover:border-[#6bb0fb] ${active === 'transfer' ? 'border-b-1 border-[#6bb0fb]' : ''}`}>
                    <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                    </div>


                    <div className="action">Transfer</div>

                </button>
            </div>
            <div className="b-section w-full rounded-b-3xl bg-[#131317] ">
                {active === "create" && <Create />}
                {active === "mint" && <Mint />}
                {active === "burn" && <Burn />}
                {active === "transfer" && <Transfer />}
            </div>

        </div>
    )
}