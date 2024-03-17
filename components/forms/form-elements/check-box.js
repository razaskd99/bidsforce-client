import { formElements } from "../categories";

export default function checkBox(editor) {
  editor.BlockManager.add("check-box", {
    label: `               
     <i className="bi bi-ui-checks fs-4 p-2" title="Check Box"></i>
    <div className="gjs-block-label ">Check Box</div>

`,
    category: formElements,
    type: "check-box",
    open: false,

    content: `                      
<div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="">
  <label className="form-check-label" for="defaultCheck1">
    Default checkbox
  </label>
</div>
  <style>
        p.checkbox-p{font-size:15px;color:#222;text-transform: capitalize;margin-bottom: 0px;padding-left: 0px;font-weight: 500;}
        label.form-check-label{font-size:14px;color:#222;text-transform: capitalize;}

</style>


`,
  });
}
