import React, { useState } from 'react';
import './App.css';
import Record from './components/Record';
import RecordPlayer from './components/RecordPlayer';
import Dialog from './components/Dialog';

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [recordPositions, setRecordPositions] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);

  const handleDragStart = (recordId: number) => {
    const event = window.event as DragEvent;
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', recordId.toString());
    }
  };

  const handleDrop = (recordId: number) => {
    setSelectedRecordId(recordId);
    setIsDialogOpen(true);
  };

  const handleRecordDrop = (event: React.DragEvent, targetId: number) => {
    event.preventDefault();
    const sourceId = parseInt(event.dataTransfer.getData('text/plain'));
    
    // Swap positions
    setRecordPositions(prevPositions => {
      const newPositions = [...prevPositions];
      const sourceIndex = newPositions.indexOf(sourceId);
      const targetIndex = newPositions.indexOf(targetId);
      [newPositions[sourceIndex], newPositions[targetIndex]] = 
      [newPositions[targetIndex], newPositions[sourceIndex]];
      return newPositions;
    });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedRecordId(null);
  };

  return (
    <div className="container">
      <div className="record-wall">
        {recordPositions.map((id) => (
          <Record 
            key={id} 
            id={id} 
            onDragStart={handleDragStart}
            onDrop={handleRecordDrop}
          />
        ))}
      </div>
      <RecordPlayer onDrop={handleDrop} />
      <Dialog
        isOpen={isDialogOpen}
        recordId={selectedRecordId}
        onClose={handleCloseDialog}
      />
    </div>
  );
}

export default App; 