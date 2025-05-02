import React from 'react';

interface RecordPlayerProps {
    onDrop: (recordId: number) => void;
}

const RecordPlayer: React.FC<RecordPlayerProps> = ({ onDrop }) => {
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const recordId = parseInt(e.dataTransfer.getData('text/plain'));
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