import React from "react";

function PartnerCard({ partner }) {
  const { image, name, description } = partner;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden text-center p-6 flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-slate-100 mb-4 flex items-center justify-center p-2">
        <img
          src={image}
          alt={location}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <h3 className="text-lg font-bold text-slate-800 mb-2">{name}</h3>

      <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
        {description}
      </p>
    </div>
  );
}

export default PartnerCard;
