import { htmlElements } from "../categories";

export default function imageElement(editor) {
  editor.BlockManager.add("imageElement", {
    label: `               
    <i className="fa fa-image fs-4  p-2" title="Image "></i>
    <div className="gjs-block-label ">Image </div>

`,
    category: htmlElements,
    type: "image",
    open: false,
    content: `         
 <img src='' name='' alt='' className='img-fluid'  />   

`,
  });
}
