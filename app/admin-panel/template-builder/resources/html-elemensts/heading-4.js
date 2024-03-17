import { htmlElements } from "../categories";

export default function heading4(editor) {
  editor.BlockManager.add("heading-4", {
    label: `                
       <i className="bi bi-list-nested fs-4  p-2" title="Heading 4"></i>
    <div className="gjs-block-label ">H4</div>

`,
    category: htmlElements,
    type: "heading-4",
    open: false,

    content: `         
    
<h4 className="p-2 main-comp">This is Heading Four</h4>

`,
  });
}
