import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './features/tree/sidebar';
import NoteBook from './features/note_book/note_book';
import { NodeInterface } from './features/tree/tree_slice';
import { useSelector } from 'react-redux';
import Navbar from './components/navbar';

const AppStyled = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  display: flex;
  height: 100%;
`;

function App() {
  const nodes: NodeInterface[] = useSelector(
    (state: { tree: { nodes: NodeInterface[] } }) => state.tree.nodes,
  );

  const defualtNode = (nodes.length && nodes[0]) || null;
  const [currentNode, setCurrentNode] = useState<NodeInterface | null>(
    defualtNode,
  );
  return (
    <AppStyled>
      <Navbar />
      <MainContent>
        <Sidebar setCurrentNode={setCurrentNode} />
        <NoteBook currentNode={currentNode} />
      </MainContent>
    </AppStyled>
  );
}

export default App;
