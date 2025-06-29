// src/components/Modal.tsx
import React from 'react';
import '../assets/styles/Modal.css';
import { images } from '../assets/images';

interface ModalProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  footer?: React.ReactNode;
  show: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  type = 'info',
  title,
  message,
  footer,
  show,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-container modal-${type}`} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <img src={images.logoPNG} alt="Colpaz Logo" className="modal-logo" />
          <h3 className="modal-title">{title || 'Mensaje del sistema'}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          <div className="modal-icon">
            {type === 'success' && <i className="fas fa-check-circle"></i>}
            {type === 'error' && <i className="fas fa-times-circle"></i>}
            {type === 'warning' && <i className="fas fa-exclamation-triangle"></i>}
            {type === 'info' && <i className="fas fa-info-circle"></i>}
          </div>
          <p className="modal-message">{message}</p>
        </div>

        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;