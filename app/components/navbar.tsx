

export default function Navbar() {
  return (
    <div className="navbar sticky top-0 z-50 flex justify-between  px-[28px] h-[68px] bg-[#100c0c] text-[#807f8a] items-center">
      <div className="logo">
        <div className="brand font-extrabold  text-xl text-white  "><span className="seal w-7 h-7 rounded-full border-amber-600 border-5 p-1 mr-1  text-sm"><b className=" p-1 text-amber-600 font-medium ">F</b></span> FOUNDRY</div>

      </div>
      <div className="nav-links flex gap-6">
        <a href="#tools">Tools</a>
        <a href="#features">How it works</a>
        <a href="#">Docs</a>
        <a href="#">Explorer</a>
      </div>
      <button

        className="btn btn-molten text-black px-5 py-3 bg-gradient-to-b from-[#FF8A3D] to-[#E5500A]  rounded-lg  w-43 h-11 text-s font-medium"
      >
        ◈ Connect Wallet
      </button>    </div>

  );
}
