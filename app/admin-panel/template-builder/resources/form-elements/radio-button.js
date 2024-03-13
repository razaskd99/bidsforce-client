import { formElements } from "../categories";

export default function radioButton(editor) {
  editor.BlockManager.add("radio-button", {
    label: `               
    <i class="bi bi-ui-radios fs-4 p-2" title="Radio Button"></i>
    <div class="gjs-block-label">Radio Button</div>

`,
    category: formElements,
    type: "radio-button",
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


    <div class="form-check">
    <input class="form-check-input" type="radio" name="" id="">
    <label class="form-check-label" for="defaultCheck1">
      Option 1
    </label>
  </div>



<div class="form-check">
<input class="form-check-input" type="radio" name="" id="">
<label class="form-check-label" for="defaultCheck1">
  Option 2
  </label>
</div>


<div class="form-check">
<input class="form-check-input" type="radio" name="" id="">
<label class="form-check-label" for="defaultCheck1">
  Option 3
  </label>
</div>

<div class="form-check">
<input class="form-check-input" type="radio" name="" id="">
<label class="form-check-label" for="defaultCheck1">
  Option 4
  </label>
</div>





  </div>
</div>
</div>

`,
  });
}
