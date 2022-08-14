import React from 'react';
import styled from 'styled-components';

import NoteTitle from './note_title';
import NoteEditor from './note_editor';

const NoteStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 48px auto 30px;
  max-width: 720px;
  max-height: 90vh;
`;

const Note = ({ id }: { id: string }) => {
  return (
    <NoteStyled>
      <NoteTitle noteId={id} />
      <NoteEditor noteId={id} />
    </NoteStyled>
  );
};

export default Note;
