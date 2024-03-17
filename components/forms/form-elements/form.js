import { formElements } from "../../../components/custom/categories";

export default function form1(editor) {
  editor.BlockManager.add("form-1", {
    label: `          
<i className="bi bi-border-width fs-4 p-2" title="Form Element"></i>
    <div className="gjs-block-label ">Form </div>

`,
    category: formElements,
    type: "form-1",
    open: false,

    content: `                      
<form data-gjs-name"Form" className="builderForm main-comp">
</form>
  <style>
.builderForm{min-height:100px;}
</style>


`,
  });
}
