import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  NodeInterface,
  saveContentInNote,
} from '../../features/notes/notes_slice';
import useDebounce from '../../hooks/debouncer';
import Editor from '../editor/autosize-editor';

const EditorWrapperStyled = styled.div`
  max-width: 80ch;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 1px;
  margin: 30px 0 30px;
  padding: 30px 30px 30px;
  box-shadow: 0px 0px 20px 0px rgba(66, 68, 90, 0.1);
  @media (max-width: 640px) {
    width: 90vw;
  }
`;

const NoteEditor = ({ noteId }: { noteId: string }) => {
  const node: NodeInterface = useSelector((state: any) =>
    state.notes.nodes.find((item: NodeInterface) => item.id === noteId),
  );
  const content = node && node.content;
  const [inputValue, setInputValue] = useState(node && node.content);
  const dispatch = useDispatch();
  const debouncer = useDebounce(inputValue, 1000);

  useEffect(() => {
    setInputValue(content);
  }, [content]);

  useEffect(() => {
    if (debouncer) {
      dispatch(
        saveContentInNote({
          id: noteId,
          content: inputValue,
        }),
      );
    }
  }, [debouncer]);

  return (
    <EditorWrapperStyled>
      <Editor onChange={setInputValue} value={inputValue} />
    </EditorWrapperStyled>
  );
};

export default NoteEditor;
