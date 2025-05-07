import React from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 3000, onClose }) => {
  React.useEffect(() => {
    // Cierra el Toast después de la duración especificada
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonte
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 p-4 rounded-lg text-white transition-opacity duration-300 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
      style={{ opacity: 1 }}
    >
      {message}
      <button
        className="absolute top-0 right-0 p-1 text-white"
        onClick={onClose}
      >
        X
      </button>
    </div>
  );
};

export default Toast;
