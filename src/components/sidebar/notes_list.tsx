import React from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useSelector } from 'react-redux';

import Note from "./note"
import { NodeInterface, nodesSelector } from '../../features/notes/notes_slice';
import { TreeWrapper } from "./sidebar_styles"

type NotesListPropsType = {
    onDragEnd: (arg: DropResult) => void,
}

const NotesList = ({ onDragEnd }: NotesListPropsType) => {
    const nodes = useSelector(nodesSelector);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppableId">
                {(provided) => (
                    <TreeWrapper {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {nodes.map((item: NodeInterface, index: number) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                    >
                                        <Note item={item} />
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