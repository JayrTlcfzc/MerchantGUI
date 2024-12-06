import React from 'react';
import { Dialog, DialogContent } from "./ui/dialog";
import { CheckCircle2, XCircle } from 'lucide-react';

const StatusModal = ({ isOpen, onClose, status, message }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="modal-animation glass-effect sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center p-6">
          {status === 'success' ? (
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
          ) : (
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
          )}
          <h2 className="text-2xl font-semibold mb-2">
            {status === 'success' ? 'Success!' : 'Error'}
          </h2>
          <p className="text-center text-gray-600">{message}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusModal;
