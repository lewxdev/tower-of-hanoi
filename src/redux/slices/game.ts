import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@tower-of-hanoi/redux/store";

export interface GameState {
  /** The current total number of disks in play */
  diskCount: number;
  /** The number of moves made by the player */
  moveCount: number;
  /** A number between 0 and 1 representing the score multiplier  */
  scoreMultiplier: number;
  /** A list of indices of selectable towers; determined by `selectedTowerIndex` */
  selectableTowers: number[];
  /** The index of the currently selected tower */
  selectedTowerIndex: number | null;
  /** The state representing the game UI (towers) */
  towers: [start: number[], offset: number[], end: number[]];
}

const TOWER_INDICES = [0, 1, 2];

export const createInitialState = (diskCount = 4): GameState => ({
  diskCount,
  moveCount: 0,
  scoreMultiplier: 0,
  selectableTowers: [0],
  selectedTowerIndex: null,
  towers: [Array.from(Array(diskCount), (_, k) => k + 1), [], []]
});

const gameSlice = createSlice({
  name: "game",
  initialState: createInitialState(),
  reducers: {
    initialize(state, { payload }: PayloadAction<number | undefined>) {
      return createInitialState(payload ?? state.diskCount);
    },
    towerSelect(state, { payload }: PayloadAction<number>) {
      const [sourceIndex, destIndex] =
        state.selectedTowerIndex === null
          ? [payload]
          : [state.selectedTowerIndex, payload];

      // On first selection (e.g. when user is selecting the `sourceIndex`)
      if (typeof destIndex === "undefined") {
        const diskA = state.towers[sourceIndex].at(0);
        // ensure the requested selection has at least one disk
        if (typeof diskA === "undefined") return;

        state.selectableTowers = TOWER_INDICES.filter((towerIndex) => {
          if (towerIndex === sourceIndex) return true;

          const diskB = state.towers[towerIndex].at(0);
          return typeof diskB === "undefined" || diskA < diskB;
        });
        state.selectedTowerIndex = sourceIndex;

        return;
      }

      // On duplicate selection (e.g. when user selects the same tower twice)
      if (sourceIndex === destIndex) {
        state.selectableTowers = TOWER_INDICES.filter(
          (towerIndex) => state.towers[towerIndex].length !== 0
        );
        state.selectedTowerIndex = null;

        return;
      }

      // On valid selection
      if (state.selectableTowers.includes(destIndex)) {
        state.moveCount += 1;
        state.towers[destIndex].unshift(
          ...state.towers[sourceIndex].splice(0, 1)
        );
        state.selectableTowers = TOWER_INDICES.filter(
          (towerIndex) => state.towers[towerIndex].length !== 0
        );
        state.selectedTowerIndex = null;

        return;
      }
    }
  }
});

export const selectGameDiskCount = (state: RootState) => state.game.diskCount;
export const selectGameMoveCount = (state: RootState) => state.game.moveCount;
export const selectGameScoreMultiplier = (state: RootState) =>
  state.game.scoreMultiplier;
export const selectGameSelectableTowers = (state: RootState) =>
  state.game.selectableTowers;
export const selectGameSelectedTowerIndex = (state: RootState) =>
  state.game.selectedTowerIndex;
export const selectGameTowers = (state: RootState) => state.game.towers;

export const { initialize: gameInitialize, towerSelect: gameTowerSelect } =
  gameSlice.actions;

export default gameSlice.reducer;
