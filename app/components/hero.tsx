export const Hero = () => {
    return (
        <div className="hero bg-gradient-to-b from-orange-800 from-[10%]  to-black
 h-screen flex flex-col items-center gap-6  pt-8">
            <div className="badge text-amber-500 pt-6 pb-3">The Solana Token Mint</div>
            <div className="heading1 text-8xl font-extrabold"><h1 className="text-white">Forge your token.<br/><span className="molten text-amber-500">Strike it on-chain.</span></h1></div>
            <div className="para text-[#807f8a] flex flex-col items-center text-center mt-6 text-lg w-2/3">
                <p>A precision foundry for SPL tokens. Create, mint, burn and transfer —<br/> no code, no commitee, settled in under a second.</p>

            </div>
            <div className="cta ">
                  <button className="btn btn-molten bg-amber-500 text-black px-5 py-2.5 rounded-xl font-bold mr-4">Start forging →</button>
    <button className="btn btn-ghost bg-black text-white border-zinc-600 border-2 px-5 py-2.5 rounded-xl font-bold">View on Explorer</button>
            </div>

        </div>
    )
}