import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { removeNode, nodesSelector } from '../../features/notes/notes_slice';
import { TreeWrapper, NodeStyled, DeleteButtonWrapperStyled, DeleteButton } from "./sidebar_styles"

type NotesListType = {
    onDragEnd: any,
}

const NotesList = ({ onDragEnd }: NotesListType) => {
    const dispatch = useDispatch();
    const nodes = useSelector(nodesSelector);
    const navigate = useNavigate();

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppableId">
                {(provided, snapshot) => (
                    <TreeWrapper {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {nodes.map((item: any, index: number) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                    >
                                        <NodeStyled onClick={() => navigate(`/${item.id}`)}>
                                            <div>{item.name}</div>
                                            <DeleteButtonWrapperStyled>
                                                <DeleteButton
                                                    onClick={() => dispatch(removeNode({ id: item.id }))}
                                                />
                                            </DeleteButtonWrapperStyled>
                                        </NodeStyled>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </TreeWrapper>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default NotesList