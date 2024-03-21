import { allTemplates } from "../categories";

export default function BidReviewChecklist(editor) {
  editor.BlockManager.add("BidReviewChecklist", {
    label: `               
    
    <i class="bi bi-menu-button fs-4 p-2" title="Bid Review Checklist"></i>
    <div class="gjs-block-label ">Bid Review Checklist </div>

`,
    category: allTemplates,
    type: "BidReviewChecklist",
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
            <span class="text-2xl font-bold mb-4 template-heading-color">Bid Review Checklist</span>
            <div class="container mx-auto px-4 py-2 custome-color-card mt-1">
                <div class="flex flex-wrap -mx-2 justify-between">
                    <div class="w-1/2 md:w-1/2 px-2">
                        <h1 class="text-xl font-md text-black ">Is the scope of work clearly understood and defined in proposal?</h1>
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
                        <span class="text-xl font-md text-black">Is a detailed technical table of compliance / Deviation list provided in the proposal?</span>
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
                        <span class="text-xl font-md text-black">Is a detailed technical table of compliance / Deviation list provided in the proposal?</span>
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
                        <span class="text-xl font-md text-black">Have we received all the sub-supplier quotations?</span>
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
                        <span class="text-xl font-md text-black">Are the associated services such as engineering and project management included?</span>
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
                        <span class="text-xl font-md text-black">Are there any technical requirements outside of standard product features and not complied in the proposal?</span>
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
                        <span class="text-xl font-md text-black">Are the site services rates included in the proposal, if applicable?</span>
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
                        <span class="text-xl font-md text-black">Are the delivery basis adequately priced?</span>
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
                        <span class="text-xl font-md text-black">Are the credit terms proposes inline with customer credit limits?</span>
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
                        <span class="text-xl font-md text-black">Is the warranty adequately priced?</span>
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
                        <span class="text-xl font-md text-black">Are our suppliers in agreement to provide back to back warranty?</span>
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
                        <span class="text-xl font-md text-black">Are all the preliminary and detailed review/approvals completed?</span>
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
                        <span class="text-xl font-md text-black">Have the commercial terms been reviewed and responded clearly?</span>
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
                        <span class="text-xl font-md text-black">Does the proposal include deviation / alternal proposal for mutually agreed terms and conditions?</span>
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
                        <span class="text-xl font-md text-black">Are there any extra ordinary commitments made in proposal?</span>
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
                        <span class="text-xl font-md text-black">Is the submission in-line with the contents requested by the customer?</span>
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
