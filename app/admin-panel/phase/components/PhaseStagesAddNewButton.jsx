'use client'
import React,{useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import PhaseStageInfoModal from "./PhaseStagesInfoModal";



export default function PhaseStagesAddNewButton(props) { 

    const[openPhaseStageModal, setOpenPhaseStageModal] = useState(false)

    const handleCancel = ()=>{
        props.openPhaseStageModal(false)      
    }
 
  return (    
      <div className="flex">  
        <div class="flex items-center mr-5">
            <input id="radioCustom" type="radio" name="radioCustom" value="Standard" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" checked />
            <label for="radioCustom" class="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
            Standard
            </label>
        </div>
        <div class="flex items-center mr-5">
            <input id="radioCustom" type="radio" name="radioCustom" disabled={props.customLayout} value="Custom" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
            <label for="radioCustom" class="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Custom
            </label>
        </div>

        {props.typeName === "rfx stage" &&
        <button onClick={props.customLayout ? ()=>setOpenPhaseStageModal(true) : ()=>alert("This is a premium functionality.")} disabled={props.customLayout} type="button" class="btn btn-sm btn-secondary waves-effect justify-between">
            <span class="tf-icons mdi mdi-plus me-1"></span>New Rfx Stage
        </button>}

        {props.typeName === "bid stage" &&
        <button onClick={props.customLayout ? ()=>setOpenPhaseStageModal(true) : ()=>alert("This is a premium functionality.")} disabled={props.customLayout} type="button" class="btn btn-sm btn-secondary waves-effect justify-between">
            <span class="tf-icons mdi mdi-plus me-1"></span>New Bid Stage
        </button>}

        
        
        {openPhaseStageModal && <PhaseStageInfoModal setOpenPhaseStageModal={setOpenPhaseStageModal} buttonType={props.buttonType} typeName={props.typeName} customLayout={props.customLayout}/>}

        
      </div>   
  );
};


