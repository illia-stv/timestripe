import React from 'react'
import { TitleStyled, CreateNodeSectionStyled, CreateNodeStyled, CreateButtonStyled } from "./sidebar_styles";

type CreateNoteTypes = {
    createNoteInput: any,
    setCreateNoteInput: any,
    onKeyDownHandler: any,
    onCreateNode: any
}

const CreateNote = ({
    createNoteInput,
    setCreateNoteInput,
    onKeyDownHandler,
    onCreateNode
}: CreateNoteTypes) => {
    return (
        <>
            <TitleStyled>Create note</TitleStyled>
            <CreateNodeSectionStyled>
                <CreateNodeStyled
                    placeholder="Create new node"
                    value={createNoteInput}
                    onChange={(e) => setCreateNoteInput(e.target.value)}
                    onKeyDown={(e) => onKeyDownHandler(e)}
                />
                <CreateButtonStyled onClick={(): void => onCreateNode()}>
                    Create
                </CreateButtonStyled>
            </CreateNodeSectionStyled>
        </>
    )
}

export default CreateNote