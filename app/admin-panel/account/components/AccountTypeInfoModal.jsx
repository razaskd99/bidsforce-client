"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccountTypeRequest, updateAccountTypeRequest } from "@/app/api/accounts/script";

export default function AccountTypeInfoModal(props) {
  const [openModal, setOpenModal] = useState(true);
  //const [typeName, setTypeName] = useState("");

  const [formData, setFormData] = useState({
   type_name : props.modalData?.type_name ? props.modalData?.type_name : ''
  });

  const handleChangeValues = (e) => {
    let data = { ...formData, [e.target.name]: e.target.value };
    setFormData({ ...data });
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function inside useEffect

    return () => {
      // Clean up any effects if needed on unmount
    };
  }, []);


  const handleCancel = (e) => {
    setOpenModal(false);
    props.setOpenAccountTypeModal(false);
  };

  return (
    <>
      <div
        className="modal fade show"
        id="modalCenter"
        tabindex="-1"
        aria-modal="true"
        role="dialog"
        style={{
          display: "block",
          opacity: 1,
          background: "rgba(151,149,158,50%)",
        }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" id="modalFormComponent1">
            <div className="modal-header">
              <h4 className="modal-title text-capitalize" id="modalCenterTitle">
                Account Type
              </h4>
              <button
                onClick={handleCancel}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" id="modalFormComponentBody1">
              <form id="modalform1">
                <div className="row">
                  <div className="col mb-4 mt-2">
                    <div className="form-floating form-floating-outline">
                      <input
                        type="text"
                        name="type_name"
                        // onChange={(e)=>setTypeName(e.target.value)}
                        onChange={handleChangeValues}
                        defaultValue={props.modalData?.type_name ? props.modalData?.type_name : formData.type_name}
                        className="form-control"
                        placeholder="Enter Type"
                      />
                      <label for="m7_persona_role">Account Type *</label>
                    </div>
                  </div>
                </div>
             
                <div className="row">
                  <div className="col-12">
                    <div
                      id="modalErrorMessageAlert"
                      className="alert alert-danger mt-4"
                      style={{ display: "none" }}
                      role="alert"
                    >
                      Invalid data.
                    </div>
                    <div
                      id="modalSuccessMessageAlert"
                      className="alert alert-success mt-4"
                      style={{ display: "none" }}
                      role="alert"
                    >
                      Operation successful.
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleCancel}
                type="button"
                className="btn btn-outline-primary waves-effect"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              {props.buttonType && props.buttonType === "new" ? (
                <button
                  onClick={(e) =>
                    createAccountTypeRequest(
                      e,
                      formData
                    )
                  }
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                >
                  ADD
                </button>
              ) : (
                <button
                  onClick={(e) =>
                    updateAccountTypeRequest(
                      e,
                      props.modalData.account_type_id,
                      formData
                    )
                  }
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                >
                  SAVE
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
