import { createContext, useReducer } from "react";
import { NOTES, LABELS, TRASH } from "../models/dummy-data";

/* State */
const initalState = {
  notes: NOTES,
  labels: LABELS,
  trash: TRASH
}

/* Reducer */
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const { note } = action.payload;
      state.notes.push(note)
      return state;
    }

    case 'DELETE': {
      const { id, note } = action.payload;
      state.notes = state.notes.filter(n => n.id !== id);
      state.trash.push(note)
      return { ...state };
    }

    case 'UPDATE': {
      const { id, note } = action.payload;
      let updatedNote = {};
      state.notes.forEach((n, i) => {
        if (n.id !== id) {
          return;
        }

        updatedNote = {
          ...n,
          ...note,
          updateAt: Date.now()
        };


        state.notes.splice(i, 1)
      })

      return {
        ...state,
        notes: [...state.notes, updatedNote]
      };
    }

    case 'RESTORE': {
      const { id, note } = action.payload;
      state.trash = state.trash.filter(n => n.id !== id);
      state.notes.push(note)
      return { ...state };
    }

    case 'RESTORE_ALL': {
      state.notes = [
        ...state.notes,
        ...state.trash
      ]

      state.trash = []

      return { ...state };
    }

    case 'DELETE_PER': {
      const { id } = action.payload;
      state.trash = state.trash.filter(n => n.id !== id);
      return { ...state };
    }

    case 'DELETE_ALL': {
      state.trash = []
      return { ...state };
    }


    default: {
      break;
    }
  }

}


/* Context */
export const appContext = createContext();
export default function AppContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initalState);
  return (
    <appContext.Provider value={{
      state, dispatch
    }}>
      {children}
    </appContext.Provider>
  )
}