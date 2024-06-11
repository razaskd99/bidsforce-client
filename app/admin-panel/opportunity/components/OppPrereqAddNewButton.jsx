'use client'
import React,{useState, useEffect} from "react";
import OppPrereqInfoModal from "./OppPrereqInfoModal";



export default function OppPrereqAddNewButton(props) { 

    const[openOppPrereqModal, setOpenOppPrereqModal] = useState(false)

    // const handleCancel = ()=>{
    //     props.openRfxPrereqModal(false)      
    // }
 
  return (    
      <>
        {props.buttonName === "opportunity_sales_stages" &&
        <button onClick={()=>setOpenOppPrereqModal(true)} type="button" className="text-md text-[#26BADA] flex items-center gap-1 cursor-pointer">
            <span className="tf-icons mdi mdi-plus me-1"></span>Opportunity Sales Stages
        </button>}

        {props.buttonName === "sales_pursuit_progress" &&
        <button onClick={()=>setOpenOppPrereqModal(true)} type="button" className="text-md text-[#26BADA] flex items-center gap-1 cursor-pointer">
            <span className="tf-icons mdi mdi-plus me-1"></span>Sales Pursuit Progress
        </button>}

        {props.buttonName === "business_line" &&
        <button onClick={()=>setOpenOppPrereqModal(true)} type="button" className="text-md text-[#26BADA] flex items-center gap-1 cursor-pointer">
            <span className="tf-icons mdi mdi-plus me-1"></span>Business Line
        </button>}       

       {props.buttonName === "opp_committed_for_sales_budget" &&
        <button onClick={()=>setOpenOppPrereqModal(true)} type="button" className="text-md text-[#26BADA] flex items-center gap-1 cursor-pointer">
            <span className="tf-icons mdi mdi-plus me-1"></span>Opportunity Committed For Sales Budget
        </button>}

        {props.buttonName === "bidding_unit" &&
        <button onClick={()=>setOpenOppPrereqModal(true)} type="button" className="text-md text-[#26BADA] flex items-center gap-1 cursor-pointer">
            <span className="tf-icons mdi mdi-plus me-1"></span>Bidding Unit
        </button>}

        {props.buttonName === "project_type" &&
        <button onClick={()=>setOpenOppPrereqModal(true)} type="button" className="text-md text-[#26BADA] flex items-center gap-1 cursor-pointer">
            <span className="tf-icons mdi mdi-plus me-1"></span>Project Type
        </button>}

        {props.buttonName === "opportunity_type" &&
        <button onClick={()=>setOpenOppPrereqModal(true)} type="button" className="text-md text-[#26BADA] flex items-center gap-1 cursor-pointer">
            <span className="tf-icons mdi mdi-plus me-1"></span>Opportunity Type
        </button>}

        {props.buttonName === "opportunity_industry" &&
        <button onClick={()=>setOpenOppPrereqModal(true)} type="button" className="text-md text-[#26BADA] flex items-center gap-1 cursor-pointer">
            <span className="tf-icons mdi mdi-plus me-1"></span>Opportunity Industry
        </button>}
        
        
        {openOppPrereqModal && <OppPrereqInfoModal 
                                setOpenOppPrereqModal={setOpenOppPrereqModal} 
                                buttonType={props.buttonType} 
                                tablename={props.buttonName}
                            />}

        
      </>   
  );
};


