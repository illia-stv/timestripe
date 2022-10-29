import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { createNode, reorderNote } from '../../features/notes/notes_slice';
import { Divider, TitleStyled, SidebarStyled } from "./sidebar_styles";
import CreateNote from "./create_note";
import NotesList from "./notes_list";

const Sidebar = () => {
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

  const onDragEnd = (data: any) => {
    if (data.destination) {
      dispatch(reorderNote(data))
    }
  }

  return (
    <SidebarStyled offsetTop={offsetTop} ref={sidebarRef}>
      <CreateNote
        setCreateNoteInput={setCreateNoteInput}
        onKeyDownHandler={onKeyDownHandler}
        onCreateNode={onCreateNode}
        createNoteInput={createNoteInput}
      />
      <Divider />
      <TitleStyled>Your notes</TitleStyled>
      <NotesList onDragEnd={onDragEnd} />
    </SidebarStyled >
  );
};

export default Sidebar;
