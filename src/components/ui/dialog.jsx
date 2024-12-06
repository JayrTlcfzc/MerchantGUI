import React from 'react';
import clsx from 'clsx';

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onOpenChange}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        
        {/* OK Button at the bottom */}
        <button
          onClick={onOpenChange}
          className="mt-4 px-6 py-2 bg-[#23587C] text-white rounded-lg focus:outline-none"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export const DialogContent = ({ className, children }) => {
  return (
    <div
      className={clsx('p-6 flex flex-col items-center justify-center space-y-4', className)}
    >
      {children}
    </div>
  );
};
