import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  TreeEnum,
  TreeItem,
  saveContentInNote,
  nodeSelectorById
} from '../../features/notes/notes_slice';
import useDebounce from '../../hooks/debouncer';
import { RootState } from '../../store';
import Editor from '../editor/autosize-editor';

const oneSecond = 1000;

const NoteEditor = ({ noteId }: { noteId: string }) => {
  const node: TreeItem | undefined = useSelector((state: RootState) =>
    nodeSelectorById(state, noteId),
  );
  const content = node && node.type === TreeEnum.LEAF ? node.content : "";
  const [inputValue, setInputValue] = useState(content);
  const dispatch = useDispatch();
  const debouncer = useDebounce(inputValue, oneSecond);

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

export default NoteEditor;
