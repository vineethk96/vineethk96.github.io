import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';

interface RecordPlayerProps {
    onDropToPlayer: (recordId: number) => void;
}

const ItemType = {
    RECORD: 'record',
};

const RecordPlayer: React.FC<RecordPlayerProps> = ({ onDropToPlayer }) => {
    const [, dropRef] = useDrop(() => ({
        accept: ItemType.RECORD,
        drop: (item: { id: number }) => {
            onDropToPlayer(item.id);
        },
    }), []);

    const divRef = useRef<HTMLDivElement>(null);

    // Combine both refs: the drop functionality and the div ref
    const combinedRef = (node: HTMLDivElement | null) => {
        dropRef(node); // Attach the drop functionality
        if (divRef.current) {
            divRef.current = node; // Attach to the divRef
        }
    };

    return (
        <div ref={combinedRef} className="record-player">
            Record Player
        </div>
    );
};

export default RecordPlayer;
