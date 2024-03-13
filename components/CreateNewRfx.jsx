"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import DatePickerInput from "@/components/DatePickerInput";
import { Checkbox, FormGroup, ListItemText, TextField, Avatar, Typography } from "@mui/material";
import { HiOutlineTrash } from "react-icons/hi2";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import PopupInput from "@/components/PopupInput";
import DragDrop from "@/components/FileInput";
import ContactDialog from '@/components/ContactPopup';
import Link from "next/link";
import CheckboxDropdown from "@/components/CheckboxDropdown";
import { getRfxById, getRfxContacts, getUsers, GetRfxDocumentsAction } from "@/app/api/rfx/actions/rfx";
import { getRfxTypes, createUpdateRfxRequest } from "@/app/api/rfx/scripts";
import { formatDate, fileDownload } from "@/app/api/util/utility";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useRouter } from 'next/navigation'

const CreateNewRfx = ({
  preRfxData,
  rfxType,
  rfxStages,
  bidValidity,
  submissionMode,
  contentSubmission,
  users,
  companies,
  apiBackendURL,
  tenantID,
  loginUserID,
}) => {

  const router = useRouter()


  const currentDate = new Date();
  // Format the date as "MM/DD/YYYY"
  const currentdDate = `${currentDate.getMonth() + 1
    }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "RFx List", href: "/rfx" },
    { label: "New Rfx", href: "rfx/newrfx" },
  ];

  let date = new Date().toLocaleDateString();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("");

  const [selectedFilesMain, setSelectedFilesMain] = useState([]);
  const [uploaded, setUploaded] = useState(false);



  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handlePersonSelect = (person) => {
    setSelectedPerson(person);
    handleModalClose();
  };
  const open = Boolean(anchorEl);
  const [selectedValue, setSelectedValue] = useState("no");
  const [isRevision, setIsRevision] = useState("no");
  const [selectedValueExistingAgreement, setSelectedValueExistingAgreement] =
    useState("no");

  const [contactsData, setContactsData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const [popUp, setPopUp] = useState([]);

  const [rfxId, setRfxId] = useState(
    preRfxData?.rfx_id ? preRfxData?.rfx_id : 0
  );
  const [initiatorId, setInitiatorId] = useState(
    loginUserID ? loginUserID : 0
  );
  const [customer, setCustomer] = useState(
    preRfxData?.customer ? preRfxData?.customer : ""
  );
  const [opportunityId, setOpportunityId] = useState(
    preRfxData?.opportunity_id ? preRfxData?.opportunity_id : 0
  );
  const [opportunityTitle, setOpportunityTitle] = useState(
    preRfxData?.opportunity_title ? preRfxData?.opportunity_title : ""
  );
  const [company, setCompany] = useState(
    preRfxData?.company ? preRfxData?.company : ""
  );
  const [companyID, setCompanyID] = useState(
    preRfxData?.company_id ? preRfxData?.company_id : 0
  );
  const [endUser, setEndUser] = useState(
    preRfxData?.end_user ? preRfxData?.end_user : ""
  );
  const [endUserId, setEndUserId] = useState(
    preRfxData?.enduser_id ?? 0
  );
  const [rfxNumber, setRfxNumber] = useState(
    preRfxData?.rfx_number ? preRfxData?.rfx_number : ""
  );
  const [contentSubmissionValue, setContentSubmissionValue] = useState(
    preRfxData?.submission_content ? preRfxData?.submission_content : []
  );

  const [rfxTypeValue, setRfxTypeValue] = useState(
    preRfxData?.rfx_type_id ?? 0
  );
  const [stageValue, setStageValue] = useState(
    preRfxData?.rfx_stage_id ?? 0
  );
  const [bidValidityValue, setBidValidityValue] = useState(
    preRfxData?.bid_validity_id ?? 0
  );
  const [submissionModeValue, setSubmissionModeValue] = useState(
    preRfxData?.rfx_submission_mode_id ?? 0
  );
  const [issueDate, setIssueDate] = useState(
    preRfxData?.issued_date
      ? preRfxData?.issued_date
      : new Date().toISOString().slice(0, 10)
  );
  const [dueDate, setDueDate] = useState(
    preRfxData?.due_date
      ? preRfxData?.due_date
      : ''
  );
  const [technicalClarificationDeadline, setTechnicalClarificationDeadline] =
    useState(
      preRfxData?.technical_clarification_deadline
        ? preRfxData?.technical_clarification_deadline
        : ''
    );
  const [commercialClarificationDeadline, setCommercialClarificationDeadline] =
    useState(
      preRfxData?.commercial_clarification_deadline
        ? preRfxData?.commercial_clarification_deadline
        : ''
    );
  const [submissionInstructions, setSubmissionInstructions] = useState(
    preRfxData?.submission_instructions
      ? preRfxData?.submission_instructions
      : ''
  );
  const [visitToWorkSite, setVisitToWorkSite] = useState(
    preRfxData?.visit_worksite ? preRfxData?.visit_worksite : "no"
  );
  const [visitToWorksiteInstruction, setVisitToWebsiteInstruction] = useState(
    preRfxData?.visit_worksite_instructions
      ? preRfxData?.visit_worksite_instructions
      : ""
  );
  const [agreementReferenceNumber, setAgreementReferenceNumber] = useState(
    preRfxData?.agreement_ref_num ? preRfxData?.agreement_ref_num : ""
  );
  const [existingAgreement, setExistingAgreement] = useState(
    preRfxData?.under_existing_agreement
      ? preRfxData?.under_existing_agreement
      : ""
  );
  const [opportunityCrmID, setOpportunityCrmID] = useState(
    preRfxData?.crm_id ? parseInt(preRfxData?.crm_id) : 0
  );
  const [expectedAwardDate, setExpectedAwardDate] = useState(
    preRfxData?.expected_award_date
      ? new Date(preRfxData?.expected_award_date).toISOString().slice(0, 10)
      : ""
  );
  const [bidNumber, setBidNumber] = useState(
    preRfxData?.bid_number ? preRfxData?.bid_number : ""
  );
  const [acknowledgedBy, setAcknowledgedBy] = useState(
    preRfxData?.acknowledged_by ? preRfxData?.acknowledged_by : 0
  );
  const [acknowledgementDate, setAcknowledgementDate] = useState(
    preRfxData?.acknowledgement_date
      ? new Date(preRfxData?.acknowledgement_date).toISOString().slice(0, 10)
      : null
  );
  const [acknowledgementComment, setAcknowledgementComment] = useState(
    preRfxData?.acknowledgement_comment ? preRfxData?.acknowledgement_comment : ""
  );
  const [acknowledged, setAcknowledged] = useState(
    preRfxData?.acknowledged ? preRfxData?.acknowledged : false
  );
  const [acknowledgementDocument, setAcknowledgementDocument] = useState(
    preRfxData?.acknowledgement_document ? preRfxData?.acknowledgement_document : 0
  );
  const [acknowledgementSubmittedOn, setAcknowledgementSubmittedOn] = useState(
    preRfxData?.acknowledgement_submitted_on
      ? new Date(preRfxData?.acknowledgement_submitted_on).toISOString().slice(0, 10)
      : null
  );

  const [attachedDocuments, setAttachedDocuments] = useState([]);
  const [documentsFormData, setDocumentsFormData] = useState(null);
  const [documentsUploaded, setDocumentsUploaded] = useState(false);
  const [selectedContact, setSelectedContacts] = useState([]);
  const [isContactDialogOpen, setContactDialogOpen] = useState(false)
  const [isAddContactClicked, setAddContactClicked] = useState(false);
  const handleContactSelect = (contact) => {
    const temp = selectedContact.filter((c) => c.id == contact.id)
    if (!temp || !temp.length) {
      setSelectedContacts((prevContacts) => [...prevContacts, contact]);
    }
    console.log(selectedContact)
  };
  const handleAddContactClick = () => {
    setPopUp(prevPopUp => [
      ...prevPopUp,
      <PopupInput
        key={prevPopUp.length}
        label={'rfx'}
        className="w-[430px]"
        users={users}
        onCloseDialog={handleClosePopupInput}
        setAddedContacts={setAddedContacts}
      />
    ]);
  };

  const handleClosePopupInput = (persons) => {

    //console.log('2222222222222222222',persons)

  };


  const [addedContacts, setAddedContacts] = useState([]);
  const [documentsData, setDocumentsData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);



  useEffect(() => {
    if (visitToWorkSite == true) {
      setVisitToWorkSite("yes");
    } else if (visitToWorkSite == false) {
      setVisitToWorkSite("no");
    }
  }, [visitToWorkSite]);

  useEffect(() => {
    if (existingAgreement == true) {
      setExistingAgreement("yes");
    } else if (existingAgreement == false) {
      setExistingAgreement("no");
    }
  }, [existingAgreement]);

  const handleToggle = (value) => {
    const currentIndex = selectedOptions.indexOf(value);
    const newSelectedOptions = [...selectedOptions];

    if (currentIndex === -1) {
      newSelectedOptions.push(value);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }

    setSelectedOptions(newSelectedOptions);
  };

  const handleRadioClick = (value) => {
    setSelectedValue(value);
  };

  const handleExistingAgreement = (value) => {
    setExistingAgreement(value);
  };

  const handleVisitToWorkSite = (value) => {
    setVisitToWorkSite(value);
  };

  const handleRadioChange = (value) => {
    setIsRevision(value);
  };

  const loadRfxRequest = async () => {
    let rfxNumb = document.getElementById("prevRfxNumber").value.trim();

    if (rfxNumb !== "") {
      let res = await getRfxById(rfxNumb);

      let contactsResponse = await getRfxContacts(rfxNumb);
      if (contactsResponse.statusCode == 200) {
        if (contactsResponse?.rfxData && contactsResponse?.rfxData.length > 0) {
          setContactsData(contactsResponse?.rfxData);
        }
      }

      let documentsResponse = await GetRfxDocumentsAction(rfxNumb);
      if (documentsResponse.statusCode == 200) {
        if (documentsResponse?.returnData && documentsResponse?.returnData.length > 0) {
          setDocumentsData(documentsResponse?.returnData);
        }
      }

      if (res.statusCode == 200) {
        let prevRfxData = res.rfxData;
        setCustomer(prevRfxData.customer_name);
        setOpportunityId(prevRfxData?.opportunity_id);
        setOpportunityTitle(prevRfxData?.opportunity_title);

        setCompanyID(prevRfxData?.company_id);
        setCompany(prevRfxData?.company_name);
        setEndUser(prevRfxData?.end_user_name);
        setEndUserId(preRfxData?.enduser_id);

        setContentSubmissionValue(prevRfxData?.submission_content);

        setRfxNumber(prevRfxData.rfx_number);
        setRfxId(prevRfxData.rfx_id);
        setRfxTypeValue(prevRfxData?.rfx_type_id);
        setStageValue(prevRfxData?.rfx_stage_id);
        setBidValidityValue(prevRfxData?.bid_validity_id);
        setSubmissionModeValue(prevRfxData?.rfx_submission_mode_id);
        setIssueDate(new Date(prevRfxData?.issued_date).toISOString().slice(1, 10));
        setDueDate(new Date(prevRfxData?.due_date).toISOString().slice(1, 10));
        setTechnicalClarificationDeadline(
          new Date(prevRfxData?.tech_clarification_deadline).toISOString().slice(1, 10)
        );
        setCommercialClarificationDeadline(
          prevRfxData?.com_clarification_deadline
        );
        setSubmissionInstructions(prevRfxData?.submission_instructions);
        setVisitToWorkSite(prevRfxData?.visit_worksite);
        setVisitToWebsiteInstruction(prevRfxData?.visit_worksite_instructions);
        setExistingAgreement(prevRfxData?.under_existing_agreement);
        setAgreementReferenceNumber(prevRfxData?.agreement_ref_num);

      } else {
        alert("RFx No Found Against this ID!");
      }
    } else {
      alert("Enter a Valid Rfx Number!");
    }
  };


  const loadUsersRequest = async () => {
    let usersResponse = await getUsers();
    if (usersResponse.statusCode == 200) {
      if (usersResponse?.rfxData && usersResponse?.rfxData.length > 0) {
        setUsersData(usersResponse?.data);
      }
    }
  };


  const handleRadioChangeExistingAgreement = (event) => {
    alert(event.target.value);
    setSelectedValueExistingAgreement(event.target.value);
    // Additional actions based on the selected value can be performed here
  };


  const uploadFiles = async (selectedFilesMain, apiBackendURL,
    tenantID) => {
    //event.preventDefault();



    try {


      const formData = new FormData();
      for (let i = 0; i < selectedFilesMain.length; i++) {
        formData.append('files', selectedFilesMain[i]);
      }

      // Make a POST request to your FastAPI route			
      const response = await fetch(apiBackendURL + "uploads/upload/", {
        method: "POST",
        body: formData,
        headers: {
          'accept': 'application/json',
          'tenantID': "2",
          'docvaltKey': "docvaltkey",
          'rfxID': "22222",
          // No need to set 'Content-Type' as it is automatically set for multipart/form-data
        },
      });

      if (response.ok) {
        console.log("Files uploaded successfully");
        setUploaded(true)
        props.setDocumentsUploaded(true);
      } else {
        console.error("Failed to upload files");
      }

    } catch (error) {
      console.error("Error uploading files", error);
    }
  };



  return (
    <>
      <div>
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex flex-col md:flex-row items-center my-5">
          <FormControl className="flex flex-row gap-8 items-center my-5">
            <FormLabel
              id="revision-radio-buttons-group-label"
              className="text-black"
            >
              Is this request a revision of previous RFx?
            </FormLabel>
            <RadioGroup
              aria-labelledby="revision-radio-buttons-group-label"
              value={isRevision}
              onChange={(event) => handleRadioChange(event.target.value)}
              row
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          <div className="flex flex-col md:flex-row items-center my-5 w-[400px]">
            {isRevision === "yes" && (
              <>
                <TextField
                  id="prevRfxNumber"
                  label="Previous RFx reference number"
                  variant="outlined"
                  className="bg-white w-full mt-4"
                />
                <button
                  onClick={() => {
                    loadRfxRequest();
                  }}
                  className="w-20 h-10 ml-4 bg-blue-500 text-white p-2 mt-3 "
                  type="button"
                >
                  Load
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-5 w-full">
          <div className="flex flex-[1]  flex-col gap-4">
            <div className="relative w-full">
              <AiOutlineQuestionCircle className="absolute right-0.5 top-0.5 z-10 text-[#98A9BC]" />
              <TextField
                id="customer"
                label={customer ? "" : "Customer"}
                variant="outlined"
                className="bg-white w-full"
                defaultValue={customer}
              />
            </div>
            <div className="relative w-full">
              <AiOutlineQuestionCircle className="absolute right-0.5 top-0.5 z-10 text-[#98A9BC]" />
              <TextField
                id="opportunity_title"
                label={opportunityTitle ? "" : "Title"}
                variant="outlined"
                className="bg-white w-full"
                defaultValue={opportunityTitle}
                onChange={(e) => setOpportunityTitle(e.target.value)}
              />
            </div>
            <div className="relative w-full">
              <select
                id="company_id"
                className="block w-full px-4 py-4 text-sm border rounded-sm border-gray-300 hover:border-black"
                onChange={(e) => setCompanyID(parseInt(e.target.value))}
              >
                <option value={0}>Select Company</option>
                {companies.map((option) =>
                  companyID === option.company_id ? (
                    <option selected key={option.company_name} value={option.company_id}>
                      {option.company_name}
                    </option>
                  ) : (
                    <option key={option.company_name} value={option.company_id}>
                      {option.company_name}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="relative w-full">
              <AiOutlineQuestionCircle className="absolute right-0.5 top-0.5 z-10 text-[#98A9BC]" />
              <TextField
                id="end_user"
                label={endUser ? "" : "End User"}
                variant="outlined"
                className="bg-white w-full"
                defaultValue={endUser}
                onChange={(e) => setEndUser(e.target.value)}
              />
            </div>
            {/* id=content_submission*/}

            <FormControl className="bg-white">
              <InputLabel id="content-submission-label">
                Content Submission
              </InputLabel>
              <Select
                labelId="content-submission-label"
                id="content_submission"
                multiple
                defaultValue={contentSubmissionValue}
                onChange={(event) => setSelectedOptions(event.target.value)}
                label={"Content Submission"}
              >
                {contentSubmission.map((option) => (
                  <MenuItem key={option.title} value={option.rfx_content_submission_id}>
                    <Checkbox
                      defaultChecked={
                        contentSubmissionValue.indexOf(option.title) > -1
                      }
                      onChange={() => handleToggle(option.title)}
                    />
                    {option.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex flex-[1] flex-col gap-4">
            <div className="relative w-full">
              <AiOutlineQuestionCircle className="absolute right-0.5 top-0.5 z-10 text-[#98A9BC]" />
              <TextField
                id="rfx_number"
                label={rfxNumber ? "" : "RFx #"}
                variant="outlined"
                className="bg-white w-full"
                defaultValue={rfxNumber}
                onChange={(e) => setRfxNumber(e.target.value)}
              />
            </div>

            <select
              id="rfx_type"
              className="block w-full px-4 py-4 text-sm border rounded-sm border-gray-300 hover:border-black"
              defaultValue={rfxTypeValue}
              onChange={(e) => setRfxTypeValue(parseInt(e.target.value))}
            >
              <option value={0}>Select a RFx Type</option>
              {rfxType.map((option) =>
                rfxTypeValue == parseInt(option.rfx_type_id) ? (
                  <option
                    selected={true}
                    key={option.title}
                    value={option.rfx_type_id}
                  >
                    {option.title}
                  </option>
                ) : (
                  <option key={option.title} value={option.rfx_type_id}>
                    {option.title}
                  </option>
                )
              )}
            </select>

            <select
              id="rfx_stage"
              className="block w-full px-4 py-4 text-sm border rounded-sm border-gray-300 hover:border-black"
              onChange={(e) => setStageValue(parseInt(e.target.value))}
            >
              <option value={0}>Select a Rfx Stage</option>
              {rfxStages.map((option) =>
                stageValue === option.rfx_stage_id ? (
                  <option selected key={option.title} value={option.rfx_stage_id}>
                    {option.title}
                  </option>
                ) : (
                  <option key={option.title} value={option.rfx_stage_id}>
                    {option.title}
                  </option>
                )
              )}
            </select>

            <select
              id="bid_validity"
              className="block w-full px-4 py-4 text-sm border rounded-sm border-gray-300 hover:border-black"
              onChange={(e) => setBidValidityValue(parseInt(e.target.value))}
            >
              <option value={0}>Select a Bid Validity</option>
              {bidValidity.map((option) =>
                bidValidityValue === option.bid_validity_id ? (
                  <option selected key={option.title} value={option.bid_validity_id}>
                    {option.title}
                  </option>
                ) : (
                  <option key={option.title} value={option.bid_validity_id}>
                    {option.title}
                  </option>
                )
              )}
            </select>

            <select
              id="submission_mode"
              className="block w-full px-4 py-4 text-sm border rounded-sm border-gray-300 hover:border-black"
              onChange={(e) => setSubmissionModeValue(parseInt(e.target.value))}
            >
              <option value={0}>Select a Submission Mode</option>
              {submissionMode.map((option) =>
                submissionModeValue === option.rfx_submission_mode_id ? (
                  <option selected key={option.title} value={option.rfx_submission_mode_id}>
                    {option.title}
                  </option>
                ) : (
                  <option key={option.title} value={option.rfx_submission_mode_id}>
                    {option.title}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="flex flex-[1] flex-col gap-3">
            <div className="">
              <div className="bg-[#00000005] p-[14px] text-[#778CA2]">
                Critical Dates
              </div>
              <div className="bg-[#F8FAFB] flex flex-col gap-2 py-4 px-6 rounded-b-md date-picker">
                <LocalizationProvider
                  key={"issue_date"}
                  dateAdapter={AdapterDayjs}
                  className="w-full bg-white "
                >
                  <DemoContainer components={["DatePicker"]}>
                    <div id={"issue_date"}>
                      <DatePicker
                        label={"Issue Date"}
                        value={dayjs(issueDate)}
                        onChange={(date) => setIssueDate(new Date(date).toISOString().slice(0, 10))}
                      />
                    </div>
                  </DemoContainer>
                </LocalizationProvider>

                <LocalizationProvider
                  key={"due_date"}
                  dateAdapter={AdapterDayjs}
                  className="w-full bg-white "
                >
                  <DemoContainer components={["DatePicker"]}>
                    <div id={"due_date"}>
                      <DatePicker
                        label={"Due Date"}
                        value={dayjs(dueDate)}
                        onChange={(date) => setDueDate(new Date(date).toISOString().slice(0, 10))}
                      />
                    </div>
                  </DemoContainer>
                </LocalizationProvider>

                <LocalizationProvider
                  key={"technical_clarification_deadline"}
                  dateAdapter={AdapterDayjs}
                  className="w-full bg-white "
                >
                  <DemoContainer components={["DatePicker"]}>
                    <div id={"technical_clarification_deadline"}>
                      <DatePicker
                        label={"Technical clarification deadline"}
                        value={dayjs(technicalClarificationDeadline)}
                        onChange={(date) => setTechnicalClarificationDeadline(new Date(date).toISOString().slice(0, 10))}
                      />
                    </div>
                  </DemoContainer>
                </LocalizationProvider>

                <LocalizationProvider
                  key={"commercial_clarification_deadline"}
                  dateAdapter={AdapterDayjs}
                  className="w-full bg-white "
                >
                  <DemoContainer components={["DatePicker"]}>
                    <div id={"commercial_clarification_deadline"}>
                      <DatePicker
                        label={"Commercial clarification deadline"}
                        value={dayjs(commercialClarificationDeadline)}
                        onChange={(date) => setCommercialClarificationDeadline(new Date(date).toISOString().slice(0, 10))}
                      />
                    </div>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex-[2] flex flex-col">
            <textarea
              id="Submission_instructions"
              name="instructions"
              rows="4"
              cols="50"
              placeholder="Submission Instructions"
              className="outline-0 p-2"
              defaultValue={submissionInstructions}
              onChange={(e) => setSubmissionInstructions(e.target.value)}
            ></textarea>

            <FormControl className="flex flex-row gap-8 items-center my-5">
              <FormLabel
                id="revision-radio-buttons-group-label"
                className="text-black"
              >
                Visit to worksite
              </FormLabel>
              <RadioGroup
                aria-labelledby="revision-radio-buttons-group-label"
                value={visitToWorkSite}
                onChange={(event) => handleVisitToWorkSite(event.target.value)}
                row
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            <textarea
              id="work_site_instructions"
              name="visit_to_work_site_instructions"
              rows="4"
              cols="50"
              placeholder="Visit to work site instructions"
              className="outline-0 p-2"
              defaultValue={visitToWorksiteInstruction}
              onChange={(e) => setVisitToWebsiteInstruction(e.target.value)}
            ></textarea>

            <div className="flex flex-col md:flex-row items-center my-5 w-full">
              <FormControl className="flex flex-row gap-8 items-center my-5">
                <FormLabel
                  id="revision-radio-buttons-group-label"
                  className="text-black"
                >
                  Does this RFx fall under an existing agreement with the
                  supplier?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="revision-radio-buttons-group-label"
                  value={existingAgreement}
                  onChange={(event) =>
                    handleExistingAgreement(event.target.value)
                  }
                  row
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="relative w-[400px]">
              <AiOutlineQuestionCircle className="absolute right-0.5 top-0.5 z-10 text-[#98A9BC]" />
              <TextField
                id="agreement_reference_number"
                label={
                  agreementReferenceNumber
                    ? agreementReferenceNumber
                    : "Agreement reference number"
                }
                variant="outlined"
                className="bg-white w-full"
                defaultValue={agreementReferenceNumber}
                onChange={(e) => setAgreementReferenceNumber(e.target.value)}
              />
            </div>
            <DragDrop setSelectedFilesMain={setSelectedFilesMain} setAttachedDocuments={setAttachedDocuments} apiBackendURL={apiBackendURL} storedDocuments={documentsData} tenantID={tenantID} docvaltkey="rfx" rfxID={rfxNumber} />

            {/*documentsData.length && <div className="mt-5">
              {documentsData?.map((doc, index) => (
                <div className="flex justify-between mb-2">
                  <div className="w-1/3"><button onClick={(e)=>fileDownload(e, tenantID, apiBackendURL, doc.docvalt_filename, 'rfx')}>{doc.docvalt_filename}</button></div>
                  <div className="w-1/3 text-gray-400">{doc.file_size}</div>             
                  <div className="w-1/3 text-gray-400">{formatDate(doc.created_date)}</div> 
                </div>
              ))}
              </div>*/}

          </div>

          <div className="flex-[1] mt-5">
            <div className="border mb-3 rounded-md">
              <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] ">RFx Contacts</div>
              {contactsData.map((contact, index) => (
                <TextField
                key={index}
                  variant="outlined"
                  label={contact.conatct_key}
                  value={contact.first_name + '' + contact.last_name}
                  className="w-full  pointer-events-none mb-3"
                  data_user_id={''}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              ))}

            </div>
            <div className="">
              <div className="bg-[#00000005] p-[14px] text-[#778CA2] flex items-center justify-between">
                <span>Key Contacts</span>
                <button onClick={handleAddContactClick} className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium  css-78trlr-MuiButtonBase-root-MuiIconButton-root" tabindex="0" type="button" >
                  <img loading="lazy" width="18" height="21" decoding="async" data-nimg="1" src="/add-blue.svg" style={{ color: "transparent" }} />
                  <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
                </button>
              </div>
              <div className="bg-[#F8FAFB] flex flex-col gap-3 py-4 rounded-b-md items-center w-full">

                {popUp.map((popup, index) => (
                  <div key={index}>{popup}</div>
                ))}

                {/* <PopupInput
                  label={'Add contact'}
                  className="w-[430px]"
                  // users={users}
                  // key={contact.id}
                  onCloseDialog={handleClosePopupInput} // Pass the callback function

                /> */}
                {/* {renderPopups()} */}

                {/* <button 
                    className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium right-4 mt-2  css-78trlr-MuiButtonBase-root-MuiIconButton-root" 
                    tabindex="0" 
                    type="button"
                    onClick={()=>setContactDialogOpen(true)}
                  >
                <img loading="lazy" width="18" height="21" decoding="async" data-nimg="1" src="/add-blue.svg" style={{ color: 'transparent' }} />
                <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
              </button> */}
              </div>

            </div>
          </div>
        </div>

        <ContactDialog isOpen={isContactDialogOpen} handleClose={() => setContactDialogOpen(false)} handleContactSelect={handleContactSelect} users={users} />

        <div className="flex items-center gap-4 mt-20">
          <button className="border border-[#26BADA] bg-white text-[#26BADA] text-sm uppercase px-20 py-3 rounded-sm">
            Cancel
          </button>
          <button
            onClick={() => {
              createUpdateRfxRequest({
                "opportunity_id": preRfxData.opportunity_id,
                "initiator_id": loginUserID,
                "rfx_bid_assignto": 0,
                "rfx_title": opportunityTitle,
                "rfx_number": rfxNumber,
                "under_existing_agreement": existingAgreement === 'yes' ? true : false,
                "status": '',
                "previous_rfx_ref_num": '',
                "revision_of_previous_rfx": isRevision ? true : false,
                "agreement_ref_num": agreementReferenceNumber,
                "issued_date": issueDate ? issueDate : null,
                "due_date": dueDate ? dueDate : null,
                "crm_id": opportunityCrmID,
                "bid_number": bidNumber,
                "request_for_bid": false,
                "visit_worksite": visitToWorkSite === 'yes' ? true : false,
                "visit_worksite_instructions": visitToWorksiteInstruction,
                "tech_clarification_deadline": technicalClarificationDeadline ? technicalClarificationDeadline : null,
                "com_clarification_deadline": commercialClarificationDeadline ? commercialClarificationDeadline : null,
                "expected_award_date": expectedAwardDate ? expectedAwardDate : null,
                "enduser_name": endUser,
                "enduser_id": 1,
                "enduser_type": '',
                "acknowledged_by": 0,
                "acknowledgement_date": acknowledgementDate ? acknowledgementDate : null,
                "acknowledgement_comment": acknowledgementComment,
                "acknowledged": acknowledged,
                "acknowledgement_document": acknowledgementDocument,
                "acknowledgement_submitted_on": acknowledgementSubmittedOn ? acknowledgementSubmittedOn : null,
                "rfx_type_id": rfxTypeValue,
                "bid_validity_id": bidValidityValue,
                "rfx_content_submission": contentSubmission,
                "rfx_content_submission_id": 1,
                "rfx_submission_mode_id": submissionModeValue,
                "submission_instructions": submissionInstructions,
                "rfx_stage_id": stageValue,
                "key_contacts": addedContacts,
                "attached_documents": attachedDocuments,
                "revesion_of_previous_rfx": isRevision === 'yes' ? true : false,
                "attached_documents_uploaded": documentsUploaded,
                "attachedFormData": documentsFormData
              }, isRevision, rfxId, tenantID, apiBackendURL, selectedFilesMain,router)


            }}
            className="border border-[#26BADA] text-white bg-[#26BADA] text-sm uppercase px-20 py-3 rounded-sm"
          >
            Submit
          </button>
        </div>
      </div >
    </>
  );
};

export default CreateNewRfx;