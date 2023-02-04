import { createContext, useContext, useState } from "react";

interface ModalContent {
  details: string;
  title: string;
  imageSrc?: string;
}

interface ModalOptions {
  content: ModalContent | ModalContent[];
  onClose?: () => void;
  onConfirm?: () => void;
}

interface Props {
  children: Iterable<React.ReactNode>;
}

type ModalContextValue = [
  React.Dispatch<React.SetStateAction<ModalOptions | null>>,
  ModalOptions | null
];

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModalContext() {
  const context = useContext(ModalContext);

  if (context === null)
    throw "<ModalContext.Provider /> missing context (is it properly scoped?)";
  return context;
}

export default function ModalProvider({ children }: Props) {
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);

  return (
    <ModalContext.Provider value={[setModalOptions, modalOptions]}>
      {children}
    </ModalContext.Provider>
  );
}
