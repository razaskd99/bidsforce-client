"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteDesignationRequest } from "@/app/api/admin-panel/scripts";
import DesignationInfoModal from "./DesignationInfoModal";

export default function DesignationListingButtons(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openDesignationModal, setOpenDesignationModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = [];
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function inside useEffect

    return () => {
      // Clean up any effects if needed on unmount
    };
  }, [props.apiBackendURL, props.accessToken, props.tenantID]);

  const handleChangeValues = (e) => {
    let data = { ...curentRecord, [e.target.name]: e.target.value };
    setcurentRecord({ ...data });
  };

  const handleCancel = (e) => {
    setOpenModal(false);
  };

  return (
    <>
      <div class="dropdown">
        <button
          onClick={(e) =>
            deleteDesignationRequest(e, props.propsData.designation_id)
          }
          type="button"
          class="btn btn-xs btn-primary waves-effect mr-2 "
        >
          <span class="tf-icons mdi mdi-delete me-1 b"></span> Delete
        </button>
        <button
          onClick={() => setOpenDesignationModal(true)}
          type="button"
          class="btn btn-xs btn-outline-primary waves-effect "
        >
          <span class="tf-icons mdi mdi-delete-outline me-1 b"></span> Update
        </button>
        <br></br>
      </div>

      {openDesignationModal && (
        <DesignationInfoModal
          setOpenDesignationModal={setOpenDesignationModal}
          modalData={props.propsData ? props.propsData : {}}
          modalType="update"
        />
      )}
    </>
  );
}
