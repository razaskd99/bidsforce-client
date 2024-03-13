import { formElements } from "../categories";

export default function input1(editor) {
  editor.BlockManager.add("input-1", {
    label: `           
    
    <i class="bi bi-input-cursor-text fs-4 p-2" title="Input Text Element"></i>
    <div class="gjs-block-label ">Input Text </div>

`,
    category: formElements,
    type: "input-1",
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
      <input name="" id="" type="text" class="form-control input.builderinputfull"   placeholder="">
      </div>
  </div>
</div>



`,
  });
}
