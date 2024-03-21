import { allTemplates } from "../categories";

export default function CommercialDeliverables(editor) {
  editor.BlockManager.add("CommercialDeliverables", {
    label: `               
    
    <i class="bi bi-menu-button fs-4 p-2" title="Commercial Deliverables"></i>
    <div class="gjs-block-label ">Commercial Deliverables </div>

`,
    category: allTemplates,
    type: "CommercialDeliverables",
    open: false,

    content: `  
    
    <script src="https://cdn.tailwindcss.com"></script>




    <style>
        body {
            background-color: #eeeeee;
        }
    
        .background-change {
            background-color: #f6f6f8 !important;
        }
    
        .custome-color-card {
            background-color: #ffffff !important;
        }
    
        .template-heading-color {
            color: #848c98 !important;
        }
    </style>
    
    <div class="mx-auto max-w-7xl px-4 mt-8 dyn-template ">
        <!-- Main Heading -->
        <span class="text-2xl font-md mb-4 template-heading-color">Template:Commercial Deliverables</span>
        <div class="container mx-auto px-4 py-2 custome-color-card mt-1">
            <div class="flex flex-wrap -mx-2 justify-between">
                <div class="w-1/2 md:w-1/2 px-2">
                    <h1 class="text-lg font-medium text-black ">Basic Of Proposal</h1>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
                    <label class="relative inline-block w-14 h-8 cursor-pointer">
                        <!-- Checkbox -->
                        <input type="checkbox" class="sr-only peer" id="toggleSwitch">
                        <!-- Line -->
                        <span
                            class="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition duration-300"></span>
                        <!-- Dot -->
                        <span
                            class="absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
                    </label>
    
                    <script>
                        document.getElementById('toggleSwitch').addEventListener('change', function () {
                            if (this.checked) {
                                console.log('Switch is on');
                            } else {
                                console.log('Switch is off');
                            }
                        });
                    </script>
                </div>
            </div>
        </div>
    
        <div class="container custome-color-card  mx-auto px-4 py-2  mt-1">
            <div class="flex flex-wrap -mx-2 justify-between">
                <div class="w-1/2 md:w-1/2 px-2">
                    <h1 class="text-lg font-medium text-black">Executive Summary</h1>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
                    <label class="relative inline-block w-14 h-8 cursor-pointer">
                        <!-- Checkbox -->
                        <input type="checkbox" class="sr-only peer" id="toggleSwitch">
                        <!-- Line -->
                        <span
                            class="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition duration-300"></span>
                        <!-- Dot -->
                        <span
                            class="absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
                    </label>
    
                    <script>
                        document.getElementById('toggleSwitch').addEventListener('change', function () {
                            if (this.checked) {
                                console.log('Switch is on');
                            } else {
                                console.log('Switch is off');
                            }
                        });
                    </script>
                </div>
            </div>
        </div>
    
        <div class="container custome-color-card  mx-auto px-4 py-2  mt-1">
            <div class="flex flex-wrap -mx-2 justify-between">
                <div class="w-1/2 md:w-1/2 px-2">
                    <h1 class="text-lg font-medium text-black">Table Of Content</h1>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
                    <label class="relative inline-block w-14 h-8 cursor-pointer">
                        <!-- Checkbox -->
                        <input type="checkbox" class="sr-only peer" id="toggleSwitch">
                        <!-- Line -->
                        <span
                            class="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition duration-300"></span>
                        <!-- Dot -->
                        <span
                            class="absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
                    </label>
                    <script>
                        document.getElementById('toggleSwitch').addEventListener('change', function () {
                            if (this.checked) {
                                console.log('Switch is on');
                            } else {
                                console.log('Switch is off');
                            }
                        });
                    </script>
                </div>
            </div>
        </div>
    
        <div class="container custome-color-card  mx-auto px-4 py-2  mt-1">
            <div class="flex flex-wrap -mx-2 justify-between">
                <div class="w-1/2 md:w-1/2 px-2">
                    <h1 class="text-lg font-medium text-black">Commercial Schedule
                    </h1>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
                    <label class="relative inline-block w-14 h-8 cursor-pointer">
                        <!-- Checkbox -->
                        <input type="checkbox" class="sr-only peer" id="toggleSwitch">
                        <!-- Line -->
                        <span
                            class="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition duration-300"></span>
                        <!-- Dot -->
                        <span
                            class="absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
                    </label>
                    <script>
                        document.getElementById('toggleSwitch').addEventListener('change', function () {
                            if (this.checked) {
                                console.log('Switch is on');
                            } else {
                                console.log('Switch is off');
                            }
                        });
                    </script>
                </div>
            </div>
        </div>
    
        <div class="container custome-color-card  mx-auto px-4 py-2  mt-1">
            <div class="flex flex-wrap -mx-2 justify-between">
                <div class="w-1/2 md:w-1/2 px-2">
                    <h1 class="text-lg font-medium text-black">RFX Compliance and Deviation
                    </h1>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
                    <label class="relative inline-block w-14 h-8 cursor-pointer">
                        <!-- Checkbox -->
                        <input type="checkbox" class="sr-only peer" id="toggleSwitch">
                        <!-- Line -->
                        <span
                            class="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition duration-300"></span>
                        <!-- Dot -->
                        <span
                            class="absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
                    </label>
                    <script>
                        document.getElementById('toggleSwitch').addEventListener('change', function () {
                            if (this.checked) {
                                console.log('Switch is on');
                            } else {
                                console.log('Switch is off');
                            }
                        });
                    </script>
                </div>
            </div>
        </div>
    
        <div class="container custome-color-card  mx-auto px-4 py-2  mt-1">
            <div class="flex flex-wrap -mx-2 justify-between">
                <div class="w-1/2 md:w-1/2 px-2">
                    <h1 class="text-lg font-medium text-black">T&Cs Deviations
                    </h1>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
                    <label class="relative inline-block w-14 h-8 cursor-pointer">
                        <!-- Checkbox -->
                        <input type="checkbox" class="sr-only peer" id="toggleSwitch">
                        <!-- Line -->
                        <span
                            class="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition duration-300"></span>
                        <!-- Dot -->
                        <span
                            class="absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
                    </label>
                    <script>
                        document.getElementById('toggleSwitch').addEventListener('change', function () {
                            if (this.checked) {
                                console.log('Switch is on');
                            } else {
                                console.log('Switch is off');
                            }
                        });
                    </script>
                </div>
            </div>
        </div>
    
        <div class="container custome-color-card  mx-auto px-4 py-2  mt-1">
            <div class="flex flex-wrap -mx-2 justify-between">
                <div class="w-1/2 md:w-1/2 px-2">
                    <h1 class="text-lg font-medium text-black">Bank Guarantee Formats </h1>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
                    <label class="relative inline-block w-14 h-8 cursor-pointer">
                        <!-- Checkbox -->
                        <input type="checkbox" class="sr-only peer" id="toggleSwitch">
                        <!-- Line -->
                        <span
                            class="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition duration-300"></span>
                        <!-- Dot -->
                        <span
                            class="absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
                    </label>
                    <script>
                        document.getElementById('toggleSwitch').addEventListener('change', function () {
                            if (this.checked) {
                                console.log('Switch is on');
                            } else {
                                console.log('Switch is off');
                            }
                        });
                    </script>
                </div>
            </div>
        </div>
    
        <div class="container custome-color-card  mx-auto px-4 py-2  mt-1">
            <div class="flex flex-wrap -mx-2 justify-between">
                <div class="w-1/2 md:w-1/2 px-2">
                    <h1 class="text-lg font-medium text-black">Spare Parts Price List</h1>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
                    <label class="relative inline-block w-14 h-8 cursor-pointer">
                        <!-- Checkbox -->
                        <input type="checkbox" class="sr-only peer" id="toggleSwitch">
                        <!-- Line -->
                        <span
                            class="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition duration-300"></span>
                        <!-- Dot -->
                        <span
                            class="absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
                    </label>
                    <script>
                        document.getElementById('toggleSwitch').addEventListener('change', function () {
                            if (this.checked) {
                                console.log('Switch is on');
                            } else {
                                console.log('Switch is off');
                            }
                        });
                    </script>
                </div>
            </div>
        </div>
    
        <div class="container custome-color-card  mx-auto px-4 py-2  mt-1">
            <div class="flex flex-wrap -mx-2 justify-between">
                <div class="w-1/2 md:w-1/2 px-2">
                    <h1 class="text-lg font-medium text-black">Un-Prices Commercial Proposal</h1>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
                    <label class="relative inline-block w-14 h-8 cursor-pointer">
                        <!-- Checkbox -->
                        <input type="checkbox" class="sr-only peer" id="toggleSwitch">
                        <!-- Line -->
                        <span
                            class="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition duration-300"></span>
                        <!-- Dot -->
                        <span
                            class="absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
                    </label>
                    <script>
                        document.getElementById('toggleSwitch').addEventListener('change', function () {
                            if (this.checked) {
                                console.log('Switch is on');
                            } else {
                                console.log('Switch is off');
                            }
                        });
                    </script>
                </div>
            </div>
        </div>
    </div>
`,
  });
}
