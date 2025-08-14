import React from "react";

function PartnerSkeleton() {
  return (
    <div className="flex items-center justify-center p-8 bg-slate-100 rounded-2xl animate-pulse">
      <div className="w-24 h-24 bg-slate-200 rounded-full"></div>
    </div>
  );
}

export default PartnerSkeleton;
