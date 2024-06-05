'use client'
import React,{useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import AccountTypeInfoModal from "./AccountTypeInfoModal";



export default function AccountTypeAddNewButton(props) { 

    const[openAccountTypeModal, setOpenAccountTypeModal] = useState(false)

    const handleCancel = ()=>{
        props.openAccountTypeModal(false)      
    }
 
  return (    
      <>  
        {props.buttonName === "AccountType" &&
        <button onClick={()=>setOpenAccountTypeModal(true)} type="button" className="text-md text-[#26BADA] flex items-center gap-1 cursor-pointer">
            <span className="tf-icons mdi mdi-plus me-1"></span>New Account Type
        </button>}
               
        {openAccountTypeModal && <AccountTypeInfoModal 
                                setOpenAccountTypeModal={setOpenAccountTypeModal} 
                                buttonType={props.buttonType} 
                                apiBackendURL={props.apiBackendURL}
                                tenantID={props.tenantID}
                                tokens={props.tokens}
                            />}

        
      </>   
  );
};


