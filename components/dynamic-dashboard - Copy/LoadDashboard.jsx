"use client"
import React, { useState } from 'react';
import Dashboard from './Mydashboard';
import DashboardInit from './DashboardInit';
import { Modal } from 'react-bootstrap';

const LoadDashboard = () => {
    const [showDashboardEditor, setShowDashboardEditor] = useState(false);

    const handleEditDashboard = () => {
        setShowDashboardEditor(true);
    };

    const handleCloseDashboardEditor = () => {
        setShowDashboardEditor(false);
    };

    return (
        <>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"  />

            <Dashboard />
            <a href="#" onClick={handleEditDashboard}>Edit Dashboard</a>

             <Modal 
                show={showDashboardEditor} 
                onHide={handleCloseDashboardEditor} 
                dialogClassName="modal-xxl"
                aria-labelledby="edit-dashboard-modal"
                size="lg"
                fullscreen
            >
                <Modal.Header closeButton className='col-12 px-5'>
                    <Modal.Title id="edit-dashboard-modal">Edit Dashboard</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DashboardInit />
                </Modal.Body>
            </Modal>
         </>
    );
};

export default LoadDashboard;
