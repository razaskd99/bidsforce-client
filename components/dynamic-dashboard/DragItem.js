"use client"

import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const DragItem = ({ name, imageSrc }) => {
    const [isHovered, setIsHovered] = useState(false);

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: 'item',
        item: { name, imageSrc },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: () => {
            setIsHovered(false);
        },
    }));

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        setIsHovered(false);
    };

    const handleDragStart = () => {
        setIsHovered(false);
    };

    return (
        <div
            style={{ position: 'relative' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div ref={preview} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
                <div ref={drag} onDragStart={handleDragStart} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <img src={imageSrc} alt={name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                    <p style={{ margin: 0 }}>{name}</p>
                </div>
            </div>
            {isHovered && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000,
                    background: 'white',
                    padding: '10px',
                    border: '1px solid black',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}>
                    <img src={imageSrc} alt={name} style={{ width: '200px', height: '200px' }} />
                </div>
            )}
        </div>
    );
};

export default DragItem;
