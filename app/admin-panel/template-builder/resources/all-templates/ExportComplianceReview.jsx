import { allTemplates } from "../categories";

export default function ExportComplianceCheck(editor) {
  editor.BlockManager.add("ExportComplianceCheck", {
    label: `               
    
    <i class="bi bi-menu-button fs-4 p-2" title="Export Compliance Check"></i>
    <div class="gjs-block-label ">Export Compliance Check </div>

`,
    category: allTemplates,
    type: "ExportComplianceCheck",
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
    
    
        <div class="mx-auto max-w-7xl px-4 mt-8">
            <!-- Main Heading -->
            <span class="text-2xl font-bold mb-4 template-heading-color">Export Compliance Check</span>
            <div class="container mx-auto px-4 py-2 custome-color-card mt-1">
                <div class="flex flex-wrap -mx-2 justify-between">
                    <div class="w-1/2 md:w-1/2 px-2">
                        <h1 class="text-xl font-md text-black ">The product's capabilities do not fit the buyer's line of business such as Gas Analyser for a real estate business.</h1>
                    </div>
                    <div class="w-1/2 md:w-1/2 px-2 flex justify-end">
                        <label class="relative inline-block w-14 h-8 cursor-pointer">
                            <!-- Checkbox -->
                            <input type="checkbox" class="sr-only peer" id="toggleSwitch">
                            <!-- Line -->
                            <span class="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition duration-300"></span>
                            <!-- Dot -->
                            <span class="absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
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
                        <span class="text-xl font-md text-black">The customer is unfamiliar with the product's performance characteristics but still wants the product.</span>
                    </div>
                    <div class="w-1/2 md:w-1/2 px-2 flex justify-end">
                        <label class="relative inline-block w-14 h-8 cursor-pointer">
                            <!-- Checkbox -->
                            <input type="checkbox" class="sr-only peer" id="toggleSwitch">
                            <!-- Line -->
                            <span class="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition duration-300"></span>
                            <!-- Dot -->
                            <span class="absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
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
                        <span class="text-xl font-md text-black">The item ordered is incompatible with the technical level of the country to which it is being shipped, such as semiconductor manufacturing equipment being shipped to a country that has no electronics industry.</span>
                    </div>
                    <div class="w-1/2 md:w-1/2 px-2 flex justify-end">
                        <label class="relative inline-block w-14 h-8 cursor-pointer">
                            <!-- Checkbox -->
                            <input type="checkbox" class="sr-only peer" id="toggleSwitch">
                            <!-- Line -->
                            <span class="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition duration-300"></span>
                            <!-- Dot -->
                            <span class="absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
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
                        <span class="text-xl font-md text-black">Delivery dates are vague, or deliveries are planned for out-of-the-way destinations.</span>
                    </div>
                    <div class="w-1/2 md:w-1/2 px-2 flex justify-end">
                        <label class="relative inline-block w-14 h-8 cursor-pointer">
                            <!-- Checkbox -->
                            <input type="checkbox" class="sr-only peer" id="toggleSwitch">
                            <!-- Line -->
                            <span class="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition duration-300"></span>
                            <!-- Dot -->
                            <span class="absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
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
                        <span class="text-xl font-md text-black">The shipping route is abnormal for the product and destination.</span>
                    </div>
                    <div class="w-1/2 md:w-1/2 px-2 flex justify-end">
                        <label class="relative inline-block w-14 h-8 cursor-pointer">
                            <!-- Checkbox -->
                            <input type="checkbox" class="sr-only peer" id="toggleSwitch">
                            <!-- Line -->
                            <span class="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition duration-300"></span>
                            <!-- Dot -->
                            <span class="absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
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
                        <span class="text-xl font-md text-black">Packaging is inconsistent with the stated method of shipment or destination.</span>
                    </div>
                    <div class="w-1/2 md:w-1/2 px-2 flex justify-end">
                        <label class="relative inline-block w-14 h-8 cursor-pointer">
                            <!-- Checkbox -->
                            <input type="checkbox" class="sr-only peer" id="toggleSwitch">
                            <!-- Line -->
                            <span class="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition duration-300"></span>
                            <!-- Dot -->
                            <span class="absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
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
                        <span class="text-xl font-md text-black">The customer or its address is similar to one of the parties found on the Commerce Department's (BIS) list of denied persons.</span>
                    </div>
                    <div class="w-1/2 md:w-1/2 px-2 flex justify-end">
                        <label class="relative inline-block w-14 h-8 cursor-pointer">
                            <!-- Checkbox -->
                            <input type="checkbox" class="sr-only peer" id="toggleSwitch">
                            <!-- Line -->
                            <span class="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition duration-300"></span>
                            <!-- Dot -->
                            <span class="absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
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
                        <span class="text-xl font-md text-black">The customer has little or no business background.</span>
                    </div>
                    <div class="w-1/2 md:w-1/2 px-2 flex justify-end">
                        <label class="relative inline-block w-14 h-8 cursor-pointer">
                            <!-- Checkbox -->
                            <input type="checkbox" class="sr-only peer" id="toggleSwitch">
                            <!-- Line -->
                            <span class="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition duration-300"></span>
                            <!-- Dot -->
                            <span class="absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
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
