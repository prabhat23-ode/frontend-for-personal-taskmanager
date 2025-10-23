import { useEffect } from "react";

export default function Toast({ message, type = "success", duration = 1800, onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => {
      onClose && onClose();
    }, duration);
    return () => clearTimeout(t);
  }, [message, duration, onClose]);

  if (!message) return null;

  const bg = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div className={`fixed top-4 right-4 ${bg} text-white px-4 py-2 rounded shadow z-50`}>
      {message}
    </div>
  );
}
