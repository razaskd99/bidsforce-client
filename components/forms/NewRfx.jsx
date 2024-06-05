'use client'
import React,{useState, useEffect} from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Grid,
    Alert,
    Checkbox,
    IconButton,
  } from "@mui/material";
import { Padding } from "@mui/icons-material";
import SearchingListInput from "./SearchingListInput";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { getBidVality, getContentSubmission, getRfxStages, getRfxTypes, getSubmissionMode } from "@/app/api/rfx/actions/rfx";
import ContactDialog from "../ContactPopup";
import { GridSearchIcon } from "@mui/x-data-grid";
import Link from "next/link";
import RFxList from "../RfxList";
import { getAllPrimaryContactsAction } from "@/app/api/contacts/actions/contacts";



export default function NewRFx(props) {

    const {
      isOpen,
      isClose,
      } = props
  

  const [opportunityCrmID, setOpportunityCrmID] = useState(
    props.preRfxData?.crm_id ? props.preRfxData?.crm_id : 0
  );
  const [opportunityTitle, setOpportunityTitle] = useState(
    props.preRfxData?.title ? props.preRfxData?.title : ""
  );
  const [endUser, setEndUser] = useState(
    props.preRfxData?.end_user_name ? props.preRfxData?.end_user_name : ""
  );
  const [customer, setCustomer] = useState(
    props.preRfxData?.customer_name ? props.preRfxData?.customer_name : ""
  );
  const [rfxTypeValue, setRfxTypeValue] = useState(
    props.preRfxData?.rfx_type_id ? props.preRfxData?.rfx_type_id : 0
  );
  const [issuedDate, setIssuedDate] = useState(
    props.preRfxData?.issued_date 
      ? props.preRfxData?.issued_date 
      : new Date().toISOString().slice(0, 10)
  );
  const [dueDate, setDueDate] = useState(
    props.preRfxData?.due_date ? props.preRfxData?.due_date : ""
  );
  const [techClarifDeadline, setTechClarifDeadline] = useState(
    props.preRfxData?.technical_clarification_deadline
      ? props.preRfxData?.technical_clarification_deadline
      : ""
  );
  const [commClarifDeadline, setCommClarifDeadline] = useState(
    props.preRfxData?.commercial_clarification_deadline
      ? props.preRfxData?.commercial_clarification_deadline
      : ""
  );
  const [rfxTypeID, setRfxTypeID] = useState('');
  const [rfxStageID, setRfxStageID] = useState('');
  const [bidValidityID, setBidValidityID] = useState('');
  const [subModeID, setSubModeID] = useState('');
  const [contentSubID, setContentSubID] = useState('');
  
  const [rfxTypeList, setRfxTypeList] = useState([]);
  const [rfxStageList, setRfxStageList] = useState([]);
  const [bidValidityList, setBidValidityList] = useState([]);
  const [subModeList, setSubModeList] = useState([]);
  const [contentSubList, setContentSubList] = useState([]);
  const [primaryContactList, setPrimaryContactList] = useState([]);

  const [isTechContactDialogOpen, setTechContactDialogOpen] = useState(false);
  const [isCommContactDialogOpen, setCommContactDialogOpen] = useState(false);
  const [technicalContact, setTechnicalContact] = useState({});
  const [commercialContact, setCommercialContact] = useState({});

  const [openRfxList, setOpenRfxList] = useState(false);  

  useEffect(() => {
    getRfxTypes()
      .then((resp) => {
        setRfxTypeList(resp.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    getRfxStages()
      .then((resp) => {
        setRfxStageList(resp.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    getBidVality()
      .then((resp) => {
        setBidValidityList(resp.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    getSubmissionMode()
      .then((resp) => {
        setSubModeList(resp.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    getContentSubmission()
      .then((resp) => {
        setContentSubList(resp.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    getAllPrimaryContactsAction()
      .then((resp) => {
        setPrimaryContactList(
          resp.returnData.map((item, index) => ({
            user_id: item.primary_contacts_id,
            first_name: item.first_name,
            last_name: item.last_name,
            designation_title: item.designation_title,
            profile_image: item.profile_image
          }))
        );
      })
      .catch((err) => {});
  }, []);

  
  const handleTechContactSelect = (contact)=>{
    setTechnicalContact(contact);   
    console.log(contact.name) 
  }
  const handleCommContactSelect = (contact)=>{
    setCommercialContact(contact);  
    console.log(contact.name)   
  }

  const handleOpenRFxList = () => {
    setOpenRfxList(true); 
  }

  const handleCloseRFxList = () => {
    setOpenRfxList(false); 
  }
  
 
  return (    
    <>

    <Dialog open={isOpen} onClose={isClose} maxWidth="md" fullWidth>
      <DialogTitle textAlign={"center"}>Log New RFx</DialogTitle>
      <DialogContent>
        <form id="modalform1">
          <Grid container spacing={2} style={{ marginTop: 3 }}>            
            <Grid item xs={12} md={6} fullWidth>            
              <InputLabel id="opp-number-label">
                Opportunity Number
              </InputLabel>
              <span
                className="outline-1 outline-gray-300 w-full"
              >{opportunityCrmID}</span>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel id="opp-name-label">
              Opportunity Name
              </InputLabel>
              <span
                className="outline-1 outline-gray-300 w-full"
              >{opportunityTitle}</span>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel id="customer-label">
                Customer
              </InputLabel>
              <span
                className="outline-1 outline-gray-300 w-full"
              >{customer}</span>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel id="end-user-label">
                End User
              </InputLabel>
              <span
                className="outline-1 outline-gray-300 w-full"
              >{endUser}</span>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel id="rfx-type-label">
                RFx Record Type
              </InputLabel>
              <span
                className="outline-1 outline-gray-300 w-full"
              >New RFx</span>
            </Grid>
            <Grid item xs={12} md={6} className="mt-2 w-full">
              
              <span fullWidth
                className="border border-gray-300 py-4 px-2 w-full"
              ><Link className="text-[#26BADA]" 
              href="#"
              onClick={handleOpenRFxList}
              >Select</Link> the previous RFx Record to copy data</span>
            </Grid>

            <RFxList open={openRfxList} close={handleCloseRFxList} oppID={props.preRfxData.opportunity_id} oppNum={props.preRfxData.crm_id}/>

            <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name=""
              label="Customer RFx Number"
              variant="outlined"
              //onChange={handleChangeValues}
            />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider            
                key={"issued_date"}
                dateAdapter={AdapterDayjs}
                className="w-full bg-white"
              >
                <DemoContainer components={["DatePicker"]}>
                  <div id={"issued_date"} className="w-full ">
                    <DatePicker
                      className="w-full"
                      label={"RFx Issued Date"}
                      value={dayjs(issuedDate)}
                      onChange={(date) =>
                        setIssuedDate(
                          new Date(date).toISOString().slice(0, 10)
                        )
                      }
                    />
                  </div>
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <select
                id="rfx_type"
                className="block w-full px-4 py-4 text-sm border rounded-sm border-gray-300 hover:border-black"
                defaultValue={rfxTypeValue}
                onChange={(e) => setRfxTypeID(parseInt(e.target.value))}
              >
                <option value={0}>Select a RFx Type</option>
                 {rfxTypeList?.map((option) =>
                    <option
                      selected={true}
                      key={option.title}
                      value={option.rfx_type_id}
                    >
                      {option.title}
                    </option>                  
                )} 
              </select>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider
                key={"due_date"}
                dateAdapter={AdapterDayjs}
                className="w-full bg-white "
              >
                <DemoContainer components={["DatePicker"]}>
                  <div id={"due_date"} className="w-full">
                    <DatePicker
                      className="w-full"
                      label={"Bid Due Date"}
                      value={dayjs(dueDate)}
                      onChange={(date) =>
                        setDueDate(new Date(date).toISOString().slice(0, 10))
                      }
                    />
                  </div>
                </DemoContainer>
              </LocalizationProvider>               
            </Grid> 
            <Grid item xs={12} md={6}>
              <select
                id="rfx_stage"
                className="block w-full px-4 py-4 text-sm border rounded-sm border-gray-300 hover:border-black"
                onChange={(e) => setRfxStageID(parseInt(e.target.value))}
              >
                <option value={0}>Select a Bid Type</option>
                {rfxStageList?.map((option) =>
                  <option 
                    key={option.title} 
                    value={option.rfx_stage_id}
                  >
                    {option.title}
                  </option>                
                )} 
              </select>                                
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider
                  key={"technical_clarification_deadline"}
                  dateAdapter={AdapterDayjs}
                  className="w-full bg-white "
              >
                <DemoContainer components={["DatePicker"]}>
                  <div id={"technical_clarification_deadline"} className="w-full">
                    <DatePicker
                      className="w-full"
                      label={"Technical Clarifications Deadline"}
                      value={dayjs(techClarifDeadline)}
                      onChange={(date) =>
                        setTechClarifDeadline(
                          new Date(date).toISOString().slice(0, 10)
                        )
                      }
                    />
                    </div>
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            <Grid item xs={12} md={6}>
              <select
                id="bid_validity"
                className="block w-full px-4 py-4 text-sm border rounded-sm border-gray-300 hover:border-black"
                onChange={(e) => setBidValidityID(parseInt(e.target.value))}
              >
                <option value={0}>Select a Bid Validity</option>
                {bidValidityList?.map((option) =>
                  <option
                    selected
                    key={option.title}
                    value={option.bid_validity_id}
                  >
                    {option.title}
                  </option>                
                )} 
              </select>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider
                key={"commercial_clarification_deadline"}
                dateAdapter={AdapterDayjs}
                className="w-full bg-white "
              >
                <DemoContainer components={["DatePicker"]}>
                  <div id={"commercial_clarification_deadline"} className="w-full">
                    <DatePicker
                      className="w-full"
                      label={"Commercial Clarifications Deadline"}
                      value={dayjs(commClarifDeadline)}
                      onChange={(date) =>
                        setCommClarifDeadline(
                          new Date(date).toISOString().slice(0, 10)
                        )
                      }
                    />
                  </div>
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <select
                id="submission_mode"
                className="block w-full px-4 py-4 text-sm border rounded-sm border-gray-300 hover:border-black"
                onChange={(e) => setSubModeID(parseInt(e.target.value))}
              >
                <option value={0}>Select a Bid Submission Mode</option>
                {subModeList?.map((option) =>
                  <option
                    selected
                    key={option.title}
                    value={option.rfx_submission_mode_id}
                  >
                    {option.title}
                  </option>                 
                )} 
              </select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                labelId="content-submission-label"
                id="content_submission"
                fullWidth
                multiple
                defaultValue={contentSubList}
                onChange={(event) => setContentSubID(prevValue => prevValue ? `${prevValue},${event.target.value}` : event.target.value)}
                label={"Submission Content"}
              >
                {contentSubList?.map((option) => (
                  <MenuItem
                    key={option.title}
                    value={option.title}                    
                  >
                    <Checkbox
                      defaultChecked={
                        contentSubList.indexOf(option.title) > -1
                      }
                      //onChange={() => handleToggle(option.title)}
                    />
                    {option.title}
                  </MenuItem>
                ))} 
              </Select>
            </Grid> 
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name=""
                label="Customer Frame Work Agreement ref #, if applicable"
                variant="outlined"
                //onChange={handleChangeValues}
              />
            </Grid>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name=""
                label="RFx Technical Contact"
                variant="outlined"
                value={technicalContact.name ? technicalContact.name : ''}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setTechContactDialogOpen(true)}>
                      <GridSearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <ContactDialog
              isOpen={isTechContactDialogOpen}
              handleClose={() => setTechContactDialogOpen(false)}
              handleContactSelect={handleTechContactSelect}
              users={primaryContactList}
            />
            <Grid item xs={12} md={6}></Grid>            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name=""
                label="RFx Commercial Contact"
                variant="outlined"
                value={commercialContact.name ? commercialContact.name : ''}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setCommContactDialogOpen(true)}>
                      <GridSearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <ContactDialog
              isOpen={isCommContactDialogOpen}
              handleClose={() => setCommContactDialogOpen(false)}
              handleContactSelect={handleCommContactSelect}
              users={primaryContactList}
            />            
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                name=""
                label="Other instructions for submission"
                variant="outlined"
               // onChange={handleChangeValues}                
              />
            </Grid>
        </Grid>
        </form>
      </DialogContent>
      <DialogContent>
        <Alert
          severity="error"
          id="modalErrorMessageAlert"
          class="bg-red-100 border border-red-200 text-md text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
          style={{ display: "none" }}
        >
          Invalid Operation.
        </Alert>
        <Alert
          severity="success"
          id="modalSuccessMessageAlert"
          class="bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
          style={{ display: "none" }}
        >
          Operation successful.
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={isClose} variant="outlined" color="primary">
            Cancel
          </Button>
          {
            props.buttonType && props.buttonType == "update" 
            ?
            (<Button
              onClick={(e) => {
                updateAccountRequest(e,formData, props.modalData.account_id, selectedFile, fileData)
              }}
              variant="outlined"
              color="primary"
            >
              Update
            </Button>)
            :
            (<Button
              onClick={(e) => {
                createAccountRequest(e,formData,selectedFile,
                  fileData)
              }}
              variant="outlined"
              color="primary"
            >
              Submit
            </Button>)
          }
      </DialogActions>
    </Dialog>

          

    </>

  );
};