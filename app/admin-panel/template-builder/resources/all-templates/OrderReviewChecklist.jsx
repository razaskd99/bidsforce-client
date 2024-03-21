import { allTemplates } from "../categories";

export default function OrderReviewChecklist(editor) {
  editor.BlockManager.add("OrderReviewChecklist", {
    label: `               
    
    <i class="bi bi-menu-button fs-4 p-2" title="Order Review Checklist"></i>
    <div class="gjs-block-label ">Order Review Checklist </div>

`,
    category: allTemplates,
    type: "OrderReviewChecklist",
    open: false,

    content: `  
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
<script src="https://cdn.tailwindcss.com"></script>

    <div class="mx-auto max-w-7xl px-4 mt-8">
        <!-- Main Heading -->
        <span class="text-2xl font-bold mb-4 template-heading-color">Order Review Checklist</span>
        <div class="container mx-auto px-4 py-2 custome-color-card mt-1">
            <div class="flex flex-wrap -mx-2 justify-between">
                <div class="w-1/2 md:w-1/2 px-2">
                    <h1 class="text-xl font-md text-black ">Is the Order Value and Currency Inline with the latest Quotation/Proposal?</h1>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
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
                    <span class="text-xl font-md text-black">Is the order amount with the credit limit of the customer?</span>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
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
                    <span class="text-xl font-md text-black">Does the customer have a good payment record?</span>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
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
                    <span class="text-xl font-md text-black">Is the latest quotation/proposal referred as basis of scope in the Purchase Order?</span>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
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
                    <span class="text-xl font-md text-black">Are all the Technical/Commercial or any other clarifications captured/ Referred in the Purchase Order?</span>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
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
                    <span class="text-xl font-md text-black">Are unit rates for associated services agreed and referred in case applicable?</span>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
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
                    <span class="text-xl font-md text-black">Are the delivery terms (Time, basis, mode) inline with the latest Quotation/Proposal?</span>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
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
                    <span class="text-xl font-md text-black">Are the payment milestones as per the latest Quotation/Proposal?</span>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
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
                    <span class="text-xl font-md text-black">Is the warranty period as per latest Quotation/Proposal?</span>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
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
                    <span class="text-xl font-md text-black">In case any sub-suppliers are involved, is the warranty period acceptable to the sub-suppliers?</span>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
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
                    <span class="text-xl font-md text-black">Are the liquidated damages conditions within the company guidelines and limited?</span>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
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
                    <span class="text-xl font-md text-black">Are the latest agreed terms and conditions referred in the Purchase Order?</span>
                </div>
                <div class="w-1/2 md:w-1/2 px-2 flex justify-between">
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
