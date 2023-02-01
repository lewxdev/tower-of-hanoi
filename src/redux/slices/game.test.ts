import reducer, {
  createInitialState,
  gameInitialize,
  gameTowerSelect
} from "@tower-of-hanoi/redux/slices/game";
import type { GameState } from "@tower-of-hanoi/redux/slices/game";

describe("'game/initialize' action type", () => {
  it("should handle initialization (when state is undefined)", () => {
    const diskCount = 8;
    const nextState = reducer(undefined, gameInitialize(diskCount));

    expect(nextState).toStrictEqual(
      expect.objectContaining<GameState>({
        diskCount,
        moveCount: 0,
        scoreMultiplier: 0,
        selectableTowers: [0],
        selectedTowerIndex: null,
        towers: [[1, 2, 3, 4, 5, 6, 7, 8], [], []]
      })
    );
  });

  it("should handle re-initialization (when state already exists)", () => {
    const diskCount = 5;
    const state = createInitialState(diskCount);
    const nextState = reducer(state, gameInitialize());

    expect(nextState).toStrictEqual(
      expect.objectContaining<GameState>({
        diskCount,
        moveCount: 0,
        scoreMultiplier: 0,
        selectableTowers: [0],
        selectedTowerIndex: null,
        towers: [[1, 2, 3, 4, 5], [], []]
      })
    );
  });
});

describe("'game/towerSelect' action type", () => {
  it("should handle source selection", () => {
    const sourceIndex = 0;
    const state = createInitialState(3);
    const nextState = reducer(state, gameTowerSelect(sourceIndex));

    expect(nextState).toStrictEqual(
      expect.objectContaining<GameState>({
        ...state,
        selectableTowers: [0, 1, 2],
        selectedTowerIndex: sourceIndex
      })
    );
  });

  it("should handle destination selection", () => {
    const destIndex = 2;
    const state: GameState = {
      ...createInitialState(3),
      selectableTowers: [0, 1, 2],
      selectedTowerIndex: 0
    };
    const nextState = reducer(state, gameTowerSelect(destIndex));

    expect(nextState).toStrictEqual(
      expect.objectContaining<GameState>({
        ...state,
        moveCount: 1,
        selectableTowers: [0, 2],
        selectedTowerIndex: null,
        towers: [[2, 3], [], [1]]
      })
    );
  });

  it("should handle duplicate selection", () => {
    const destIndex = 0;
    const state: GameState = {
      ...createInitialState(),
      selectableTowers: [0, 1, 2],
      selectedTowerIndex: 0
    };
    const nextState = reducer(state, gameTowerSelect(destIndex));

    expect(nextState).toStrictEqual(
      expect.objectContaining<GameState>({
        ...state,
        selectableTowers: [0],
        selectedTowerIndex: null
      })
    );
  });
});
