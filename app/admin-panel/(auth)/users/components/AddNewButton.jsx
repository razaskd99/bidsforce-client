"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import UserInfoModal from "./UserInfoModal";

export default function AddNewButton(props) {
  const [openUserModal, setOpenUserModal] = useState(false);

  const handleOpen = ()=>{
    setOpenUserModal(true)
  }

  const handleClose = ()=>{
    setOpenUserModal(false)
  }

  return (
    <>
      {
        <button
          onClick={handleOpen}
          type="button"
          className="btn btn-sm btn-secondary waves-effect justify-between"
        >
          <span className="tf-icons mdi mdi-plus me-1"></span>New User
        </button>
      } 

      {openUserModal && (
        <UserInfoModal
          isOpen={openUserModal}
          handleClose={handleClose}
          buttonType={props.buttonType}
          tenantDetails={props.tenantDetails}
          functionaGroupRecs={props.functionaGroupRecs} 
          usersRecords={props.usersRecords}
        />
      )}
    </>
  );
}
