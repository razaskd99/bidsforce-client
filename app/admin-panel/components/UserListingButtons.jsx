"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getAllCompanyRequest,
  getAllDesignationRequest,
  getAllTeamRequest,
  createTenenatRequest,
  deleteUserRequest,
  updateUserRequest,
} from "@/app/api/admin-panel/scripts";
import {
  GetDocumentByKeyAction,
  GetRfxDocumentsBy_RfxID_Key_Action,
} from "@/app/api/rfx/actions/rfx";

export default function UserListingButtons(props) {
  const [companyList, setCompanyList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [tenants, setTenants] = useState({ ...props.tenantData });
  const [currentUser, setCurrentUser] = useState({});
  const [profilePic, setProfilePic] = useState("");
  const [selectedFile, setSelectedFile] = useState({});
  const [fileData, setFileData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = [];
        data = await getAllCompanyRequest(
          props.apiBackendURL,
          props.accessToken,
          props.tenantID
        );
        setCompanyList(data.returnData);

        data = await getAllDesignationRequest(
          props.apiBackendURL,
          props.accessToken,
          props.tenantID
        );
        setDesignationList(data.returnData);

        data = await getAllTeamRequest(
          props.apiBackendURL,
          props.accessToken,
          props.tenantID
        );
        setTeamList(data.returnData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function inside useEffect

    setCurrentUser(props.userDetail);

    return () => {
      // Clean up any effects if needed on unmount
    };
  }, [props.apiBackendURL, props.accessToken, props.tenantID]);

  const handleChangeValues = (e) => {
    let data = { ...currentUser, [e.target.name]: e.target.value };
    setCurrentUser({ ...data });
  };

  const handleCancel = (e) => {
    setOpenModal(false);
  };

  const handleChange = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file)); // Set selected image preview

    // Create a new FormData object and append the single file
    const formData = new FormData();
    formData.append("file", file);
    setFileData(formData);

    const extractedFile = formData.get("file");
    // Update the selectedFiles array with the single file
    setSelectedFile(extractedFile);
  };

  return (
    <>
      <div className="dropdown">
        <button
          onClick={(e) =>
            deleteUserRequest(
              e,
              props.user_id,
              props.apiBackendURL,
              props.accessToken,
              props.tenantID
            )
          }
          type="button"
          className="btn btn-xs btn-primary waves-effect mr-2 "
        >
          <span className="tf-icons mdi mdi-delete me-1 b"></span> Delete
        </button>
        <button
          onClick={() => setOpenModal(true)}
          type="button"
          className="btn btn-xs btn-outline-primary waves-effect "
        >
          <span className="tf-icons mdi mdi-delete-outline me-1 b"></span>{" "}
          Update
        </button>
        <br></br>
      </div>

      {openModal && (
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
            <div
              className="modal-dialog modal-dialog-centered"
              role="document"
              style={{ minWidth: "950px" }}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="modalCenterTitle">
                    Update User
                  </h4>
                  <button
                    onClick={handleCancel}
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-12">
                      <h5 className="card-header">Business Details </h5>
                      <div className="card-body demo-vertical-spacing demo-only-element row">
                        <div className="form-floating form-floating-outline col-md-6 mb-4">
                          <select
                            className="form-select"
                            onChange={handleChangeValues}
                            id="company_id"
                            name="company_id"
                          >
                            <option value={""}>Company Name</option>
                            {companyList &&
                              companyList.map((item, i) => (
                                <option
                                  value={item.company_id}
                                  key={i}
                                  selected={
                                    currentUser.company_id === item.company_id
                                      ? true
                                      : false
                                  }
                                >
                                  {item.company_name}
                                </option>
                              ))}
                          </select>
                          <label for="company_id">Select Company</label>
                        </div>
                        <div className="form-floating form-floating-outline col-md-6 mt-0">
                          <select
                            className="form-select"
                            onChange={handleChangeValues}
                            id="designation_id"
                            name="designation_id"
                          >
                            <option value={""}>Designation Name</option>
                            {designationList &&
                              designationList.map((item, i) => (
                                <option
                                  value={item.designation_id}
                                  key={i}
                                  selected={
                                    currentUser.designation_id ===
                                    item.designation_id
                                      ? true
                                      : false
                                  }
                                >
                                  {item.title}
                                </option>
                              ))}
                          </select>
                          <label for="designation_id">Select Designation</label>
                        </div>
                        <div className="form-floating form-floating-outline col-md-6 mb-4">
                          <select
                            className="form-select"
                            onChange={handleChangeValues}
                            id="team_id"
                            name="team_id"
                          >
                            <option value={""}>Team Name</option>
                            {teamList &&
                              teamList.map((item, i) => (
                                <option
                                  value={item.team_id}
                                  key={i}
                                  selected={
                                    currentUser.team_id === item.team_id
                                      ? true
                                      : false
                                  }
                                >
                                  {item.team_title}
                                </option>
                              ))}
                          </select>
                          <label for="team_id">Select Team</label>
                        </div>
                        <div className="form-floating form-floating-outline col-md-6 mb-4">
                          <select
                            className="form-select"
                            onChange={handleChangeValues}
                            id="is_active"
                            name="is_active"
                          >
                            <option>User Status</option>
                            <option
                              value="Active"
                              selected={currentUser.active ? true : false}
                            >
                              Active
                            </option>
                            <option
                              value="Inactive"
                              selected={!currentUser.active ? true : false}
                            >
                              Inactive
                            </option>
                          </select>
                          <label for="is_active">Select User Status</label>
                          <div
                            id="defaultFormControlHelp"
                            className="form-text"
                          >
                            This enables to Active or Deactive User account.
                          </div>
                        </div>
                      </div>

                      <hr className="m-0"></hr>

                      <h5 className="card-header">User Details</h5>
                      <div className="card-body demo-vertical-spacing demo-only-element row">
                        <div className="form-floating form-floating-outline col-md-6 mb-4">
                          <input
                            type="text"
                            onChange={handleChangeValues}
                            value={currentUser.first_name}
                            className="form-control"
                            id="first_name"
                            name="first_name"
                            placeholder="First Name"
                          />
                          <label for="first_name">First Name</label>
                        </div>
                        <div className="form-floating form-floating-outline col-md-6 mt-0">
                          <input
                            type="text"
                            onChange={handleChangeValues}
                            value={currentUser.last_name}
                            className="form-control"
                            id="last_name"
                            name="last_name"
                            placeholder="Last Name"
                          />
                          <label for="last_name">Last Name</label>
                        </div>
                        <div className="form-floating form-floating-outline col-md-6 mb-4">
                          <input
                            type="password"
                            onChange={handleChangeValues}
                            value={currentUser.password}
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Password"
                          />
                          <label for="password">Password</label>
                        </div>
                        <div className="form-floating form-floating-outline col-md-6 mb-4">
                          <input
                            type="password"
                            onChange={handleChangeValues}
                            className="form-control"
                            id="cpassword"
                            name="cpassword"
                            placeholder="Confirm Password"
                          />
                          <label for="cpassword">Confirm Password</label>
                        </div>
                        <div className=" col-md-6 mb-4">
                          <div className="input-group">
                            {selectedImage ? (
                              <div>
                                <img
                                  src={selectedImage}
                                  alt="Profile"
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50%",
                                  }}
                                />
                                <button onClick={() => setSelectedImage(null)}>
                                  Remove
                                </button>
                              </div>
                            ) : (
                              <div className="mb-3 w-full">
                                <label
                                  for="formFileLg"
                                  className="mb-2 inline-block text-neutral-500 dark:text-neutral-400"
                                >
                                  Upload Profile Picture
                                </label>
                                <input
                                  className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal leading-[2.15] text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
                                  id="formFileLg"
                                  type="file"
                                  onChange={handleChange}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className=" col-md-12 mb-4 justify-content-center d-flex">
                    <button
                      onClick={handleCancel}
                      className="btn btn-outline-primary w-[206px] mr-3 waves-effect "
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) =>
                        updateUserRequest(
                          e,
                          currentUser.user_id,
                          props.apiBackendURL,
                          props.accessToken,
                          props.tenantID,
                          selectedFile,
                          fileData
                        )
                      }
                      type="button"
                      className="btn btn-primary w-[206px] waves-effect "
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
