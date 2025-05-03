import React from 'react';

interface RecordProps {
    id: number;
    onDragStart: (id: number) => void;
    onDrop: (event: React.DragEvent, id: number) => void;
}

const Record: React.FC<RecordProps> = ({ id, onDragStart, onDrop }) => {
    const handleDragStart = (event: React.DragEvent) => {
        onDragStart(id);
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', id.toString());
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        onDrop(event, id);
    };

    return (
        <div
            className="record"
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            data-record-id={id}
        >
            Record {id}
        </div>
    );
};

export default Record; 