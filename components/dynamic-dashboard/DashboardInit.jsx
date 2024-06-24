"use client"

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Tabs, Tab } from 'react-bootstrap';
import DragItem from './DragItem';
import DropZone from './DropZone';
 
const DashboardInit = ({setTab1DropZones,setTab2DropZones,setTab3DropZones,tab1DropZones,tab2DropZones,tab3DropZones}) => {
 

    const [activeTab, setActiveTab] = useState('tab1');
   

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
                                    <div className="container" style={{ maxHeight: '100%', overflowY: 'auto' }}>
                                        <h1>Dashboard - Tab 1</h1>
                                        {renderDropZones(tab1DropZones, 'tab1')}
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="tab2" title="KPIs">
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="container" style={{ maxHeight: '100%', overflowY: 'auto' }}>
                                        <h1>Dashboard - Tab 2</h1>
                                        {renderDropZones(tab2DropZones, 'tab2')}
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="tab3" title="Bid Management">
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="container" style={{ maxHeight: '100%', overflowY: 'auto' }}>
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
