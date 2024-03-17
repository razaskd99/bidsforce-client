import { formElements } from "../../../components/custom/categories";

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
<div className="form-check">
  <input className="form-check-input" type="radio" name="" id="">
  <label className="form-check-label" for="">
    Default radio
</div>


`,
  });
}
