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
import DragDrop from "@/app/admin-panel/components/SingleFileInput";

import {
  getAllCompanyRequest,
  getAllDesignationRequest,
  getAllTeamRequest,
  createUserRequest,
} from "@/app/api/admin-panel/scripts";
//import CompanyInfoModal from "./CompanyInfoModal";
//import DesignationInfoModal from "./DesignationInfoModal";
//import TeamInfoModal from "./TeamInfoModal";

export default function AdminPanelUserRegistrationForm(props) {
  const [companyList, setCompanyList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [openCompanyModal, setOpenCompanyModal] = useState(false);
  const [openDesignationModal, setOpenDesignationModal] = useState(false);
  const [openTeamModal, setOpenTeamModal] = useState(false);

  const [selectedFilesMain, setSelectedFilesMain] = useState({});
  // console.log(selectedFilesMain);

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

  return (
    <>
      <form id="userRegistrationForm">
        <div class="row">
          <div class="col-md-12">
            <div class="card mb-4">
              <h5 class="card-header">Business Details</h5>
              <div class="card-body demo-vertical-spacing demo-only-element row">
                <div class="form-floating form-floating-outline col-md-6 mb-4 d-flex ">
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

                  {/* <select class="form-select" id="company_id" name="company_id">
                    <option value={""}>Company Name</option>
                    {companyList &&
                      companyList.map((item, i) => (
                        <option value={item.company_id} key={i}>
                          {item.company_name}
                        </option>
                      ))}
                  </select> */}
                  {/*<button onClick={()=>setOpenCompanyModal(true)} type="button" class="btn btn-sm btn-primary waves-effect ml-2">
                    <span class="tf-icons mdi mdi-plus me-1"></span>Add
                    </button>*/}
                </div>
                <div class="form-floating form-floating-outline col-md-6 mt-0 d-flex">
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
                    class="form-select"
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
                  {/*<button onClick={()=>setOpenDesignationModal(true)} type="button" class="btn btn-sm btn-primary waves-effect ml-2">
                    <span class="tf-icons mdi mdi-plus me-1"></span>Add
                    </button>*/}
                </div>
                <div class="form-floating form-floating-outline col-md-6 mb-4 d-flex">
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

                  {/* <select class="form-select" id="team_id" name="team_id">
                    <option value={""}>Team Name</option>
                    {teamList &&
                      teamList.map((item, i) => (
                        <option value={item.team_id} key={i}>
                          {item.team_title}
                        </option>
                      ))}
                  </select> */}
                  {/*<button onClick={()=>setOpenTeamModal(true)} type="button" class="btn btn-sm btn-primary waves-effect ml-2">
                    <span class="tf-icons mdi mdi-plus me-1"></span>Add
                    </button>*/}
                </div>
                <div class="form-floating form-floating-outline col-md-6 mb-4">
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
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  {/* <select class="form-select" id="is_active" name="is_active">
                    <option>User Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Two</option>
                  </select>
                  <label for="is_active">Select User Status</label> */}
                </div>
              </div>

              <hr className="m-0"></hr>

              <h5 class="card-header">User Details</h5>
              <div class="card-body demo-vertical-spacing demo-only-element row">
                <div class="form-floating form-floating-outline col-md-6 mb-4">
                  <TextField
                    variant="outlined"
                    id="first_name"
                    name="first_name"
                    label="First Name"
                    className="w-full bg-white"
                  />
                </div>
                <div class="form-floating form-floating-outline col-md-6 mt-0">
                  <TextField
                    variant="outlined"
                    id="last_name"
                    name="last_name"
                    label="Last Name"
                    className="w-full bg-white"
                  />
                </div>
                <div class="form-floating form-floating-outline col-md-6 mb-4">
                  <TextField
                    variant="outlined"
                    id="user_name"
                    name="user_name"
                    label="User Name"
                    className="w-full bg-white"
                  />
                </div>
                <div class="form-floating form-floating-outline col-md-6 mb-4">
                  <TextField
                    variant="outlined"
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    className="w-full bg-white"
                  />
                </div>
                <div class="form-floating form-floating-outline col-md-6 mb-4">
                  <TextField
                    variant="outlined"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    className="w-full bg-white"
                  />
                </div>
                <div class="form-floating form-floating-outline col-md-6 mb-4">
                  <TextField
                    variant="outlined"
                    id="cpassword"
                    name="cpassword"
                    label="Confirm Password"
                    type="password"
                    className="w-full bg-white"
                  />
                </div>
                <div class=" col-md-6 mb-4">
                  <div class="input-group">
                    {/* {<input
                      type="file"
                      class="form-control p-3"
                      id="user_profile_photo"
                      name="user_profile_photo"
                    />
                    <label class="input-group-text" for="user_profile_photo">
                      Upload Picture
                    </label>} */}
                    <DragDrop
                      setSelectedFilesMain={setSelectedFilesMain}
                      apiBackendURL={props.apiBackendURL}
                      tenantID={props.tenantID}
                    />
                  </div>
                </div>

                <div class=" col-md-12 mb-4 justify-content-center my-3 d-flex">
                  <Link
                    href="/admin-panel/users"
                    class="btn btn-outline-primary w-[206px] mr-3 waves-effect "
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
                        selectedFilesMain
                      )
                    }
                    type="button"
                    class="btn btn-primary w-[206px] waves-effect "
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
