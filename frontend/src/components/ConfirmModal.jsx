import { useEffect } from 'react';

const ConfirmModal = ({ message, onConfirm, onCancel, type = 'danger' }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  const styles = {
    danger: {
      icon: '⚠️',
      confirmBg: 'bg-red-600 hover:bg-red-500',
      iconBg: 'bg-red-500/20',
      iconText: 'text-red-500'
    },
    warning: {
      icon: '⚠️',
      confirmBg: 'bg-amber-600 hover:bg-amber-500',
      iconBg: 'bg-amber-500/20',
      iconText: 'text-amber-500'
    },
    info: {
      icon: 'ℹ️',
      confirmBg: 'bg-blue-600 hover:bg-blue-500',
      iconBg: 'bg-blue-500/20',
      iconText: 'text-blue-500'
    }
  };

  const style = styles[type] || styles.danger;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl animate-slide-in">
        <div className="p-6">
          <div className={`w-16 h-16 ${style.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <span className={`text-4xl ${style.iconText}`}>{style.icon}</span>
          </div>
          <h3 className="text-xl font-bold text-white text-center mb-2">Confirmation</h3>
          <p className="text-slate-300 text-center text-base leading-relaxed">{message}</p>
        </div>
        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-all"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-6 py-3 ${style.confirmBg} text-white rounded-xl font-bold transition-all`}
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
