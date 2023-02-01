import { useDispatch, useSelector } from "@tower-of-hanoi/redux/hooks";
import {
  gameInitialize,
  gameTowerSelect,
  selectGameDiskCount,
  selectGameTowers
} from "@tower-of-hanoi/redux/slices/game";
import { useEffect } from "react";
import Tower from "./Tower";

export default function Game() {
  const dispatch = useDispatch();
  const towers = useSelector(selectGameTowers);
  const diskCount = useSelector(selectGameDiskCount);

  const hasWon = towers[2].length === diskCount;

  useEffect(() => {
    if (!hasWon) return;

    if (confirm("You win!")) dispatch(gameInitialize(diskCount + 1));
    else dispatch(gameInitialize());
  }, [diskCount, hasWon]);

  useEffect(() => {
    const listener = ({ key }: KeyboardEvent) => {
      const towerIndex = parseInt(key) - 1;
      if ([0, 1, 2].includes(towerIndex)) dispatch(gameTowerSelect(towerIndex));
    };

    addEventListener("keypress", listener);
    return () => removeEventListener("keypress", listener);
  }, []);

  return (
    <div className="rounded-t-3xl bg-charcoal-100 px-4 py-6 sm:mx-6 sm:mb-6 sm:rounded-3xl sm:px-8 sm:py-12">
      <div className="grid h-full grid-cols-[repeat(3,minmax(0,1fr))] justify-center sm:grid-cols-[repeat(3,minmax(0,13.5em))]">
        {towers.map((towerChildren, towerIndex) => (
          <Tower key={towerIndex} towerIndex={towerIndex as 0 | 1 | 2}>
            {towerChildren}
          </Tower>
        ))}
      </div>
    </div>
  );
}
