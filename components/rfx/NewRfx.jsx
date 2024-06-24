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
    ListItemText,
  } from "@mui/material";
  import Link from "next/link";
import SearchingListInput from "../forms/SearchingListInput";
import { generateRFxID, showMainLoader102 } from "../../app/api/util/utility";
import { createRfxRequest, updateRfxRequest } from "@/app/api/rfx/scripts";
import { getCookieValue } from "@/lib/scripts";
import { getMaxRfxByIdAction } from "@/app/api/rfx/actions/rfx";
import RFxList from "./RfxList"
import { BsCloudUpload } from "react-icons/bs";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";


export default function RevisionRFx({
    open,
    close,
    modalType,    
    modalData,
    rfxBidValidityList,
    rfxTypeList,
    rfxContentSubmissionList,
    rfxSubmissionModeList,
    rfxStageList,
    usersRecords,
    oppData,
    rfxRecordType   
}) {

  
  const [contentSubList, setContentSubList] = useState([]);
  const [isEdit, setIsEdit] = useState(modalType && modalType == 'edit' ? true : false);
  const [isFormDataChanged, setIsFormDataChanged] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [oppID, setOppID] = useState("");
  const [rfxID, setRfxID] = useState( generateRFxID() );
  const [rFxList, setRFxList] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileData, setFileData] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [rfxTechContactName, setRfxTechContactName] = useState('');
  const [rfxCommContactName, setRfxCommContactName] = useState('');
  
  const userList = usersRecords?.map((rec, index) => ({
    id: rec.user_id,
    name: rec.first_name + ' ' + rec.last_name    
  }));

  const [currentDate] = useState(() => {
    // Get the current date in YYYY-MM-DD format
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });


  const [formData, setFormData] = useState({
    id: modalData && modalData.id ? modalData.id : "",
    rfx_number: modalData && modalData.rfx_number ? modalData.rfx_number : "",
    rfx_id: modalData && modalData.rfx_id ? modalData.rfx_id : rfxID,
    rfx_title: oppData && oppData.opp_title ? oppData.opp_title : ' ',
    rfx_record_type: modalData && modalData.rfx_record_type ? modalData.rfx_record_type : rfxRecordType,
    prev_rfx_reference: modalData && modalData.prev_rfx_reference ? modalData.prev_rfx_reference : "",
    rfx_type: modalData && modalData.rfx_type ? modalData.rfx_type : "",
    bid_type: modalData && modalData.bid_type ? modalData.bid_type : "",
    bid_validity: modalData && modalData.bid_validity ? modalData.bid_validity : "",
    bid_submission_mode: modalData && modalData.bid_submission_mode ? modalData.bid_submission_mode : "",
    submission_contents: modalData && modalData.submission_contents ? modalData.submission_contents : [],
    work_agreement_ref_num: modalData && modalData.work_agreement_ref_num ? modalData.work_agreement_ref_num : "",
    rfx_tech_contact_id: modalData && modalData.rfx_tech_contact_id ? modalData.rfx_tech_contact_id : 0,
    rfx_comm_contact_id: modalData && modalData.rfx_comm_contact_id ? modalData.rfx_comm_contact_id : 0,
    rfxtech_contact_name: modalData && modalData.rfxtech_contact_name ? modalData.rfxtech_contact_name : "",
    rfxcomm_contact_name: modalData && modalData.rfxcomm_contact_name ? modalData.rfxcomm_contact_name : "",
    submission_instructions: modalData && modalData.submission_instructions ? modalData.submission_instructions : "",
    visit_worksite: modalData && modalData.visit_worksite ? modalData.visit_worksite : false,
    visit_worksite_instructions: modalData && modalData.visit_worksite_instructions ? modalData.visit_worksite_instructions : "",
    issue_date: modalData && modalData.issue_date ? modalData.issue_date : "",
    due_date: modalData && modalData.due_date ? modalData.due_date : "",
    tech_clarif_deadline : modalData && modalData.tech_clarif_deadline ? modalData.tech_clarif_deadline : currentDate,
    comm_clarif_deadline: modalData && modalData.comm_clarif_deadline ? modalData.comm_clarif_deadline : currentDate,
    expected_award_date: modalData && modalData.expected_award_date ? modalData.expected_award_date : currentDate,
    bid_number: modalData && modalData.bid_number ? modalData.bid_number : "",
    rfx_status: modalData && modalData.rfx_status ? modalData.rfx_status : "RFx Created",
    bid_status: modalData && modalData.bid_status ? modalData.bid_status : "",
    data: modalData && modalData.data ? modalData.data : "",
    rfx_owner_id: modalData && modalData.rfx_owner_id ? modalData.rfx_owner_id : 0,
    bid_owner_id: modalData && modalData.bid_owner_id ? modalData.bid_owner_id : 0,
    created_by: modalData && modalData.created_by ? modalData.created_by : 0,
    is_active: modalData && modalData.is_active ? modalData.bid_owner_id : true,
  });

  useEffect(() => {    
      getMaxRfxByIdAction()
        .then((resp) => {
          const new_rfxID = generateRFxID(resp.rfxData.rfx_id) 
          if(isEdit) {
            setFormData({...modalData });   
          } else {
            setFormData({...formData, rfx_id: new_rfxID });
          }       
          setRfxID(new_rfxID)
        })
        .catch((err) => {});    
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        let userRec = await getCookieValue("userLoginData");
        if(isEdit) {
          setFormData({...modalData });   
        } else {
          setFormData({...formData, created_by: userRec.user_id, rfx_owner_id: userRec.user_id });
        }
      } catch (error) {}
    };

    fetchData();
  }, []);



  const handleChangeValues = (e)=>{
    console.log( e.target.value)
    if(isEdit && !isFormDataChanged) {
      setFormData({...modalData, [e.target.name]: e.target.value, submission_contents: modalData.submission_contents.split(',')});  
      if(e.target.name === 'visit_worksite') {
        setFormData({...modalData, visit_worksite: e.target.value === 'Yes' ? true : false, });
      }
      setSelectedOptions(modalData.submission_contents.split(',')); 
    } else {
      setFormData({...formData, [e.target.name]: e.target.value, });
      if(e.target.name === 'visit_worksite') {
        setFormData({...formData, visit_worksite: e.target.value === 'Yes' ? true : false, });
      }
    }
    setIsFormDataChanged(true); 
  }


  const handleRfxCommContactSelect = (contact) => {
    if(isEdit && !isFormDataChanged) {
      setFormData({...modalData, rfx_comm_contact_id: contact.id, submission_contents: modalData.submission_contents.split(',') });
      setSelectedOptions(modalData.submission_contents.split(','));    
    } else {
      setFormData({...formData, rfx_comm_contact_id: contact.id });
    }
    setIsFormDataChanged(true);
  }

  const handleRfxTechContactSelect = (contact) => {
    if(isEdit && !isFormDataChanged) {
      setFormData({...modalData, rfx_tech_contact_id: contact.id, submission_contents: modalData.submission_contents.split(',') });   
      setSelectedOptions(modalData.submission_contents.split(',')); 
    } else {
      setFormData({...formData, rfx_tech_contact_id: contact.id, });
    }
    setIsFormDataChanged(true);
  }


  
  const handleRfxSelect = (rfxData) => {
    setFormData({
      opportunity_id: rfxData.opportunity_id,
      rfx_id: rfxID,
      rfx_number: rfxData.rfx_number,
      rfx_record_type: "Rivision",
      rfx_title: rfxData.rfx_title,
      prev_rfx_reference: rfxData.rfx_id,
      rfx_type: rfxData.rfx_type,
      bid_type: rfxData.bid_type,
      bid_validity: rfxData.bid_validity,
      submission_contents: rfxData.submission_contents,
      work_agreement_ref_num: rfxData.work_agreement_ref_num,
      rfx_comm_contact_id: rfxData.rfx_comm_contact_id,
      rfx_tech_contact_id: rfxData.rfx_tech_contact_id,
      rfxtech_contact_name: rfxData.rfxtech_contact_name,
      rfxcomm_contact_name: rfxData.rfxcomm_contact_name,
      bid_submission_mode: rfxData.bid_submission_mode,
      submission_instructions: rfxData.submission_instructions,
      visit_worksite: rfxData.visit_worksite,
      visit_worksite_instructions: rfxData.visit_worksite_instructions,
      issue_date: "",
      due_date: "",
      comm_clarif_deadline: currentDate,
      tech_clarif_deadline: currentDate,
      expected_award_date: rfxData.expected_award_date,
      bid_number: rfxData.bid_number,
      rfx_status: "RFx Created",
      bid_status: rfxData.bid_status,
      rfx_owner_id: rfxData.rfx_owner_id,
      bid_owner_id: rfxData.bid_owner_id,
      created_by: rfxData.created_by,
      is_active: true,
      data: rfxData.data     
    });
    
    //setRfxID(rfxData.rfx_id);
    setSelectedOptions(rfxData.submission_contents.split(','));
    setRfxTechContactName(rfxData.rfxtech_contact_name);
    setRfxCommContactName(rfxData.rfxcomm_contact_name);   
    setIsFormDataChanged(true);
  }



  const handleToggle = (value) => {
    const currentIndex = selectedOptions.indexOf(value);
    const newSelectedOptions = [...selectedOptions];

    if (currentIndex === -1) {
      newSelectedOptions.push(value);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }
    setSelectedOptions(newSelectedOptions);
    setFormData({...formData, submission_contents: [...newSelectedOptions] });

    setIsFormDataChanged(true);
  };


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
 
    // Create a new FormData object and append the single file
    const formData2 = new FormData();
    formData2.append("file", file);
    setFileData(formData2)

    // Update the selectedFiles array with the single file    
    const extractedFile = formData2.get("file");
    setSelectedFile(extractedFile);
   
    setIsFormDataChanged(true);
      
  };

  const handleClose = () => {
    close();
  }

  const handleOpenRFxList = () => {
    setRFxList(true);
      
  };
  const handleCloseRFxList = () => {
    setRFxList(false);
      
  };


  const router = useRouter();
  const handleOppIDClick = (id) => {
    showMainLoader102(); 
    handleClose();  
    router.push(`/opportunities/add/${id}`);  
  };
  
 
  return (    
    <>

    <Dialog open={open} onClose={close} maxWidth="md" fullWidth>
      <DialogTitle textAlign={"center"}>{isEdit ? 'Edit RFx' : rfxRecordType && rfxRecordType == 'New' ? 'Log New RFx' : 'Log Previous RFx'}</DialogTitle>
      <DialogContent>
        <form id="modalform1">
          <Grid container spacing={2} style={{ marginTop: 3 }}>            
            <Grid item xs={12} md={6} fullWidth>            
              <InputLabel name="opp_number">
                Opportunity Number
              </InputLabel>
              <Link
                href="#"
                className="text-[#26BADA] w-full"
                onClick={()=>handleOppIDClick(oppData?.opportunity_id)}
              >{oppData?.opp_number ? oppData?.opp_number : modalData?.opp_number}</Link>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel name="opp_title">
              Opportunity Name
              </InputLabel>
              <span
                className="outline-1 outline-gray-300 w-full"
              >{oppData?.opp_title ? oppData?.opp_title : modalData?.opp_title}</span>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel name="customer_name">
                Customer
              </InputLabel>
              <span
                className="outline-1 outline-gray-300 w-full"
              >{oppData?.customer_name ? oppData?.customer_name : modalData?.customer_name}</span>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel name="enduser_name">
                End User
              </InputLabel>
              <span
                className="outline-1 outline-gray-300 w-full"
              >{oppData?.enduser_name ? oppData?.enduser_name : modalData?.enduser_name}</span>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel name="rfx_record_type">
                RFx Record Type
              </InputLabel>
              <span
                className="outline-1 outline-gray-300 w-full"
              >{rfxRecordType} RFx</span>
            </Grid>
            {rfxRecordType && rfxRecordType == "New"
            ?
              <Grid item xs={12} md={6}>
                <InputLabel name="prev_rfx_reference">
                    Previous RFx Reference 
                </InputLabel>
                <span
                    className="outline-1 outline-gray-300 w-full"
                >{'Not Applicable'}</span>
              </Grid>
            :(
              modalType == 'edit' || rfxRecordType == "New"
              ?
              <Grid item xs={12} md={6}></Grid> 
            :
              <>
                <Grid item xs={12} md={6}>
                  <InputLabel name="prev_rfx_reference">
                      Previous RFx Reference 
                  </InputLabel>
                  <span
                      className="outline-1 outline-gray-300 w-full"
                  >{formData.prev_rfx_reference ? formData.prev_rfx_reference : 'Not Applicable'}</span>
                </Grid>
                
                <Grid item xs={12} md={6}></Grid>

                 
                <Grid item xs={12} md={6} className="mt-2 w-full">                
                  {!formData.prev_rfx_reference &&
                    <div className="mb-5">
                      <span fullWidth
                        className="border border-gray-300 py-4 px-2 w-full"
                      >
                      <Link 
                        className="text-[#26BADA]" 
                        href="#"
                        onClick={handleOpenRFxList}
                      >Select</Link> the previous RFx Record to copy data</span>
                    </div>}
                </Grid>
              </>
            )   
            }
            <RFxList 
              open={rFxList} 
              close={handleCloseRFxList}
              handleRfxSelect={handleRfxSelect} 
              oppID={oppData?.opportunity_id} 
              oppNum={oppData?.opp_number}
              selectData = 'Copy' 
            />


            <Grid item xs={12} md={6} gap={2} container style={{ marginTop: 10 }}>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  name="rfx_id"
                  label="RFx ID"
                  variant="outlined"
                  value={isEdit ? modalData?.rfx_id : rfxID}
                  defaultValue={isEdit ? modalData?.rfx_id : rfxID}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  name="rfx_number"
                  label="Customer RFx Number"
                  variant="outlined"
                  value={isEdit && !isFormDataChanged ? modalData?.rfx_number : formData.rfx_number}
                  defaultValue={isEdit && !isFormDataChanged ? modalData?.rfx_number : formData.rfx_number}
                  onChange={handleChangeValues}
                />
              </Grid>            
              <Grid item xs={12} md={12}>
                <TextField
                  select
                  fullWidth
                  name="rfx_type"
                  label="RFx Type"
                  variant="outlined"
                  value={isEdit && !isFormDataChanged ? modalData?.rfx_type : formData.rfx_type}
                  defaultValue={isEdit && !isFormDataChanged ? modalData?.rfx_type : formData.rfx_type}
                  onChange={handleChangeValues}
                  inputProps={{ maxLength: 100 }}  
                >
                  <MenuItem value="">Select RFx Type *</MenuItem>
                  {rfxTypeList && rfxTypeList?.map(option => (
                    <MenuItem 
                      key={option.title} 
                      value={option.title}
                      selected={modalData?.rfx_type ? (modalData?.rfx_type === option.title ? true : false) : (formData.rfx_type === option.title ? true : false)}  
                    >
                      {option.title}
                    </MenuItem>
                  ))}
                </TextField> 
              </Grid>            
              <Grid item xs={12} md={12}>
                <TextField
                  select
                  fullWidth
                  name="bid_type"
                  label="Bid Type"
                  variant="outlined"
                  value={isEdit && !isFormDataChanged ? modalData?.bid_type : formData.bid_type}
                  defaultValue={isEdit && !isFormDataChanged ? modalData?.bid_type : formData.bid_type}
                  onChange={handleChangeValues}
                  inputProps={{ maxLength: 100 }}  
                >
                  <MenuItem value="">Select Bid Type *</MenuItem>
                  {rfxStageList && rfxStageList?.map(option => (
                    <MenuItem 
                      key={option.title} 
                      value={option.title}
                      selected={modalData?.bid_type ? (modalData?.bid_type === option.title ? true : false) : (formData.bid_type === option.title ? true : false)}  
                    >
                      {option.title}
                    </MenuItem>
                  ))}
                </TextField>                               
              </Grid>            
              <Grid item xs={12} md={12}>
                <TextField
                  select
                  fullWidth
                  name="bid_validity"
                  label="Bid Validity"
                  variant="outlined"
                  value={isEdit && !isFormDataChanged ? modalData?.bid_validity : formData.bid_validity}
                  defaultValue={isEdit && !isFormDataChanged ? modalData?.bid_validity : formData.bid_validity}
                  onChange={handleChangeValues}
                  inputProps={{ maxLength: 100 }}  
                >
                  <MenuItem value="">Select Bid Validity *</MenuItem>
                  {rfxBidValidityList && rfxBidValidityList?.map(option => (
                    <MenuItem 
                      key={option.title} 
                      value={option.title}
                      selected={modalData?.bid_validity ? (modalData?.bid_validity === option.title ? true : false) : (formData.bid_validity === option.title ? true : false)}  
                    >
                      {option.title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>            
              <Grid item xs={12} md={12}>              
                <TextField
                  select
                  fullWidth
                  name="bid_submission_mode"
                  label="Bid Submission Mode"
                  variant="outlined"
                  value={isEdit && !isFormDataChanged ? modalData?.bid_submission_mode : formData.bid_submission_mode}
                  defaultValue={isEdit && !isFormDataChanged ? modalData?.bid_submission_mode : formData.bid_submission_mode}
                  onChange={handleChangeValues}
                  inputProps={{ maxLength: 100 }}  
                >
                  <MenuItem value="">Select Bid Submission Mode *</MenuItem>
                  {rfxSubmissionModeList && rfxSubmissionModeList?.map(option => (
                    <MenuItem 
                      key={option.title} 
                      value={option.title}
                      selected={modalData?.bid_submission_mode ? (modalData?.bid_submission_mode === option.title ? true : false) : (formData.bid_submission_mode === option.title ? true : false)}  
                    >
                      {option.title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  name="work_agreement_ref_num"
                  label="Customer Frame Work Agreement ref #, if applicable"
                  variant="outlined"
                  value={isEdit && !isFormDataChanged ? modalData?.work_agreement_ref_num : formData.work_agreement_ref_num}
                  defaultValue={isEdit && !isFormDataChanged ? modalData?.work_agreement_ref_num : formData.work_agreement_ref_num}
                  onChange={handleChangeValues}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl variant="outlined" className="w-full">
                  <SearchingListInput 
                    allSearchList = {userList}
                    onListSelect={handleRfxTechContactSelect}
                    placeHolder="RFx Technical Contact"      
                    selectedValue={isEdit ? modalData?.rfxtech_contact_name : formData.rfxtech_contact_name}            
                  /> 
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl variant="outlined" className="w-full">
                  <SearchingListInput  
                    allSearchList = {userList}
                    onListSelect={handleRfxCommContactSelect}
                    placeHolder="RFx Commercial Contact"  
                    selectedValue={isEdit ? modalData?.rfxcomm_contact_name : formData.rfxcomm_contact_name}            
                  /> 
                </FormControl>
              </Grid>    
              <Grid item xs={12} md={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="visit-to-worksite-label">Visit to Worksite</InputLabel>
                  <Select
                    name="visit_worksite"
                    label="Visit to Worksite"
                    value={isEdit && !isFormDataChanged ? (modalData?.visit_worksite ? 'Yes' : 'No') : (formData.visit_worksite ? 'Yes' : 'No')}
                    defaultValue={isEdit && !isFormDataChanged ? (modalData?.visit_worksite ? 'Yes' : 'No') : (formData.visit_worksite ? 'Yes' : 'No')}
                    onChange={handleChangeValues}                  
                  >
                    <MenuItem 
                      value="Yes" 
                      selected={isEdit && !isFormDataChanged ? modalData?.visit_worksite : formData?.visit_worksite}
                    >Yes</MenuItem>
                    <MenuItem 
                      value="No"
                      selected={isEdit && !isFormDataChanged ? modalData?.visit_worksite : formData?.visit_worksite}
                    >No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} gap={1} style={{ marginTop: 10 }}>
              <Grid item xs={12} md={12} className=" ">
                <TextField
                    fullWidth
                    name="issue_date"
                    label="RFx Issued Date"
                    type="date"
                    variant="outlined"
                    value={isEdit && !isFormDataChanged ? modalData?.issue_date : formData.issue_date}
                    defaultValue={isEdit && !isFormDataChanged ? modalData?.issue_date : formData.issue_date}
                    onChange={handleChangeValues}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
              </Grid>
              <Grid item xs={12} md={12} className="" style={{ marginTop: 15 }}>
                <TextField
                  fullWidth
                  name="due_date"
                  label="Bid Due Date"
                  type="date"
                  variant="outlined"
                  value={isEdit && !isFormDataChanged ? modalData?.due_date : formData.due_date}
                  defaultValue={isEdit && !isFormDataChanged ? modalData?.due_date : formData.due_date}
                  onChange={handleChangeValues}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />               
              </Grid> 
              <Grid item xs={12} md={12} className="" style={{ marginTop: 17 }}>
                <TextField
                  fullWidth
                  name="tech_clarif_deadline"
                  label="Technical Clarification Deadline"
                  type="date"
                  variant="outlined"
                  value={isEdit && !isFormDataChanged ? modalData?.tech_clarif_deadline : formData.tech_clarif_deadline}
                  defaultValue={isEdit && !isFormDataChanged ? modalData?.tech_clarif_deadline : formData.tech_clarif_deadline}
                  onChange={handleChangeValues}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12} className=" " style={{ marginTop: 17 }}>
                <TextField
                  fullWidth
                  name="comm_clarif_deadline"
                  label="Commercial Clarification Deadline"
                  type="date"
                  variant="outlined"
                  value={isEdit && !isFormDataChanged ? modalData?.comm_clarif_deadline : formData.comm_clarif_deadline}
                  defaultValue={isEdit && !isFormDataChanged ? modalData?.comm_clarif_deadline : formData.comm_clarif_deadline}
                  onChange={handleChangeValues}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12} style={{ marginTop: 16 }}>              
                <TextField
                  select
                  fullWidth
                  name="submission_contents"
                  label="Content Submission"
                  variant="outlined"
                  value={isEdit && !isFormDataChanged ? modalData?.submission_contents.split(',') : selectedOptions}
                  defaultValue={isEdit && !isFormDataChanged ? modalData?.submission_contents.split(',') : selectedOptions}
                  SelectProps={{
                    multiple: true,
                    renderValue: (selected) => selected.join(', '),
                  }}
                >
                  <MenuItem value="">
                    <ListItemText primary="Select Content Submission *" />
                  </MenuItem>
                  {rfxContentSubmissionList && rfxContentSubmissionList.map((option) => (
                    <MenuItem key={option.title} value={option.title}>
                      <Checkbox
                        checked={selectedOptions.indexOf(option.title) > -1}
                        onChange={() => handleToggle(option.title)}
                      />
                      <ListItemText primary={option.title} />
                    </MenuItem>
                  ))}
                </TextField>
              </Grid> 
            </Grid>


            {(isEdit && !isFormDataChanged ? modalData?.visit_worksite : formData.visit_worksite) && (    
              <Grid item xs={12} md={12}>  
                <TextField
                  fullWidth
                  name="visit_worksite_instructions"
                  label="Visit to Worksite Instruction"
                  variant="outlined"
                  multiline
                  rows={2}
                  value={isEdit && !isFormDataChanged ? modalData?.visit_worksite_instructions : formData.visit_worksite_instructions}
                  defaultValue={isEdit && !isFormDataChanged ? modalData?.visit_worksite_instructions : formData.visit_worksite_instructions}
                  onChange={handleChangeValues}
                />
              </Grid> 
            )}
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                name="submission_instructions"
                label="Other instructions for submission"
                variant="outlined"
                multiline
                rows={3}
                value={isEdit && !isFormDataChanged ? modalData?.submission_instructions : formData.submission_instructions}
                defaultValue={isEdit && !isFormDataChanged ? modalData?.submission_instructions : formData.submission_instructions}
                onChange={handleChangeValues}                
              /> 
            </Grid>

            <Grid item xs={12}>
            {/* {selectedImage ? (
                <label htmlFor="img" className="relative cursor-pointer border-2 border-dashed border-gray-300 flex items-center justify-center text-lg text-gray-700 rounded-lg p-6 text-center">
                <input type="file" name="img" id="img" className="hidden" onChange={handleImageChange} />
                <span className="block m-auto w-20 h-20 rounded-full overflow-hidden">
                <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="w-full h-full object-cover" />
                </span>
                <Edit/>
              </label>)  : (
                !isFormDataChanged && isEdit
               ?               
                <label htmlFor="img" className="relative cursor-pointer border-2 border-dashed border-gray-300 flex items-center justify-center text-lg text-gray-700 rounded-lg p-6 text-center">
                  <input type="file" name="img" id="img" className="hidden" onChange={handleImageChange} />
                  <span className="block m-auto w-20 h-20 rounded-full overflow-hidden">
                    <img src={modalData?.account_image ? modalData?.account_image : '/avatar.png'} alt="Preview" className="w-full h-full object-cover" />
                  </span>
                  <Edit/>
                </label>                
             
               :
               formData.account_image
               ?
               <label htmlFor="img" className="relative cursor-pointer border-2 border-dashed border-gray-300 flex items-center justify-center text-lg text-gray-700 rounded-lg p-6 text-center">
                  <input type="file" name="img" id="img" className="hidden" onChange={handleImageChange} />
                  <span className="block m-auto w-20 h-20 rounded-full overflow-hidden">
                    <img src={formData.account_image} alt="Preview" className="w-full h-full object-cover" />
                  </span>
                  <Edit/>
                </label>
                :
                <label htmlFor="img" className="relative cursor-pointer border-2 border-dashed border-gray-300 flex items-center justify-center text-lg text-gray-700 rounded-lg p-6 text-center">
                  <input type="file" name="img" id="img" className="hidden" onChange={handleImageChange} />
                  <span className="w-12 h-12 bg-center bg-cover rounded-full">
                    <BsCloudUpload className='text-2xl' />
                  </span>
                  <span >UPLOAD DOCUMENTS</span>
                </label>
            )} */}
              
            
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
      <div className='flex justify-center items-center gap-3 py-3'>
      <button 
        onClick={handleClose} 
        className='border border-[#26BADA] border-solid	 bg-white text-[#26BADA] rounded-md px-4 py-2 min-w-[120px] uppercase hover:bg-[#26BADA] hover:text-white'
      >
        Cancel
      </button>
     
        {isEdit
         ?
          <button
            onClick={(e) => {
              updateRfxRequest(
                isEdit && !isFormDataChanged ? modalData : formData,
                isEdit && !isFormDataChanged ? modalData.id : formData.id,
                []
              );
            }}
            className='bg-[#26BADA] text-white rounded-md px-4 py-2 min-w-[120px] uppercase hover:bg-[#51C8E1]'
          >
            SAVE
          </button>
        :
          <button
            onClick={(e) => {
              createRfxRequest(
                formData,            
                oppData.opportunity_id,
                [],
                rfxID
              );
            }}
            className='bg-[#26BADA] text-white rounded-md px-4 py-2 min-w-[120px] uppercase hover:bg-[#51C8E1]'
          >
            ADD
        </button>}
      </div>
    </Dialog>

          

    </>

  );
};