import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '../../components/editor';
import { NodeInterface, saveChanges } from '../tree/tree_slice';

const TitleStyled = styled.h1`
  text-align: center;
  margin: 30px 0 0;
  padding: 0 130px;
  /* border: 1px solid black; */
`;

const Leaf = ({ node }: { node: NodeInterface }) => {
  const dispatch = useDispatch();
  const onSave = (content: string) => {
    dispatch(saveChanges({ ...node, leaf: { ...node.leaf, content } }));
  };

  return (
    <div>
      <TitleStyled>{node.name}</TitleStyled>
      <Editor text={node.leaf.content} save={onSave}></Editor>
    </div>
  );
};

export default Leaf;
