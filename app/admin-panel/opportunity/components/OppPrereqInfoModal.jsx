"use client";
import { createOppPrereqRequest, updateOppPrereqRequest } from "@/app/api/opportunities/scripts";
import React, { useState, useEffect } from "react";

export default function OppPrereqInfoModal(props) {
  const [openModal, setOpenModal] = useState(true);
  const [formData, setFormDate] = useState({
    m4_title:
      props.modalData && props.modalData.title ? props.modalData.title : "",
    m4_active: props.modalData && props.modalData.active ? true : false,
  });

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

  const handleChangeValues = (e) => {
    let data = { ...formData, [e.target.name]: e.target.value };
    setFormDate({ ...data });
  };

  const handleCancel = (e) => {
    setOpenModal(false);
    props.setOpenOppPrereqModal(false);
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
                {props.tablename.replace("_", " ").replace("_", " ")} Details
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
              <form id="modalform4">
                <div className="row">
                  <div className="col mb-4 mt-2">
                    <div className="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        id="m4_title"
                        name="m4_title"
                        value={formData.m4_title}
                        className="form-control"
                        placeholder="Enter Title"
                      />
                      <label for="m4_title">Title *</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-4 mt-2">
                    <div className="form-floating form-floating-outline">
                      <select
                        onChange={handleChangeValues}
                        id="m4_active"
                        name="m4_active"
                        className="form-select"
                      >
                        <option>Select Status... *</option>
                        <option
                          value="Active"
                          selected={formData.m4_active ? true : false}
                        >
                          Active
                        </option>
                        <option
                          value="Inactive"
                          selected={!formData.m4_active ? true : false}
                        >
                          Inactive
                        </option>
                      </select>
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
                    createOppPrereqRequest(
                      e,
                      props.tablename
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
                    updateOppPrereqRequest(
                      e,
                      props.tablename,
                      props.id
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
