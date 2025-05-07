import { useState } from "react";

const useToast = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showToast = (msg: string, duration: number = 3000) => {
    setMessage(msg);
    setIsVisible(true);

    // Después de la duración, oculta el toast
    setTimeout(() => {
      setIsVisible(false);
      setMessage(null); // Limpia el mensaje
    }, duration);
  };

  return { message, isVisible, showToast };
};

export default useToast;
