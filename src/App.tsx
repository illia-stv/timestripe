import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Sidebar from './components/sidebar/sidebar';
import NoteBook from './components/note_book/note_book';
import { NodeInterface } from './features/sidebar/sidebar_slice';
import Navbar from './components/navbar';
import NoteContainer from './components/note/note_container';

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
  const [currentNode, setCurrentNode] = useState<NodeInterface | null>(null);

  return (
    <BrowserRouter>
      <AppStyled>
        <Navbar />
        <MainContent>
          <Sidebar />
          <Routes>
            <Route path=":id" element={<NoteContainer />} />
          </Routes>
        </MainContent>
      </AppStyled>
    </BrowserRouter>
  );
}

export default App;
