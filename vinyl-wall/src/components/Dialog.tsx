import React from 'react';

interface DialogProps {
    isOpen: boolean;
    recordId: number | null;
    onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, recordId, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="dialog" style={{ display: 'flex' }}>
            <div className="dialog-content">
                <h2>Record Details</h2>
                <p>
                    This is record number {recordId}. Here you can add more details about the record,
                    such as artist name, album title, year released, etc.
                </p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Dialog; 