import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createNode, removeNode, nodesSelector } from '../../features/notes/notes_slice';
import styled from 'styled-components';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';

interface SidebarProps {
  readonly offsetTop: number;
}

const Sidebar = () => {
  const navigate = useNavigate();
  const nodes = useSelector(nodesSelector);
  const dispatch = useDispatch();
  const sidebarRef: any = useRef(null);
  const [offsetTop, setOffsetTop] = useState(48);
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
    cleanInput();
  };

  const cleanInput = () => {
    setCreateNoteInput('');
  };

  useEffect(() => {
    if (sidebarRef.current) {
      setOffsetTop(sidebarRef.current.offsetTop);
    }
  }, [sidebarRef]);

  return (
    <SidebarStyled offsetTop={offsetTop} ref={sidebarRef}>
      <TitleStyled>Create note</TitleStyled>
      <CreateNodeSectionStyled>
          <CreateNodeStyled
            placeholder="Create new node"
            value={createNoteInput}
            onChange={(e) => setCreateNoteInput(e.target.value)}
            onKeyDown={(e) => onKeyDownHandler(e)}
          />
        <CreateButtonStyled onClick={(): void => onCreateNode()}>
          Create
        </CreateButtonStyled>
      </CreateNodeSectionStyled>
      <Divider />
      <TitleStyled>Your notes</TitleStyled>
      <TreeWrapper>
        {nodes.map((item: any) => (
          <NodeStyled key={item.id} onClick={() => navigate(`/${item.id}`)}>
            <div>{item.name}</div>
            <DeleteButtonWrapperStyled>
              <DeleteButton
                onClick={() => dispatch(removeNode({ id: item.id }))}
              />
            </DeleteButtonWrapperStyled>
          </NodeStyled>
        ))}
      </TreeWrapper>
    </SidebarStyled>
  );
};



const SidebarStyled = styled.div<SidebarProps>`
  width: 320px;
  position: fixed;
  top: ${(props: SidebarProps) => `${props.offsetTop}px`};
  height: ${(props: SidebarProps) => `calc(100vh - ${props.offsetTop}px)`};
  overflow-y: auto;
  overflow-x: hidden;
  background: #fafafa;
  border-right: 1px solid #ddd;
  display: ${(props) => (props.hidden ? 'none' : 'block')};
  z-index: 1;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100vw;
  }
`;

const CreateNodeStyled = styled.input`
  width: 11rem;
  outline: none;
  background: #fafafa;
  font-size: 1rem;
  border: 1px solid transparent;
  transition: 0.2s;
  padding: 5px 10px;

  &:focus {
    transition: 0.2s;
    box-shadow: 0px 5px 10px 0px rgba(66, 68, 90, 0.1);
  }
  &::placeholder {
    font-weight: 100;
    color: #666;
  }
`;

const TreeWrapper = styled.div`
  margin: 10px 0 10px 20px;
`;

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

const DeleteButtonWrapperStyled = styled.div`
  min-width: 1.2rem;
  height: 1.2rem;
  display: flex;
  margin-left: 3px;
  justify-content: center;
  align-items: center;
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

const TitleStyled = styled.div`
  font-size: 1.3rem;
  font-weight: 100;
  margin: 30px 20px;
`;

const CreateButtonStyled = styled.div`
  font-size: 1rem;
  border-radius: 5px;
  color: #333;
  font-weight: 700;
  padding: 9px 12px;
  transition: 0.2s;
  box-shadow: 0px 0px 10px 0px rgba(66, 68, 90, 0.1);
  &:hover {
    background: #dcdcdc;
    transition: 0.2s;
  }
  &:active {
    color: #ddd;
    background: #333;
    transition: 0.2s;
  }
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

export default Sidebar;
