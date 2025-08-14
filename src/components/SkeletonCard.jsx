import React from "react";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 animate-pulse">
      <div className="w-full h-48 bg-slate-200 rounded-lg mb-4"></div>
      <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;
