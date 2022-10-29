export type CreateNodeType = {
    name: string;
};

export type DeleteNodeType = {
    id: string;
};

export type SaveContentType = {
    content: string;
    id: string;
};

export type ReorderNoteType = {
    destination: {
        index: number
    },
    source: {
        index: number,
        draggableId: string,
    }
};

export type SaveTitletType = {
    name: string;
    id: string;
};

export type addNodeType = { name: string };
