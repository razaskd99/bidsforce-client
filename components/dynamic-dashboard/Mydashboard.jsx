"use client"
import React, { useState } from 'react';

const Mydashboard = ({ tab1DropZones, tab2DropZones, tab3DropZones, handleOpenLayoutModal }) => {
  const [activeTab, setActiveTab] = useState('tab1');

  const renderDropZoneItems = (dropZones) => {
    return Object.keys(dropZones).map((dropZoneKey, index) => {
      const dropZone = dropZones[dropZoneKey];
      return (
        <div className={`col-lg-${dropZone.width}`} key={index}>
          <h2>{dropZone?.item?.name}</h2>
          <div style={{ border: '1px dashed black', padding: '10px', minHeight: '100px', position: 'relative' }}>
            <div className="card mt-2">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center">
                  <img src={dropZone.item?.imageSrc} alt={dropZone.item?.name} style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
                  <p className="mb-0">{dropZone.item?.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <main role="main" className="col-md-12 ml-sm-auto col-lg-12">
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button type="button" id="tab1" role="tab" aria-controls="tabpane-tab1" aria-selected={activeTab === 'tab1'} className={`nav-link ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => setActiveTab('tab1')}>Daily Dashboard</button>
        </li>
        <li className="nav-item" role="presentation">
          <button type="button" id="tab2" role="tab" aria-controls="tabpane-tab2" aria-selected={activeTab === 'tab2'} className={`nav-link ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => setActiveTab('tab2')}>KPIs</button>
        </li>
        <li className="nav-item" role="presentation">
          <button type="button" id="tab3" role="tab" aria-controls="tabpane-tab3" aria-selected={activeTab === 'tab3'} className={`nav-link ${activeTab === 'tab3' ? 'active' : ''}`} onClick={() => setActiveTab('tab3')}>Opportunity Dashboard</button>
        </li>
      </ul>

      <div className="tab-content">
        <div id="tabpane-tab1" role="tabpanel" aria-labelledby="tab1" className={`tab-pane ${activeTab === 'tab1' ? 'active' : ''}`}>
          <a href="#" onClick={() => handleOpenLayoutModal('tab1')}>Reset Layout</a>
          <div className="container-fluid">
            <div className="row">
              {renderDropZoneItems(tab1DropZones)}
            </div>
          </div>
        </div>

        <div id="tabpane-tab2" role="tabpanel" aria-labelledby="tab2" className={`tab-pane ${activeTab === 'tab2' ? 'active' : ''}`}>
          <a href="#" onClick={() => handleOpenLayoutModal('tab2')}>Reset Layout</a>
          <div className="container-fluid">
            <div className="row">
              {renderDropZoneItems(tab2DropZones)}
            </div>
          </div>
        </div>

        <div id="tabpane-tab3" role="tabpanel" aria-labelledby="tab3" className={`tab-pane ${activeTab === 'tab3' ? 'active' : ''}`}>
          <a href="#" onClick={() => handleOpenLayoutModal('tab3')}>Reset Layout</a>
          <div className="container-fluid">
            <div className="row">
              {renderDropZoneItems(tab3DropZones)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Mydashboard;
