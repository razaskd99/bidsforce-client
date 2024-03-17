import { formElements } from "../categories";

export default function radioButton(editor) {
  editor.BlockManager.add("radio-button", {
    label: `               
    <i className="bi bi-ui-radios fs-4 p-2" title="Radio Button"></i>
    <div className="gjs-block-label">Radio Button</div>

`,
    category: formElements,
    type: "radio-button",
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


    <div className="form-check">
    <input className="form-check-input" type="radio" name="" id="">
    <label className="form-check-label" for="defaultCheck1">
      Option 1
    </label>
  </div>



<div className="form-check">
<input className="form-check-input" type="radio" name="" id="">
<label className="form-check-label" for="defaultCheck1">
  Option 2
  </label>
</div>


<div className="form-check">
<input className="form-check-input" type="radio" name="" id="">
<label className="form-check-label" for="defaultCheck1">
  Option 3
  </label>
</div>

<div className="form-check">
<input className="form-check-input" type="radio" name="" id="">
<label className="form-check-label" for="defaultCheck1">
  Option 4
  </label>
</div>





  </div>
</div>
</div>

`,
  });
}
