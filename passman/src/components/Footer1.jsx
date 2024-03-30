import React from "react";

const Footer1 = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center bottom-0 w-full">
      <div className="logo font-bold text-white text-2xl">
        <span className="text-violet-800">&lt;</span>
        Pass
        <span className="text-violet-800">MAN/&gt;</span>
      </div>
      <div className="flex justify-center items-center">
        Created with <img className="w-10 mx-2 invert" src="icons/Black-Heart-2.png" alt="" /> by Sairantri
      </div>
    </div>
  );
};

export default Footer1;
