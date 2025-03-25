"use client"
import { ActionTypes} from "./reducer";
import { v4 as uuidv4 } from "uuid";

export const addItem = (text: string) => ({
  type: ActionTypes.ADD_ITEM,
  payload: { id: uuidv4(), text },
});

export const deleteItem = (id: string) => ({
  type: ActionTypes.DELETE_ITEM,
  payload: id,
});

export const updateItem = (id: string, newText: string) => ({
  type: ActionTypes.UPDATE_ITEM,
  payload: { id, newText },
});