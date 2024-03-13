"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

//import CustomerInfoModal from "./CustomerInfoModal";
export default function AddNewButton(props) {
  //const [openDesignationModal, setOpenDesignationModal] = useState(false);
  const [openTeamModal, setOpenTeamModal] = useState(false);
  const [openCustomerModal, setOpenCustomerModal] = useState(false);

  const handleCancel = () => {
    //setOpenModal(false)
    props.setOpenDesignationModal(false);
  };

  return (
    <>
      {props.buttonName === "customer" && (
        <button
          onClick={() => setOpenCustomerModal(true)}
          type="button"
          className="btn btn-sm btn-secondary waves-effect justify-between"
        >
          <span className="tf-icons mdi mdi-plus me-1"></span>New Customer
        </button>
      )}

      {/* {openCustomerModal && (
        <CustomerInfoModal
          setOpenCustomerModal={setOpenCustomerModal}
          buttonType={props.buttonType}
        />
      )} */}
    </>
  );
}
