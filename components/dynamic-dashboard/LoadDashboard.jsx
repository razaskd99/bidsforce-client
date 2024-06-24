"use client"

import React, { useState } from 'react';
import Dashboard from './Mydashboard';
import DashboardInit from './DashboardInit';
import { Modal, Button } from 'react-bootstrap';

const LoadDashboard = () => {
    const [showDashboardEditor, setShowDashboardEditor] = useState(false);
    const [showLayoutModal, setShowLayoutModal] = useState(false);
    const [activeTab, setActiveTab] = useState('tab1');
    const [selectedLayout, setSelectedLayout] = useState(null); // State to store selected layout number

    const layout1 = {
        dropZone1: { item: null, width: 4 },
        dropZone2: { item: null, width: 4 },
        dropZone3: { item: null, width: 4 },
        dropZone4: { item: null, width: 12 },
        dropZone5: { item: null, width: 6 },
        dropZone6: { item: null, width: 6 },
        dropZone7: { item: null, width: 12 },
        dropZone8: { item: null, width: 8 },
        dropZone9: { item: null, width: 4 },
    };

    const layout2 = {
        dropZone8: { item: null, width: 12 },
        dropZone9: { item: null, width: 4 },
        dropZone10: { item: null, width: 4 },
        dropZone11: { item: null, width: 4 },
        dropZone12: { item: null, width: 12 },
        dropZone13: { item: null, width: 6 },
        dropZone14: { item: null, width: 6 },
        dropZone15: { item: null, width: 8 },
        dropZone16: { item: null, width: 4 },
    };

    const layout3 = {
        dropZone15: { item: null, width: 6 },
        dropZone16: { item: null, width: 6 },
        dropZone17: { item: null, width: 12 },
        dropZone18: { item: null, width: 8 },
        dropZone19: { item: null, width: 4 },
        dropZone20: { item: null, width: 4 },
        dropZone21: { item: null, width: 4 },
        dropZone22: { item: null, width: 4 },
        dropZone23: { item: null, width: 12 },
    };

    const [layouts, setLayouts] = useState({
        tab1: layout1,
        tab2: layout2,
        tab3: layout3,
    });

    const [tab1DropZones, setTab1DropZones] = useState(layouts.tab1);
    const [tab2DropZones, setTab2DropZones] = useState(layouts.tab2);
    const [tab3DropZones, setTab3DropZones] = useState(layouts.tab3);

    const handleEditDashboard = () => {
        setShowDashboardEditor(true);
    };

    const handleCloseDashboardEditor = () => {
        setShowDashboardEditor(false);
    };

    const handleOpenLayoutModal = (tab) => {
        setActiveTab(tab);
        setShowLayoutModal(true);
    };

    const handleCloseLayoutModal = () => {
        setShowLayoutModal(false);
    };

    const handleLayoutSelect = (layoutNumber) => {
        setSelectedLayout(layoutNumber);
    };

    const handleApplyLayout = () => {
        if (selectedLayout === null) return;

        const selectedLayoutConfig = selectedLayout === 1 ? layout1 : selectedLayout === 2 ? layout2 : layout3;

        if (activeTab === 'tab1') {
            setTab1DropZones(selectedLayoutConfig);
        } else if (activeTab === 'tab2') {
            setTab2DropZones(selectedLayoutConfig);
        } else if (activeTab === 'tab3') {
            setTab3DropZones(selectedLayoutConfig);
        }

        setSelectedLayout(null); // Reset selectedLayout state
        setShowLayoutModal(false);
    };

    const handleCancelLayout = () => {
        setSelectedLayout(null); // Reset selectedLayout state
        setShowLayoutModal(false);
    };

    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" />

            <a href="#" onClick={handleEditDashboard}>Edit Dashboard</a>

            <Dashboard
                tab1DropZones={tab1DropZones} tab2DropZones={tab2DropZones} tab3DropZones={tab3DropZones}
                initialDropZonesTab1={layout1} initialDropZonesTab2={layout2} initialDropZonesTab3={layout3}
                handleOpenLayoutModal={handleOpenLayoutModal}
            />

            <Modal
                show={showDashboardEditor}
                onHide={handleCloseDashboardEditor}
                dialogClassName="modal-xxl"
                aria-labelledby="edit-dashboard-modal"
                size="lg"
                fullscreen
                style={{ height: "1900px", overflowY: "scroll", paddingBottom: '20px' }}
            >
                <Modal.Header closeButton className='col-12 px-5'>
                    <Modal.Title id="edit-dashboard-modal">Edit Dashboard</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DashboardInit
                        setTab1DropZones={setTab1DropZones} setTab2DropZones={setTab2DropZones}
                        setTab3DropZones={setTab3DropZones}
                        tab1DropZones={tab1DropZones} tab2DropZones={tab2DropZones} tab3DropZones={tab3DropZones}
                    />
                </Modal.Body>
            </Modal>

            <Modal show={showLayoutModal} onHide={handleCloseLayoutModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Layout</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-around">
                    <div
                        className="placeholder"
                        onClick={() => handleLayoutSelect(1)}
                        style={{
                            width: '100px',
                            height: '100px',
                            backgroundColor: 'lightgrey',
                            cursor: 'pointer',
                            border: selectedLayout === 1 ? '3px solid blue' : '1px solid grey'
                        }}
                    >
                        <p>Layout 1</p>
                    </div>
                    <div
                        className="placeholder"
                        onClick={() => handleLayoutSelect(2)}
                        style={{
                            width: '100px',
                            height: '100px',
                            backgroundColor: 'lightgrey',
                            cursor: 'pointer',
                            border: selectedLayout === 2 ? '3px solid blue' : '1px solid grey'
                        }}
                    >
                        <p>Layout 2</p>
                    </div>
                    <div
                        className="placeholder"
                        onClick={() => handleLayoutSelect(3)}
                        style={{
                            width: '100px',
                            height: '100px',
                            backgroundColor: 'lightgrey',
                            cursor: 'pointer',
                            border: selectedLayout === 3 ? '3px solid blue' : '1px solid grey'
                        }}
                    >
                        <p>Layout 3</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelLayout}>Cancel</Button>
                    <Button variant="primary" onClick={handleApplyLayout}>Apply</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default LoadDashboard;

