import React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

const EditorStyled = styled(TextareaAutosize)`
  width: 80ch;
  outline: none;
  border: none;
  resize: none;
`;

const Editor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <EditorStyled
      onChange={(e) => onChange(e.target.value)}
      minRows={30}
      cacheMeasurements={true}
      value={value}
    ></EditorStyled>
  );
};

export default Editor;
