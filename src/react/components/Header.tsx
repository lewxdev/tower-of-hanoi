import { useDispatch, useSelector } from "@tower-of-hanoi/redux/hooks";
import {
  gameInitialize,
  selectGameDiskCount,
  selectGameMinMoveCount,
  selectGameMoveCount,
  selectGameScore
} from "@tower-of-hanoi/redux/slices/game";
import {
  selectUiIsShowingIndices,
  uiIsShowingIndicesToggle
} from "@tower-of-hanoi/redux/slices/ui";

export default function Header() {
  const dispatch = useDispatch();
  const diskCount = useSelector(selectGameDiskCount);
  const minMoveCount = useSelector(selectGameMinMoveCount);
  const moveCount = useSelector(selectGameMoveCount);
  const score = useSelector(selectGameScore);
  const isShowingIndices = useSelector(selectUiIsShowingIndices);

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
          <h4
            className="group mt-3"
            onClick={() => dispatch(uiIsShowingIndicesToggle())}
          >
            <span className="material-symbols-rounded align-middle">
              numbers
            </span>
            <span className="ml-2 text-charcoal-400 group-hover:text-charcoal-500">
              {isShowingIndices ? "hide" : "show"} indices
            </span>
          </h4>
        </div>

        {/* Stats */}
        <div>
          <h4 className="whitespace-nowrap pl-0.5 leading-none">
            <span className="text-xl font-bold">{diskCount}</span>
            <span className="text-charcoal-400"> disks</span>
          </h4>
          <h4 className="whitespace-nowrap pl-0.5 leading-none">
            <span className="text-xl font-bold">
              {moveCount} / {minMoveCount}
            </span>
            <span className="text-charcoal-400"> moves</span>
          </h4>
          <h4 className="whitespace-nowrap leading-none">
            {Array.from(Array(score), (_, key) => (
              <span className="material-symbols-rounded symbol-fill" key={key}>
                star
              </span>
            ))}
            {Array.from(Array(3 - score), (_, key) => (
              <span className="material-symbols-rounded" key={key}>
                star
              </span>
            ))}
          </h4>
        </div>
      </div>
    </header>
  );
}
