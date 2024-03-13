import { formElements } from "../categories";

export default function selectBox1(editor) {
  editor.BlockManager.add("select-box-1", {
    label: `              
     <i class="bi bi-menu-button-wide fs-4 p-2" title="Select Box"></i>
    <div class="gjs-block-label">Select Box </div>

`,
    category: formElements,
    type: "select-box-1",
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
    <select id="" class="form-control select-full">
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
