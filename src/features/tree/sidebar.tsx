import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { createNode, NodeInterface, removeNode, TreeState } from './tree_slice';
import { ReactComponent as CreateIcon } from '../../assets/icons/create.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';

const SidebarStyled = styled.div`
  width: 370px;
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
  margin: 0 20px 0;
  width: 9rem;
  outline: none;
  background: #fafafa;
  font-size: 1rem;
  padding: 0.2rem 0.5rem;
  border: 1px solid transparent;
  transition: 0.2s;
  border-bottom: 1px solid #ddd;
  &:focus {
    width: 12rem;
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
`;

const Divider = styled.div`
  border-bottom: 1px solid #ddd;
  width: 100%;
  margin: 20px 0;
`;

const Sidebar = ({
  setCurrentNode,
}: {
  setCurrentNode: React.Dispatch<React.SetStateAction<NodeInterface | null>>;
}) => {
  const nodes: NodeInterface[] = useSelector(
    (state: { tree: { nodes: NodeInterface[] } }) => state.tree.nodes,
  );
  const [nodeName, setNodeName] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const defualtNode = {
    nodes: [],
    leaf: {
      content: 'type something',
      name: 'name',
    },
    name: nodeName,
    id: nanoid(),
  };
  const dispatch = useDispatch();

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      dispatch(createNode(defualtNode));
      setNodeName('');
    }
  };

  return (
    <SidebarStyled hidden={isSidebarVisible}>
      <TitleStyled>Create note</TitleStyled>
      <CreateNodeSectionStyled>
        <CreateNodeStyled
          placeholder="Create new node"
          value={nodeName}
          onKeyPress={handleKeyPress}
          onChange={(e) => setNodeName(e.target.value)}
        />
        <CreateIconStyled
          onClick={(): void => {
            dispatch(createNode(defualtNode));
            setNodeName('');
          }}
        />
      </CreateNodeSectionStyled>
      <Divider />
      <TitleStyled>Your notes</TitleStyled>
      <TreeWrapper>
        {nodes.map((item, key) => (
          <NodeStyled onClick={() => setCurrentNode(nodes[key])} key={item.id}>
            <div>{nodes[key].name}</div>
            <DeleteButton onClick={() => dispatch(removeNode(item))} />
          </NodeStyled>
        ))}
      </TreeWrapper>
    </SidebarStyled>
  );
};

export default Sidebar;
