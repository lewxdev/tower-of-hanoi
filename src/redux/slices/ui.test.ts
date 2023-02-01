import reducer, {
  initialState,
  uiIsShowingIndicesToggle,
  uiThemePreferenceToggle
} from "@tower-of-hanoi/redux/slices/ui";
import type { UiState } from "@tower-of-hanoi/redux/slices/ui";

describe("'ui/isShowingIndicesToggle' action type", () => {
  it.each([true, false])(
    "should handle toggling 'isShowingIndices' from %j",
    (isShowingIndices) => {
      const state: UiState = { ...initialState, isShowingIndices };
      const nextState = reducer(state, uiIsShowingIndicesToggle());

      expect(nextState).toStrictEqual(
        expect.objectContaining<UiState>({
          ...state,
          isShowingIndices: !isShowingIndices
        })
      );
    }
  );
});

describe("'ui/themePreferenceToggle' action type", () => {
  it.each(["light", "dark"] as const)(
    "should handle toggling 'themePreference' from %j",
    (themePreference) => {
      const state: UiState = { ...initialState, themePreference };
      const nextState = reducer(state, uiThemePreferenceToggle());

      expect(nextState).toStrictEqual(
        expect.objectContaining<UiState>({
          ...state,
          themePreference: themePreference === "light" ? "dark" : "light"
        })
      );
    }
  );
});
