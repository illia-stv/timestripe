import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Sidebar from './components/sidebar/sidebar';
import Navbar from './components/layout/navbar';
import NoteContainer from './components/note/note_container';

const AppStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  display: flex;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

function App() {
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
