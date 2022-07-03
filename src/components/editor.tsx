import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { DebouncedFunc } from 'lodash';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { NodeInterface } from '../features/tree/tree_slice';

const EditorWrapperStyled = styled.div`
  max-width: 80ch;

  justify-content: center;

  margin: 20px auto 0;
  border-radius: 1px;
  /* box-shadow: 0px 0px 10px 1px rgba(66, 68, 90, 0.1); */
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

const Editor = ({
  text,
  save,
}: {
  text: string;
  save: (arg: string) => void;
}) => {
  const [nodeContent, setNodeContent] = useState(text);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
      console.log(text)
    setNodeContent(text);
  }, [text]);

  return (
    <EditorWrapperStyled>
      <EditorStyled
        ref={textAreaRef}
        onChange={(e) => setNodeContent(e.target.value)}
        minRows={30}
        cacheMeasurements={true}
        value={nodeContent}
      >
        {' '}
      </EditorStyled>
      <SaveStyled>
        <SaveButtonStyled onClick={() => save(nodeContent)}>
          Save
        </SaveButtonStyled>
      </SaveStyled>
    </EditorWrapperStyled>
  );
};

export default Editor;
