// components/ui/modal.tsx
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import clsx from "clsx";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={clsx(
            "fixed z-50 bg-white rounded-lg shadow-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-6 py-4",
            className
          )}
        >
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-base sm:text-lg md:text-xl font-semibold">
              {title}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-00"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
