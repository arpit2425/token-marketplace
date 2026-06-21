export const Burn = () => {
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

          <select className="select p-2">
            <option>SOLAR — Solar Credit</option>
            <option>FORGE — Foundry Coin</option>
          </select>
        </div>


        <div className="field">
          <label className="form-label">
           Amount to burn
          </label>

          <input
            className="input mono"
            placeholder="250,000"
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
          >
            ▲ Burn Forever →
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
                <span>Your balance</span>
                <span className="text-white font-mono text-sm">
                   1,000,000
                </span>
              </div>

              <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">
                <span>Burning</span>
                <span className="text-white font-mono text-sm">
                  1,000,000
                </span>
              </div>

              <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">
                <span>New balance</span>
                <span className="text-white font-mono text-sm">
                  1,000,000
                </span>
              </div>
                    <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">
                <span>New supply</span>
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