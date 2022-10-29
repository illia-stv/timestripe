import { createSlice, PayloadAction, nanoid, createSelector } from '@reduxjs/toolkit';
import {
  CreateNodeType,
  DeleteNodeType,
  SaveContentType,
  SaveTitletType,
  ReorderNoteType
} from "./notes_types"

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

export interface TreeState {
  nodes: NodeInterface[];
}


const nodes = [
  {
    nodes: [],
    content: 'content 1',
    name: 'node 1',
    id: "wFFebjzGc24d6eL4Dx1gO",
  },
  {
    nodes: [],
    content: 'content 2',
    name: 'node 2',
    id: "ceePNznf7ZiGbJLCGN8W",
  },
  {
    nodes: [],
    content: 'content 3',
    name: 'node 3',
    id: "MABRQUM91Pannv9CmLsC4",
  },
  {
    nodes: [],
    content: 'content 4',
    name: 'node 4',
    id: "_mFRkO7F1ytjIvfZx3Gik",
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
  reorderNote: (
    state: TreeState,
    action: PayloadAction<ReorderNoteType>
  ) => {
    const { destination, source } = action.payload;
    const reorderdNote = state.nodes[source.index];
    const deleteNoteFromList = [...state.nodes.slice(0, source.index), ...state.nodes.slice(source.index + 1)];
    const addNoteToList = [...deleteNoteFromList.slice(0, destination.index), reorderdNote, ...deleteNoteFromList.slice(destination.index)];

    state.nodes = addNoteToList;
  }
};

const selectTree = (state: any) => state;

export const nodesSelector = createSelector(selectTree, (state) => state.notes.nodes);

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers,
});

export const { createNode, removeNode, saveContentInNote, saveTitletInNote, reorderNote } =
  notesSlice.actions;

export default notesSlice.reducer;
