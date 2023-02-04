import { useEffect, useState } from "react";
import { useModalContext } from "./ModalProvider";

interface ModalContent {
  details: string;
  title: string;
  imageSrc?: string;
}

export default function Modal() {
  const [setModalOptions, modalOptions] = useModalContext();
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    setModalOptions({ content: onboardingExample });
  }, []);

  if (modalOptions === null) return null;
  const { content, onClose, onConfirm } = modalOptions;

  const isSteppedVariant = Array.isArray(content);
  const canNavigateBefore = isSteppedVariant && pageIndex > 0;
  const canNavigateNext = isSteppedVariant && pageIndex <= content.length - 1;

  const handleClose = () => {
    setModalOptions(null);
    onClose?.();
  };

  const handleConfirm = () => {
    handleClose();
    onConfirm?.();
  };

  const handleNavigateBefore = () => {
    if (canNavigateBefore) setPageIndex(pageIndex - 1);
  };

  const handleNavigateNext = () => {
    if (isSteppedVariant && pageIndex === content.length - 1) handleClose();
    else if (canNavigateNext) setPageIndex(pageIndex + 1);
  };

  const { details, title, imageSrc } = isSteppedVariant
    ? content.at(pageIndex) ?? {}
    : content;

  return (
    <div
      className="absolute flex h-full w-full items-center justify-center bg-charcoal-600 bg-opacity-30 backdrop-blur-sm"
      onClick={({ currentTarget, target }) =>
        currentTarget === target && handleClose()
      }
    >
      <div className="m-4 grid h-1/4 max-h-fit grid-rows-[auto_1fr] rounded-xl bg-charcoal-100 p-4 sm:m-6 sm:h-1/5 sm:w-4/6 sm:p-6">
        <h3 className="text-xl text-charcoal-600">{title}</h3>
        <div className={imageSrc && "grid grid-cols-2"}>
          <p className="my-2 text-charcoal-500">{details}</p>
          {imageSrc && <img alt={title} src={imageSrc} />}
        </div>
        <div className="select-none">
          {isSteppedVariant ? (
            <div className="flex justify-end text-charcoal-600">
              <div className="mr-4 text-charcoal-400">
                {pageIndex + 1} / {content.length}
              </div>
              <button
                className="material-symbols-rounded mr-2 disabled:text-charcoal-300"
                disabled={!canNavigateBefore}
                onClick={handleNavigateBefore}
              >
                navigate_before
              </button>
              <button
                className="material-symbols-rounded disabled:text-charcoal-300"
                disabled={!canNavigateNext}
                onClick={handleNavigateNext}
              >
                navigate_next
              </button>
            </div>
          ) : (
            <div className="flex justify-end text-charcoal-600">
              <button
                className="mr-2 p-3 text-charcoal-500"
                onClick={handleClose}
              >
                cancel
              </button>
              <button
                className="rounded-xl bg-green-400 p-3"
                onClick={handleConfirm}
              >
                continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const onboardingExample: ModalContent[] = [
  {
    title: "Welcome to Tower of Hanoi",
    details: "A classic puzzle game that will put your logic skills to the test"
  },
  {
    title: "How to play",
    details:
      "To select a disk, click or tap it's corresponding tower. The topmost disk will rise and change color, indicating it was successfully selected"
  },
  {
    title: "How to play",
    details:
      "To move a disk, select the tower to move it to. Valid/selectable towers will have a subtly darker base"
  },
  {
    title: "How to play",
    details:
      "The objective is to move all disks to the rightmost tower. A new disk is added each time a puzzle is completed (see how far you can get!)"
  }
];
