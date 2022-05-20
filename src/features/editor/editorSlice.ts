import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { Descendant } from 'slate';

export interface NodeState {
  note: {
    content: Descendant[];
    name: string;
    id: string;
  };
}

const initialState: NodeState = {
  note: {
    content: [],
    name: 'New note',
    id: nanoid(),
  },
};

export type noteChange = { note: Descendant[]; noteName: string };

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    saveChanges: (state: NodeState, action: PayloadAction<noteChange>) => {
      state.note.content = action.payload.note;
    },
  },
});

export const { saveChanges } = editorSlice.actions;

export default editorSlice.reducer;
