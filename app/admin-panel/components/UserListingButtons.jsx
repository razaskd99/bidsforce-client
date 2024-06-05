"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  deleteUserRequest,
  updateUserRequest,
} from "@/app/api/admin-panel/scripts";
import UserInfoModal from "../(auth)/users/components/UserInfoModal";


export default function UserListingButtons(props) {
  const [openUserModal, setOpenUserModal] = useState(false);

  const handleOpen = ()=>{
    setOpenUserModal(true)
  }

  const handleClose = ()=>{
    setOpenUserModal(false)
  }

  


  return (
    <>
      <div className="dropdown">
        <button
          onClick={(e) =>
            deleteUserRequest(
              e,
              props?.modalData?.user_id,
              props.apiBackendURL,
              props.accessToken,
              props.tenantID
            )
          }
          type="button"
          className="btn btn-xs btn-primary waves-effect mr-2 "
        >
          <span className="tf-icons mdi mdi-delete me-1 b"></span> Delete
        </button>
        <button
          onClick={handleOpen}
          type="button"
          className="btn btn-xs btn-outline-primary waves-effect "
        >
          <span className="tf-icons mdi mdi-pencil-outline me-1 b"></span>{" "}
          Update
        </button>
        <br></br>
      </div>

      
      {openUserModal && 
      <UserInfoModal 
        isOpen={openUserModal} 
        handleClose={handleClose} 
        modalData={props.modalData} 
        modalType={"edit"}
      />}
          
          
    </>
  );
}
