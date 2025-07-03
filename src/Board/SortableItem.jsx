import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Item from './Item';

const SortableItem = (props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined,
    };

    return (
        <Item
            ref={setNodeRef}
            style={style}
            withOpacity={isDragging}
            {...props}
            {...attributes}
            {...listeners}
        />
    );
};

export default SortableItem;
