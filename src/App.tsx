import React from 'react';
import Editor from './features/editor/Editor';
import styled from 'styled-components';
import Sidebar from './features/sidebar/Sidebar';

const AppStyled = styled.div`
  overflow: hidden;
`;

function App() {
  return (
    <AppStyled>
      <Sidebar />
      <Editor />
    </AppStyled>
  );
}

export default App;
