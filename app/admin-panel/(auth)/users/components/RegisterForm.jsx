"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import {
  getAllCompanyRequest,
  getAllDesignationRequest,
  getAllTeamRequest,
  createUserRequest,
} from "@/app/api/admin-panel/scripts";

export default function AdminPanelUserRegistrationForm(props) {
  const [companyList, setCompanyList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [selectedFile, setSelectedFile] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [keyChange, setKeyChange] = useState("");

  const [companyName, setCompanyName] = useState("");
  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
    console.log(companyName);
  };

  const [desigination, setDesigination] = useState("");
  const handleDesiginationChange = (event) => {
    setDesigination(event.target.value);
  };

  const [team, setTeam] = useState("");
  const handleTeamNameChange = (event) => {
    setTeam(event.target.value);
  };

  const [activeUser, setActiveUser] = useState("");
  const handleActiveUserChange = (event) => {
    setActiveUser(event.target.value);
  };

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

    // This function will be called when the component unmounts
    return () => {
      // Clean up any effects if needed
    };
  }, [props.apiBackendURL, props.accessToken, props.tenantID]); // Include relevant dependencies

  const handleChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file)); // Set selected image preview

    // Create a new FormData object and append the single file
    const formData = new FormData();
    formData.append("file", file);

    const extractedFile = formData.get("file");

    // Update the selectedFiles array with the single file
    setSelectedFile(extractedFile);
  };

  const keyUp = (e) => {
    const key = e.target.value;
    setKeyChange(key);
  };
  return (
    <>
      <form id="userRegistrationForm">
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <h5 className="card-header">Business Details</h5>
              <div className="card-body demo-vertical-spacing demo-only-element row">
                <div className="form-floating form-floating-outline col-md-6 mb-4 d-flex ">
                  {
                    <Box sx={{ minWidth: 120 }} className="w-full outline-none">
                      <FormControl fullWidth>
                        <InputLabel id="company_id-label">
                          Company Name
                        </InputLabel>
                        <Select
                          labelId="company_id-label"
                          id="company_id"
                          name="company_id"
                          value={companyName}
                          label="Company Name"
                          className="w-full"
                          onChange={handleCompanyNameChange}
                        >
                          <MenuItem value={""}>Company Name</MenuItem>

                          {companyList &&
                            companyList.map((item, i) => (
                              <MenuItem value={item.company_id} key={i}>
                                {item.company_name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  }

                  {/* <select className="form-select" id="company_id" name="company_id">
                    <option value={""}>Company Name</option>
                    {companyList &&
                      companyList.map((item, i) => (
                        <option value={item.company_id} key={i}>
                          {item.company_name}
                        </option>
                      ))}
                  </select> */}
                  {/*<button onClick={()=>setOpenCompanyModal(true)} type="button" className="btn btn-sm btn-primary waves-effect ml-2">
                    <span className="tf-icons mdi mdi-plus me-1"></span>Add
                    </button>*/}
                </div>
                <div className="form-floating form-floating-outline col-md-6 mt-0 d-flex">
                  <Box sx={{ minWidth: 120 }} className="w-full outline-none">
                    <FormControl fullWidth>
                      <InputLabel id="designation_id-label">
                        Designation Name
                      </InputLabel>
                      <Select
                        labelId="designation_id-label"
                        id="designation_id"
                        value={desigination}
                        label="Designation Name"
                        className="w-full"
                        onChange={handleDesiginationChange}
                      >
                        <MenuItem value={""}>Designation Name</MenuItem>

                        {designationList &&
                          designationList.map((item, i) => (
                            <MenuItem value={item.designation_id} key={i}>
                              {item.title}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Box>
                  {/* <select
                    className="form-select"
                    id="designation_id"
                    name="designation_id"
                  >
                    <option value={""}>Designation Name</option>
                    {designationList &&
                      designationList.map((item, i) => (
                        <option value={item.designation_id} key={i}>
                          {item.title}
                        </option>
                      ))}
                  </select> */}
                  {/*<button onClick={()=>setOpenDesignationModal(true)} type="button" className="btn btn-sm btn-primary waves-effect ml-2">
                    <span className="tf-icons mdi mdi-plus me-1"></span>Add
                    </button>*/}
                </div>
                <div className="form-floating form-floating-outline col-md-6 mb-4 d-flex">
                  <Box sx={{ minWidth: 120 }} className="w-full outline-none">
                    <FormControl fullWidth>
                      <InputLabel id="team_id-label">Team Name</InputLabel>
                      <Select
                        labelId="team_id-label"
                        id="team_id"
                        value={team}
                        label="Team Name"
                        className="w-full"
                        onChange={handleTeamNameChange}
                      >
                        <MenuItem value={""}>Team Name</MenuItem>
                        {teamList &&
                          teamList.map((item, i) => (
                            <MenuItem value={item.team_id} key={i}>
                              {item.team_title}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Box>

                  {/* <select className="form-select" id="team_id" name="team_id">
                    <option value={""}>Team Name</option>
                    {teamList &&
                      teamList.map((item, i) => (
                        <option value={item.team_id} key={i}>
                          {item.team_title}
                        </option>
                      ))}
                  </select> */}
                  {/*<button onClick={()=>setOpenTeamModal(true)} type="button" className="btn btn-sm btn-primary waves-effect ml-2">
                    <span className="tf-icons mdi mdi-plus me-1"></span>Add
                    </button>*/}
                </div>
                <div className="form-floating form-floating-outline col-md-6 mb-4">
                  <Box sx={{ minWidth: 120 }} className="w-full outline-none">
                    <FormControl fullWidth>
                      <InputLabel id="is_active-label">
                        Select User Status
                      </InputLabel>
                      <Select
                        labelId="is_active-label"
                        id="is_active"
                        value={activeUser}
                        label="Select User Status"
                        className="w-full"
                        onChange={handleActiveUserChange}
                      >
                        <MenuItem value={""}>User Status</MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  {/* <select className="form-select" id="is_active" name="is_active">
                    <option>User Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Two</option>
                  </select>
                  <label for="is_active">Select User Status</label> */}
                </div>
              </div>

              <hr className="m-0"></hr>

              <h5 className="card-header">User Details</h5>
              <div className="card-body demo-vertical-spacing demo-only-element row">
                <div className="form-floating form-floating-outline col-md-6 mb-4">
                  <TextField
                    variant="outlined"
                    id="first_name"
                    name="first_name"
                    label="First Name"
                    className="w-full bg-white"
                  />
                </div>
                <div className="form-floating form-floating-outline col-md-6 mt-0">
                  <TextField
                    variant="outlined"
                    id="last_name"
                    name="last_name"
                    label="Last Name"
                    className="w-full bg-white"
                  />
                </div>
                <div className="form-floating form-floating-outline col-md-6 mb-4">
                  <TextField
                    variant="outlined"
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    className="w-full bg-white"
                    onChange={keyUp}
                  />
                </div>
                <div className="form-floating form-floating-outline col-md-6 mb-4">
                  <TextField
                    variant="outlined"
                    id="user_name"
                    name="user_name"
                    label="User Name"
                    className="w-full bg-white"
                    value={keyChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div className="form-floating form-floating-outline col-md-6 mb-4">
                  <TextField
                    variant="outlined"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    className="w-full bg-white"
                  />
                </div>
                <div className="form-floating form-floating-outline col-md-6 mb-4">
                  <TextField
                    variant="outlined"
                    id="cpassword"
                    name="cpassword"
                    label="Confirm Password"
                    type="password"
                    className="w-full bg-white"
                  />
                </div>
                <div className=" col-md-6 mb-4">
                  <div className="input-group">
                    {/* {<input
                      type="file"
                      className="form-control p-3"
                      id="user_profile_photo"
                      name="user_profile_photo"
                    />
                    <label className="input-group-text" for="user_profile_photo">
                      Upload Picture
                    </label>} */}

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

                <div className=" col-md-12 mb-4 justify-content-center my-3 d-flex">
                  <Link
                    href="/admin-panel/users"
                    className="btn btn-outline-primary w-[206px] mr-3 waves-effect "
                  >
                    Cancel
                  </Link>
                  <button
                    onClick={(e) =>
                      createUserRequest(
                        e,
                        props.apiBackendURL,
                        props.accessToken,
                        props.tenantID,
                        companyName,
                        desigination,
                        team,
                        activeUser,
                        selectedFile,
                        "user-profile"
                      )
                    }
                    type="button"
                    className="btn btn-primary w-[206px] waves-effect "
                  >
                    Add Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* {{openCompanyModal && (
        <CompanyInfoModal setOpenCompanyModal={setOpenCompanyModal} />
      )}
      {openDesignationModal && (
        <DesignationInfoModal
          setOpenDesignationModal={setOpenDesignationModal}
        />
      )}
      {openTeamModal && <TeamInfoModal setOpenTeamModal={setOpenTeamModal} />}} */}
    </>
  );
}
