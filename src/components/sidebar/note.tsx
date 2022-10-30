import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { NodeInterface } from '../../features/notes/notes_slice'
import { removeNode } from '../../features/notes/notes_slice';
import { DeleteButton, DeleteButtonWrapperStyled, NodeStyled } from './sidebar_styles'

type NoteProps = {
    item: NodeInterface
}

const Note = ({ item }: NoteProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <NodeStyled onClick={() => navigate(`/${item.id}`)}>
            <div>{item.name}</div>
            <DeleteButtonWrapperStyled>
                <DeleteButton
                    onClick={() => dispatch(removeNode({ id: item.id }))}
                />
            </DeleteButtonWrapperStyled>
        </NodeStyled>
    )
}

export default Note
