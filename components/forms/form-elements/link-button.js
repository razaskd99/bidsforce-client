import { formElements } from "../../../components/custom/categories";

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
<a className="linkButton" href="##">Button</a>

`,
  });
}
