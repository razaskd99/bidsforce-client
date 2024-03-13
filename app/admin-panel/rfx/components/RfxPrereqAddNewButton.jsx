'use client'
import React,{useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import RfxPrereqInfoModal from "./RfxPrereqInfoModal";



export default function RfxPrereqAddNewButton(props) { 

    const[openRfxPrereqModal, setOpenRfxPrereqModal] = useState(false)

    const handleCancel = ()=>{
        props.openRfxPrereqModal(false)      
    }
 
  return (    
      <>  
        {props.buttonName === "rfx_type" &&
        <button onClick={()=>setOpenRfxPrereqModal(true)} type="button" class="btn btn-sm btn-secondary waves-effect justify-between">
            <span class="tf-icons mdi mdi-plus me-1"></span>New Rfx Type
        </button>}

        {props.buttonName === "rfx_content_submission" &&
        <button onClick={()=>setOpenRfxPrereqModal(true)} type="button" class="btn btn-sm btn-secondary waves-effect justify-between">
            <span class="tf-icons mdi mdi-plus me-1"></span>New Rfx Content Submission
        </button>}

        {props.buttonName === "rfx_submission_mode" &&
        <button onClick={()=>setOpenRfxPrereqModal(true)} type="button" class="btn btn-sm btn-secondary waves-effect justify-between">
            <span class="tf-icons mdi mdi-plus me-1"></span>New Rfx Submission Mode
        </button>}

        {props.buttonName === "bid_validity" &&
        <button onClick={()=>setOpenRfxPrereqModal(true)} type="button" class="btn btn-sm btn-secondary waves-effect justify-between">
            <span class="tf-icons mdi mdi-plus me-1"></span>New Bid Validity
        </button>}

        

        {props.buttonName === "rfx_stage" &&
        <button onClick={()=>setOpenRfxPrereqModal(true)} type="button" class="btn btn-sm btn-secondary waves-effect justify-between">
            <span class="tf-icons mdi mdi-plus me-1"></span>New Rfx Stage
        </button>}

        
        {openRfxPrereqModal && <RfxPrereqInfoModal setOpenRfxPrereqModal={setOpenRfxPrereqModal} buttonType={props.buttonType} tablename={props.buttonName}/>}

        
      </>   
  );
};


