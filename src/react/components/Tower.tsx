import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import clsx from "clsx";
import { useDispatch, useSelector } from "@tower-of-hanoi/redux/hooks";
import {
  gameTowerSelect,
  selectGameDiskCount,
  selectGameSelectableTowers,
  selectGameSelectedTowerIndex
} from "@tower-of-hanoi/redux/slices/game";
import { selectUiIsShowingIndices } from "@tower-of-hanoi/redux/slices/ui";

interface Props {
  children: number[];
  towerIndex: 0 | 1 | 2;
}

const padding = {
  0: "sm:pr-6 px-2",
  1: "sm:px-3 px-2",
  2: "sm:pl-6 px-2"
};

export default function Tower({ children, towerIndex }: Props) {
  const dispatch = useDispatch();
  const diskCount = useSelector(selectGameDiskCount);
  const selectableTowers = useSelector(selectGameSelectableTowers);
  const selectedTowerIndex = useSelector(selectGameSelectedTowerIndex);
  const isShowingIndices = useSelector(selectUiIsShowingIndices);

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [shouldOffsetDisk, setShouldOffsetDisk] = useState(false);
  const isSelected = selectedTowerIndex === towerIndex;
  const isInitialSelection = selectedTowerIndex === null;
  const canSelect = selectableTowers.includes(towerIndex);

  useEffect(() => {
    if (isInitialSelection) setShouldOffsetDisk(isMouseOver);
  }, [isMouseOver]);

  useEffect(() => {
    setShouldOffsetDisk(isSelected);
  }, [isSelected]);

  return (
    <div
      className={`flex h-full flex-col items-center justify-end ${padding[towerIndex]}`}
      key={towerIndex}
      onClick={() => dispatch(gameTowerSelect(towerIndex))}
      onMouseEnter={() => !isMobile && setIsMouseOver(true)}
      onMouseLeave={() => !isMobile && setIsMouseOver(false)}
    >
      {children.map((diskId, diskIndex) => {
        const canStyleDisk = diskIndex === 0;
        const getWidthDiff = (minWidth: number) =>
          (minWidth / diskCount) * (diskCount - diskId);

        return (
          <div
            data-disk-id={diskId}
            className={clsx(
              "my-1.5 flex h-12 w-[var(--width)] items-center rounded-full bg-charcoal-500 bg-[length:400%_400%] transition-[margin-bottom] before:m-4 before:inline-block before:text-lg before:font-bold before:text-charcoal-100 before:content-[attr(data-disk-id)] sm:h-16 sm:w-[var(--sm-width)] before:sm:m-6",
              shouldOffsetDisk && canStyleDisk && "mb-6 sm:mb-8",
              isSelected &&
                canStyleDisk &&
                "animate-breathing bg-gradient-to-r from-pink to-blue",
              !isShowingIndices && "before:hidden"
            )}
            key={diskId}
            style={{
              "--sm-width": `calc(100% - ${getWidthDiff(90)}px)`,
              "--width": `calc(100% - ${getWidthDiff(60)}px)`
            }}
          />
        );
      })}
      <div
        className={clsx(
          "mt-3 h-2 w-full rounded-full bg-charcoal-200 transition-[background-color] sm:mt-6",
          canSelect && "bg-charcoal-300",
          !isInitialSelection && canSelect && isMouseOver && "bg-charcoal-400"
        )}
      />
    </div>
  );
}
