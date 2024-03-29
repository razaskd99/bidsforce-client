"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteTeamRequest } from "@/app/api/admin-panel/scripts";
import TeamInfoModal from "./TeamInfoModal";

export default function TeamListingButtons(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openTeamModal, setOpenTeamModal] = useState(false);

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
          onClick={(e) =>
            deleteTeamRequest(
              e,
              props.propsData.team_id,
              props.apiBackendURL,
              props.tokens,
              props.tenantID
            )
          }
          type="button"
          className="btn btn-xs btn-primary waves-effect mr-2 "
        >
          <span className="tf-icons mdi mdi-delete me-1 b"></span> Delete
        </button>
        <button
          onClick={() => setOpenTeamModal(true)}
          type="button"
          className="btn btn-xs btn-outline-primary waves-effect "
        >
          <span className="tf-icons mdi mdi-delete-outline me-1 b"></span> Update
        </button>
        <br></br>
      </div>

      {openTeamModal && (
        <TeamInfoModal
          setOpenTeamModal={setOpenTeamModal}
          modalData={props.propsData ? props.propsData : {}}
          modalType="update"
          tenantID={props.tenantID}
          tokens={props.tokens}
          apiBackendURL={props.apiBackendURL}
        />
      )}
    </>
  );
}
