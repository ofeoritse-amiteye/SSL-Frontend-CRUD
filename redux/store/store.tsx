"use client"
import { legacy_createStore as createStore } from "redux";
import { itemReducer } from "./reducer";

export const store = createStore(itemReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
