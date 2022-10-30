import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  NodeInterface,
  nodeSelector,
  saveTitletInNote,
} from '../../features/notes/notes_slice';
import { RootState } from '../../store';
import EditableTitle from '../editor/editable-title';

const NoteTitle = ({ noteId }: { noteId: string }) => {
  const node: NodeInterface | undefined = useSelector((state: RootState) =>
    nodeSelector(state, noteId),
  );
  const nodeName = node ? node.name : "";
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
