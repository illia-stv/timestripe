import React from 'react';
import { useParams } from 'react-router-dom';

import Note from './note';

const NoteContainer = () => {
  const { id } = useParams();

  return id ? <Note id={id} /> : <div />;
};

export default NoteContainer;
