import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@tower-of-hanoi/redux/store";

export interface UiState {
  /** Whether to display the respective indices of disks */
  isShowingIndices: boolean;
  /** The user-defined preference of the app theme */
  themePreference: "light" | "dark";
}

export const initialState: UiState = {
  isShowingIndices: false,
  themePreference: "light"
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    isShowingIndicesToggle(state) {
      state.isShowingIndices = !state.isShowingIndices;
    },
    themePreferenceToggle(state) {
      state.themePreference =
        state.themePreference === "light" ? "dark" : "light";
    }
  }
});

export const selectUiIsShowingIndices = (state: RootState) =>
  state.ui.isShowingIndices;
export const selectUiThemePreference = (state: RootState) =>
  state.ui.themePreference;

export const {
  isShowingIndicesToggle: uiIsShowingIndicesToggle,
  themePreferenceToggle: uiThemePreferenceToggle
} = uiSlice.actions;

export default uiSlice.reducer;
