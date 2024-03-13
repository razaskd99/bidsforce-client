"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  createOpportunityRequest,
  updateOpportunityRequest,
} from "@/app/api/admin-panel/scripts";

import {
  getAllCustomerRecordsAction,
  getAllCompanyRecordsAction,
} from "@/app/api/admin-panel/actions/user";

export default function OpportunityInfoModal(props) {
  const [openModal, setOpenModal] = useState(true);
  const [customerList, setCustomerList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const [formData, setFormDate] = useState({
    company_id:
      props.modalData && props.modalData.company_id
        ? props.modalData.company_id
        : "",
    customer_id:
      props.modalData && props.modalData.customer_id
        ? props.modalData.customer_id
        : "",

    m6_title:
      props.modalData && props.modalData.title ? props.modalData.title : "",

    m6_type:
      props.modalData && props.modalData.type ? props.modalData.type : "",
    m6_probability:
      props.modalData && props.modalData.probability
        ? props.modalData.probability
        : "",
    m6_total_value:
      props.modalData && props.modalData.total_value
        ? props.modalData.total_value
        : 0,
    m6_crm_id:
      props.modalData && props.modalData.crm_id ? props.modalData.crm_id : 0,
    m6_customer_name:
      props.modalData && props.modalData.customer_name
        ? props.modalData.customer_name
        : "",
    m6_end_user_name:
      props.modalData && props.modalData.end_user_name
        ? props.modalData.end_user_name
        : "",

    m6_region:
      props.modalData && props.modalData.region ? props.modalData.region : "",
    m6_industry_code:
      props.modalData && props.modalData.industry_code
        ? props.modalData.industry_code
        : "",
    m6_business_unit:
      props.modalData && props.modalData.business_unit
        ? props.modalData.business_unit
        : "",
    m6_project_type:
      props.modalData && props.modalData.project_type
        ? props.modalData.project_type
        : "",
    m6_delivery_duration:
      props.modalData && props.modalData.delivery_duration
        ? props.modalData.delivery_duration
        : "",
    m6_stage:
      props.modalData && props.modalData.stage ? props.modalData.stage : "",
    m6_status:
      props.modalData && props.modalData.status ? props.modalData.status : "",
    m6_expected_award_date:
      props.modalData && props.modalData.expected_award_date
        ? props.modalData.expected_award_date
        : new Date().toISOString().slice(0, 10),
    m6_expected_rfx_date:
      props.modalData && props.modalData.expected_rfx_date
        ? props.modalData.expected_rfx_date
        : new Date().toISOString().slice(0, 10),
    m6_close_date:
      props.modalData && props.modalData.close_date
        ? props.modalData.close_date
        : new Date().toISOString().slice(0, 10),
    m6_competition:
      props.modalData && props.modalData.competition
        ? props.modalData.competition
        : "",
    m6_gross_profit_percent:
      props.modalData && props.modalData.gross_profit_percent
        ? props.modalData.gross_profit_percent
        : 0,
    m6_gross_profit_value:
      props.modalData && props.modalData.gross_profit_value
        ? props.modalData.gross_profit_value
        : 0,
    m6_description:
      props.modalData && props.modalData.description
        ? props.modalData.description
        : "",
    m6_forcasted:
      props.modalData && props.modalData.forcasted
        ? props.modalData.forcasted
        : "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await getAllCompanyRecordsAction();
        setCompanyList(res.returnData);

        let res2 = await getAllCustomerRecordsAction();
        setCustomerList(res2.returnData);
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
  };

  const handleCancel = (e) => {
    setOpenModal(false);
    props.setOpenOpportunityModal(false);
  };

  const handleChangeCompany = (e) => {
    const element = e.target.options[e.target.selectedIndex];
    formData.m6_customer_name = element.getAttribute("data-name");
    formData.m6_end_user_name = element.getAttribute("data-name");
    console.log(formData);
  };

  const handleChangeCustomer = (e) => {
    const element = e.target.options[e.target.selectedIndex];
    formData.m6_end_user_name = element.getAttribute("data-name");
    console.log(formData);
  };

  return (
    <>
      <div
        class="modal fade show "
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
        <div class="modal-dialog modal-dialog-centered min-w-[1000px] sm:w-full md:w-full lg:max-w-5xl xl:max-w-5xl">
          <div class="modal-content" id="modalFormComponent1">
            <div class="modal-header">
              <h4 class="modal-title" id="modalCenterTitle">
                Opportunity Details
              </h4>
              <button
                onClick={handleCancel}
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body" id="modalFormComponentBody1">
              <form id="modalform6">
                <div class="row">
                  <div class="col mb-4 mt-2">
                    <div class="form-floating form-floating-outline">
                      <select
                        class="form-select"
                        id="m6_company_id"
                        name="m6_company_id"
                        onChange={handleChangeCompany}
                      >
                        <option value={""}>Choose Company/Customer *</option>
                        {companyList &&
                          companyList.map((item, i) => (
                            <option
                              key={i}
                              value={item.company_id}
                              data-name={item.company_name}
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
                    </div>
                  </div>
                  <div class="col mb-4 mt-2">
                    <div class="form-floating form-floating-outline">
                      <select
                        class="form-select"
                        id="m6_customer_id"
                        name="m6_customer_id"
                        onChange={handleChangeCustomer}
                      >
                        <option value={""}>
                          Choose Customer/End User (if end user is different)...
                        </option>
                        {customerList &&
                          customerList.map((item, i) => (
                            <option
                              key={i}
                              value={item.customer_id}
                              data-name={item.customer_name}
                              selected={
                                item.customer_id == formData.customer_id
                                  ? true
                                  : false
                              }
                            >
                              {item.customer_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row g-2">
                  <div class="col mb-4 mt-2">
                    <div class="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        value={formData.m6_title}
                        id="m6_title"
                        name="m6_title"
                        class="form-control"
                        placeholder="Enter Title"
                      />
                      <label for="m6_title">Title *</label>
                    </div>
                  </div>
                  <div class="col mb-4 mt-2">
                    <div class="form-floating form-floating-outline">
                      <select
                        class="form-select"
                        id="m6_forcasted"
                        name="m6_forcasted"
                      >
                        <option value={""}>Forcasted</option>

                        <option
                          value="yes"
                          selected={formData.m6_forcasted ? true : false}
                        >
                          Yes
                        </option>
                        <option
                          value="no"
                          selected={formData.forcasted ? true : false}
                        >
                          No
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col mb-4">
                    <div class="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        value={formData.m6_type}
                        id="m6_type"
                        name="m6_type"
                        class="form-control"
                        placeholder="EnterType"
                      />
                      <label for="type">Type </label>
                    </div>
                  </div>
                </div>
                <div class="row g-2">
                  <div class="col mb-4">
                    <div class="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        value={formData.m6_probability}
                        id="m6_probability"
                        name="m6_probability"
                        class="form-control"
                        placeholder="Enter Probability"
                      />
                      <label for="probability">Probability </label>
                    </div>
                  </div>
                  <div class="col mb-4">
                    <div class="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        value={formData.m6_total_value}
                        id="m6_total_value"
                        name="m6_total_value"
                        class="form-control"
                        placeholder="Enter Total Value"
                      />
                      <label for="total_value">Total Value </label>
                    </div>
                  </div>
                  <div class="col mb-4">
                    <div class="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        value={formData.m6_crm_id}
                        id="m6_crm_id"
                        name="m6_crm_id"
                        class="form-control"
                        placeholder="Enter CRM ID"
                      />
                      <label for="crm_id">CRM ID </label>
                    </div>
                  </div>
                </div>

                <div class="row g-2">
                  <div class="col mb-4">
                    <div class="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        value={formData.m6_region}
                        id="m6_region"
                        name="m6_region"
                        class="form-control"
                        placeholder="Enter Region"
                      />
                      <label for="region">Region </label>
                    </div>
                  </div>
                  <div class="col mb-4">
                    <div class="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        value={formData.m6_industry_code}
                        id="m6_industry_code"
                        name="m6_industry_code"
                        class="form-control"
                        placeholder="Enter Industry Code"
                      />
                      <label for="industry_code">Industry Code </label>
                    </div>
                  </div>
                  <div class="col mb-4">
                    <div class="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        value={formData.m6_business_unit}
                        id="m6_business_unit"
                        name="m6_business_unit"
                        class="form-control"
                        placeholder="Enter Business Unit"
                      />
                      <label for="business_unit">Business Unit </label>
                    </div>
                  </div>
                </div>

                <div class="row g-2">
                  <div class="col mb-4">
                    <div class="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        value={formData.m6_project_type}
                        id="m6_project_type"
                        name="m6_project_type"
                        class="form-control"
                        placeholder="Enter Project Type"
                      />
                      <label for="project_type">Project Type </label>
                    </div>
                  </div>
                  <div class="col mb-4">
                    <div class="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        value={formData.m6_delivery_duration}
                        id="m6_delivery_duration"
                        name="m6_delivery_duration"
                        class="form-control"
                        placeholder="Enter Delivery Duration"
                      />
                      <label for="delivery_duration">Delivery Duration </label>
                    </div>
                  </div>
                  <div class="col mb-4">
                    <div class="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        value={formData.m6_stage}
                        id="m6_stage"
                        name="m6_stage"
                        class="form-control"
                        placeholder="Enter Stage"
                      />
                      <label for="stage">Stage </label>
                    </div>
                  </div>
                </div>
                <div class="row g-2">
                  <div class="col mb-4">
                    <div class="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        value={formData.m6_status}
                        id="m6_status"
                        name="m6_status"
                        class="form-control"
                        placeholder="Enter Status"
                      />
                      <label for="status">Status </label>
                    </div>
                  </div>
                  <div class="col mb-4">
                    <div class="form-floating form-floating-outline">
                      <input
                        type="date"
                        onChange={handleChangeValues}
                        value={formData.m6_expected_award_date}
                        id="m6_expected_award_date"
                        name="m6_expected_award_date"
                        class="form-control"
                        placeholder="Enter Expected Award Date"
                      />
                      <label for="expected_award_date">
                        Expected Award Date
                      </label>
                    </div>
                  </div>
                  <div class="col mb-4">
                    <div class="form-floating form-floating-outline">
                      <input
                        type="date"
                        onChange={handleChangeValues}
                        value={formData.m6_expected_rfx_date}
                        id="m6_expected_rfx_date"
                        name="m6_expected_rfx_date"
                        class="form-control"
                        placeholder="Enter Expected RFx Date"
                      />
                      <label for="expected_rfx_date">Expected RFx Date </label>
                    </div>
                  </div>
                </div>
                <div class="row g-2">
                  <div class="col mb-4">
                    <div class="form-floating form-floating-outline">
                      <input
                        type="date"
                        onChange={handleChangeValues}
                        value={formData.m6_close_date}
                        id="m6_close_date"
                        name="m6_close_date"
                        class="form-control"
                        placeholder="Enter Close Date"
                      />
                      <label for="close_date">Close Date </label>
                    </div>
                  </div>
                  <div class="col mb-4">
                    <div class="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        value={formData.m6_competition}
                        id="m6_competition"
                        name="m6_competition"
                        class="form-control"
                        placeholder="Enter Competition"
                      />
                      <label for="competition">Competition </label>
                    </div>
                  </div>
                  <div class="col mb-4">
                    <div class="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        value={formData.m6_gross_profit_percent}
                        id="m6_gross_profit_percent"
                        name="m6_gross_profit_percent"
                        class="form-control"
                        placeholder="Enter Gross Profit Percent"
                      />
                      <label for="gross_profit_percent">
                        Gross Profit Percent
                      </label>
                    </div>
                  </div>
                </div>
                <div class="row g-2">
                  <div class="col mb-4">
                    <div class="form-floating form-floating-outline">
                      <input
                        type="text"
                        onChange={handleChangeValues}
                        value={formData.m6_gross_profit_value}
                        id="m6_gross_profit_value"
                        name="m6_gross_profit_value"
                        class="form-control"
                        placeholder="Enter Gross Profit Value"
                      />
                      <label for="gross_profit_value">Gross Profit Value</label>
                    </div>
                  </div>
                </div>
                <div class="row g-2">
                  <div class="col mb-2">
                    <div class="input-group">
                      <textarea
                        onChange={handleChangeValues}
                        class="form-control"
                        id="m6_description"
                        name="m6_description"
                        placeholder="Enter Description"
                      >
                        {formData.m6_description}
                      </textarea>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div
                      id="modalErrorMessageAlert"
                      class="alert alert-danger mt-4"
                      style={{ display: "none" }}
                      role="alert"
                    >
                      Invalid data.
                    </div>
                    <div
                      id="modalSuccessMessageAlert"
                      class="alert alert-success mt-4"
                      style={{ display: "none" }}
                      role="alert"
                    >
                      Operation successful.
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                onClick={handleCancel}
                type="button"
                class="btn btn-outline-primary waves-effect"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              {props.buttonType && props.buttonType === "new" ? (
                <button
                  onClick={(e) =>
                    createOpportunityRequest(
                      e,
                      formData.m6_customer_name,
                      formData.m6_end_user_name
                    )
                  }
                  type="button"
                  class="btn btn-primary waves-effect waves-light"
                >
                  Add Info
                </button>
              ) : (
                <button
                  onClick={(e) =>
                    updateOpportunityRequest(
                      e,
                      props.modalData.opportunity_id,
                      formData.m6_customer_name,
                      formData.m6_end_user_name
                    )
                  }
                  type="button"
                  class="btn btn-primary waves-effect waves-light"
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
