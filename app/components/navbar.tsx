

export default function Navbar() {
  return (
    <div className="navbar sticky top-0 z-50  backdrop-blur-md flex justify-between  px-[28px] h-[68px] bg-[linear-gradient(to_right,#0d0b0c_0%,#0d0b0c_40%,transparent_50%,#0d0b0c_60%,#0d0b0c_100%)] text-[#807f8a] items-center">
      <div className="logo">
        <div className="brand font-extrabold  text-xl text-white  "><span className="seal w-7 h-7 rounded-full border-amber-600 border-5 p-1 mr-1  text-sm"><b className=" p-1 text-amber-600 font-medium ">F</b></span> FOUNDRY</div>

      </div>
      <div className="nav-links hidden lg:flex gap-6">
        <a href="#tools">Tools</a>
        <a href="#features">How it works</a>
        <a href="#">Docs</a>
        <a href="#">Explorer</a>
      </div>
      <button

        className="btn btn-molten text-black sm:px-5 py-3 bg-gradient-to-b from-[#FF8A3D] to-[#E5500A]  rounded-lg  w-28 sm:w-43 h-11 text-[12px] sm:text-s font-medium"
      >
        ◈ Connect Wallet
      </button>    </div>

  );
}
