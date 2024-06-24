"use client"

import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ id, onDrop, item, onRemove }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'item',
        drop: (droppedItem) => onDrop(id, droppedItem),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            style={{
                border: `1px dashed ${isOver ? 'green' : 'black'}`,
                padding: '10px',
                minHeight: '100px',
                position: 'relative',
            }}>
            {item ? (
                <div className="card mt-2">
                    <div className="card-body">
                        <button
                            className="btn btn-danger btn-sm"
                            style={{ position: 'absolute', top: '10px', right: '10px', borderRadius: '50%' }}
                            onClick={() => onRemove(id)}
                        >
                            &times;
                        </button>
                        <div className="d-flex flex-column align-items-center">
                            {item.imageSrc && (
                                <img
                                    src={item.imageSrc}
                                    alt={item.name}
                                    style={{ width: '100px', height: '100px', marginBottom: '10px' }}
                                />
                            )}
                            <p className="mb-0">{item.name}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Drop here</p>
            )}
        </div>
    );
};

export default DropZone;
