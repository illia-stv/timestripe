import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

export interface LeafState {
  content: string;
  name: string;
}

export interface NodeInterface {
  nodes: NodeInterface[];
  leaf: LeafState;
  name: string;
  id: string;
}

export interface TreeState {
  nodes: NodeInterface[];
}

export type addNodeType = { name: string };

export const treeSlice = createSlice({
  name: 'tree',
  initialState: {
    nodes: [],
  },
  reducers: {
    createNode: (state: TreeState, action: PayloadAction<NodeInterface>) => {
      state.nodes.push(action.payload);
    },
    saveChanges: (state: TreeState, action: PayloadAction<NodeInterface>) => {
      state.nodes = state.nodes.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    removeNode: (state: TreeState, action: PayloadAction<NodeInterface>) => {
      state.nodes = state.nodes.filter((item) => {
        if (item.id !== action.payload.id) {
          return item;
        }
      });
    },
  },
});

export const { createNode, saveChanges, removeNode } = treeSlice.actions;

export default treeSlice.reducer;
