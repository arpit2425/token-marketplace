export const Hero = () => {
    return (
        <div className="hero 
 min-h-screen flex flex-col items-center gap-6  pt-8 mb-8">
            <div className="badge text-amber-500 pt-6 pb-3">The Solana Token Mint</div>
            <div className="heading1 text-4xl md:text-6xl lg:text-8xl font-extrabold"><h1 className="text-white">Forge your token.<br/><span className="molten text-amber-500">Strike it on-chain.</span></h1></div>
            <div className="para text-[#807f8a] flex flex-col items-center text-center mt-6 text-lg w-2/3">
                <p>A precision foundry for SPL tokens. Create, mint, burn and transfer —<br/> no code, no commitee, settled in under a second.</p>

            </div>
            <div className="cta ">
                  <button className="btn btn-molten bg-[#f36f25] text-black px-5 py-2.5 rounded-xl font-bold mr-4">Start forging →</button>
    <button className="btn btn-ghost bg-black text-white border-zinc-600 border-2 px-5 py-2.5 rounded-xl font-bold">View on Explorer</button>
            </div>
            <div className="coin-base w-60 h-60 perspective-[1000px]"> <Coinsvg className="coin w-full h-full" /></div>

        </div>
    )
}

export const Coinsvg=({className}:{className:string})=>{
    return (
        <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 400 400"
  className={`${className}`}
>
  <defs>
    <radialGradient id="coinFace" cx="35%" cy="25%">
      <stop offset="0%" stop-color="#fff5c8" />
      <stop offset="40%" stop-color="#f2d47b" />
      <stop offset="75%" stop-color="#d9a82c" />
      <stop offset="100%" stop-color="#8c5c10" />
    </radialGradient>

    <linearGradient id="rim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f7d875" />
      <stop offset="50%" stop-color="#9b6a13" />
      <stop offset="100%" stop-color="#f7d875" />
    </linearGradient>

    <radialGradient id="center">
      <stop offset="0%" stop-color="#fff8dc" />
      <stop offset="60%" stop-color="#d6ae57" />
      <stop offset="100%" stop-color="#8d6016" />
    </radialGradient>
  </defs>

  <circle
    cx="200"
    cy="200"
    r="180"
    fill="url(#rim)"
  />

  
  <circle
    cx="200"
    cy="200"
    r="160"
    fill="url(#coinFace)"
  />

 
  <ellipse
    cx="145"
    cy="120"
    rx="90"
    ry="55"
    fill="white"
    opacity="0.18"
    transform="rotate(-25 145 120)"
  />

  
  <circle
    cx="200"
    cy="200"
    r="38"
    fill="none"
    stroke="#6d460e"
    stroke-width="6"
  />

 
  <circle
    cx="200"
    cy="200"
    r="22"
    fill="url(#center)"
  />


  <circle
    cx="193"
    cy="193"
    r="6"
    fill="white"
    opacity="0.5"
  />
</svg>
    )
}