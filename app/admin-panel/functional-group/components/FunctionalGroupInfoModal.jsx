"use client";
import React, { useState, useEffect } from "react";
import { createFunctionalGroupRequest, updateFunctionalGroupRequest } from "../../../api/users/script";



export default function FunctionalGroupInfoModal(props) {
  const [openModal, setOpenModal] = useState(true);
  const [formData, setFormDate] = useState({
    m8_title: props.modalData && props.modalData.title ? props.modalData.title : "",
    m8_active: props.modalData && props.modalData.active ? true : false    
  });
  

  const handleChangeValues = (e) => {
    let data = { ...formData, [e.target.name]: e.target.value };
    setFormDate({ ...data });
    console.log(data);
  };

  const handleCancel = (e) => {
    setOpenModal(false);
    props.setOpenFunctionalGroupModal(false);
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
                {props.buttonType == 'new' ? 'Add Functional Group' : 'Edit Functional Group'} 
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
                        id="m8_title"
                        name="m8_title"
                        defaultValue={formData.m8_title ? formData.m8_title : ''}
                        className="form-control"
                        placeholder="Enter Title"
                      />
                      <label for="m8_title">Title *</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-4 mt-2">
                    <div className="form-floating form-floating-outline">
                      <select
                        onChange={handleChangeValues}
                        id="m8_active"
                        name="m8_active"
                        className="form-select"
                      >
                        <option>Select Status... *</option>
                        <option
                          value="Active"
                          selected={formData.m8_active ? true : false}
                        >
                          Active
                        </option>
                        <option
                          value="Inactive"
                          selected={!formData.m8_active ? true : false}
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
                    createFunctionalGroupRequest(e)
                  }
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                >
                  Add
                </button>
              ) : (
                <button
                  onClick={(e) =>
                    updateFunctionalGroupRequest(
                      e,                      
                      props?.modalData?.id
                    )
                  }
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
