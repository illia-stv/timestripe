import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

export interface LeafState {
  content: string;
  name: string;
}

export interface NodeInterface {
  nodes: NodeInterface[];
  content: string;
  name: string;
  id: string;
}

type CreateNodeType = {
  name: string;
};

type DeleteNodeType = {
  id: string;
};

type SaveContentType = {
  content: string;
  id: string;
};

type SaveTitletType = {
  name: string;
  id: string;
};

export interface TreeState {
  nodes: NodeInterface[];
}

export type addNodeType = { name: string };

const nodes = [
  {
    nodes: [],
    content: 'content 1',
    name: 'node 1',
    id: nanoid(),
  },
  {
    nodes: [],
    content: 'content 2',
    name: 'node 2',
    id: nanoid(),
  },
  {
    nodes: [],
    content: 'content 3',
    name: 'node 3',
    id: nanoid(),
  },
  {
    nodes: [],
    content: 'content 4',
    name: 'node 4',
    id: nanoid(),
  },
];

const initialState: TreeState = { nodes };

const reducers = {
  createNode: (state: TreeState, action: PayloadAction<CreateNodeType>) => {
    const { name } = action.payload;
    const newNote = {
      name,
      content: '',
      nodes: [],
      id: nanoid(),
    };
    state.nodes.unshift(newNote);
  },
  removeNode: (state: TreeState, action: PayloadAction<DeleteNodeType>) => {
    const { id } = action.payload;
    state.nodes = state.nodes.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });
  },
  saveContentInNote: (
    state: TreeState,
    action: PayloadAction<SaveContentType>,
  ) => {
    const { content, id } = action.payload;
    const node = state.nodes.find((item) => {
      return item.id === id;
    });
    const indexOfNode = node && state.nodes.indexOf(node);
    if (indexOfNode !== undefined) {
      state.nodes[indexOfNode].content = content;
    }
  },
  saveTitletInNote: (
    state: TreeState,
    action: PayloadAction<SaveTitletType>,
  ) => {
    const { name, id } = action.payload;
    const node = state.nodes.find((item) => {
      return item.id === id;
    });
    const indexOfNode = node && state.nodes.indexOf(node);
    if (indexOfNode !== undefined) {
      state.nodes[indexOfNode].name = name;
    }
  },
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers,
});

export const { createNode, removeNode, saveContentInNote, saveTitletInNote } =
  notesSlice.actions;

export default notesSlice.reducer;
