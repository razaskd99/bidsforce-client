import { allTemplates } from "../categories";

export default function PlaceHolderTemplate(editor) {
  editor.BlockManager.add("PlaceHolderTemplate", {
    label: `               
    
    <i class="bi bi-menu-button fs-4 p-2" title="Place Holder"></i>
    <div class="gjs-block-label ">Place Holder </div>

`,
    category: allTemplates,
    type: "PlaceHolderTemplate",
    open: false,

    content: `  
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

    <style>
        body,
        html {
            height: 100%;
            margin: 0;
            padding: 0;
           background-color: #f6f6f6;
        }

        .custom-container {
            background-color: white;
            padding: 10px;
            margin: 0 auto;
            /* Center the container */
        }

        .circle {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            font-size: 24px;
            font-weight: bold;
            background-color: #24b8d8;

        }
    </style>
    <div>

              
        <!-- table content -->
        <div class="container custom-container mt-2">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <span style="font-size: 16px; font-weight: 500;">
                        Place Holder Text.
                    </span>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked>
                </div>
            </div>
        </div>
        <!--  -->
        </div>


        <!-- Bootstrap JS and dependencies -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>


`,
  });
}
