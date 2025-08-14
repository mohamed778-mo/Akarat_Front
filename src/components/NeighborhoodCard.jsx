import React from "react";
import { HiOutlineMap, HiCheckCircle } from "react-icons/hi";

function NeighborhoodCard({ neighborhood }) {
  const getStatusBadge = (status) => {
    if (status === "مكتمل")
      return { text: "مكتمل البناء", color: "bg-green-500" };
    return { text: status, color: "bg-slate-500" };
  };

  const getTypeBadge = (type) => {
    if (type === "سكني") return { text: "سكني", color: "bg-blue-500" };
    return { text: type, color: "bg-brand-purple" };
  };

  const statusInfo = getStatusBadge(neighborhood.status);
  const typeInfo = getTypeBadge(neighborhood.type);

  return (
    <a
      href={`/neighborhood/${neighborhood._id}`}
      className="block bg-white rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={
            neighborhood.image_1 ||
            "https://dummyimage.com/600x400/e0e0e0/555.png&text=No+Image"
          }
          alt={neighborhood.title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out 
                      group-hover:scale-110 group-hover:brightness-75"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <h3 className="text-2xl font-bold text-white font-brand truncate">
            {neighborhood.title}
          </h3>
          <div className="flex items-center text-slate-200 mt-1">
            <HiOutlineMap className="w-5 h-5 ml-2 flex-shrink-0" />
            <span className="truncate">{neighborhood.description}</span>
          </div>
        </div>

        <div className="absolute top-4 left-0 z-10 flex flex-col gap-2">
          {neighborhood.status && (
            <span
              className={`text-white text-xs font-bold uppercase px-3 py-1 rounded-r-full shadow-lg ${statusInfo.color}`}
            >
              {statusInfo.text}
            </span>
          )}
          {neighborhood.type && (
            <span
              className={`text-white text-xs font-bold uppercase px-3 py-1 rounded-r-full shadow-lg ${typeInfo.color}`}
            >
              {typeInfo.text}
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {neighborhood.features?.slice(0, 3).map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-full text-xs text-slate-700"
            >
              <HiCheckCircle className="w-4 h-4 text-green-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-slate-200 pt-4 flex justify-end items-center">
          <span className="text-amber-500 font-semibold flex items-center gap-1 text-sm">
            استكشف الحي
            <svg
              xmlns="http://www.w.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

export default NeighborhoodCard;
