import { useState } from "react";
export function useModalState<T>() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const openModal = (value?: T) => {
    setData(value ?? null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setData(null);
  };

  return { open, data, openModal, closeModal };
}
