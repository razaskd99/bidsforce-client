"use client"

import React, { useState } from 'react';

const Mydashboard = () => {
  const [activeTab, setActiveTab] = useState('tab1'); // State to track active tab

 

  const tab1DropZones={
    "dropZone1": {
        "item": {
            "name": "Item 1",
            "imageSrc": "/images/dash1.png"
        },
        "width": 4
    },
    "dropZone2": {
        "item": {
            "name": "Item 1",
            "imageSrc": "/images/dash1.png"
        },
        "width": 4
    },
    "dropZone3": {
        "item": {
            "name": "Item 1",
            "imageSrc": "/images/dash1.png"
        },
        "width": 4
    },
    "dropZone4": {
        "item": {
            "name": "Item 1",
            "imageSrc": "/images/dash1.png"
        },
        "width": 6
    },
    "dropZone5": {
        "item": {
            "name": "Item 1",
            "imageSrc": "/images/dash1.png"
        },
        "width": 6
    },
    "dropZone6": {
        "item": {
            "name": "Item 1",
            "imageSrc": "/images/dash1.png"
        },
        "width": 8
    },
    "dropZone7": {
        "item": {
            "name": "Item 1",
            "imageSrc": "/images/dash1.png"
        },
        "width": 4
    }

    ,
    "dropZone8": {
        "item": {
            "name": "Item 1",
            "imageSrc": "/images/dash1.png"
        },
        "width": 4
    },
    "dropZone9": {
        "item": {
            "name": "Item 1",
            "imageSrc": "/images/dash1.png"
        },
        "width": 8
    }
}

const tab2DropZones={
    "dropZone8": {
        "item": {
            "name": "Item 2",
            "imageSrc": "/images/dash2.png"
        },
        "width": 6
    },
    "dropZone9": {
        "item": {
            "name": "Item 2",
            "imageSrc": "/images/dash2.png"
        },
        "width": 6
    },
    "dropZone10": {
        "item": {
            "name": "Item 2",
            "imageSrc": "/images/dash2.png"
        },
        "width": 3
    },
    "dropZone11": {
        "item": {
            "name": "Item 2",
            "imageSrc": "/images/dash2.png"
        },
        "width": 9
    },
    "dropZone12": {
        "item": {
            "name": "Item 2",
            "imageSrc": "/images/dash2.png"
        },
        "width": 4
    },
    "dropZone13": {
        "item": {
            "name": "Item 2",
            "imageSrc": "/images/dash2.png"
        },
        "width": 8
    },
    "dropZone14": {
        "item": {
            "name": "Item 2",
            "imageSrc": "/images/dash2.png"
        },
        "width": 4
    }
}

const tab3DropZones={
    "dropZone15": {
        "item": {
            "name": "Item 3",
            "imageSrc": "/images/dash3.png"
        },
        "width": 9
    },
    "dropZone16": {
        "item": {
            "name": "Item 3",
            "imageSrc": "/images/dash3.png"
        },
        "width": 3
    },
    "dropZone17": {
        "item": {
            "name": "Item 3",
            "imageSrc": "/images/dash3.png"
        },
        "width": 6
    },
    "dropZone18": {
        "item": {
            "name": "Item 3",
            "imageSrc": "/images/dash3.png"
        },
        "width": 6
    },
    "dropZone19": {
        "item": {
            "name": "Item 3",
            "imageSrc": "/images/dash3.png"
        },
        "width": 12
    },
    "dropZone20": {
        "item": {
            "name": "Item 3",
            "imageSrc": "/images/dash3.png"
        },
        "width": 4
    },
    "dropZone21": {
        "item": {
            "name": "Item 3",
            "imageSrc": "/images/dash3.png"
        },
        "width": 8
    }
}

 
  const renderDropZoneItems = (dropZones) => {
    return Object.keys(dropZones).map((dropZoneKey, index) => {
      const dropZone = dropZones[dropZoneKey];
      return (
        <div className={`col-lg-${dropZone.width}`} key={index}>
          <h2>{dropZone.item.name}</h2>
          <div style={{ border: '1px dashed black', padding: '10px', minHeight: '100px', position: 'relative' }}>
            <div className="card mt-2">
              <div className="card-body">
                {/*<button className="btn btn-danger btn-sm" style={{ position: 'absolute', top: '10px', right: '10px', borderRadius: '50%' }}>×</button>*/}
                <div className="d-flex flex-column align-items-center">
                  <img src={dropZone.item.imageSrc} alt={dropZone.item.name} style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
                  <p className="mb-0">{dropZone.item.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <main role="main" className="col-md-12 ml-sm-auto col-lg-12  ">
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button type="button" id="tab1" role="tab" aria-controls="tabpane-tab1" aria-selected={activeTab === 'tab1'} className={`nav-link ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => setActiveTab('tab1')}>Daily Dashboard</button>
        </li>
        <li className="nav-item" role="presentation">
          <button type="button" id="tab2" role="tab" aria-controls="tabpane-tab2" aria-selected={activeTab === 'tab2'} className={`nav-link ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => setActiveTab('tab2')}>KPIs</button>
        </li>
        <li className="nav-item" role="presentation">
          <button type="button" id="tab3" role="tab" aria-controls="tabpane-tab3" aria-selected={activeTab === 'tab3'} className={`nav-link ${activeTab === 'tab3' ? 'active' : ''}`} onClick={() => setActiveTab('tab3')}>Bid Management</button>
        </li>
      </ul>
      <div className="tab-content">
        <div role="tabpanel" id="tabpane-tab1" aria-labelledby="tab1" className={`fade tab-pane ${activeTab === 'tab1' ? 'show active' : ''}`}>
          <div className="d-flex justify-content-center align-items-center">
            <div className="container-fluid" style={{ maxHeight: '80vh', overflowY: 'auto', padding: '20px' }}>
              <h1>Dashboard - Tab 1</h1>
              <div className="row">
                {renderDropZoneItems(tab1DropZones)}
              </div>
            </div>
          </div>
        </div>
        <div role="tabpanel" id="tabpane-tab2" aria-labelledby="tab2" className={`fade tab-pane ${activeTab === 'tab2' ? 'show active' : ''}`}>
          <div className="d-flex justify-content-center align-items-center">
            <div className="container-fluid" style={{ maxHeight: '80vh', overflowY: 'auto', padding: '20px' }}>
              <h1>Dashboard - Tab 2</h1>
              <div className="row">
                {renderDropZoneItems(tab2DropZones)}
              </div>
            </div>
          </div>
        </div>
        <div role="tabpanel" id="tabpane-tab3" aria-labelledby="tab3" className={`fade tab-pane ${activeTab === 'tab3' ? 'show active' : ''}`}>
          <div className="d-flex justify-content-center align-items-center">
            <div className="container-fluid" style={{ maxHeight: '80vh', overflowY: 'auto', padding: '20px' }}>
              <h1>Dashboard - Tab 3</h1>
              <div className="row">
                {renderDropZoneItems(tab3DropZones)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Mydashboard;
