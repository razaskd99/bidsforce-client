import { htmlElements } from "../categories";

export default function TextElement(editor) {
  editor.BlockManager.add("TextElement", {
    label: `               
    <i className="fa fa-text fs-4  p-2" title="Text" ></i>
    <div className="gjs-block-label ">Text</div>

`,
    category: htmlElements,
    type: "text",
    open: false,
    content: `         

    <p className="w-100" >Type your Text here </p>

`,
  });
}
