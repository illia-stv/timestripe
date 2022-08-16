import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { removeNode } from '../../features/notes/notes_slice';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';

const NodeStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 0.6rem 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  color: #333;
  font-weight: 500;
  border-radius: 5px;
  max-width: 16.5rem;
  transition: 0.2s;
  &:hover {
    transition: 0.2s;
    box-shadow: 0px 0px 10px 0px rgba(66, 68, 90, 0.1);
  }
`;

const DeleteButton = styled(DeleteIcon)`
  background: #fafafa;
  border: none;
  font-weight: 900;
  opacity: 0;
  transition: 0.2s;
  width: 0;
  height: 0;
  fill: red;
  ${NodeStyled}:hover & {
    opacity: 1;
    width: 1.1rem;
    height: 1.1rem;
    transition: 0.1s;
  }
`;

const DeleteButtonWrapperStyled = styled.div`
  min-width: 1.2rem;
  height: 1.2rem;
  display: flex;
  marging-left: 3px;
  justify-content: center;
  align-items: center;
`;

const ItemNameStyled = styled.div``;
const ItemNameStyled1 = styled.div``;
const ItemNameStyled2 = styled.div``;
const ItemNameStyled3 = styled.div``;

const NotesList = ({ nodes }: { nodes: any }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      {nodes.map((item: any) => (
        <NodeStyled key={item.id} onClick={() => navigate(`/${item.id}`)}>
          <ItemNameStyled>{item.name}</ItemNameStyled>
          <DeleteButtonWrapperStyled>
            <DeleteButton
              onClick={() => dispatch(removeNode({ id: item.id }))}
            />
          </DeleteButtonWrapperStyled>
        </NodeStyled>
      ))}
    </>
  );
};

export default NotesList;
