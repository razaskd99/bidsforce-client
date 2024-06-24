"use client"

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Tabs, Tab } from 'react-bootstrap';
import DragItem from './DragItem';
import DropZone from './DropZone';
 
const DashboardInit = () => {
    const initialDropZonesTab1 = {
        dropZone1: { item: null, width: 4 },
        dropZone2: { item: null, width: 4 },
        dropZone3: { item: null, width: 4 },
        dropZone4: { item: null, width: 12 },
        dropZone5: { item: null, width: 6 },
        dropZone6: { item: null, width: 6 },
        dropZone7: { item: null, width: 8 },
        dropZone8: { item: null, width: 4 },
        dropZone9: { item: null, width: 4 },
        dropZone10: { item: null, width: 8 },

    };

    const initialDropZonesTab2 = {
        dropZone8: { item: null, width: 6 },
        dropZone9: { item: null, width: 6 },
        dropZone10: { item: null, width: 3 },
        dropZone11: { item: null, width: 9 },
        dropZone12: { item: null, width: 4 },
        dropZone13: { item: null, width: 8 },
        dropZone14: { item: null, width: 12 },
    };

    const initialDropZonesTab3 = {
        dropZone15: { item: null, width: 9 },
        dropZone16: { item: null, width: 3 },
        dropZone17: { item: null, width: 6 },
        dropZone18: { item: null, width: 6 },
        dropZone19: { item: null, width: 12 },
        dropZone20: { item: null, width: 4 },
        dropZone21: { item: null, width: 8 },
    };

    const [activeTab, setActiveTab] = useState('tab1');
    const [tab1DropZones, setTab1DropZones] = useState(initialDropZonesTab1);
    const [tab2DropZones, setTab2DropZones] = useState(initialDropZonesTab2);
    const [tab3DropZones, setTab3DropZones] = useState(initialDropZonesTab3);

    const handleDrop = (tab, id, item) => {
        const updateDropZones = (prevZones) => ({
            ...prevZones,
            [id]: { ...prevZones[id], item },
        });

        if (tab === 'tab1') {
            setTab1DropZones(updateDropZones);
        } else if (tab === 'tab2') {
            setTab2DropZones(updateDropZones);
        } else if (tab === 'tab3') {
            setTab3DropZones(updateDropZones);
        }
    };

    const handleRemoveItem = (tab, zoneId) => {
        const updateDropZones = (prevZones) => ({
            ...prevZones,
            [zoneId]: { ...prevZones[zoneId], item: null },
        });

        if (tab === 'tab1') {
            setTab1DropZones(updateDropZones);
        } else if (tab === 'tab2') {
            setTab2DropZones(updateDropZones);
        } else if (tab === 'tab3') {
            setTab3DropZones(updateDropZones);
        }
    };

    const renderDropZones = (dropZones, tab) => (
        <div className="row">
            {Object.keys(dropZones).map((zoneId) => (
                <div key={zoneId} className={`col-lg-${dropZones[zoneId].width}`}>
                    <h2>Drop Zone {zoneId.slice(-1)}</h2>
                    <DropZone 
                        id={zoneId} 
                        onDrop={(id, item) => handleDrop(tab, id, item)} 
                        item={dropZones[zoneId].item} 
                        onRemove={(id) => handleRemoveItem(tab, id)} 
                    />
                </div>
            ))}
        </div>
    );


    console.log(tab1DropZones)
    console.log(tab2DropZones)

    console.log(tab3DropZones)

    return (
        <>
        <DndProvider backend={HTML5Backend}>
            <div className="container-fluid mb-5">
                <div className="row">
                    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky">
                            <h2 className="mb-4">Widgets</h2>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <DragItem name="Item 1" imageSrc="/images/dash1.png" />
                                </li>
                                <li className="nav-item">
                                    <DragItem name="Item 2" imageSrc="/images/dash2.png" />
                                </li>
                                <li className="nav-item">
                                    <DragItem name="Item 3" imageSrc="/images/dash3.png" />
                                </li>
                                <li className="nav-item">
                                    <DragItem name="Item 4" imageSrc="/images/dash4.png" />
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                            <Tab eventKey="tab1" title="Daily Dashboard">
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="container" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                                        <h1>Dashboard - Tab 1</h1>
                                        {renderDropZones(tab1DropZones, 'tab1')}
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="tab2" title="KPIs">
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="container" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                                        <h1>Dashboard - Tab 2</h1>
                                        {renderDropZones(tab2DropZones, 'tab2')}
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="tab3" title="Bid Management">
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="container" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                                        <h1>Dashboard - Tab 3</h1>
                                        {renderDropZones(tab3DropZones, 'tab3')}
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </main>
                </div>
            </div>

        </DndProvider>

</>
    );
};

export default DashboardInit;
