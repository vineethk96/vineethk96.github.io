// App.tsx
import React, { useState } from 'react';
import './App.css';
import Record from './components/Record';
import RecordPlayer from './components/RecordPlayer';
import Dialog from './components/Dialog';

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [recordPositions, setRecordPositions] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);

  const moveRecord = (fromIndex: number, toIndex: number) => {
    setRecordPositions((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  };

  const handleDropToPlayer = (recordId: number) => {
    setSelectedRecordId(recordId);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedRecordId(null);
  };

  return (
    <div className="container">
      <div className="record-wall">
        {recordPositions.map((id, index) => (
          <Record
            key={id}
            id={id}
            index={index}
            moveRecord={moveRecord}
            onDropToPlayer={handleDropToPlayer}
          />
        ))}
      </div>
      <RecordPlayer onDropToPlayer={handleDropToPlayer} />
      <Dialog
        isOpen={isDialogOpen}
        recordId={selectedRecordId}
        onClose={handleCloseDialog}
      />
    </div>
  );
}

export default App;
