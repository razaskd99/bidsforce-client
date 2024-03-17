import { formElements } from "../categories";

export default function textArea(editor) {
  editor.BlockManager.add("text-area", {
    label: `               
    <i className="bi bi-textarea-resize fs-4 p-2" title="Text Area"></i>
    <div className="gjs-block-label">Text Area</div>

`,
    category: formElements,
    type: "text-area",
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
      <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
  </div>
</div>




`,
  });
}
