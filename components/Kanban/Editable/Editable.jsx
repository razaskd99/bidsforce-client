import React, { useState } from "react";
import { Plus, X } from "react-feather";
import { Dialog, MenuItem, DialogTitle, DialogContent, TextField, } from "@mui/material";
import "./Editable.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ContactInput from "./ContactInput";
import { FiPlusCircle } from "react-icons/fi";


const Editable = (props) => {
    const [show, setShow] = useState(props?.handler || false);
    const [title, setTitle] = useState("");
    const [proposalReference, setProposalReference] = useState("");
    const [type, setType] = useState("");
    const [priority, setPriority] = useState("");
    const [stage, setStage] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [issueDate, setIssueDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [assignTo, setAssignTo] = useState("");
    const [review, setReview] = useState("");
    const [timeLog, setTimeLog] = useState("");
    // State for Assigned To
    const [assignedToOpen, setAssignedToOpen] = useState(false);
    const [assignedToAnchorEl, setAssignedToAnchorEl] = useState(null);
    const [assignedToSelectedContact, setAssignedToSelectedContact] = useState(null);

    // State for Reviewer
    const [reviewerOpen, setReviewerOpen] = useState(false);
    const [reviewerAnchorEl, setReviewerAnchorEl] = useState(null);
    const [reviewerSelectedContact, setReviewerSelectedContact] = useState(null);
    const [hours, setHours] = useState('');

    const handleOnSubmit = () => {
        const data = { title, proposalReference, type, priority, stage, description, file, issueDate, dueDate, assignTo, review, timeLog, };
        if (props.onSubmit) {
            props.onSubmit(data);
            setTitle("");
            setProposalReference("");
            setType("");
            setPriority("");
            setStage("");
            setDescription("");
            setFile(null);
            setIssueDate(null);
            setDueDate(null);
            setAssignTo("");
            setReview("");
            setTimeLog("");
            setShow(false);
        }
    };
    const handleHourChange = (event) => {
        const input = event.target.value;
    
        // Allow only numbers
        const regex = /^[0-9]*$/;
        if (regex.test(input)) {
          setHours(input);
        }
      };
    return (
        <div className={`editable ${props.parentClass}`}>
            <Dialog open={show} onClose={() => setShow(false)} maxWidth="lg">
                <DialogTitle>New Task for DRP Refinery Automation</DialogTitle>
                <DialogContent className="bg-[#F8FAFB] p-4 pt-4">
                    <div className="flex gap-4">
                        <div className="flex-[2] mt-4">
                            <TextField className="mb-4 bg-white rounded-sm" label="Title of the Task" variant="outlined" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
                            <TextField className="mb-4 bg-white rounded-sm w-1/2 px-1" label="Proposal Reference" variant="outlined" fullWidth value={proposalReference} onChange={(e) => setProposalReference(e.target.value)} />
                            <TextField className="mb-4 bg-white rounded-sm w-1/2 px-1" select label="Type" variant="outlined" fullWidth value={type} onChange={(e) => setType(e.target.value)} >
                                <MenuItem value="Activity">Activity</MenuItem>
                                <MenuItem value="Technical Deliverable">Technical Deliverable</MenuItem>
                                <MenuItem value="Commercial Deliverable">Commercial Deliverable</MenuItem>
                            </TextField>
                            <TextField className="mb-4 bg-white rounded-sm w-1/2 px-1" select label="Priority" variant="outlined" fullWidth value={priority} onChange={(e) => setPriority(e.target.value)} >
                                <MenuItem value="Priority 1">Priority 1</MenuItem>
                                <MenuItem value="Priority 2">Priority 2</MenuItem>
                            </TextField>
                            <TextField className="mb-4 bg-white rounded-sm w-1/2 px-1" select label="Stage" variant="outlined" fullWidth value={stage} onChange={(e) => setStage(e.target.value)} >
                                <MenuItem value="Stage 1">Stage 1</MenuItem>
                                <MenuItem value="Stage 2">Stage 2</MenuItem>
                            </TextField>
                            <TextField className="mb-4 bg-white rounded-sm" label="Description" variant="outlined" fullWidth multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
                            <div className="w-full border-2 border-dashed px-4 py-8 flex flex-col items-center">
                                <input className="" type="file" onChange={(e) => setFile(e.target.files[0])} id="file-upload" />
                                <hr className="w-1/2 my-4" />
                                <label htmlFor="file-upload"><button component="span" variant="outlined" startIcon={""}>Upload File</button></label>
                            </div>
                            <button className="border border-[#26BADA] p-2 text-[#26BADA] rounded-md min-w-40 uppercase mt-4 mx-2" onClick={() => setShow(false)} variant="outlined" color="secondary">Cancel</button>
                            <button className="bg-[#26BADA] p-2 text-white rounded-md min-w-40 uppercase mt-4 mx-2" onClick={handleOnSubmit} variant="contained" color="primary">{props.btnName || "Add"}</button>
                        </div>
                        <div className="flex-[1] mt-4">
                            {/* Dates */}
                            <div className="border-2 border-[#E8ECEF] rounded-md">
                                <div className="bg-[#E8ECEF] p-2">
                                    <p className="text-[#778CA2]">Critical Dates</p>
                                </div>
                                <div className="dates p-2">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Issue Date"
                                            className="w-full my-3 bg-white"
                                            value={issueDate}
                                            onChange={(newValue) => setIssueDate(newValue)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        <DatePicker
                                            label="Due Date"
                                            className="w-full my-3 bg-white"
                                            value={dueDate}
                                            onChange={(newValue) => setDueDate(newValue)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            {/* Key Contacts */}
                            <div className="border-2 border-[#E8ECEF] rounded-md mt-4">
                                <div className="bg-[#E8ECEF] p-2">
                                    <p className="text-[#778CA2]">Key Contacts</p>
                                </div>
                                <div className="dates p-2">
                                    <ContactInput
                                        open={assignedToOpen}
                                        setOpen={setAssignedToOpen}
                                        anchorEl={assignedToAnchorEl}
                                        setAnchorEl={setAssignedToAnchorEl}
                                        selectedContact={assignedToSelectedContact}
                                        setSelectedContact={setAssignedToSelectedContact}
                                        label="Assigned to"
                                    />
                                    <ContactInput
                                        open={reviewerOpen}
                                        setOpen={setReviewerOpen}
                                        anchorEl={reviewerAnchorEl}
                                        setAnchorEl={setReviewerAnchorEl}
                                        selectedContact={reviewerSelectedContact}
                                        setSelectedContact={setReviewerSelectedContact}
                                        label="Reviewer"
                                    />
                                </div>
                            </div>
                            {/* Time Log */}
                            <div className="border-2 border-[#E8ECEF] rounded-md mt-4">
                                <div className="bg-[#E8ECEF] p-2">
                                    <p className="text-[#778CA2]">Time Log</p>
                                </div>
                                <div className="p-2">
                                    <TextField
                                        label="Estimated hours"
                                        variant="outlined"
                                        value={hours}
                                        className="w-full bg-white"
                                        onChange={handleHourChange}
                                        type="number"
                                        inputProps={{
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*',
                                            step: '1',
                                            min: '0'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </DialogContent>
            </Dialog>
            <p onClick={() => { setShow(true); }} > {props.defaultValue === undefined ? <FiPlusCircle className="text-xl" /> : <></>} {props?.name}</p>
        </div>
    );
};

export default Editable;
