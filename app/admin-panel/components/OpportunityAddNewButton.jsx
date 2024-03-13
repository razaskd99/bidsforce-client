"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import OpportunityInfoModal from "./OpportunityInfoModal";

export default function OpportunityAddNewButton(props) {
  const [openOpportunityModal, setOpenOpportunityModal] = useState(false);

  const handleCancel = () => {
    //setOpenModal(false)
    props.setOpenOpportunityModal(false);
  };

  return (
    <>
      {props.buttonName === "opportunity" && (
        <button
          onClick={() => setOpenOpportunityModal(true)}
          type="button"
          class="btn btn-sm btn-secondary waves-effect justify-between"
        >
          <span class="tf-icons mdi mdi-plus me-1"></span>New Opportunity
        </button>
      )}

      {openOpportunityModal && (
        <OpportunityInfoModal
          setOpenOpportunityModal={setOpenOpportunityModal}
          buttonType={props.buttonType}
        />
      )}
    </>
  );
}
