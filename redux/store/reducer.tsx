"use client";

export interface Item {
  id: string;
  text: string;
  completed: boolean;
}

export interface State {
  items: Item[];
}

export enum ActionTypes {
  ADD_ITEM = "ADD_ITEM",
  DELETE_ITEM = "DELETE_ITEM",
  UPDATE_ITEM = "UPDATE_ITEM",
  TOGGLE_COMPLETE = "TOGGLE_COMPLETE",
}

interface AddItemAction {
  type: ActionTypes.ADD_ITEM;
  payload: Item;
}

interface DeleteItemAction {
  type: ActionTypes.DELETE_ITEM;
  payload: string;
}

interface UpdateItemAction {
  type: ActionTypes.UPDATE_ITEM;
  payload: { id: string; newText: string };
}

interface ToggleCompleteAction {
  type: ActionTypes.TOGGLE_COMPLETE;
  payload: string;
}

export type Action = AddItemAction | DeleteItemAction | UpdateItemAction | ToggleCompleteAction;

const initialState: State = {
  items: [],
};

export const itemReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };

    case ActionTypes.DELETE_ITEM:
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };

    case ActionTypes.UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, text: action.payload.newText } : item
        ),
      };
      case ActionTypes.TOGGLE_COMPLETE:
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload ? { ...item, completed: !item.completed } : item
          ),
        };

    default:
      return state;
  }
};
