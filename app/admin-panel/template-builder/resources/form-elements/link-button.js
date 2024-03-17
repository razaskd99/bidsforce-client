import { formElements } from "../categories";

export default function linkButton(editor) {
  editor.BlockManager.add("link-button", {
    label: `             
     <i className="bi bi-link-45deg fs-4 p-2" title="Link Button"></i>
    <div className="gjs-block-label ">Link Button</div>

`,
    category: formElements,
    type: "link-button",
    open: false,

    content: `         
    
<style>
    .linkButton {
        width: 150px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        text-transform: uppercase;
        font-size: 14px;
        color: #fff;
        background: darkred;
        padding: 0px;
        display: block;
        border: 0px;
    }

</style>



<div className="container custom-container mt-1">
<div className="d-flex justify-content-between align-items-start">

<a className="linkButton bg-primary" href="##">Button</a>

</div>
</div>



`,
  });
}
