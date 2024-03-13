"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import DatePickerInput from "@/components/DatePickerInput";
import { Checkbox, FormGroup, ListItemText, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
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
import Link from "next/link";
import CheckboxDropdown from "@/components/CheckboxDropdown";
const rfxType = [
  { value: "RFI", label: "RFI(Request for Information)" },
  { value: "RFQ", label: "RFQ(Request for Quote)" },
  { value: "RFP", label: "RFP(Request for Proposal)" },
];
const stage = [
  { value: "Budgetery", label: "Budgetery" },
  { value: "Firm", label: "Firm" },
];
const bidValidity = [
  { value: "90 days", label: "90 days" },
  { value: "60 days", label: "60 days" },
  { value: "30 days", label: "30 days" },
];
const submissionMode = [
  { value: "Email", label: "Email" },
  { value: "Hardcopy", label: "Hardcopy" },
  { value: "Customer Portal", label: "Customer Portal" },
  { value: "Bids Force", label: "Bids Force" },
];
const submissionContent = [
  { value: "Technical", label: "Technical" },
  { value: "Commercial", label: "Commercial" },
  { value: "Commercial Unpriced", label: "Commercial Unpriced" },
  { value: "Combined Techno Commercial", label: "Combined Techno Commercial" },
];

const NewFx = () => {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "RFx List", href: "/rfx" },
    { label: "New Rfx", href: "rfx/newrfx" },
  ];
  const datePickerLabels = [
    "Issue Date",
    "Due Date",
    "Technical clarification deadline",
    "Commercial clarification deadline",
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("");
  
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handlePersonSelect = (person) => {
    setSelectedPerson(person);
    handleModalClose();
    console.log("Selected Person:", person);
  };
  const open = Boolean(anchorEl);
  const [submissionOptionName, setSubmissionOptionName] = useState([])

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex gap-5 w-full">
        <div className="flex flex-[1]  flex-col gap-4">
          <div className="relative w-full">
            <AiOutlineQuestionCircle className="absolute right-0.5 top-0.5 z-10 text-[#98A9BC]" />
            <TextField
              id="outlined-basic"
              label="Customer"
              variant="outlined"
              className="bg-white w-full"
            />
          </div>
          <div className="relative w-full">
            <AiOutlineQuestionCircle className="absolute right-0.5 top-0.5 z-10 text-[#98A9BC]" />
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              className="bg-white w-full"
            />
          </div>
          <div className="relative w-full">
            <AiOutlineQuestionCircle className="absolute right-0.5 top-0.5 z-10 text-[#98A9BC]" />
            <TextField
              id="outlined-basic"
              label="Company"
              variant="outlined"
              className="bg-white w-full"
            />
          </div>
          <div className="relative w-full">
            <AiOutlineQuestionCircle className="absolute right-0.5 top-0.5 z-10 text-[#98A9BC]" />
            <TextField
              id="outlined-basic"
              label="End User"
              variant="outlined"
              className="bg-white w-full"
            />
          </div>
        <CheckboxDropdown label="Content Submission" options={submissionContent}/>

        </div>
        <div className="flex flex-[1] flex-col gap-4">
          <div className="relative w-full">
            <AiOutlineQuestionCircle className="absolute right-0.5 top-0.5 z-10 text-[#98A9BC]" />
            <TextField
              id="outlined-basic"
              label="RFx #"
              variant="outlined"
              className="bg-white w-full"
            />
          </div>
          <TextField
            select
            label="RFx Type"
            // defaultValue="RFI"
            className="bg-white"
          >
            {rfxType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            // id="outlined-select-currency"
            select
            label="Stage"
            //defaultValue="Budgetery"
            className="bg-white"
          >
            {stage.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Bid Validity"
            // defaultValue="90 days"
            className="bg-white"
          >
            {bidValidity.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            // id="outlined-select-currency"
            select
            label="Submission Mode"
            // defaultValue="Email"
            className="bg-white"
          >
            {submissionMode.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="flex flex-[1] flex-col gap-3">
          <div className="">
            <div className="bg-[#00000005] p-[14px] text-[#778CA2]">
              Critical Dates
            </div>
            <div className="bg-[#F8FAFB] flex flex-col gap-2 py-4 px-6 rounded-b-md date-picker">
              <DatePickerInput labels={datePickerLabels} className="w-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex-[2] flex flex-col">
          <textarea
            id="instructions"
            name="instructions"
            rows="4"
            cols="50"
            placeholder="Submission Instructions"
            className="outline-0 p-2"
          ></textarea>
          <FormControl className="flex flex-row gap-8 items-center my-5">
            <FormLabel
              id="demo-radio-buttons-group-label"
              className="text-black"
            >
              Visit to worksite{" "}
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="required"
              name="radio-buttons-group"
              row
            >
              <FormControlLabel
                value="required"
                control={<Radio />}
                label="Required"
              />
              <FormControlLabel
                value="notRequired"
                control={<Radio />}
                label="Not Required"
              />
            </RadioGroup>
          </FormControl>
          <textarea
            id="guidelines"
            name="guidelines"
            rows="4"
            cols="50"
            placeholder="Visit to work site instructions"
            className="outline-0 p-2"
          ></textarea>
          <div className="">
            <FormControl className="flex flex-row gap-8 items-center my-5">
              <FormLabel
                id="demo-radio-buttons-group-label"
                className="text-black"
              >
                Is this request a revision of previous RFx?{" "}
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="yes"
                name="radio-buttons-group"
                row
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <PopupInput label={"Previous RFx reference number"} />
          </div>
          <div className="">
            <FormControl className="flex flex-row gap-8 items-center my-5">
              <FormLabel
                id="demo-radio-buttons-group-label"
                className="text-black"
              >
                Does this RFx fall under an existing agreement with the
                supplier?{" "}
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="yes"
                name="radio-buttons-group"
                row
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <div className="relative w-[400px]">
              <AiOutlineQuestionCircle className="absolute right-0.5 top-0.5 z-10 text-[#98A9BC]" />
              <TextField
                id="outlined-basic"
                label="Agreement reference number"
                variant="outlined"
                className="bg-white w-full"
              />
            </div>
          </div>
          <DragDrop />
        </div>
        <div className="flex-[1] mt-5">
          <div className="">
            <div className="bg-[#00000005] p-[14px] text-[#778CA2]">Key Contacts</div>
            <div className="bg-[#F8FAFB] flex flex-col gap-3 py-4 rounded-b-md items-center w-full">
              <PopupInput
                label={"RFx Commercial contact"}
                className="w-[430px]"
              />
              <PopupInput
                label={"RFx Technical contact"}
                className="w-[430px]"
              />
              <PopupInput
                label={"Supplier Sales Contact (If known)"}
                className="w-[430px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-20">
        <button className="border border-[#26BADA] bg-white text-[#26BADA] text-sm uppercase px-20 py-3 rounded-sm">
          Cancel
        </button>
        <Link
          href="/manager/rfx"
          className="border border-[#26BADA] text-white bg-[#26BADA] text-sm uppercase px-20 py-3 rounded-sm"
        >
          Submit
        </Link>
      </div>
    </div>
  );
};

export default NewFx;
