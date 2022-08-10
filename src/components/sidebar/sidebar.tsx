import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createNode, removeNode } from '../../features/notes/notes_slice';
import styled from 'styled-components';
import { ReactComponent as CreateIcon } from '../../assets/icons/create.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';

const SidebarStyled = styled.div`
  min-width: 320px;
  height: 100%;
  background: #fafafa;
  border-right: 1px solid #ddd;
  display: ${(props) => (props.hidden ? 'none' : 'block')};
  z-index: 1;
  overflow: hidden;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100vw;
  }
`;

const CreateNodeStyled = styled.input`
  width: 9rem;
  outline: none;
  background: #fafafa;
  font-size: 1rem;
  border: 1px solid transparent;
  transition: 0.2s;
  padding-bottom: 5px;
  border-bottom: 1px solid #ddd;
  &:focus {
    width: 14rem;
    transition: 0.2s;
  }
  &::placeholder {
    font-weight: 100;
  }
`;

const TreeWrapper = styled.div`
  margin: 10px 0 10px 20px;
`;

const NodeStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  line-height: 1;
  padding: 0.2rem 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  color: #333;
  font-weight: 500;
  border-bottom: 1px solid #ddd;
  border-radius: 5px;
  max-width: 15.5rem;
  margin: 0 0 0.8rem;
`;

const TitleStyled = styled.div`
  font-size: 1.3rem;
  font-weight: 100;
  margin: 30px 20px;
`;

const DeleteButton = styled(DeleteIcon)`
  background: #fafafa;
  border: none;
  font-weight: 900;
  width: 1.2rem;
  height: 1.2rem;
  fill: red;
`;

const CreateIconStyled = styled(CreateIcon)`
  width: 1.5rem;
  height: 1.5rem;
  fill: #333;
  cursor: pointer;
`;

const CreateNodeSectionStyled = styled.div`
  display: flex;
  width: 16.5rem;
  justify-content: space-between;
  padding: 0.2rem 0;
  align-items: center;
  margin: 0.2rem 0 0.2rem 1.5rem;
`;

const Divider = styled.div`
  border-bottom: 1px solid #ddd;
  width: 100%;
  margin: 20px 0;
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const nodes = useSelector((state: any) => state.notes.nodes);
  const dispatch = useDispatch();
  const [createNoteInput, setCreateNoteInput] = useState('');

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCreateNode();
    }
  };

  const onCreateNode = () => {
    dispatch(
      createNode({
        name: createNoteInput,
      }),
    );
    cleanINput();
  };

  const cleanINput = () => {
    setCreateNoteInput('');
  };

  return (
    <SidebarStyled>
      <TitleStyled>Create note</TitleStyled>
      <CreateNodeSectionStyled>
        <CreateNodeStyled
          placeholder="Create new node"
          value={createNoteInput}
          onChange={(e) => setCreateNoteInput(e.target.value)}
          onKeyDown={(e) => onKeyDownHandler(e)}
        />
        <CreateIconStyled onClick={(): void => onCreateNode()} />
      </CreateNodeSectionStyled>
      <Divider />
      <TitleStyled>Your notes</TitleStyled>
      <TreeWrapper>
        {nodes.map((item: any) => (
          <NodeStyled key={item.id} onClick={() => navigate(`/${item.id}`)}>
            <div>{item.name}</div>
            <DeleteButton
              onClick={() => dispatch(removeNode({ id: item.id }))}
            />
          </NodeStyled>
        ))}
      </TreeWrapper>
    </SidebarStyled>
  );
};

export default Sidebar;
