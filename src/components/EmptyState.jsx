import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function EmptyState({ message }) {
  return (
    <div className="text-center bg-white p-12 rounded-xl col-span-full">
      <MagnifyingGlassIcon className="w-16 h-16 mx-auto text-slate-300 mb-4" />
      <h3 className="text-xl font-bold text-slate-600 mb-1">
        لا توجد نتائج مطابقة
      </h3>
      <p className="text-slate-400">{message}</p>
    </div>
  );
}

export default EmptyState;