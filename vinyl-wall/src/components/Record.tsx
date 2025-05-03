import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface RecordProps {
    id: number;
    index: number;
    moveRecord: (fromIndex: number, toIndex: number) => void;
    onDropToPlayer: (recordId: number) => void;
    imageUrl: string;  // New prop for the record image URL
}

const ItemType = {
    RECORD: 'record',
};

const Record: React.FC<RecordProps> = ({ id, index, moveRecord, onDropToPlayer, imageUrl }) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ItemType.RECORD,
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [id, index]);

    const [, dropRef] = useDrop(() => ({
        accept: ItemType.RECORD,
        drop: (item: { id: number; index: number }) => {
            if (item.index !== index) {
                moveRecord(item.index, index);
                item.index = index;
            }
        },
    }), [index]);

    const divRef = useRef<HTMLDivElement>(null);

    // Combine both dragRef and dropRef with divRef
    const combinedRef = (node: HTMLDivElement | null) => {
        dragRef(node);
        dropRef(node);
        if (divRef.current) {
            divRef.current = node;
        }
    };

    return (
        <div
            ref={combinedRef}
            className="record"
            style={{
                opacity: isDragging ? 0 : 1,
                backgroundImage: `url(${imageUrl})`,  // Set the background image for the record
            }}
        >
            {/* You could add content here if needed */}
        </div>
    );
};

export default Record;
