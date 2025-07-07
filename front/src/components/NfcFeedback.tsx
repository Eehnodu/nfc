"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface NfcFeedbackProps {
  isVisible: boolean;
  type: "success" | "error" | "processing";
  message: string;
  onClose: () => void;
}

export default function NfcFeedback({
  isVisible,
  type,
  message,
  onClose,
}: NfcFeedbackProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!shouldRender) return null;

  const icons = {
    success: <CheckCircle className="w-8 h-8 text-green-500" />,
    error: <XCircle className="w-8 h-8 text-red-500" />,
    processing: <Clock className="w-8 h-8 text-blue-500 animate-spin" />,
  };

  const bgColors = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    processing: "bg-blue-50 border-blue-200",
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/20",
        isVisible ? "animate-in fade-in-0" : "animate-out fade-out-0"
      )}
    >
      <div
        className={cn(
          "mx-4 p-6 rounded-lg border-2 shadow-lg max-w-sm w-full text-center",
          bgColors[type],
          isVisible ? "animate-in zoom-in-95" : "animate-out zoom-out-95"
        )}
      >
        <div className="flex flex-col items-center space-y-3">
          {icons[type]}
          <p className="text-lg font-medium text-gray-900">{message}</p>
        </div>
      </div>
    </div>
  );
}
