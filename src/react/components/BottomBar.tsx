import { useDispatch } from "@tower-of-hanoi/redux/hooks";
import { gameInitialize } from "@tower-of-hanoi/redux/slices/game";

export default function BottomBar() {
  const dispatch = useDispatch();

  return (
    <div className="grid h-20 select-none grid-cols-3 bg-charcoal-200 px-4 text-charcoal-400 sm:hidden">
      <div className="material-symbols-rounded flex items-center justify-center hover:text-charcoal-500">
        menu
      </div>
      <div className="material-symbols-rounded flex items-center justify-center hover:text-charcoal-500">
        numbers
      </div>
      <div
        className="material-symbols-rounded flex items-center justify-center hover:text-charcoal-500"
        onClick={() => dispatch(gameInitialize())}
      >
        replay
      </div>
    </div>
  );
}
