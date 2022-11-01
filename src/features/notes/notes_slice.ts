"use strict"
import { createSlice, PayloadAction, nanoid, createSelector } from '@reduxjs/toolkit';
import { DropResult } from 'react-beautiful-dnd';
import { RootState } from '../../store';
import {
  CreateNodeType,
  DeleteNodeType,
  SaveContentType,
  SaveTitletType,
} from "./notes_types"

export type TreeItem = (LeafType | NodeInterface);

export enum TreeEnum {
  LEAF,
  NODE,
}

export type LeafType = {
  content: string;
  name: string;
  id: string;
  type: TreeEnum.LEAF,
}

export interface NodeInterface {
  nodes: TreeItem;
  name: string;
  id: string;
  type: TreeEnum.NODE,
}

export interface TreeState {
  nodes: TreeItem[];
}

const nodes: TreeItem[] = [
  {
    type: TreeEnum.LEAF,
    content: 'content 1',
    name: 'node 1',
    id: "wFFebjzGc24d6eL4Dx1gO",
  },
  {
    type: TreeEnum.LEAF,
    content: 'content 2',
    name: 'node 2',
    id: "ceePNznf7ZiGbJLCGN8W",
  },
  {
    type: TreeEnum.LEAF,
    content: 'content 3',
    name: 'node 3',
    id: "MABRQUM91Pannv9CmLsC4",
  },
  {
    type: TreeEnum.LEAF,
    content: 'content 4',
    name: 'node 4',
    id: "_mFRkO7F1ytjIvfZx3Gik",
  },
];

const initialState: TreeState = { nodes };

const reducers = {
  createNode: (state: TreeState, action: PayloadAction<CreateNodeType>) => {
    const { name } = action.payload;
    const newNote: LeafType = {
      name,
      content: '',
      id: nanoid(),
      type: TreeEnum.LEAF,
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
      const treeItem = state.nodes[indexOfNode];
      if (treeItem.type === TreeEnum.LEAF) {
        treeItem.content = content;
      }
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
    action: PayloadAction<DropResult>
  ) => {
    const { destination, source } = action.payload;

    if (!destination) {
      return
    }

    const reorderdNote = state.nodes[source.index];
    const deleteNoteFromList = [...state.nodes.slice(0, source.index), ...state.nodes.slice(source.index + 1)];
    const addNoteToList = [...deleteNoteFromList.slice(0, destination.index), reorderdNote, ...deleteNoteFromList.slice(destination.index)];

    state.nodes = addNoteToList;
  }
};

const selectTree = (state: RootState) => state;

export const nodesSelector = createSelector(selectTree, (state) => state.notes.nodes);
export const nodeSelectorById = createSelector(
  [nodesSelector, (_, id) => id],
  (state, id) => state.find((item: TreeItem) => item.id === id)
);

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers,
});

export const { createNode, removeNode, saveContentInNote, saveTitletInNote, reorderNote } =
  notesSlice.actions;

export default notesSlice.reducer;
