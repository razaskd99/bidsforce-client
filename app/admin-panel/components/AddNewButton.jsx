"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import CompanyInfoModal from "./CompanyInfoModal";
import DesignationInfoModal from "./DesignationInfoModal";
import TeamInfoModal from "./TeamInfoModal";
import CustomerInfoModal from "./CustomerInfoModal";
export default function AddNewButton(props) {
  const [openCompanyModal, setOpenCompanyModal] = useState(false);
  const [openDesignationModal, setOpenDesignationModal] = useState(false);
  const [openTeamModal, setOpenTeamModal] = useState(false);
  const [openCustomerModal, setOpenCustomerModal] = useState(false);

  const handleCancel = () => {
    //setOpenModal(false)
    props.setOpenDesignationModal(false);
  };

  return (
    <>
      {props.buttonName === "company" && (
        <button
          onClick={() => setOpenCompanyModal(true)}
          type="button"
          class="btn btn-sm btn-secondary waves-effect justify-between"
        >
          <span class="tf-icons mdi mdi-plus me-1"></span>New Company
        </button>
      )}

      {props.buttonName === "designation" && (
        <button
          onClick={() => setOpenDesignationModal(true)}
          type="button"
          class="btn btn-sm btn-secondary waves-effect justify-between"
        >
          <span class="tf-icons mdi mdi-plus me-1"></span>New Designation
        </button>
      )}

      {props.buttonName === "team" && (
        <button
          onClick={() => setOpenTeamModal(true)}
          type="button"
          class="btn btn-sm btn-secondary waves-effect justify-between"
        >
          <span class="tf-icons mdi mdi-plus me-1"></span>New Team
        </button>
      )}

      {props.buttonName === "customer" && (
        <button
          onClick={() => setOpenCustomerModal(true)}
          type="button"
          class="btn btn-sm btn-secondary waves-effect justify-between"
        >
          <span class="tf-icons mdi mdi-plus me-1"></span>New Customer
        </button>
      )}

      {props.buttonName === "bid_stages" && (
        <button
          onClick={() => setOpenCustomerModal(true)}
          type="button"
          class="btn btn-sm btn-secondary waves-effect justify-between"
        >
          <span class="tf-icons mdi mdi-plus me-1"></span>New Bid Stage
        </button>
      )}

      {openCompanyModal && (
        <CompanyInfoModal
          setOpenCompanyModal={setOpenCompanyModal}
          buttonType={props.buttonType}
        />
      )}

      {openDesignationModal && (
        <DesignationInfoModal
          setOpenDesignationModal={setOpenDesignationModal}
          buttonType={props.buttonType}
        />
      )}

      {openTeamModal && (
        <TeamInfoModal
          setOpenTeamModal={setOpenTeamModal}
          buttonType={props.buttonType}
        />
      )}

      {openCustomerModal && (
        <CustomerInfoModal
          setOpenCustomerModal={setOpenCustomerModal}
          buttonType={props.buttonType}
        />
      )}
    </>
  );
}
