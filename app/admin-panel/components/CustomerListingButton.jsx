"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteCustomerRequest } from "@/app/api/admin-panel/scripts";
import CustomerInfoModal from "./CustomerInfoModal";

export default function CompanyListingButtons(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openCustomerModal, setOpenCustomerModal] = useState(false);

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
      <div clasName="dropdown">
        <button
          onClick={(e) => deleteCustomerRequest(e, props.propsData.customer_id, props.apiBackendURL, props.tokens, props.tenantID)}
          type="button"
          clasName="btn btn-xs btn-primary waves-effect mr-2 "
        >
          <span clasName="tf-icons mdi mdi-delete me-1 b"></span> Delete
        </button>
        <button
          onClick={() => setOpenCustomerModal(true)}
          type="button"
          clasName="btn btn-xs btn-outline-primary waves-effect "
        >
          <span clasName="tf-icons mdi mdi-delete-outline me-1 b"></span> Update
        </button>
        <br></br>
      </div>

      {openCustomerModal && (
        <CustomerInfoModal
          setOpenCustomerModal={setOpenCustomerModal}
          modalData={props.propsData ? props.propsData : {}}
          modalType="update"
          apiBackendURL={props.apiBackendURL} 
          tokens={props.tokens} 
          tenantID={props.tenantID}
        />
      )}
    </>
  );
}
