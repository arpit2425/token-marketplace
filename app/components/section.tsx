import { BrowserWindow } from "./browerWindow"

export const Section=()=>{
    return (
        <div className="section  w-full h-[1000px] px-8 flex flex-col gap-4" >
            <div>
            <h2 className="headimg text-white font-extrabold text-5xl">One bench. Four operations.</h2>
            </div>
            <div className="para">
               <p className="text-slate-400"> Every tool runs against your connected wallet on devnet or <br/>mainnet-beta. Switch the network up top.
           </p> </div>
           <BrowserWindow/>
       
        </div>
    )
}