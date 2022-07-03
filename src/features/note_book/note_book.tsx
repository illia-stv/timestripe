import React from 'react';
import styled from 'styled-components';
import { NodeInterface } from '../tree/tree_slice';
import Leaf from './leaf';

const NoteBookStyled = styled.div`
  display: flex;
  overflow-y: auto;
  width: 100%;
  justify-content: center;
`;

const NoteBook = ({ currentNode }: { currentNode: NodeInterface | null }) => {
  return (
    <NoteBookStyled>
      {currentNode && <Leaf node={currentNode} />}
    </NoteBookStyled>
  );
};

export default NoteBook;
