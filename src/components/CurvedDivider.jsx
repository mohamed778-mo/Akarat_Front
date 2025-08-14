import React from "react";

function CurvedDivider() {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-40">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-[120px] fill-slate-50"
      >
        <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z"></path>
      </svg>
    </div>
  );
}

export default CurvedDivider;
