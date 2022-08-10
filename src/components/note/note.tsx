import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux';

import {
  NodeInterface,
  saveContentInNote,
} from '../../features/notes/notes_slice';
import useDebounce from '../../hooks/debouncer';

const EditorWrapperStyled = styled.div`
  max-width: 80ch;

  justify-content: center;

  margin: 20px auto 0;
  border-radius: 1px;
  padding: 30px 30px 30px;
  @media (max-width: 640px) {
    width: 90vw;
  }
`;

const EditorStyled = styled(TextareaAutosize)`
  width: 80ch;
  outline: none;
  border: none;
  resize: none;
`;

const SaveStyled = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
`;

const SaveButtonStyled = styled.div`
  padding: 5px 10px;
  width: min-content;
  border: 1px solid #aaa;
  border-radius: 3px;
  color: #666;
  font-size: 1rem;
  transition: 0.7s;

  &:active {
    transition: 0.1s;
    background-color: #333;
    color: #aaa;
  }
`;

const Note = ({ id }: { id: string }) => {
  const node: NodeInterface = useSelector((state: any) =>
    state.notes.nodes.find((item: NodeInterface) => item.id === id),
  );
  const dispatch = useDispatch();
  const content = node && node.content;
  const [inputValue, setInputValue] = useState(node && node.content);
  const debouncer = useDebounce(inputValue, 1000);

  useEffect(() => {
    setInputValue(content);
  }, [content]);

  useEffect(() => {
    if (debouncer) {
      dispatch(
        saveContentInNote({
          id,
          content: inputValue,
        }),
      );
    }
  }, [debouncer]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Note with id: {id}</h1>
      <EditorWrapperStyled>
        <EditorStyled
          onChange={(e) => setInputValue(e.target.value)}
          minRows={30}
          cacheMeasurements={true}
          value={inputValue}
        ></EditorStyled>
        <SaveStyled>
          <SaveButtonStyled
            onClick={() =>
              dispatch(
                saveContentInNote({
                  id,
                  content: inputValue,
                }),
              )
            }
          >
            Save
          </SaveButtonStyled>
        </SaveStyled>
      </EditorWrapperStyled>
    </div>
  );
};

export default Note;
