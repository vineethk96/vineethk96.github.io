import React from 'react';

interface RecordPlayerProps {
    onDrop: (recordId: number) => void;
}

const RecordPlayer: React.FC<RecordPlayerProps> = ({ onDrop }) => {
    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const recordId = parseInt(event.dataTransfer.getData('text/plain'));
        onDrop(recordId);
    };

    return (
        <div
            className="record-player"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            Record Player
        </div>
    );
};

export default RecordPlayer; 