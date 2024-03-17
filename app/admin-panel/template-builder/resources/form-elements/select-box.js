import { formElements } from "../categories";

export default function selectBox1(editor) {
  editor.BlockManager.add("select-box-1", {
    label: `              
     <i className="bi bi-menu-button-wide fs-4 p-2" title="Select Box"></i>
    <div className="gjs-block-label">Select Box </div>

`,
    category: formElements,
    type: "select-box-1",
    open: false,

    content: `                      


<div className="container custom-container mt-1">
<div className="d-flex justify-content-between align-items-start">
    <div className="col-6">
        <span style="font-size: 16px; font-weight: 500;">
Text Here
        </span>
    </div>
    <div className="form-check form-switch col-6">
    <select id="" className="form-control select-full">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
        <option>Option 5</option>
    </select>
    </div>
</div>
</div>


`,
  });
}
