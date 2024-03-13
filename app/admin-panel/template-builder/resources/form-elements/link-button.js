import { formElements } from "../categories";

export default function linkButton(editor) {
  editor.BlockManager.add("link-button", {
    label: `             
     <i class="bi bi-link-45deg fs-4 p-2" title="Link Button"></i>
    <div class="gjs-block-label ">Link Button</div>

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



<div class="container custom-container mt-1">
<div class="d-flex justify-content-between align-items-start">

<a class="linkButton bg-primary" href="##">Button</a>

</div>
</div>



`,
  });
}
