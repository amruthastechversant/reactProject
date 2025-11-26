
import React from "react";
import "../App.css"; 

interface  modalprops {
    isOpen : boolean;
    title : string;
    message : string;
    onConfirm : () => void;
    onCancel : () => void;
}

const Modal:React.FC<modalprops> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{title}</h2>
        <p className="message">{message}</p>

        <div className="modal-buttons">
          <button className="btn cancel" onClick={onCancel}>
            Cancel
          </button>

          <button className="btn confirm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

