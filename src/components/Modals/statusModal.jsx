import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { FaCircleCheck, FaTriangleExclamation } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useAuth } from "../Auth/authContext";
import { useNavigate } from "react-router-dom";

const StatusModal = ({ isOpen, onClose, status, message }) => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = () => {
    logout();
    navigate('/login'); // Navigate to login page on success
  };

  const handleError = () => {
    // Stay on the page, just close the modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
      onConfirm={status === "successcp" ? handleSuccess : handleError}
    >
      <DialogContent className="modal-animation glass-effect sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center p-6">
          {status === "success" || status === "successcp" ? (
            <FaCircleCheck className="w-20 h-20 text-[#0FBA00] mb-4" />
          ) : (
            <FaTriangleExclamation className="w-20 h-20 text-[#C60000] mb-4" />
          )}
          <h2 className="text-2xl font-semibold mb-2">
            {status === "success" || status === "successcp"
              ? `${t("modal_success")}`
              : `${t("modal_error")}`}
          </h2>
          <p className="text-center text-gray-600">{message}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusModal;
