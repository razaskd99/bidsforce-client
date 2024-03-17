import { htmlElements } from "../categories";

export default function linkElement(editor) {
  editor.BlockManager.add("linkElement", {
    label: `               
    <i className="fa fa-link fs-4  p-2" title="Link"></i>
    <div className="gjs-block-label ">Link</div>

`,
    category: htmlElements,
    type: "link",
    open: false,
    content: `         

    <a href="" className="text-decoration-none " >Link Text </a>

`,
  });
}
