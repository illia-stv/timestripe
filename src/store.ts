import { configureStore } from '@reduxjs/toolkit';
import sidebarSlice from './features/sidebar/sidebar_slice';
import notesSlice from './features/notes/notes_slice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    notes: notesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
