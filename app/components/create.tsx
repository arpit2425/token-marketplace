export const Create = () => {
    return (
        <div className="flex p-10 text-white min-h-full w-full gap-10">
            <div className="form h-full w-[60%] rounded-2xl gap-6 flex flex-col">

        <div><span className="accent-chip px-4  py-2 bg-[#291a19] text-[#fe6a1a]  rounded-2xl text-[12px] " >⬡ FORGE A NEW MINT</span>
</div>
        <h3 className="text-2xl font-bold">Create token</h3>
        <p className="lead text-[#9a9aa8] text-[12px]">Define the asset. We initialise the mint account, set authorities and (optionally) upload Metaplex metadata.</p>
        <div className="row2 ">
          <div className="field"><label className="form-label">Token name</label><input className="input hint-label" placeholder="Solar Credit" onChange={(e) => {}}/></div>
          <div className="field"><label className="form-label">Symbol <span className="hint">≤ 10</span></label><input className="input mono hint-label" placeholder="SOLAR" onChange={(e) => {}}/></div>
        </div>
        <div className="row2 ">
          <div className="field"><label className="form-label">Decimals <span className="hint">0–9</span></label><input className="input mono hint-label" value="9" onChange={(e) => {}}/></div>
          <div className="field"><label className="form-label">Initial supply</label><input className="input mono hint-label" placeholder="1,000,000" onChange={(e) => {}}/></div>
        </div>
        <div className="field"><label className="block form-label">Description</label><input className="input block hint-label" placeholder="What does this token represent?" onChange={(e) => {}} /></div>
        <div className="field-action"><button className="btn w-full py-3 items-center mb-4 rounded-2xl bg-gradient-to-b from-[#FF8A3D] to-[#E5500A] text-black font-medium">⬡ Forge token →</button></div>
     
            </div>
            <div className="logo h-full w-[40%] bg-[#09090a] rounded-2xl">logo</div>
        </div>
    )
}