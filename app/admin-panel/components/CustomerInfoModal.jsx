"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  createCustomerRequest,
  updateCustomerRequest,
} from "@/app/api/admin-panel/scripts";

/*import {
  getAllCompanyRecordsAction,
  getAllDesignationRecordsAction,
} from "@/app/api/admin-panel/actions/user";
*/
export default function CustomerInfoModal(props) {
  const [openModal, setOpenModal] = useState(true);
  const [companyList, setCompanyList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [formData, setFormDate] = useState({
    company_id:
      props.modalData && props.modalData.company_id
        ? props.modalData.company_id
        : "",
    designation_id:
      props.modalData && props.modalData.designation_id
        ? props.modalData.designation_id
        : "",
    m5_customer_name:
      props.modalData && props.modalData.customer_name
        ? props.modalData.customer_name
        : "",
    m5_email:
      props.modalData && props.modalData.email ? props.modalData.email : "",
    m5_phone:
      props.modalData && props.modalData.phone ? props.modalData.phone : "",
    m5_address:
      props.modalData && props.modalData.address ? props.modalData.address : "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await getAllCompanyRecordsAction(
          props.apiBackendURL,
          props.tokens,
          props.tenantID
        );
        setCompanyList(res.returnData);

        let res2 = await getAllDesignationRecordsAction(
          props.apiBackendURL,
          props.tokens,
          props.tenantID
        );
        setDesignationList(res2.returnData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function inside useEffect

    console.log(props.modalData);
    return () => {
      // Clean up any effects if needed on unmount
    };
  }, []);

  const handleChangeValues = (e) => {
    let data = { ...formData, [e.target.name]: e.target.value };
    setFormDate({ ...data });
    console.log(data);
  };

  const handleCancel = (e) => {
    setOpenModal(false);
    props.setOpenCustomerModal(false);
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
              <h4 className="modal-title" id="modalCenterTitle">
                Customer Details
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
              <form id="modalform5">
                <div className="row">
                  <div className="form-floating form-floating-outline col-md-12 mb-4 d-flex">
                    <select
                      className="form-select"
                      id="m5_company_id"
                      name="m5_company_id"
                    >
                      <option value={""}>Company Name</option>
                      {companyList &&
                        companyList.map((item, i) => (
                          <option
                            key={i}
                            value={item.company_id}
                            selected={
                              item.company_id == formData.company_id
                                ? true
                                : false
                            }
                          >
                            {item.company_name}
                          </option>
                        ))}
                    </select>
                    {/*<button onClick={()=>setOpenCompanyModal(true)} type="button" className="btn btn-sm btn-primary waves-effect ml-2">
                    <span className="tf-icons mdi mdi-plus me-1"></span>Add
                    </button>*/}
                  </div>

                  <div className="form-floating form-floating-outline col-md-12 mb-4 d-flex">
                    <select
                      className="form-select"
                      id="m5_designation_id"
                      name="m5_designation_id"
                      onChange={handleChangeValues}
                    >
                      <option value={""}>Designation Name</option>
                      {designationList &&
                        designationList.map((item, i) => (
                          <option
                            key={i}
                            value={item.designation_id}
                            selected={
                              item.designation_id == formData.designation_id
                                ? true
                                : false
                            }
                          >
                            {item.title}
                          </option>
                        ))}
                    </select>
                    {/*<button onClick={()=>setOpenDesignationModal(true)} type="button" className="btn btn-sm btn-primary waves-effect ml-2">
                    <span className="tf-icons mdi mdi-plus me-1"></span>Add
                    </button>*/}
                  </div>
                  <div className="col mb-4 mt-2">
                    <div className="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        value={formData.m5_customer_name}
                        id="m5_customer_name"
                        name="m5_customer_name"
                        className="form-control"
                        placeholder="Enter Customer Name"
                      />
                      <label for="customer_name">Customer Name *</label>
                    </div>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col mb-4">
                    <div className="form-floating form-floating-outline">
                      <input
                        type="email"
                        onChange={handleChangeValues}
                        value={formData.m5_email}
                        id="m5_email"
                        name="m5_email"
                        className="form-control"
                        placeholder="example@domain.com"
                      />
                      <label for="email">Email *</label>
                    </div>
                  </div>
                  <div className="col mb-4">
                    <div className="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        value={formData.m5_phone}
                        id="m5_phone"
                        name="m5_phone"
                        className="form-control"
                        placeholder="Enter Phone Number"
                      />
                      <label for="phone">Phone </label>
                    </div>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col mb-4">
                    <div className="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        value={formData.m5_address}
                        id="m5_address"
                        name="m5_address"
                        className="form-control"
                        placeholder="Enter Address"
                      />
                      <label for="address">Address </label>
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
                    createCustomerRequest(
                      e,
                      props.apiBackendURL,
                      props.tokens,
                      props.tenantID
                    )
                  }
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                >
                  Add Info
                </button>
              ) : (
                <button
                  onClick={(e) =>
                    updateCustomerRequest(
                      e,
                      props.modalData.customer_id,
                      props.apiBackendURL,
                      props.tokens,
                      props.tenantID
                    )
                  }
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                >
                  Update Info
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
