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

const nodes = [
  {
    nodes: [],
    leaf: {
      content: 'content 1',
      name: 'name 1',
    },
    name: 'node 1',
    id: nanoid(),
  },
  {
    nodes: [],
    leaf: {
      content: 'content 2',
      name: 'name 2',
    },
    name: 'node 2',
    id: nanoid(),
  },
  {
    nodes: [],
    leaf: {
      content: 'content 3',
      name: 'name 3',
    },
    name: 'node 3',
    id: nanoid(),
  },
];

const initialState: TreeState = { nodes };

export const treeSlice = createSlice({
  name: 'sidebar',
  initialState,
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
