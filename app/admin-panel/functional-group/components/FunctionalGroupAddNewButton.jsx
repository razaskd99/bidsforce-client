'use client'
import React,{useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import RfxPrereqInfoModal from "./FunctionalGroupInfoModal";



export default function FunctionalGroupAddNewButton(props) { 
    const[openFunctionalGroupaModal, setOpenFunctionalGroupModal] = useState(false)

    const handleCancel = ()=>{
        props.openPersonaModal(false)      
    }
 
  return (    
      <>  
        {props.buttonName === "functional group" &&
        <button onClick={()=>setOpenFunctionalGroupModal(true)} type="button" className="text-md text-[#26BADA] flex items-center gap-1 cursor-pointer">
            <span className="tf-icons mdi mdi-plus me-1"></span>New Functional Group
        </button>}
               
        {openFunctionalGroupaModal && <RfxPrereqInfoModal 
                                setOpenFunctionalGroupModal={setOpenFunctionalGroupModal} 
                                buttonType={props.buttonType} 
                                apiBackendURL={props.apiBackendURL}
                                tenantID={props.tenantID}
                                tokens={props.tokens}
                            />}

        
      </>   
  );
};


