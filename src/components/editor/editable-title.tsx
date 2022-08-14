import React from 'react';
import styled from 'styled-components';

const EditableTitleStyled = styled.input`
  width: 100%;
  margin: 30px 0 0;
  cotent-align: center;
  text-align: center;
  outline: none;
  border: none;
  resize: none;
  font-size: 3rem;
`;

const EditableTitle = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (name: string) => void;
}) => {
  return (
    <EditableTitleStyled
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
};

export default EditableTitle;
