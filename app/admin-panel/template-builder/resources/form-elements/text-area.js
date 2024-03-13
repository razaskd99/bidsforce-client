import { formElements } from "../categories";

export default function textArea(editor) {
  editor.BlockManager.add("text-area", {
    label: `               
    <i class="bi bi-textarea-resize fs-4 p-2" title="Text Area"></i>
    <div class="gjs-block-label">Text Area</div>

`,
    category: formElements,
    type: "text-area",
    open: false,

    content: `                      
  

  <div class="container custom-container mt-1">
  <div class="d-flex justify-content-between align-items-start">
      <div class="col-6">
          <span style="font-size: 16px; font-weight: 500;">
Text Here
          </span>
      </div>
      <div class="form-check form-switch col-6">
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
  </div>
</div>




`,
  });
}
