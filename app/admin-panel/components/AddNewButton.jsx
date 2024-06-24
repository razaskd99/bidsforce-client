"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import CompanyInfoModal from "./CompanyInfoModal";
import DesignationInfoModal from "./DesignationInfoModal";
import TeamInfoModal from "./TeamInfoModal";
import CustomerInfoModal from "./CustomerInfoModal";
export default function AddNewButton(props) {
  const [openCustomerModal, setOpenCustomerModal] = useState(false);

  const handleCancel = () => {
    //setOpenModal(false)
    props.setOpenDesignationModal(false);
  };

  return (
    <>
      

      {props.buttonName === "bid_stages" && (
        <button
          onClick={() => setOpenCustomerModal(true)}
          type="button"
          className="btn btn-sm btn-secondary waves-effect justify-between"
        >
          <span className="tf-icons mdi mdi-plus me-1"></span>New Bid Stage
        </button>
      )}

    </>
  );
}
