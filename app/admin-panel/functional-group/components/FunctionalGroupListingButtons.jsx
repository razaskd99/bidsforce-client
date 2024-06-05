'use client'
import React,{useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";

import { 
  deletePersonaRequest,
  deleteRfxPrereqRequest, 
} from "@/app/api/admin-panel/scripts";
import RfxPrereqInfoModal from "./FunctionalGroupInfoModal";
import FunctionalGroupInfoModal from "./FunctionalGroupInfoModal";
import { deleteFunctionalGroupRequest } from "@/app/api/contacts/scripts";


export default function FunctionalGroupListingButtons(props) {
  const[openModal, setOpenModal] = useState(false);
  const[openFunctionalGroupaModal, setOpenFunctionalGroupModal] = useState(false)
  

  const handleChangeValues = (e)=>{
    let data = {...curentRecord, [e.target.name]: e.target.value}
    setcurentRecord({...data});   
  }

  const handleCancel = (e)=>{
    setOpenModal(false);
  }
 
 
  return (    
      <>  
        <div className="dropdown">                          
            <button 
                onClick={(e)=>deleteFunctionalGroupRequest(e, props.id)}
                type="button" 
                className="btn btn-xs btn-primary waves-effect mr-2 ">
                <span className="tf-icons mdi mdi-delete me-1 b"></span> Delete
            </button>                         
            <button 
                onClick={() => setOpenFunctionalGroupModal(true)} 
                type="button" 
                className="btn btn-xs btn-outline-primary waves-effect ">
                <span className="tf-icons mdi mdi-delete-outline me-1 b"></span> Update
            </button><br></br>
        </div>

        {openFunctionalGroupaModal && <FunctionalGroupInfoModal 
                                  setOpenFunctionalGroupModal={setOpenFunctionalGroupModal} 
                                  modalData={props.propsData ? props.propsData : {}} 
                                  modalType="update" 
                                  id={props.id}
                                  apiBackendURL={props.apiBackendURL}
                                  tenantID={props.tenantID}
                                  tokens={props.tokens}
                                />}
        
      </>   
  );
};


