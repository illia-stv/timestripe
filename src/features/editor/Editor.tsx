import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant, BaseEditor } from 'slate';
import { Slate, withReact, ReactEditor, Editable } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import styled from 'styled-components';
import { noteChange, saveChanges } from './editorSlice';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string; bold?: true };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const EditorStyled = styled.div`
  max-width: 600px;
  min-height: 400px;
  overflow-y: auto;
  margin: 50px auto;
  border-radius: 5px;
  box-shadow: 0px 0px 13px -1px rgba(66, 68, 90, 1);
  padding: 30px;
  @media (max-width: 640px) {
    width: 90vw;
  }
`;

const TitleStyled = styled.h1`
  text-align: center;
  margin: 0 0 20px;
`;

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

type actionType = { payload: noteChange; type: string };

const Editor = () => {
  const [editor] = useState(withReact(createEditor()));
  // const editor = useMemo(() => withReact(createEditor()), []);
  const dispatch = useDispatch();

  const onHandleDebounce = (value: Descendant[]) => {
    dispatch(saveChanges({ note: value, noteName: 'new branch' }));
  };

  const onSave = useCallback(debounce(onHandleDebounce, 1000), []);
  return (
    <>
      <EditorStyled>
        <TitleStyled>Simple Editor</TitleStyled>
        <Slate
          editor={editor}
          value={initialValue}
          onChange={(value) => onSave(value)}
        >
          <Editable />
        </Slate>
      </EditorStyled>
    </>
  );
};

export default Editor;
