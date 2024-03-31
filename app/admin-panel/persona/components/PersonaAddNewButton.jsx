'use client'
import React,{useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import RfxPrereqInfoModal from "./PersonaInfoModal";



export default function PersonaAddNewButton(props) { 

    const[openPersonaModal, setOpenPersonaModal] = useState(false)

    const handleCancel = ()=>{
        props.openPersonaModal(false)      
    }
 
  return (    
      <>  
        {props.buttonName === "persona" &&
        <button onClick={()=>setOpenPersonaModal(true)} type="button" className="btn btn-sm btn-secondary waves-effect justify-between">
            <span className="tf-icons mdi mdi-plus me-1"></span>New Persona
        </button>}
               
        {openPersonaModal && <RfxPrereqInfoModal 
                                setOpenPersonaModal={setOpenPersonaModal} 
                                buttonType={props.buttonType} 
                                apiBackendURL={props.apiBackendURL}
                                tenantID={props.tenantID}
                                tokens={props.tokens}
                            />}

        
      </>   
  );
};


