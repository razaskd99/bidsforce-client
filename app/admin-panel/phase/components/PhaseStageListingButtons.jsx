"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { deletePhaseStageRequest } from "@/app/api/admin-panel/scripts";
import PhaseStagesInfoModal from "./PhaseStagesInfoModal";

export default function PhaseStageListingButtons(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openPhaseStageModal, setOpenPhaseStageModal] = useState(false);

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
      <div className="dropdown">
        <button
          onClick={
            /*props.customLayout ?*/ (e)=>deletePhaseStageRequest(e, props.id, props.apiBackendURL, props.tokens, props.tenantID) 
            /*: () =>
              alert("This is a premium functionality.")*/
          }
          type="button"
          className="btn btn-xs btn-primary waves-effect mr-2 "
        >
          <span className="tf-icons mdi mdi-delete me-1 b"></span> Delete
        </button>
        <button
          onClick={() => setOpenPhaseStageModal(true)}
          type="button"
          className="btn btn-xs btn-outline-primary waves-effect "
        >
          <span className="tf-icons mdi mdi-delete-outline me-1 b"></span> Update
        </button>
        <br></br>
      </div>

      {openPhaseStageModal && (
        <PhaseStagesInfoModal
          setOpenPhaseStageModal={setOpenPhaseStageModal}
          modalData={props.propsData ? props.propsData : {}}
          modalType="update"
          typeName={props.typeName}
          id={props.id}
          tokens={props.tokens}
          apiBackendURL={props.apiBackendURL}
          tenantID={props.tenantID}
        />
      )}
    </>
  );
}
