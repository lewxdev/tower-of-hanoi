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

interface Props {
  children: number[];
  towerIndex: 0 | 1 | 2;
}

const padding = {
  0: "sm:pr-6 px-3",
  1: "sm:px-3 px-3",
  2: "sm:pl-6 px-3"
};

export default function Tower({ children, towerIndex }: Props) {
  const dispatch = useDispatch();
  const diskCount = useSelector(selectGameDiskCount);
  const selectableTowers = useSelector(selectGameSelectableTowers);
  const selectedTowerIndex = useSelector(selectGameSelectedTowerIndex);

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
        const getWidthDiff = (minWidth: number) =>
          (minWidth / diskCount) * (diskCount - diskId);

        const canStyleDisk = diskIndex === 0;
        return (
          <div
            className={clsx(
              "my-1.5 h-12 w-[var(--width)] rounded-full bg-charcoal-500 bg-[length:400%_400%] transition-[margin-bottom] sm:h-16 sm:w-[var(--sm-width)]",
              shouldOffsetDisk && canStyleDisk && "mb-6 sm:mb-8",
              isSelected &&
                canStyleDisk &&
                "animate-breathing bg-gradient-to-r from-pink to-blue"
            )}
            key={diskId}
            style={{
              "--sm-width": `calc(100% - ${getWidthDiff(100)}px)`,
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
