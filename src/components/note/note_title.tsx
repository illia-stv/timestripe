import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  NodeInterface,
  saveTitletInNote,
} from '../../features/notes/notes_slice';
import EditableTitle from '../editor/editable-title';
import useDebounce from '../../hooks/debouncer';

const NoteTitle = ({ noteId }: { noteId: string }) => {
  const node: NodeInterface = useSelector((state: any) =>
    state.notes.nodes.find((item: NodeInterface) => item.id === noteId),
  );
  const nodeName = node && node.name;
  const [title, setTitle] = useState(nodeName);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(nodeName);
  }, [nodeName]);

  const onInputChange = (name: string) => {
    setTitle(name);
    changeTitle(name);
  };

  const changeTitle = (name: string) => {
    dispatch(
      saveTitletInNote({
        id: noteId,
        name,
      }),
    );
  };

  return <EditableTitle value={title} onChange={onInputChange} />;
};

export default NoteTitle;
