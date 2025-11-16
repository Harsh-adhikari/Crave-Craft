import React, { useEffect } from 'react';

export default function Modal({ children, onClose }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <>
      <div 
        className='backdrop' 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
      <dialog 
        className='modal' 
        open
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          border: 'none',
          borderRadius: '12px',
          padding: '0',
          maxWidth: '450px',
          width: '90%',
          maxHeight: '85vh',
          overflow: 'hidden',
          backgroundColor: 'white',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '30px',
          scrollbarWidth: 'none',  /* Firefox */
          msOverflowStyle: 'none'  /* IE and Edge */
        }}
        className="modal-content-wrapper"
        >
          {children}
        </div>
        <style>{`
          .modal-content-wrapper::-webkit-scrollbar {
            display: none;  /* Chrome, Safari, Opera */
          }
        `}</style>
      </dialog>
    </>
  );
}