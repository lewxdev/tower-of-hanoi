import { configureStore } from "@reduxjs/toolkit";
import game from "@tower-of-hanoi/redux/slices/game";
import ui from "@tower-of-hanoi/redux/slices/ui";

const store = configureStore({ reducer: { game, ui } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
