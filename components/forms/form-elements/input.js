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
<style>
    label.inputlabel{font-size:14px;color:#222;text-transform: capitalize;}
    input.builderinputfull{font-size:14px;height:40px;border:1px solid #444;line-height: 40px;padding:0 15px;text-transform: capitalize;color: #222;width: 100%;}
</style>
  <div className="form-group p-2">
    <label className="label.inputlabel">Label Text</label>
    <input name="" id="" type="email" className="form-control input.builderinputfull"   placeholder="">
  </div>


`,
  });
}
