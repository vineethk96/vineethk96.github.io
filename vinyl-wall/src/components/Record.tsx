import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface RecordProps {
    id: number;
    index: number;
    moveRecord: (fromIndex: number, toIndex: number) => void;
    onDropToPlayer: (recordId: number) => void;
}

const ItemType = {
    RECORD: 'record',
};

const Record: React.FC<RecordProps> = ({ id, index, moveRecord, onDropToPlayer }) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ItemType.RECORD,
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [id, index]);

    const [, dropRef] = useDrop(() => ({
        accept: ItemType.RECORD,
        // Only move the record when the item is dropped
        drop: (item: { id: number; index: number }) => {
            if (item.index !== index) {
                moveRecord(item.index, index); // Swap the records only when dropped
                item.index = index; // Update the dragged item's index
            }
        },
    }), [index]);

    const divRef = useRef<HTMLDivElement>(null);

    // Combine both dragRef and dropRef with divRef
    const combinedRef = (node: HTMLDivElement | null) => {
        dragRef(node);  // Attach drag functionality
        dropRef(node);  // Attach drop functionality
        if (divRef.current) {
            divRef.current = node;  // Attach divRef (if necessary for other purposes)
        }
    };

    return (
        <div
            ref={combinedRef}
            className="record"
            style={{ opacity: isDragging ? 0 : 1 }}
        >
            Record {id}
        </div>
    );
};

export default Record;
