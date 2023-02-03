import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@tower-of-hanoi/redux/store";

export interface GameState {
  /** The current total number of disks in play */
  diskCount: number;
  /** The minimum number of moves needed to complete a puzzle */
  minMoveCount: number;
  /** The number of moves made by the player */
  moveCount: number;
  /** A number between 0 and 3 representing the score for the current puzzle */
  score: number;
  /** A list of indices of selectable towers; determined by `selectedTowerIndex` */
  selectableTowers: number[];
  /** The index of the currently selected tower */
  selectedTowerIndex: number | null;
  /** The state representing the game UI (towers) */
  towers: [start: number[], offset: number[], end: number[]];
}

export const createInitialState = (diskCount = 4): GameState => ({
  diskCount,
  minMoveCount: 2 ** diskCount - 1,
  moveCount: 0,
  score: 0,
  selectableTowers: [0],
  selectedTowerIndex: null,
  towers: [Array.from(Array(diskCount), (_, k) => k + 1), [], []]
});

const getScore = ({ minMoveCount, moveCount }: GameState) =>
  moveCount >= minMoveCount
    ? Math.round(3 * Math.E ** ((moveCount - minMoveCount) / -5))
    : 0;

const getSelectableTowers = ({ selectedTowerIndex, towers }: GameState) =>
  towers.reduce((result, tower, index) => {
    if (selectedTowerIndex === null)
      return tower.length ? [...result, index] : result;

    if (selectedTowerIndex === index) return [...result, index];

    // The prior clause ensures that only towers with disks are selectable
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const diskA = towers[selectedTowerIndex].at(0)!;
    const diskB = tower.at(0);

    return typeof diskB === "undefined" || diskA < diskB
      ? [...result, index]
      : result;
  }, []);

const gameSlice = createSlice({
  name: "game",
  initialState: createInitialState(),
  reducers: {
    initialize(state, { payload }: PayloadAction<number | undefined>) {
      return createInitialState(payload ?? state.diskCount);
    },
    towerSelect(state, { payload: towerIndex }: PayloadAction<number>) {
      // Don't do anything if the provided towerIndex isn't selectable
      if (!state.selectableTowers.includes(towerIndex)) return state;

      const [sourceIndex, destIndex] =
        state.selectedTowerIndex === null
          ? [towerIndex]
          : [state.selectedTowerIndex, towerIndex];

      // On first selection (e.g. when user is selecting the `sourceIndex`)
      if (typeof destIndex === "undefined") {
        state.selectedTowerIndex = sourceIndex;
        state.selectableTowers = getSelectableTowers(state);
        return;
      }

      // On duplicate selection (e.g. when user selects the same tower twice)
      if (sourceIndex === destIndex) {
        state.selectedTowerIndex = null;
        state.selectableTowers = getSelectableTowers(state);
        return;
      }

      // On valid selection
      state.moveCount += 1;
      state.score = getScore(state);
      state.towers[destIndex].unshift(
        ...state.towers[sourceIndex].splice(0, 1)
      );
      state.selectedTowerIndex = null;
      state.selectableTowers = getSelectableTowers(state);
      return;
    }
  }
});

export const selectGameDiskCount = (state: RootState) => state.game.diskCount;
export const selectGameMinMoveCount = (state: RootState) =>
  state.game.minMoveCount;
export const selectGameMoveCount = (state: RootState) => state.game.moveCount;
export const selectGameScore = (state: RootState) => state.game.score;
export const selectGameSelectableTowers = (state: RootState) =>
  state.game.selectableTowers;
export const selectGameSelectedTowerIndex = (state: RootState) =>
  state.game.selectedTowerIndex;
export const selectGameTowers = (state: RootState) => state.game.towers;

export const { initialize: gameInitialize, towerSelect: gameTowerSelect } =
  gameSlice.actions;

export default gameSlice.reducer;
