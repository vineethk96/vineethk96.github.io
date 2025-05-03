// App.tsx
import React, { useState } from 'react';
import './App.css';
import Record from './components/Record';
import RecordPlayer from './components/RecordPlayer';
import Dialog from './components/Dialog';

interface RecordData {
  id: number;
  imageUrl: string;
}

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);

  const [records, setRecords] = useState<RecordData[]>([
    { id: 1, imageUrl: '/images/Traveler_Album.png' },
    { id: 2, imageUrl: '/images/HotStone_Album.png' },
    { id: 3, imageUrl: '/images/gestureRecog_Album.png' },
    { id: 4, imageUrl: '/images/record4.jpg' },
    { id: 5, imageUrl: '/images/record5.jpg' },
    { id: 6, imageUrl: '/images/record6.jpg' },
    { id: 7, imageUrl: '/images/record7.jpg' },
    { id: 8, imageUrl: '/images/record8.jpg' },
  ]);

  const moveRecord = (fromIndex: number, toIndex: number) => {
    setRecords((prev) => {
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
        {records.map((record, index) => (
          <Record
            key={record.id}
            id={record.id}
            index={index}
            moveRecord={moveRecord}
            onDropToPlayer={handleDropToPlayer}
            imageUrl={record.imageUrl}
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
