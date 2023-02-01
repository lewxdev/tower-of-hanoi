import { useDispatch, useSelector } from "@tower-of-hanoi/redux/hooks";
import {
  gameInitialize,
  selectGameDiskCount,
  selectGameMoveCount
} from "@tower-of-hanoi/redux/slices/game";

export default function Header() {
  const dispatch = useDispatch();

  const moveCount = useSelector(selectGameMoveCount);
  const diskCount = useSelector(selectGameDiskCount);

  return (
    <header className="grid select-none grid-cols-[1fr_auto] py-6 text-charcoal-500 max-sm:py-4">
      <div className="grid w-fit grid-rows-[auto_1fr] px-6 max-sm:px-4">
        <h1 className="whitespace-nowrap pt-1.5 font-brand text-5xl">
          Tower of Hanoi
        </h1>
        <div className="mt-2.5 mb-1 rounded-full bg-charcoal-200" />
      </div>

      <div className="flex px-6 max-sm:px-4">
        {/* Options */}
        <div className="flex flex-col px-12 pt-1 text-charcoal-500 max-sm:hidden">
          <h4 className="group" onClick={() => dispatch(gameInitialize())}>
            <span className="material-symbols-rounded align-middle">
              replay
            </span>
            <span className="ml-2 text-charcoal-400 group-hover:text-charcoal-500">
              reset
            </span>
          </h4>
          <h4 className="group mt-3">
            <span className="material-symbols-rounded align-middle">
              numbers
            </span>
            <span className="ml-2 text-charcoal-400 group-hover:text-charcoal-500">
              show indices
            </span>
          </h4>
        </div>

        {/* Stats */}
        <div>
          <h5 className="text-2xl font-bold leading-tight">{"00:00:00"}</h5>
          <h4 className="whitespace-nowrap leading-none">
            <span className="text-xl font-bold">
              {moveCount} / {Math.pow(2, diskCount) - 1}
            </span>
            <span className="text-charcoal-400"> moves</span>
          </h4>
          <h4 className="whitespace-nowrap leading-none">
            <span className="text-xl font-bold">{"0"}</span>
            <span className="text-charcoal-400"> score</span>
          </h4>
        </div>
      </div>
    </header>
  );
}
