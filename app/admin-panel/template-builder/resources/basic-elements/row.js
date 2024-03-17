export const rowDiv = (blockManager, basicElementsCat) => {
  let compData = {};
  compData = {
    id: "row-div",
    label: `
    
<i className="bi bi-square fs-4 p-2" title="<row> Element"></i>
    <div className="gjs-block-label">Row 
    </div>
     
    `,
    category: basicElementsCat,
    content: `
      <div data-gjs-droppable="true" className="row py-3 main-comp border" style="min-height:50px;">
      </div>
      `,
  };
  blockManager.add("row-div", compData);
};
