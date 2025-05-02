import React from 'react';

interface RecordProps {
    id: number;
    onDragStart: (id: number) => void;
    onDrop: (e: React.DragEvent, id: number) => void;
}

const Record: React.FC<RecordProps> = ({ id, onDragStart, onDrop }) => {
    const handleDragStart = (e: React.DragEvent) => {
        onDragStart(id);
        e.currentTarget.classList.add('dragging');
        
        // Create an empty image for the drag ghost
        const emptyImage = new Image();
        e.dataTransfer.setDragImage(emptyImage, 0, 0);
    };

    const handleDragEnd = (e: React.DragEvent) => {
        e.currentTarget.classList.remove('dragging');
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        onDrop(e, id);
    };

    return (
        <div
            className="record"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            data-record-id={id}
        >
            Record {id}
        </div>
    );
};

export default Record; 