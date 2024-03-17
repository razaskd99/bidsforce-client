import { htmlElements } from "../../../components/custom/categories";

export default function bulletListfullwidth(editor) {
  editor.BlockManager.add("bullet-list-full-width", {
    label: `               
    <i className="bi bi-list-ul fs-4  p-2" title="Bullet List Full Width"></i>
    <div className="gjs-block-label ">Bullet List Wide</div>

`,
    category: htmlElements,
    type: "bullet-list-full-width",
    open: false,

    content: `         
    
<ul data-gjs-name="Full Width Bullet Lists" className="bulletList-full w-100 main-comp">
    <li className="bulletList-full-li">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum is simply dummy text. Lorem
        Ipsum is simply dummy text
    </li>
    <li className="bulletList-full-li">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum is simply dummy text. Lorem
        Ipsum is simply dummy text
    </li>
    <li className="bulletList-full-li">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum is simply dummy text. Lorem
        Ipsum is simply dummy text
    </li>
    <li className="bulletList-full-li">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum is simply dummy text. Lorem
        Ipsum is simply dummy text
    </li>
    <li className="bulletList-full-li">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum is simply dummy text. Lorem
        Ipsum is simply dummy text
    </li>

</ul>


<style>
    .bulletList-full {
        box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
        padding: 15px;
        padding-left:30px;
    }

    .bulletList-full-li {
        font-size: 15px;
        color: #333;
        padding: 5px;
    }

</style>

`,
  });
}
