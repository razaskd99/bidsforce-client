import { formElements } from "../categories";

export default function input1(editor) {
  editor.BlockManager.add("input-1", {
    label: `           
    
    <i className="bi bi-input-cursor-text fs-4 p-2" title="Input Text Element"></i>
    <div className="gjs-block-label ">Input Text </div>

`,
    category: formElements,
    type: "input-1",
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
      <input name="" id="" type="text" className="form-control input.builderinputfull"   placeholder="">
      </div>
  </div>
</div>



`,
  });
}
