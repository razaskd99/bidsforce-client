'use client'
import { useState, useEffect } from 'react';
import UploadDialog from '@/components/UploadDailogue';
import Breadcrumbs from "@/components/Breadcrumbs"
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { VscChecklist } from "react-icons/vsc";
import { FaBarsProgress, FaChevronLeft, FaArrowRight, FaRegCalendarMinus } from "react-icons/fa6";
import Link from "next/link";
import { LuRefreshCcw } from "react-icons/lu";
import BidDialog from '@/components/BidRequestDailogue';
import { IoIosSearch, IoMdAddCircleOutline } from "react-icons/io";
import SearchTable from '@/components/SearchTable';
import { FaRegFilePdf, FaFileExcel, FaRegFileImage } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import DragDrop from '@/components/FileInput';
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Avatar, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Stack, Switch, TextField, Typography } from '@mui/material';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { RxQuestionMarkCircled } from "react-icons/rx";
import DynamicDatePicker from '@/components/DatePickerInput';
import PopupInput from '@/components/PopupInput';
import AssignPopupInput from '@/components/AssignmentPopup';
import ContactDialog from '@/components/ContactPopup';
import SkipDialog from '@/components/SkipDialog';
import ControlledAccordions from '@/components/BidSetupAccordion';
import SelectReviewerDialog from '@/components/selectReviewer';
import { formatDateString, formatDatetime } from '@/app/api/util/utility';
import { createContactsAction } from '@/app/api/rfx/actions/rfx';
import { createReviewEntryAction, createReviewContactsAction, getAllReviewContactsBy_BidReviewID_Action, getAllReviewsRecordsBy_Rfx_Key_Action } from '@/app/api/manager/actions/reviews';
import SearchTableNew from './SearchTableNew';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { showErrorMessageAlertMain, uploadFiles } from '@/app/api/util/utility';
import { createRfxClarificationAction, getAllRfxClarificationRecordsBy_RfxID_Action, createRfxClarificationCommentAction, getAllRfxClarificationPostRecordsBy_ClarifId_Action } from '@/app/api/manager/actions/clarifications';
import { createDocUploadAction, GetRfxDocumentsBy_RfxID_Key_Action, GetRfxDocumentsAction } from '@/app/api/rfx/actions/rfx';
import { getUserById } from '@/app/api/rfx/actions/user';
import { createBidReviewPostAction, getAllBidReviewPostRecordsById, getReviewRecordByIdAction } from '@/app/api/manager/actions/reviews';
import { getPages, getpage } from '@/app/api/user-templates/API';
import { getAllSubmissionAction, getSubmissionByIdAction, createSubmissionAction } from '@/app/api/manager/actions/bidsubmission';
import { getAllRfxPrereqRecordsAction } from '@/app/api/admin-panel/actions/rfx';
import { useStyleRegistry } from 'styled-jsx';



const BidDetail = ({
    rfxRecord,
    stagesList,
    allUsersRec,
    docvaltRec,
    keyContactsRec,
    prelimReviewRec,
    detailedReviewRec,
    clarificationRec,
    finalReviewRec,
    koffRec,
    deliverablesRec,
    bidteamRec,
    submissionRec,
    login_user_id,
    tenantID,
    apiBackendURL
}) => {
    const [open, setOpen] = useState(false);
    const [openBid, setOpenBid] = useState(false);
    const [openContactAssign, setOpenContactAssign,] = useState(false);
    const [active, setActive] = useState('Overview');
    const [clarificationDetail, setClarificationDetail] = useState(false)
    const [documentDetail, setDocumentDetail] = useState(false)
    const [bidDetail, setBidDetail] = useState(false)
    const [showReply, setShowReply] = useState(false)
    const [replyMessage, setReplyMessage] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [messages, setMessages] = useState([]);
    const [files, setFiles] = useState([]);
    const [isContactDialogOpen, setContactDialogOpen] = useState(false);
    const [selectedContact, setSelectedContacts] = useState([]);
    const [showTemplateSelect, setshowTemplateSelect] = useState(false)
    const [showDetailTempSelect, setshowDetailTempSelect] = useState(false)
    const [showFinalTempSelect, setshowFinalTempSelect] = useState(false)
    const [showFinalRewList, setShowFinalRewList] = useState(true)
    const [showSubmissionTempSelect, setshowSubmissionTempSelect] = useState(false)
    const [templateOption, setTemplateOption] = useState('');
    const [isButtonActive, setButtonActive] = useState(false);
    const [isDetailButtonActive, setDetailButtonActive] = useState(false);
    const [isFinalButtonActive, setFinalButtonActive] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedDetailsUsers, setSelectedDetailsUsers] = useState([]);
    const [nextStep, setNextStep] = useState(false);
    const [selectedClarificationContact, setSelectedClarificationContact] = useState(null);
    const [showSubmitedRfxCalrification, setShowSubmitedRfxCalrification] = useState(false);
    const [showBidClarificationDetial, setShowBidClarificationDetial] = useState(false);
    const [showOrderDone, setShowOrderDone] = useState(false)
    const [tempRefNumber, setTempRefNumber] = useState('')
    const [viewTemplateDetails, setViewTemplateDetails] = useState(false)
    const [selectedReviewRow, setSelectedReviewRow] = useState([])
    const [selectedClarificationRow, setSelectedClarificationRow] = useState([])
    const [personAssignTo, setPersonAssignTo] = useState([])
    const [selectedFilesMain, setSelectedFilesMain] = useState([])
    const [attachedDocuments, setAttachedDocuments] = useState([])
    const [clarificationTitle, setclarificationTitle] = useState('')
    const [clarificationType, setclarificationType] = useState('')
    const [clarificationRefNum, setclarificationRefNum] = useState('')
    const [clarificationDescription, setclarificationDescription] = useState('')
    const [clarificationIssuedDate, setclarificationIssuedDate] = useState('')
    const [clarificationDueDate, setclarificationDueDate] = useState('')
    const [clarificationSelectedDocuments, setclarificationSelectedDocuments] = useState([])
    const [clarificationAssignTo, setclarificationAssignTo] = useState([])

    const [reviewReplyComment, setReviewReplyComment] = useState('')
    const [reviewReplyStatus, setReviewReplyStatus] = useState('')
    const [rowIdSelected, setRowIdSelected] = useState(0)
    const [reviewReplyCommentList, setReviewReplyCommentList] = useState([])
    const [templatesAll, setTemplatesAll] = useState([])
    const [templateHTML, settemplateHTML] = useState('')
    const [templateCSS, setTemplateCSS] = useState('')

    const [rfxPrereqStageList, setRfxPrereqStageList] = useState([])
    const [submissionType, setSubmissionType] = useState('')
    const [submissionStage, setSubmissionStage] = useState('')
    const [submissionRefNumber, setSubmissionRefNumber] = useState('')
    const [submissionDescription, setSubmissionDescription] = useState('')
    const [selectedSubmissionRow, setSelectedSubmissionRow] = useState('')
    const [selectedSubmissionDocuments, setSelectedSubmissionDocuments] = useState([])
    const [submissionDetail, setSubmissionDetail] = useState(false)


    // function applyDynamicCSS(css) {
    //     useEffect(() => {
    //         // Create a <style> element
    //         const styleElement = document.createElement('style');

    //         // Set the CSS content of the <style> element
    //         styleElement.appendChild(document.createTextNode(css));

    //         // Append the <style> element to the <head>
    //         document.head.appendChild(styleElement);

    //         // Clean up function to remove the dynamically added <style> element
    //         return () => {
    //             document.head.removeChild(styleElement);
    //         };
    //     }, [templateHTML]); // Re-run the effect whenever the CSS changes
    // }

    applyDynamicCSS(templateCSS);


    const handlePersonSelectDailog = (person) => {
        setSelectedClarificationContact(person);
    };
    const handleSelectChange = async (event) => {
        const selectedValue = event.target.value;
        setshowTemplateSelect(selectedValue);
        setButtonActive(true);

        // load template/css
        let pageContent = await getpage(event.target.value, tenantID)
        try {
            pageContent = JSON.parse(pageContent);
        } catch (err) {
            // Handle parsing error if needed
        }

        let pageHTML = pageContent?.['mycustom-html'] ?? '';
        let pageCSS = pageContent?.['mycustom-css'] ?? '';

        settemplateHTML(pageHTML)
        setTemplateCSS(pageCSS)

    };

    const handleRefNumberChange = (event) => {
        const selectedValue = event.target.value;
        setTempRefNumber(selectedValue);
    };
    const handleDetailSelectChange = async (event) => {
        const selectedValue = event.target.value;
        setshowDetailTempSelect(selectedValue);
        setDetailButtonActive(true);

        // load template/css
        let pageContent = await getpage(event.target.value, tenantID)
        try {
            pageContent = JSON.parse(pageContent);
        } catch (err) {
            // Handle parsing error if needed
        }

        let pageHTML = pageContent?.['mycustom-html'] ?? '';
        let pageCSS = pageContent?.['mycustom-css'] ?? '';

        settemplateHTML(pageHTML)
        setTemplateCSS(pageCSS)

    };
    const handleFinalSelectChange = async (event) => {
        const selectedValue = event.target.value;
        setshowFinalTempSelect(selectedValue);
        setFinalButtonActive(true);

        // load template/css
        let pageContent = await getpage(event.target.value, tenantID)
        try {
            pageContent = JSON.parse(pageContent);
        } catch (err) {
            // Handle parsing error if needed
        }

        let pageHTML = pageContent?.['mycustom-html'] ?? '';
        let pageCSS = pageContent?.['mycustom-css'] ?? '';

        settemplateHTML(pageHTML)
        setTemplateCSS(pageCSS)
    };
    const handleReplySubmit = async () => {

        const data = {
            "rfx_clarification_id": selectedClarificationRow.rfx_clarification_id,
            "posted_by": login_user_id,
            "post_number": 0,
            "title": "",
            "comment": replyMessage,
            "parent_id": 0
        }
        // add clarifications post & files
        let r1 = await createRfxClarificationCommentAction(data)
        if (r1.statusCode == 200 && selectedFilesMain.length > 0) {
            uploadFiles(selectedFilesMain, apiBackendURL, tenantID, rfxRecord.rfx_id, 'rfx-clarifications')
            let fileArray = []
            for (var i = 0; i < selectedFilesMain.length; i++) {
                const file = {
                    name: selectedFilesMain[i].name,
                    type: selectedFilesMain[i].type,
                    size: selectedFilesMain[i].size,
                };
                let clarif_post_id = r1.returnData.rfx_clarification_post_id
                let r2 = await createDocUploadAction(rfxRecord.rfx_id, login_user_id, file, 'rfx-clarifications-post-' + clarif_post_id)
            }
        }


        /*// get clarifications post list
        let r3 = await getAllRfxClarificationRecordsBy_RfxID_Action(rfxRecord.rfx_id);
        if (r3.statusCode == 200) {
            let clarifRec = r3.returnData
            const mappedData = clarifRec.map((calr, index) => ({
                id: calr.rfx_clarification_id,
                Title: calr.clarification_title,
                RefrenceNum: calr.rfx_clarification_ref_num,
                IssuedDate: calr.clarification_issued_date,
                DueDate: calr.clarification_due_date,
                Status: calr.status
            }));
            setRfxClarRows(mappedData);
        }*/
        const newMessage = {
            text: replyMessage,
            files: uploadedFiles
        };
        setMessages([...messages, newMessage]);
        console.log(messages.file)
        setReplyMessage('');
        setUploadedFiles([]);
    };
    const handleFileUpload = (files) => {
        setUploadedFiles([...uploadedFiles, ...files]);
    };
    const templateQuestions = [
        "Can’t afford not to participate in this opportunity?",
        "This Opportunity is business critical strategically / financially?",
        "The scope of work fits well into our core portfolio/business.",
        "We can meet the minimum requirements of the RFx?",
        "We have the resources and time to produce a quality bid/bid?",
        "The potential revenue/profits from this opportunity are well known to us?",
        "The direct and indirect costs associated with the bidding are known to us?",
        "We are well aware of customer's business needs, their reason to request bids, and expectations?",
        "Are we the incumbent's supplier?",
        "We have credible experience in the scope requested?",
    ];
    const detailTemplateQuestions = [
        "The product’s capabilities do not fit the buyer’s line of business such as Gas Analyser for a real estate business.",
        "The customer is unfamiliar with the product’s performance characteristics but still wants the product.",
        "The item ordered is incompatible with the technical level of the country to which it is being shipped, such as semiconductor manufacturing equipment being shipped to a country that has no electronics industry.",
        "Delivery dates are vague, or deliveries are planned for out-of-the-way destinations.",
        "The shipping route is abnormal for the product and destination.",
        "Packaging is inconsistent with the stated method of shipment or destination.",
        "The customer or its address is similar to one of the parties found on the Commerce Department’s [BIS] list of denied persons.",
        "The customer has little or no business background.",

    ];
    const finalTemplateQuestions = [
        "Is the scope of work clearly understood and defined in proposal? ",
        "Is a detailed technical table of compliance / Deviation list provided in the proposal?",
        "Is a detailed technical table of compliance / Deviation list provided in the proposal?",
        "Have we received all the sub-supplier quotations?",
        "Are the associated services such as engineering and project management included?",
        "Are there any technical requirements outside of standard product features and not complied in the proposal?",
        "Are the site services rates included in the proposal, if applicable?",
        "Are the delivery basis adequately priced?",
        "Are the credit terms proposes inline with customer credit limits?",
        "Is the warranty adequately priced ?",
        "Are our suppliers in agreement to provide back to back warranty?",
        "Are all the preliminary and detailed review/ approvals completed? ",
        "Have the commercial terms been reviewed and responded clearly?",
        "Does the proposal include deviation / alternal proposal for mutually agreed terms and conditions?",
        "Are there any extra ordinary commitments made in proposal?",
        "Is the submission in-line with the contents requested by the customer?",
    ];

    const [overviewData, setoverviewData] = useState([
        { name: 'RFx ID', value: rfxRecord.rfx_id },
        { name: 'BID ID', value: rfxRecord.bid_number },

        { name: 'CRM ID', value: rfxRecord.crm_id },
        { name: 'RFx#', value: rfxRecord.rfx_number },

        { name: 'Title', value: rfxRecord.rfx_title },
        { name: 'RFx Type', value: rfxRecord.rfx_type },

        { name: 'Customer', value: rfxRecord.customer_name },
        { name: 'Opportunity Type', value: rfxRecord.opportunity_type },

        { name: 'End user', value: rfxRecord.company_name },
        { name: 'Project Type', value: rfxRecord.project_type },

        { name: 'Business Unit', value: rfxRecord.business_unit },
        { name: 'Industrial code', value: rfxRecord.industry_code },

        { name: 'Reigon', value: rfxRecord.region },
        { name: 'Stage', value: rfxRecord.opportunity_stage },

        { name: 'Competition', value: rfxRecord.competition },
        { name: 'Bid Validity Period', value: rfxRecord.bid_validity },

        { name: 'Total Opportunity Value ($)', value: '$' + rfxRecord.total_value },
        { name: 'Delivery Duration', value: rfxRecord.delivery_duration },

        { name: 'Gross Profit (%)', value: rfxRecord.gross_profit_percent + '%' },
        { name: 'Is this request a version of previous RFx', value: 'Yes' },

        { name: 'Gross Profit Value', value: '$' + rfxRecord.gross_profit_value },
        { name: 'Existed supplier Agreement', value: rfxRecord.agreement_ref_num ? 'Yes' : 'No' },

        { name: 'Opportunity Forecasted', value: rfxRecord.forcasted ? 'Yes' : 'No' },
        { name: 'Agreement ref#', value: rfxRecord.agreement_ref_num },

        { name: 'Submission mode', value: rfxRecord.submission_mode },
        { name: 'Submission contents', value: rfxRecord.submission_content },

        { name: 'Visit to worksite', value: rfxRecord.visit_worksite ? 'Required' : 'Not Required' },
        { name: 'Other instructions for  site visit', value: rfxRecord.visit_worksite_instructions },

        {
            name: 'Other instructions for submission',
            value: rfxRecord.submission_instructions,
        },
    ])
    const templateOptions = [
        { value: "Bid / No Bid Review", label: "Bid / No Bid Review" },
        { value: "Export Compliance Review", label: "Export Compliance Review" },
        { value: "Technical Solution Review", label: "Technical Solution Review" },
        { value: "Preliminary Risk Review", label: "Preliminary Risk Review" },
    ];
    const submissionOptions = [
        { value: "Technical Proposal", label: "Technical Proposal" },
        { value: "Commercial Proposal", label: "Commercial Proposal" },
        { value: "Unpriced Comm. Proposal", label: "Unpriced Comm. Proposal" },
    ];
    const handleValueChange = (index, newValue) => {
        const updatedData = [...overviewData];
        updatedData[index].value = newValue;
        setoverviewData(updatedData);
    };

    const contentShow = (category, status) => {
        if (status === 'pending') {
            return;
        } else if (status === 'done') {
            status = 'current';
            setActive(category);

        } else {
            // console.log(category);
            setActive(category);
        }
    };


    const handleshowTemplateSelect = () => {
        setshowTemplateSelect(true);
    };
    const handleshowDetTemplateSelect = () => {
        setshowDetailTempSelect(true);
        setDetailTemplate(false)
        setInDetailReviewTemplate(false)
    };
    const handleshowFinalTemplateSelect = () => {
        setshowFinalTempSelect(true);
    };
    const handleshowSubmissionTemplateSelect = () => {
        setshowSubmissionTempSelect(true);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpenBid = () => {
        setOpenBid(true);
    };
    const handleClickOpenContact = () => {
        setOpenContactAssign(true);
    };
    const handlCloseBid = () => {
        setOpenBid(false);
    };
    const handlCloseContact = () => {
        setOpenContactAssign(false);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClarificationDetail = () => {
        setClarificationDetail(true)
    }
    const handleDocRowClick = () => {
        setDocumentDetail(true)
    }
    const handleBidRowClick = () => {
        setBidDetail(true)
    }
    const handleAddTeam = () => {
        setContactDialogOpen(true);
    };
    const onYesButtonClick = () => {

    }

    const handleContactSelect = (contact) => {
        const matchingUser = selectedContact.find(user => user.id === contact.id);
        if (!matchingUser) {
            setSelectedContacts((prevContacts) => [...prevContacts, contact]);
        }
        setContactDialogOpen(false);
    };
    const [selectedTemplateQuestions, setselectedTemplateQuestions] = useState({});
    const [selectedDetailTemplateQuestions, setSelectedDetailTemplateQuestions] = useState({});
    const [loadTemplate, setloadTemplate] = useState(false);
    const [detailTemplate, setDetailTemplate] = useState(false);
    const [finalTemplate, setFinalTemplate] = useState(false);
    const [submissionTemplate, setSubmissionTemplate] = useState(false);
    const [reviewerDialogOpen, setReviewerDialogOpen] = useState(false);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [activeSubmit, setActiveSubmit] = useState(false);
    const [detailActiveSubmit, setDetailActiveSubmit] = useState(false);
    const [finalActiveSubmit, setFinalActiveSubmit] = useState(false);
    const [currentRecordDetailDueDate, setCurrentRecordDetailDueDate] = useState('');
    const [currentRecordDetailIssueDate, setCurrentRecordDetailIssueDate] = useState('');
    const [currentRecordDetailRefNum, setCurrentRecordDetailRefNum] = useState('');
    const [CurrentRecordDetailClarType, setCurrentRecordDetailClarType] = useState('');
    const [currentRecordDetailStatus, setCurrentRecordDetailStatus] = useState('');
    const [inTemplateDetail, setInTemplateDetail] = useState(false);
    const [inDetailReviewTemplate, setInDetailReviewTemplate] = useState(false);
    const [inRfxClarificationTemplate, setInRfxClarificationTemplate] = useState(false);
    const [inFinalTemp, setInFinalTemp] = useState(false);
    const [inSubmissionTemp, setInSubmissionTemp] = useState(false);
    const [submissionDataRows, setSubmissionDataRows] = useState();
    const [showSubmissionTable, setShowSubmissionTable] = useState(true);

    console.log("Sub:", submissionDataRows)


    const handleReviewerDialogOpen = () => {
        setReviewerDialogOpen(true);
    };
    const handleReviewerDialogClose = () => {
        setReviewerDialogOpen(false);
    };
    const handleDetailDialogOpen = () => {
        setDetailDialogOpen(true);
    };
    const handleDetailDialogClose = () => {
        setDetailDialogOpen(false);
    };
    const handleReviewerDialogDone = (selectedUsers) => {
        setSelectedUsers(selectedUsers);
        handleReviewerDialogClose();
        console.log(selectedUsers);
    };
    const handleDetailDialogDone = (selectedUsers) => {
        setSelectedDetailsUsers(selectedUsers);
        handleDetailDialogClose();
        console.log(selectedUsers);
    };
    //   
    const handleOptionChange = (option) => {
        setselectedTemplateQuestions((prevOptions) => ({
            ...prevOptions,
            [option]: !prevOptions[option],
        }));
        setActiveSubmit(true)
    };
    const handleDetailOptionChange = (option) => {
        setSelectedDetailTemplateQuestions((prevOptions) => ({
            ...prevOptions,
            [option]: !prevOptions[option],
        }));
        setDetailActiveSubmit(true)

    };
    const handleFinalOptionChange = (option) => {
        setSelectedDetailTemplateQuestions((prevOptions) => ({
            ...prevOptions,
            [option]: !prevOptions[option],
        }));
        setFinalActiveSubmit(true)

    };
    console.log(active, "Current-")
    const handleRowClick = async (rowId) => {
        setSelectedRowId(rowId) // row ID
        setshowDetailTempSelect(true)
        setloadTemplate(true)
        setshowTemplateSelect(true)
        setDetailTemplate(true)
        setInTemplateDetail(true)
        setshowFinalTempSelect(true)
        setInDetailReviewTemplate(true)
        setFinalTemplate(true)
        setShowFinalRewList(false)
        setInFinalTemp(true)
        setInSubmissionTemp(true)
        setSelectedUsers([])
        setRowIdSelected(rowId)

        if (active == 'Pre-lim Review') {
            // get selected row
            const targetRow = prelimReviewRec.find(item => item.bid_review_id === rowId)
            setSelectedReviewRow(targetRow)
            setViewTemplateDetails(true)
            // get comment list
            let r1 = await getAllBidReviewPostRecordsById(rowId)
            let records = r1.returnData
            setReviewReplyCommentList(records)
            // get selected review
            let r2 = await getReviewRecordByIdAction(rowId)
            let review = r2.returnData
            settemplateHTML(review.template_data)
        }
        if (active == 'Detailed Review') {
            // get selected row
            const targetRow = detailedReviewRec.find(item => item.bid_review_id === rowId)
            setSelectedReviewRow(targetRow)
            // get comment list
            let r1 = await getAllBidReviewPostRecordsById(rowId)
            let records = r1.returnData
            setReviewReplyCommentList(records)
            // get selected review
            let r2 = await getReviewRecordByIdAction(rowId)
            let review = r2.returnData
            settemplateHTML(review.template_data)
        }
        if (active == 'Final Review') {
            // get selected row
            const targetRow = finalReviewRec.find(item => item.bid_review_id === rowId)
            setSelectedReviewRow(targetRow)
            // get comment list
            let r1 = await getAllBidReviewPostRecordsById(rowId)
            let records = r1.returnData
            setReviewReplyCommentList(records)
            // get selected review
            let r2 = await getReviewRecordByIdAction(rowId)
            let review = r2.returnData
            settemplateHTML(review.template_data)
        }
        if (active == 'RFx Clarifications') {
            setShowSubmitedRfxCalrification(true)
            setClarificationDetail(true)
            const targetClarification = clarificationRec.find(item => item.rfx_clarification_id === rowId);
            setSelectedClarificationRow(targetClarification)
            if (targetClarification) {
                setclarificationTitle(targetClarification.clarification_title);
                setCurrentRecordDetailDueDate(targetClarification.clarification_due_date)
                setCurrentRecordDetailIssueDate(targetClarification.clarification_issued_date)
                setCurrentRecordDetailRefNum(targetClarification.rfx_clarification_ref_num)
                setCurrentRecordDetailClarType(targetClarification.clarification_type)
                setCurrentRecordDetailStatus(targetClarification.status)
                console.log("Current Record is:", targetClarification)
            }
            // get documents for clarif
            const r1 = await GetRfxDocumentsBy_RfxID_Key_Action(rfxRecord.rfx_id, 'rfx-clarifications-' + rowId)
            setclarificationSelectedDocuments(r1.returnData)
            // get assignto details
            const r2 = await getUserById(targetClarification.assign_to)
            setclarificationAssignTo(r2.data)
            // get clarification post
            const r3 = await getAllRfxClarificationPostRecordsBy_ClarifId_Action(rowId)
            setRfxClarPostRows(r3.returnData)
            // get rfx documents
            const r4 = await GetRfxDocumentsAction(rfxRecord.rfx_id)
            setRfxClarPostDocsRows(r4.returnData)
            console.log(r1, ' clarification documents', 'rfx-clarifications-' + rowId)
            console.log(r2, ' clarification Assignto')
            console.log(r3, ' clarification Posts')
        }
        if (active == 'Submission') {
            setShowSubmissionTable(false)
            setSubmissionDetail(true)
            // get submission records
            const r1 = await getAllSubmissionAction(rfxRecord.rfx_id)
            let records = r1.returnData
            setSubmissionDataRows(records)
            // get selected record
            const targetSubmission = records.find(item => item.bid_submission_id === rowId);
            setSelectedSubmissionRow(targetSubmission)
            // get selected submission documents
            const r2 = await GetRfxDocumentsBy_RfxID_Key_Action(rfxRecord.rfx_id, 'submission-' + targetSubmission.bid_submission_id)
            records = r2.returnData
            setSelectedSubmissionDocuments(records)
          
        }

        let r1 = await getAllReviewContactsBy_BidReviewID_Action(rowId)
        if (r1.statusCode == 200) {
            let records = r1.returnData
            const mappeddata = records.filter(item => item.user_id !== 0).map((item) => ({
                id: item.user_id,
                name: `${item.first_name} ${item.last_name}`,
                image: item.user_profile_photo ? item.user_profile_photo : '/avatar.jpg',
                role: item.review_role
            }));
            setSelectedUsers(mappeddata)
        }
    }
    const tabs = [
        { label: 'Item One', content: "<TabContentOne />" },
        { label: 'Item Two', content: "<TabContentTwo />" },
        { label: 'Item Three', content: "<TabContentThree />" },
    ];
    const breadcrumbItems = [{ label: 'Dashboard', href: '/' }, { label: 'RFx List', href: '/rfx' }, { label: rfxRecord.rfx_number, href: '/rfx' }];
    const [preLimRows, setPreLimRows] = useState(
        prelimReviewRec.map((review, index) => ({
            id: review.bid_review_id,
            Description: review.temp_title,
            refrenceNumber: review.temp_ref_number,
            IssuedDate: review.issued_date,
            DueDate: review.issued_date,
            Status: review.status
        })));
    const [selectedRowId, setSelectedRowId] = useState(0);
    const [detailRevRow, setDetailRevRow] = useState(
        detailedReviewRec.map((review, index) => ({
            id: review.bid_review_id,
            Description: review.temp_title,
            refrenceNumber: review.temp_ref_number,
            IssuedDate: review.issued_date,
            DueDate: review.issued_date,
            Status: review.status
        })));
    const [rfxClarRows, setRfxClarRows] = useState(
        clarificationRec.map((calr, index) => ({
            id: calr.rfx_clarification_id,
            Title: calr.clarification_title,
            RefrenceNum: calr.rfx_clarification_ref_num,
            IssuedDate: calr.clarification_issued_date,
            DueDate: calr.clarification_due_date,
            Status: calr.status
        }))
    );
    const [rfxClarPostRows, setRfxClarPostRows] = useState([]);
    const [rfxClarPostDocsRows, setRfxClarPostDocsRows] = useState([]);
    const [finalRevrows, setFinalRevrows] = useState(
        finalReviewRec.map((calr, index) => ({
            id: calr.bid_review_id,
            Title: calr.temp_title,
            RefrenceNum: calr.temp_ref_number,
            IssuedDate: calr.issued_date,
            DueDate: calr.due_date,
            Status: calr.status
        }))
    );
    const [submissionrows, setSubmissionrows] = useState(
        submissionRec.map((sub, index) => ({
            id: sub.bid_submission_id,
            Type: sub.bid_type,
            Stage: sub.bid_stage,
            RefNumber: sub.reference_number,
            IssuedDate: sub.issued_date,
            Status: sub.status
        }))
    );
    const documentRow = [
        // { id: rows.length + 1, checkbox: 'dddd.png', description: 'Technical Proposal', crmId: '102345-TEC-R0', customer: 'Tech..', issueDate: '20 Jul 2021', salePerson: 'Bryan C.', status: 'issued', }
    ]
    const Bidrows = []
    const typeInput = [
        { value: "Technical", label: "Technical" },
        { value: "Commercial", label: "Commercial" },
        { value: "Commercial Unpriced", label: "Commercial Unpriced" },
        { value: "Combined Techno Commercial", label: "Combined Techno Commercial" },
    ];
    // STAGES DATA
    const [stages, setStages] = useState(
        stagesList.map(record => ({
            stage: record.default_name,
            displayName: record.new_name ? record.new_name : record.default_name,
            status: record.stage_status,
            order: record.display_order
        }))
    );

    // Function to check progess and show in progress bar
    const calculateProgress = () => {
        const completedStages = stages.filter(stage => stage.status === 'done').length;
        const totalStages = stages.length;
        return Math.floor((completedStages / totalStages) * 100);
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'done':
                return '#70d830';
            case 'current':
                return '#26BADA';
            case 'pending':
                return '#b4b4b4';
            default:
                return '#918e8e';
        }
    };


    const handleChangeStatus = (stageName) => {
        const currentIndex = stages.findIndex(stage => stage.status === 'current');
        if (stageName == 'Pre-lim Review' && stages[currentIndex].stage == 'Initiate') {
            let r1 = {}
            selectedContact && selectedContact.map((item, index) => (
                r1 = createContactsAction(rfxRecord.rfx_id, login_user_id, 'rfx')
            ))
        }

        // console.log(stages[currentIndex], 'ttttt')
        if (currentIndex !== -1) {
            stages[currentIndex].status = 'done';
            if (currentIndex < stages.length - 1) {
                stages[currentIndex + 1].status = 'current';
                for (let i = currentIndex + 2; i < stages.length; i++) {
                    stages[i].status = 'pending';
                }
            }
            setStages([...stages]);
            contentShow(stages[currentIndex + 1].stage, stages[currentIndex + 1].status);
            // console.log(stages)

        }
        setNextStep(false)
    };


    const datePickerLabels = ["Issue Date", "Due Date"]
    // Function to add a new row
    const addPreLimRow = async () => {
        //const newRow = { id: preLimRows.length + 1, description: 'New Opportunity', refrenceNumber: '12345666', issueDate: 'New Date', dueDate: 'New Salesperson', status: 'New Status', };
        //setPreLimRows((prevRows) => [...prevRows, newRow]);

        const data = {
            rfx_id: rfxRecord.rfx_id,
            bid_review_templates_id: 1,
            template_data: templateHTML,
            review_Key: 'Pre-lim Review',
            score_value: 0,
            score_name: 'Bid',
            score_description: '',
            issued_date: new Date().toISOString().slice(0, 10),
            due_date: new Date().toISOString().slice(0, 10),
            status: 'Open',
            skip_review: false,
            skip_reason: '',
            required_revision: false,
            review_approved: false,
            review_approved_notes: '',
            review_declined: false,
            review_declined_notes: '',
            review_revison: false,
            review_revison_notes: '',
            temp_title: showTemplateSelect,
            temp_ref_number: tempRefNumber
        }

        let response = await createReviewEntryAction(data, selectedUsers);
        let result = response.returnData

        if (response.statusCode == 200) {
            let r2 = {}
            // add contacts
            selectedUsers && selectedUsers.map(async (item, index) => (
                r2 = await createReviewContactsAction(result.bid_review_id, item.id, item.role, false, '')
            ))
            // get reviews list
            r2 = await getAllReviewsRecordsBy_Rfx_Key_Action(rfxRecord.rfx_id, 'pre-lim review');
            if (r2.statusCode == 200) {
                let reviewRec = r2.returnData
                const mappedData = reviewRec.map((review, index) => ({
                    id: review.bid_review_id,
                    Description: review.temp_title,
                    refrenceNumber: review.temp_ref_number,
                    IssuedDate: review.issued_date,
                    DueDate: review.issued_date,
                    Status: review.status
                }));
                setPreLimRows(mappedData);
            }
        }
    };


    const addDetailRevRow = async () => {
        //const newRow = { id: preLimRows.length + 1, description: 'New Opportunity', refrenceNumber: '12345666', issueDate: 'New Date', dueDate: 'New Salesperson', status: 'New Status', };
        //setDetailRevRow((prevRows) => [...prevRows, newRow]);

        const data = {
            rfx_id: rfxRecord.rfx_id,
            bid_review_templates_id: 1,
            template_data: templateHTML,
            review_Key: 'Detailed Review',
            score_value: 0,
            score_name: 'Bid',
            score_description: '',
            issued_date: new Date().toISOString().slice(0, 10),
            due_date: new Date().toISOString().slice(0, 10),
            status: 'Open',
            skip_review: false,
            skip_reason: '',
            required_revision: false,
            review_approved: false,
            review_approved_notes: '',
            review_declined: false,
            review_declined_notes: '',
            review_revison: false,
            review_revison_notes: '',
            temp_title: showDetailTempSelect,
            temp_ref_number: tempRefNumber
        }

        let response = await createReviewEntryAction(data, selectedDetailsUsers);
        let result = response.returnData
        if (response.statusCode == 200) {
            let r2 = {}
            // add contacts
            selectedDetailsUsers && selectedDetailsUsers.map(async (item, index) => (
                r2 = await createReviewContactsAction(result.bid_review_id, item.id, item.role, false, '')
            ))
            // get reviews list
            r2 = await getAllReviewsRecordsBy_Rfx_Key_Action(rfxRecord.rfx_id, 'Detailed Review');
            if (r2.statusCode == 200) {
                let reviewRec = r2.returnData
                const mappedData = reviewRec.map((review, index) => ({
                    id: review.bid_review_id,
                    Description: review.temp_title,
                    refrenceNumber: review.temp_ref_number,
                    IssuedDate: review.issued_date,
                    DueDate: review.issued_date,
                    Status: review.status
                }));
                setDetailRevRow(mappedData);
            }
        }
    };
    const addRfxClarRow = async () => {
        //const newRow = { id: rfxClarRows.length + 1, Title: 'dddd.png', RefNumber: 'New Opportunity', IssuedDAte: 'newCrmId', DueDate: 'New Customer', status: 'New Status', };
        //setRfxClarRows((prevRows) => [...prevRows, newRow]);
        if (!clarificationTitle || !clarificationType || !clarificationRefNum) {
            //showErrorMessageAlertMain("Please fill the required fields.")
        }
        const data = {
            rfx_id: rfxRecord.rfx_id,
            submitted_by: login_user_id,
            assign_to: personAssignTo.id ? personAssignTo.id : 0,
            rfx_clarification_ref_num: clarificationRefNum,
            clarification_title: clarificationTitle,
            clarification_type: clarificationType,
            clarification_issued_date: clarificationIssuedDate,
            clarification_due_date: clarificationDueDate,
            status: 'Open',
            description: clarificationDescription
        }

        let r1 = await createRfxClarificationAction(data)
        if (r1.statusCode == 200 && selectedFilesMain.length > 0) {
            uploadFiles(selectedFilesMain, apiBackendURL, tenantID, rfxRecord.rfx_id, 'rfx-clarifications')
            let fileArray = []
            for (var i = 0; i < selectedFilesMain.length; i++) {
                const file = {
                    name: selectedFilesMain[i].name,
                    type: selectedFilesMain[i].type,
                    size: selectedFilesMain[i].size,
                };
                let clarif_id = r1.returnData.rfx_clarification_id
                let r2 = await createDocUploadAction(rfxRecord.rfx_id, login_user_id, file, 'rfx-clarifications-' + clarif_id)
            }
        }

        // get clarifications list
        let r3 = await getAllRfxClarificationRecordsBy_RfxID_Action(rfxRecord.rfx_id);
        if (r3.statusCode == 200) {
            let clarifRec = r3.returnData
            const mappedData = clarifRec.map((calr, index) => ({
                id: calr.rfx_clarification_id,
                Title: calr.clarification_title,
                RefrenceNum: calr.rfx_clarification_ref_num,
                IssuedDate: calr.clarification_issued_date,
                DueDate: calr.clarification_due_date,
                Status: calr.status
            }));
            setRfxClarRows(mappedData);
        }

        setClarificationDetail(false);
        setNextStep(true)
    };

    const addFinalRevRow = async () => {
        //const newRow = { id: finalRevrows.length + 1, checkbox: 'dddd.png', description: 'New Opportunity', crmId: 'newCrmId', customer: 'New Customer', issueDate: 'New Date', salePerson: 'New Salesperson', status: 'New Status', };
        //setFinalRevrows((prevRows) => [...prevRows, newRow]);

        const data = {
            rfx_id: rfxRecord.rfx_id,
            bid_review_templates_id: 1,
            template_data: 'Data Content',
            review_Key: 'Final Review',
            score_value: 0,
            score_name: 'Bid',
            score_description: '',
            issued_date: new Date().toISOString().slice(0, 10),
            due_date: new Date().toISOString().slice(0, 10),
            status: 'Open',
            skip_review: false,
            skip_reason: '',
            required_revision: false,
            review_approved: false,
            review_approved_notes: '',
            review_declined: false,
            review_declined_notes: '',
            review_revison: false,
            review_revison_notes: '',
            temp_title: showFinalTempSelect,
            temp_ref_number: tempRefNumber
        }

        let response = await createReviewEntryAction(data, selectedDetailsUsers);
        let result = response.returnData
        if (response.statusCode == 200) {
            let r2 = {}
            // add contacts
            selectedDetailsUsers && selectedDetailsUsers.map(async (item, index) => (
                r2 = await createReviewContactsAction(result.bid_review_id, item.id, item.role, false, '')
            ))
            // get reviews list
            r2 = await getAllReviewsRecordsBy_Rfx_Key_Action(rfxRecord.rfx_id, 'Final Review');
            if (r2.statusCode == 200) {
                let reviewRec = r2.returnData
                const mappedData = reviewRec.map((review, index) => ({
                    id: review.bid_review_id,
                    Description: review.temp_title,
                    refrenceNumber: review.temp_ref_number,
                    IssuedDate: review.issued_date,
                    DueDate: review.issued_date,
                    Status: review.status
                }));
                setFinalRevrows(mappedData);
            }
        }
    };

    const handleReviewReplySubmit = async () => {
        if (!reviewReplyComment) {
            alert('Please write comment to reply.');
            return;
        }
        const data = {
            "bid_review_id": rowIdSelected,
            "title": "",
            "comment": reviewReplyComment,
            "status": reviewReplyStatus,
            "posted_by": login_user_id
        }
        if (rowIdSelected && rowIdSelected > 0) {
            let r1 = await createBidReviewPostAction(data)
            if (r1.statusCode == 200) {
                let r2 = await getAllBidReviewPostRecordsById(rowIdSelected)
                let records = r2.returnData
                setReviewReplyCommentList(records)
                console.log(r2, ' iiiidddddd')
            }
        }
    }


    useEffect(() => {
        getPages()
            .then((list) => {
                setTemplatesAll(list)
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        getAllRfxPrereqRecordsAction('rfx_stage')
            .then((res) => {
                setRfxPrereqStageList(res.returnData)
                // console.log(res)
            })
            .catch((err) => console.log(err));
    }, []);


    const addSubmissionRow = async () => {
        //const newRow = { id: finalRevrows.length + 1, checkbox: 'dddd.png', description: 'New Opportunity', crmId: 'newCrmId', customer: 'New Customer', issueDate: 'New Date', salePerson: 'New Salesperson', status: 'New Status', };
        //setSubmissionrows((prevRows) => [...prevRows, newRow]);
        if (!submissionType || submissionStage) {
            alert("Please provide required fields.");
        }

        const data = {
            "rfx_id": rfxRecord.rfx_id,
            "bid_type": submissionType,
            "bid_stage": submissionStage,
            "assign_to_id": 0,
            "reference_number": submissionRefNumber,
            "description": submissionDescription,
            "status": "Open"
        }
        // create submission
        let r1 = await createSubmissionAction(data)
        // upload documents
        if (r1.statusCode == 200 && selectedFilesMain.length > 0) {
            uploadFiles(selectedFilesMain, apiBackendURL, tenantID, rfxRecord.rfx_id, 'submission')
            for (var i = 0; i < selectedFilesMain.length; i++) {
                const file = {
                    name: selectedFilesMain[i].name,
                    type: selectedFilesMain[i].type,
                    size: selectedFilesMain[i].size,
                };
                let bid_sub_id = r1.returnData.bid_submission_id
                let r2 = await createDocUploadAction(rfxRecord.rfx_id, login_user_id, file, 'submission-' + bid_sub_id)
            }
        }
        // get submission list
        let r3 = await getAllSubmissionAction(rfxRecord.rfx_id);
        if (r3.statusCode == 200) {
            let subRec = r3.returnData
            const mappedData = subRec.map((sub, index) => ({
                id: sub.bid_submission_id,
                Type: sub.bid_type,
                Stage: sub.bid_stage,
                RefNumber: sub.reference_number,
                IssuedDate: sub.issued_date,
                Status: sub.status
            }));
            setSubmissionrows(mappedData);
        }

    };
    const [skipDialogOpen, setSkipDialogOpen] = useState(false);

    const handleSkipClick = () => {
        setSkipDialogOpen(true);
    };

    const handleCloseSkipDialog = () => {
        setSkipDialogOpen(false);
    };

    const handleSkipSubmit = (reason) => {
        // Handle the skip submission here
        console.log('Skip Reason:', reason);
    };
    const NoRowsOverlayClarification = () => (
        <Stack height="100%" alignItems="center" justifyContent="center">
            <Image src="/no-row.png" width={480} height={260} />
            <p className='text-[#252631] text-xl mb-3'>No clarifications yet</p>
            <p className='text-[#778CA2] text-lg font-light mb-3'>You’ll see them here if there are any clarifications posted</p>
            <div className="flex items-center gap-6">
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={handleClarificationDetail}>Request Clarifications</button>
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={handleSkipClick}>Skip Clarifications</button>
            </div>
            <SkipDialog
                open={skipDialogOpen}
                handleClose={handleCloseSkipDialog}
                handleSkipSubmit={() => {
                    handleSkipSubmit();
                    handleChangeStatus();
                }} />
        </Stack>
    );

    const NoRowsOverlayOrder = () => (
        <Stack height="100%" alignItems="center" justifyContent="center">
            <Image src="/no-order.png" width={480} height={260} />
            <p className='text-[#252631] text-xl mb-3'>No Orders found</p>
            <p className='text-[#778CA2] text-lg font-light mb-3'>You can create a new one here</p>
            <div className="flex items-center gap-6">
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={handleBidRowClick}>Add Order</button>
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={handleBidRowClick}>Mark as lost</button>
            </div>
        </Stack>
    );
    const NoRowsPrelimReview = () => (

        <Stack height="100%" alignItems="center" justifyContent="center">
            <Image src="/no-row.png" width={480} height={260} />
            <p className='text-[#252631] text-xl mb-3'>No requests yet</p>
            <p className='text-[#778CA2] text-lg font-light mb-3'>You have not created any review/approval requests</p>
            <div className="flex items-center gap-6">
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={() => { handleshowTemplateSelect(); }}>Request Review</button>
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={handleSkipClick}>Skip Review</button>
            </div>
            <SkipDialog
                open={skipDialogOpen}
                handleClose={handleCloseSkipDialog}
                handleSkipSubmit={() => {
                    handleSkipSubmit();
                    handleChangeStatus();
                }} />
        </Stack>
    );
    const NoRowsDetailReview = () => (

        <Stack height="100%" alignItems="center" justifyContent="center">
            <Image src="/no-row.png" width={480} height={260} />
            <p className='text-[#252631] text-xl mb-3'>No requests yet</p>
            <p className='text-[#778CA2] text-lg font-light mb-3'>You have not created any review/approval requests</p>
            <div className="flex items-center gap-6">
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={() => { handleshowDetTemplateSelect(); }}>Request Review</button>
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={handleSkipClick}>Skip Review</button>
            </div>
            <SkipDialog
                open={skipDialogOpen}
                handleClose={handleCloseSkipDialog}
                handleSkipSubmit={() => {
                    handleSkipSubmit();
                    handleChangeStatus();
                }}
            />
        </Stack>
    );
    const NoRowsFinalReview = () => (

        <Stack height="100%" alignItems="center" justifyContent="center">
            <Image src="/no-row.png" width={480} height={260} />
            <p className='text-[#252631] text-xl mb-3'>No requests yet</p>
            <p className='text-[#778CA2] text-lg font-light mb-3'>You have not created any review/approval requests</p>
            <div className="flex items-center gap-6">
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={() => { handleshowFinalTemplateSelect(); }}>Request Review</button>
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={handleSkipClick}>Skip Review</button>
            </div>
            <SkipDialog
                open={skipDialogOpen}
                handleClose={handleCloseSkipDialog}
                handleSkipSubmit={() => {
                    handleSkipSubmit();
                    handleChangeStatus();
                }} />
        </Stack>
    );
    const NoRowsOverlayBidClarification = () => (

        <Stack height="100%" alignItems="center" justifyContent="center">
            <Image src="/no-row.png" width={480} height={260} />
            <p className='text-[#252631] text-xl mb-3'>No requests yet</p>
            <p className='text-[#778CA2] text-lg font-light mb-3'>You have not created any review/approval requests</p>
            <div className="flex items-center gap-6">
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={() => { setShowBidClarificationDetial(true); }}>Request Review</button>
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={handleSkipClick}>Skip Review</button>
            </div>
            <SkipDialog
                open={skipDialogOpen}
                handleClose={handleCloseSkipDialog}
                handleSkipSubmit={() => {
                    handleSkipSubmit();
                    handleChangeStatus();
                }} />
        </Stack>
    );
    const NoRowsSubmission = () => (

        <Stack height="100%" alignItems="center" justifyContent="center">
            <Image src="/nosubmit-row.png" width={480} height={260} />
            <p className='text-[#252631] text-xl mb-3'>Ready to Submit?</p>
            <div className="flex items-center justify center">
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={() => { handleshowSubmissionTemplateSelect(); }}>Submit Bid</button>
            </div>
            <SkipDialog
                open={skipDialogOpen}
                handleClose={handleCloseSkipDialog}
                handleSkipSubmit={handleSkipSubmit}
            />
        </Stack>
    );
    const NoRowsOverlayDocuments = () => (
        <Stack height="100%" alignItems="center" justifyContent="center">
            <Image src="/no-doc.png" width={480} height={260} />
            <p className='text-[#252631] text-xl mb-3'>No bid documents recieved yet</p>
            <p className='text-[#778CA2] text-lg font-light mb-3'>You’ll see it here once its posted</p>
            <div className="flex items-center gap-6">
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={() => { setDocumentDetail(true); }}>Request Review</button>
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={handleSkipClick}>Skip Review</button>
            </div>
            <SkipDialog
                open={skipDialogOpen}
                handleClose={handleCloseSkipDialog}
                handleSkipSubmit={() => {
                    handleSkipSubmit();
                    handleChangeStatus();
                }} />
        </Stack>
    );
    const NoRowsOverlayOrderHandover = () => (
        <Stack height="auto" alignItems="center" justifyContent="center">
            <Image src="/no-order-row.png" width={480} height={260} />
            <p className='text-[#252631] text-xl mb-3'>Order Handed over </p>
            <p className='text-[#778CA2] text-lg font-light mb-3'>The team has been notified about the order transfer</p>
        </Stack>
    );

    // console.log("clar:", clarificationRec)

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} />
            {/* NOTIFICATION DIV */}
            <div className="flex bg-white mb-6 ">
                <div className="flex justify-between max-w-[60%] w-full border-r border-gray-200 p-[10px]">
                    <span className="text-xl">{rfxRecord.rfx_title}</span>
                    <span className="text-sm text-[#FF912B]">{rfxRecord.rfx_number}</span>
                </div>
                <Link href='/activity-feed' className=" px-8 whitespace-nowrap flex items-center justify-center gap-2 text-[#98A9BC] border-r border-gray-200">
                    <FaRegCalendarMinus />
                    <p>Activity Feed</p>
                </Link>
                <Link href='/messages' className=" px-8 whitespace-nowrap flex items-center justify-center gap-2 text-[#98A9BC] border-r border-gray-200">
                    <Image src="/msg.svg" width={22} height={25} />
                    <p> <span className="text-black">21</span> Messages</p>
                </Link>
                <Link href='alerts' className=" px-8 whitespace-nowrap flex items-center justify-center gap-2 text-[#98A9BC] border-r border-gray-200">
                    <Image src="/bell.svg" width={22} height={25} />
                    <p> <span className="text-black">2</span> Alerts</p>
                </Link>
                <div className="whitespace-nowrap flex items-center justify-center px-8"><BsThreeDots /></div>
            </div>
            {/* DASHBOARD CARDS */}
            <div className="flex items-center justify-between gap-5">
                <div className="flex bg-white p-5 justify-between items-center w-[25%] shadow-sm">
                    <div className="rounded-full bg-[#00AAEC] p-[14px] mr-5 ring-offset-2 ring-2 ring-[#00AAEC]">
                        <VscChecklist className="text-white text-[22px]" />
                    </div>
                    <div className="flex flex-col flex-[3]">
                        <p className="text-sm text-[#98A9BC]">Tasks Completed</p>
                        <span className="text-sm">- of -</span>
                    </div>

                </div>
                <div className="flex bg-white p-5 justify-between items-center w-[25%] shadow-sm">
                    <div className="rounded-full bg-[#FFAB2B] p-[14px] mr-5 ring-offset-2 ring-2 ring-[#FFAB2B]">
                        <VscChecklist className="text-white text-[22px]" />
                    </div>
                    <div className="flex flex-col flex-[3]">
                        <p className="text-sm text-[#98A9BC]">Hours Logged</p>
                        <span className="text-sm">- of - Estimated</span>
                    </div>

                </div>
                <div className="flex bg-white p-5 justify-between items-center w-[25%] shadow-sm">
                    <div className="rounded-full bg-[#FFD02B] p-[14px] mr-5 ring-offset-2 ring-2 ring-[#FFD02B]">
                        <FaRegClock className="text-white text-[22px]" />
                    </div>
                    <div className="flex flex-col flex-[3]">
                        <p className="text-sm text-[#98A9BC]">Bid Due in</p>
                        <span className="text-sm text-[#98A9BC]"><span className='text-black'> 29 </span>days <span className='text-black'> 8 </span> hours</span>
                    </div>

                </div>
                <div className="flex bg-white p-5 justify-between items-center w-[25%] shadow-sm">
                    <div className="rounded-full bg-[#6DD230] p-[14px] mr-5 ring-offset-2 ring-2 ring-[#6DD230]">
                        <FaBarsProgress className="text-white text-[22px]" />
                    </div>
                    <div className="flex flex-col flex-[3]">
                        <progress id="file" value={calculateProgress()} max="100" className="h-[6px] progressbar mb-2"></progress>
                        <p className="text-sm text-[#98A9BC]">Bid Progress</p>
                    </div>
                    <div className="flex-[1]">
                        <span className="text-sm text-[#FE4D97]">{calculateProgress()}%</span>
                    </div>
                </div>
            </div>
            {/* PROGRESS ARROWS */}
            <div className="bg-white px-2 mt-[14px] py-4 flex justify-between">
                {stages.map((stageData, index) => (
                    <svg key={index} xmlns="http://www.w3.org/2000/svg" width="9%" viewBox="0 0 155 40" fill="none" onClick={() => contentShow(stageData.stage, stageData.status)} className={`${stageData.status === 'pending' ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                        <g filter={`url(#filter0_d_4480_${index})`}>
                            <mask id="path-1-inside-1_4480_12163" fill="white">
                                <path fillRule="evenodd" clipRule="evenodd" d="M139.193 2.34255C138.434 1.48859 137.346 1 136.204 1H6.90724C3.45584 1 1.62462 5.07785 3.9176 7.65745L11.6377 16.3425C12.9848 17.8581 12.9848 20.1419 11.6377 21.6575L3.9176 30.3425C1.62462 32.9221 3.45585 37 6.90724 37H136.204C137.346 37 138.434 36.5114 139.193 35.6575L151.638 21.6575C152.985 20.1419 152.985 17.8581 151.638 16.3425L139.193 2.34255Z" />
                            </mask>
                            <path fillRule="evenodd" clipRule="evenodd" d="M139.193 2.34255C138.434 1.48859 137.346 1 136.204 1H6.90724C3.45584 1 1.62462 5.07785 3.9176 7.65745L11.6377 16.3425C12.9848 17.8581 12.9848 20.1419 11.6377 21.6575L3.9176 30.3425C1.62462 32.9221 3.45585 37 6.90724 37H136.204C137.346 37 138.434 36.5114 139.193 35.6575L151.638 21.6575C152.985 20.1419 152.985 17.8581 151.638 16.3425L139.193 2.34255Z" fill="white" />
                            <path d="M11.6377 16.3425L10.8903 17.0069H10.8903L11.6377 16.3425ZM11.6377 21.6575L12.3851 22.3218L11.6377 21.6575ZM151.638 21.6575L150.89 20.9931L151.638 21.6575ZM151.638 16.3425L150.89 17.0069L151.638 16.3425ZM139.193 2.34255L139.941 1.67818L139.193 2.34255ZM139.193 35.6575L139.941 36.3218L139.193 35.6575ZM6.90724 2H136.204V0H6.90724V2ZM12.3851 15.6782L4.66501 6.99309L3.17019 8.32182L10.8903 17.0069L12.3851 15.6782ZM12.3851 22.3218C14.069 20.4274 14.069 17.5726 12.3851 15.6782L10.8903 17.0069C11.9006 18.1436 11.9006 19.8564 10.8903 20.9931L12.3851 22.3218ZM4.66501 31.0069L12.3851 22.3218L10.8903 20.9931L3.17019 29.6782L4.66501 31.0069ZM136.204 36H6.90724V38H136.204V36ZM150.89 20.9931L138.446 34.9931L139.941 36.3218L152.385 22.3218L150.89 20.9931ZM150.89 17.0069C151.901 18.1436 151.901 19.8564 150.89 20.9931L152.385 22.3218C154.069 20.4274 154.069 17.5726 152.385 15.6782L150.89 17.0069ZM138.446 3.00691L150.89 17.0069L152.385 15.6782L139.941 1.67818L138.446 3.00691ZM3.17019 29.6782C0.303962 32.9027 2.593 38 6.90724 38V36C4.31869 36 2.94527 32.9416 4.66501 31.0069L3.17019 29.6782ZM136.204 2C137.061 2 137.877 2.36644 138.446 3.00691L139.941 1.67818C138.992 0.610742 137.632 0 136.204 0V2ZM136.204 38C137.632 38 138.992 37.3893 139.941 36.3218L138.446 34.9931C137.877 35.6336 137.061 36 136.204 36V38ZM6.90724 0C2.59299 0 0.303962 5.09731 3.17019 8.32182L4.66501 6.99309C2.94527 5.05839 4.31869 2 6.90724 2V0Z" fill={getStatusColor(stageData.status)} mask="url(#path-1-inside-1_4480_12163)" />
                            <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill={getStatusColor(stageData.status)} fontSize="16">{stageData.stage}</text>
                        </g>
                        <defs>
                            <filter id={`filter0_d_4480_${index}`} x="0.899414" y="0" width="153.749" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="1" />
                                <feGaussianBlur stdDeviation="1" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.215686 0 0 0 0 0.254902 0 0 0 0 0.317647 0 0 0 0.08 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4480_12155" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4480_12155" result="shape" />

                            </filter>
                        </defs>
                    </svg>
                ))}
            </div>
            {/* 
                    <div className="flex items-center justify-between bg-[#FFF8EE] shadow-md p-2 mt-4">
                        <div className="">
                            <FaInfoCircle className="text-[#FFAB2B]" />
                        </div>
                        <div className="">
                            <p className="text-[#778CA2] ">RFQ acknowledgement awaited. <Link href="/" className="text-[#00AAEC] "> Upload RFx Acknowledgement</Link></p>
                        </div>
                        <div className=""><RxCrossCircled className="text-[#26BADA]" /></div>
                    </div>
                    */}
            {/* <div className="flex gap-2 my-2">
                <span className={`text-sm bg-white px-3 py-2 border border-[#ddd] cursor-pointer ${(active === 'Overview' || active === 'Initiate') ? 'text-black' : 'text-[#778CA2]'}`} onClick={() => contentShow('Overview')}>Overview</span>
                <span className={`text-sm bg-white px-3 py-2 border border-[#ddd] cursor-pointer ${active === 'Pre-lim Review' ? 'text-black' : 'text-[#778CA2]'}`} onClick={() => contentShow('Pre-lim Review')}>Pre-lim Review</span>
                <span className={`text-sm bg-white px-3 py-2 border border-[#ddd] cursor-pointer ${active === 'Bid Setup' ? 'text-black' : 'text-[#778CA2]'}`} onClick={() => contentShow('Bid Setup')}>Bid Setup</span>
                <span className={`text-sm bg-white px-3 py-2 border border-[#ddd] cursor-pointer ${active === 'Detailed Review' ? 'text-black' : 'text-[#778CA2]'}`} onClick={() => contentShow('Detailed Review')}>Detailed Review</span>
                <span className={`text-sm bg-white px-3 py-2 border border-[#ddd] cursor-pointer ${active === 'RFx Clarifications' ? 'text-black' : 'text-[#778CA2]'}`} onClick={() => contentShow('RFx Clarifications')}>RFx Clarifications</span>
                <span className={`text-sm bg-white px-3 py-2 border border-[#ddd] cursor-pointer ${active === 'Prepration' ? 'text-black' : 'text-[#778CA2]'}`} onClick={() => contentShow('Prepration')}>Prepration</span>
                <span className={`text-sm bg-white px-3 py-2 border border-[#ddd] cursor-pointer ${active === 'Final Review' ? 'text-black' : 'text-[#778CA2]'}`} onClick={() => contentShow('Final Review')}>Final Review</span>
                <span className={`text-sm bg-white px-3 py-2 border border-[#ddd] cursor-pointer ${active === 'Submission' ? 'text-black' : 'text-[#778CA2]'}`} onClick={() => contentShow('Submission')}>Submission</span>
                <span className={`text-sm bg-white px-3 py-2 border border-[#ddd] cursor-pointer ${active === 'Bid Documents' ? 'text-black' : 'text-[#778CA2]'}`} onClick={() => contentShow('Bid Documents')}>Bid Documents</span>
                <span className={`text-sm bg-white px-3 py-2 border border-[#ddd] cursor-pointer ${active === 'Bid Clarifications' ? 'text-black' : 'text-[#778CA2]'}`} onClick={() => contentShow('Bid Clarifications')}>Bid Clarifications</span>
                <span className={`text-sm bg-white px-3 py-2 border border-[#ddd] cursor-pointer ${active === 'Bid Revision' ? 'text-black' : 'text-[#778CA2]'}`} onClick={() => contentShow('Bid Revision')}>Bid Revision</span>
                <span className={`text-sm bg-white px-3 py-2 border border-[#ddd] cursor-pointer ${active === 'Order' ? 'text-black' : 'text-[#778CA2]'}`} onClick={() => contentShow('Order')}>Order</span>
                <span className={`text-sm bg-white px-3 py-2 border border-[#ddd] cursor-pointer ${active === 'Order Handover' ? 'text-black' : 'text-[#778CA2]'}`} onClick={() => contentShow('Order Handover')}>Order-Handover</span>
            </div> */}
            <div className="Content bg-white">
                {(active === 'Overview' || active === 'Initiate') && <div className="bg-white p-8 mt-1">
                    <div className="flex w-full gap-4">
                        <div className="p-4 flex-[2]">
                            <form className="grid grid-cols-2 gap-4  ">
                                {overviewData.map((item, index) => (
                                    <div className={`mt-3 ${item.name === 'Other instructions for submission' ? 'col-span-2' : ''}`} key={index}>
                                        <span className=" block text-[#778CA2]">{item.name}</span>
                                        {item.name === 'Other instructions for submission' ? (
                                            <textarea
                                                className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                                                value={item.value}
                                                rows={4}
                                                onChange={(e) => handleValueChange(index, e.target.value)}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                                                value={item.value}
                                                onChange={(e) => handleValueChange(index, e.target.value)}
                                            />
                                        )}
                                    </div>
                                ))}
                            </form>
                            <p className='text-[#778CA2] mt-3'>Attached Documents</p>
                            {docvaltRec && docvaltRec.map((doc) => (
                                <div className=" shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                    {
                                        ['jpg', 'jpeg', 'png'].some(ext => doc.file_type.includes(ext))

                                            ?
                                            <FaRegFileImage className='text-red-600' />
                                            :
                                            <FaRegFilePdf className='text-red-600' />
                                    }
                                    <span className=''>{doc.docvalt_filename}</span>
                                    <span className='text-[#98A9BC]'>{doc.file_size}</span>
                                    <span className='text-[#98A9BC]'>{formatDateString(doc.created_at)}</span>
                                    <div className="flex items-center gap-2 text-[#98A9BC]">
                                        <MdOutlineModeEdit className='cursor-pointer' />
                                        <RiDeleteBin6Line className='cursor-pointer' />
                                        <span><Image src="/msg.svg" width={18} height={21} alt="add" /></span>
                                        <BsThreeDots className='text-[#98A9BC]' />
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className="flex-[1] flex flex-col">
                            <div className="flex items-center gap-3 mt-[-16px]">
                                <span className="text-[#778CA2]">Last Updated: 26 Jul, 2021</span>
                                <span className="text-[#778CA2]">10:00 AM</span>
                                <span className="text-[#26BADA]"><LuRefreshCcw /></span>
                            </div>
                            <button className="text-white text-center bg-[#26BADA] py-3 mt-[10px] mb-[18px] rounded-md border-0 uppercase" onClick={() => handleChangeStatus('Pre-lim Review')}>Initiate Preliminary Review </button>
                            <BidDialog openBid={openBid} handleBidClose={handlCloseBid} />
                            <div className="border mt-[18px] mb-3 rounded-md">
                                <div className="bg-[#00000005] py-2 px-[14px] " > Critical Dates</div>
                                <div className="bg-[#F4FCFD] px-4 py-5 flex items-center justify-between ">
                                    <div>
                                        <span className="text-[#778CA2] block">Issue Date</span>
                                        <span>{formatDateString(rfxRecord.issued_date)}</span>
                                    </div>
                                    <div>
                                        <span className="text-[#778CA2] block">Due Date</span>
                                        <span>{formatDateString(rfxRecord.due_date)}</span>
                                    </div>
                                </div>
                                <div className="border-b border-[#E8ECEF] w-[90%] m-auto"></div>
                                <div className="bg-[#F4FCFD] px-4 py-5">
                                    <span className="text-[#778CA2] block">Technical clarification deadline</span>
                                    <span>{formatDateString(rfxRecord.tech_clarification_deadline)}</span>
                                </div>
                                <div className="border-b border-[#E8ECEF] w-[90%] m-auto"></div>
                                <div className="bg-[#F4FCFD] px-4 py-5">
                                    <span className="text-[#778CA2] block">Commercial clarification deadline</span>
                                    <span>{formatDateString(rfxRecord.com_clarification_deadline)}</span>
                                </div>
                                <div className="border-b border-[#E8ECEF] w-[90%] m-auto"></div>
                                <div className="bg-[#F4FCFD] px-4 py-5">
                                    <span className="text-[#778CA2] block">Expected award date</span>
                                    <span>{rfxRecord.expected_award_date ? formatDateString(rfxRecord.expected_award_date) : 'No Date'} </span>
                                </div>
                            </div>
                            <div className="border mb-3 rounded-md">
                                <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between" >
                                    <p>Assign to</p>
                                    <p className='uppercase text-[#26BADA] text-xs'>Reassign</p>
                                </div>
                                <div className="bg-[#F4F5F6] py-3 px-4 flex   items-center justify-between">
                                    {/* <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                                <Image src='/ravi.png' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" alt="add" />
                                                <div className="">
                                                    <span className="text-sm leading-4">Ravi K.</span>
                                                    <span className="text-sm leading-4 text-[#778CA2] block">Lead Bid Engineer</span>
                                                </div>
                                            </div> */}
                                    <AssignPopupInput label={"Assign to"} allUsersRec={allUsersRec} rfx_bid_assignto={rfxRecord.rfx_bid_assignto} rfxID={rfxRecord.rfx_id} className="w-full" />
                                    {/* <BidDialog openBid={openContactAssign} handleBidClose={handlCloseContact} /> */}
                                </div>
                            </div>
                            <div className="bg-[#F8FAFB] flex flex-col gap-3 py-4 px-6 rounded-b-md items-center w-full">
                                <BidDialog openBid={openContactAssign} handleBidClose={handlCloseContact} />
                            </div>
                            <div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between">
                                        <p>Bid Team</p>
                                        <p className='uppercase text-[#26BADA] text-xs flex items-center gap-2 cursor-pointer' onClick={handleAddTeam}>
                                            Add team <IoMdAddCircleOutline />
                                        </p>
                                    </div>
                                    {keyContactsRec.map((selectedContact, index) => (
                                        <div className="bg-[#F4F5F6] px-4 py-1 flex items-center justify-between" key={index}>
                                            <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                                <Avatar alt={selectedContact.first_name + ' ' + selectedContact.last_name} src={selectedContact.user_profile_photo} />
                                                <div className="">
                                                    <span className="text-sm leading-4">{selectedContact.first_name} {selectedContact.last_name}</span>
                                                    <span className="text-sm leading-4 text-[#778CA2] block">{selectedContact.designation_title}</span>
                                                </div>
                                            </div>
                                            <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Requester</div>
                                        </div>
                                    ))}
                                    {selectedContact.map((selectedContact, index) => (
                                        <div className="bg-[#F4F5F6] px-4 py-1 flex items-center justify-between" key={index}>
                                            <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                                <Avatar alt={selectedContact.first_name + ' ' + selectedContact.last_name} src={selectedContact.user_profile_photo} />
                                                <div className="">
                                                    <span className="text-sm leading-4">{selectedContact.name} {selectedContact.last_name}</span>
                                                    <span className="text-sm leading-4 text-[#778CA2] block">{selectedContact.designation}</span>
                                                </div>
                                            </div>
                                            <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Requester</div>
                                        </div>
                                    ))}



                                </div>
                                <ContactDialog isOpen={isContactDialogOpen} handleClose={() => setContactDialogOpen(false)} handleContactSelect={handleContactSelect} users={allUsersRec} />
                            </div>
                            {/*  
                                    <div className="border mb-3 rounded-md">
                                        <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >RFx Acknowledgement</div>
                                        <div className="bg-[#F4F5F6] py-6 flex items-center flex-col gap-3">
                                            <p className="text-lg text-[#FFAB2B]">Awaited</p>
                                            <p className="text-[#00AAEC] cursor-pointer" onClick={handleClickOpen}>Upload RFx Acknowldegement</p>
                                            <UploadDialog open={open} handleClose={handleClose} />

                                        </div>
                                    </div>
                                    */}
                        </div>
                    </div>
                </div>}

                {active === 'Pre-lim Review' && <div className='p-5 bg-white shadow-sm h-full min-h-screen'>
                    {!showTemplateSelect && (
                        <>
                            <div className="flex justify-between uppercase text-[#00AAEC] text-sm mb-4 cursor-pointer ">

                                <div className="flex items-center gap-1" onClick={() => { setshowTemplateSelect(true); setViewTemplateDetails(false); setloadTemplate(false); }}>
                                    <span>New Request</span>
                                    <IoMdAddCircleOutline />
                                </div>
                                <button className={`upprecase uppercase max-w-[200px] flex items-center gap-1 rounded-md p-2  ${setPreLimRows.length ? 'bg-[#00AAEC] text-white' : 'bg-[#EFF3F5] text-[#98A9BC]'}`} onClick={handleChangeStatus} disabled={!setPreLimRows.length} >Proceed <FaArrowRight /> </button>

                            </div>
                            <SearchTableNew rows={preLimRows} handleRowClick={handleRowClick} NoRowsOverlay={NoRowsPrelimReview} />


                        </>
                    )}
                    {(showTemplateSelect && !loadTemplate) && (
                        <div className='flex flex-col gap-4 mt-5'>
                            <TextField
                                select
                                label="RFx Type"
                                onChange={handleSelectChange}
                                className="bg-white w-full max-w-[360px]"
                            >
                                {templatesAll.map(option => (
                                    <MenuItem key={option.id} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-basic"
                                label="Reference #"
                                variant="outlined"
                                onChange={handleRefNumberChange}
                                className="bg-[#EFF3F5] w-full max-w-[360px]"
                            />
                            <button className={`uppercase p-[10px] max-w-[240px] ${isButtonActive ? 'bg-[#26BADA] text-white' : 'bg-[#EFF3F5] text-[#98A9BC]'}`}
                                onClick={() => {
                                    setloadTemplate(true);
                                    setInTemplateDetail(false);
                                }} disabled={!isButtonActive}
                            >Load Template</button>
                        </div>


                    )}
                    {loadTemplate && (
                        <>
                            <div className="flex items-center gap-1text-[#26BADA] cursor-pointer mb-1" onClick={() => { setshowTemplateSelect(prelimReviewRec.length ? false : true); setloadTemplate(false) }}>
                                <FaChevronLeft />
                                <span >Back to list</span>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-[2]">
                                    <div>
                                        <Typography variant="h6">Bid/No Bid</Typography>
                                        <div className="mt-4">

                                            <div dangerouslySetInnerHTML={{ __html: templateHTML }} />
                                            {/*templateQuestions.map((option, index) => (
                                                <div key={index} className="flex items-center shadow-md p-4 mb-2 bg-white">
                                                    <FormControlLabel
                                                        className='flex items-center justify-between w-full flex-row-reverse'
                                                        label={<Typography variant="body1">{option}</Typography>}
                                                        control={
                                                            <Switch
                                                                color="primary"
                                                                checked={selectedTemplateQuestions[option]}
                                                                onChange={() => handleOptionChange(option)}
                                                            />
                                                        }
                                                    />
                                                </div>
                                                    ))*/}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-[1] flex flex-col items-center p-3 gap-4">
                                    {!viewTemplateDetails && <button className={`text-center  py-3 mt-[10px] mb-[18px] rounded-md border-0 uppercase w-full ${activeSubmit ? 'bg-[#26BADA] text-white' : 'bg-[#EFF3F5] text-[#98A9BC]'}`} disabled={!activeSubmit} onClick={() => { addPreLimRow(); setshowTemplateSelect(false); setloadTemplate(false); setNextStep(true) }}>Submit</button>}
                                    <div className="rounded-md border border-gray-300 w-full mt-4 ">
                                        <div className="bg-[#EFF3F5] text-[#778CA2]  flex gap-2 p-3 items-center">
                                            <span >Score</span>
                                            <RxQuestionMarkCircled />
                                        </div>
                                        <div className="bg-[#F8FAFB] text-center p-8">
                                            <p className="text-5xl text-[#778CA2]">{selectedReviewRow?.score_value}: <span className="text-[#6DD230]">{selectedReviewRow?.score_name}</span></p>
                                            <p className=" text-[#778CA2] my-4">{selectedReviewRow?.score_description ? selectedReviewRow?.score_description : 'No Description'} </p>
                                        </div>
                                    </div>
                                    <div className="rounded-md border border-gray-300 w-full">
                                        <div className="bg-[#EFF3F5] text-[#778CA2]  flex justify-between p-3 items-center">
                                            <span >Reviewer / Approver</span>
                                            {!viewTemplateDetails && <span className="text-[#00AAEC] flex items-center text-sm gap-2 cursor-pointer" onClick={handleReviewerDialogOpen}>ADD <IoMdAddCircleOutline /></span>}
                                        </div>

                                        <div className="bg-[#F8FAFB] text-center p-8">
                                            {selectedUsers?.map((user) => (
                                                user.name && (
                                                    <div key={user.name} className="px-4 py-1 flex items-center justify-between">
                                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                                            <Image src={user.image} width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                                            <div className="">
                                                                <span className="text-sm leading-4">{user.name}</span>
                                                                <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                                            </div>
                                                        </div>
                                                        <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center">{user.role}</div>
                                                    </div>
                                                )))}

                                        </div>
                                        <SelectReviewerDialog open={reviewerDialogOpen} onClose={handleReviewerDialogClose} onDone={handleReviewerDialogDone} usersRec={allUsersRec} />

                                    </div>
                                    {inTemplateDetail && <div className="rounded-md border border-gray-300 w-full">
                                        <div className="bg-[#EFF3F5] text-[#778CA2]  p-3">
                                            <span >Comments</span>
                                        </div>
                                        <div className="bg-[#E8ECEF] p-2">


                                            {reviewReplyCommentList && reviewReplyCommentList.map((item) => (
                                                <div className="flex">
                                                    <div className="flex-[1]">
                                                        <Image src="/avatar.jpg" width={20} height={20} alt="ravi" className="max-w-[36px]" />
                                                    </div>
                                                    <div className="flex flex-col flex-[5] p-2 mb-2">
                                                        <div className="flex justify-between">
                                                            <span>{item.first_name} {item.last_name}</span>
                                                            <span className="text-sm text-[#26BADA]">{item.status}</span>
                                                        </div>
                                                        <p className="text-sm text-[#778CA2]" >{item.comment}</p>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="block">
                                                {<>
                                                    <textarea className='my-2 p-2 w-full' rows={3} placeholder="Write your reply" onChange={(e) => setReviewReplyComment(e.target.value)}></textarea>
                                                    <select id="rfx_type" className="block w-full px-4 py-4 mb-3 text-sm border rounded-sm border-gray-300 hover:border-black" onChange={(e) => setReviewReplyStatus(e.target.value)}>
                                                        <option value={''}>Status</option>
                                                        <option key="Pending" value="Pending">Pending</option>
                                                        <option key="Issued" value="Issued">Issued</option>
                                                        <option key="Approved with comment" value="Approved with comment">Approved with comment</option>
                                                    </select>
                                                    <button className='uppercase p-[10px] min-w-[200px] w-[50%] bg-[#26BADA] text-white  rounded-md ' onClick={handleReviewReplySubmit} >Reply</button>
                                                </>}

                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </>
                    )}



                </div>}

                {active === 'Bid Setup' && <div className='p-5 bg-white shadow-sm h-full min-h-screen'>
                    <div className="max-w-[80%]">
                        <div className="flex justify-end items-center">
                            <button className={`upprecase my-5 uppercase rounded-md p-2  bg-[#00AAEC] text-white cursor-pointer flex items-center gap-1`} onClick={handleChangeStatus} disabled={false} >Proceed <FaArrowRight /> </button>
                        </div>
                        <ControlledAccordions rfxRecord={rfxRecord} allUsersRec={allUsersRec} koffRec={koffRec} deliverablesRec={deliverablesRec} login_user_id={login_user_id} bidteamRec={bidteamRec} />
                    </div>

                </div>}

                {active === 'Detailed Review' && <div className='p-5 bg-white shadow-sm h-full min-h-screen'>
                    {!showDetailTempSelect && (
                        <>
                            <div className="flex justify-between uppercase text-[#00AAEC] text-sm mb-4 cursor-pointer ">

                                <div className="flex items-center gap-1" onClick={addDetailRevRow}>
                                    <span onClick={handleshowDetTemplateSelect} > New Request</span>
                                    <IoMdAddCircleOutline />
                                </div>
                                <button className={`upprecase uppercase max-w-[200px] rounded-md p-2 flex items-center gap-1 ${detailRevRow.length ? 'bg-[#00AAEC] text-white' : 'bg-[#EFF3F5] text-[#98A9BC]'}`} onClick={handleChangeStatus} disabled={!detailRevRow.length} >Proceed <FaArrowRight /> </button>

                            </div>
                            <SearchTableNew rows={detailRevRow} handleRowClick={handleRowClick} NoRowsOverlay={NoRowsDetailReview} />

                        </>
                    )}
                    {(showDetailTempSelect && !detailTemplate) && (
                        <div className='flex flex-col gap-4 mt-5'>
                            <TextField
                                select
                                label="Select Template"
                                onChange={handleDetailSelectChange}
                                className="bg-white w-full max-w-[360px]"
                            >
                                {templatesAll.map(option => (
                                    <MenuItem key={option.id} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-basic"
                                label="Reference #"
                                variant="outlined"
                                className="bg-[#EFF3F5] w-full max-w-[360px]"
                                onChange={(e) => setTempRefNumber(e.target.value)}
                            />
                            <button className={`uppercase p-[10px] max-w-[240px] ${isDetailButtonActive ? 'bg-[#26BADA] text-white' : 'bg-[#EFF3F5] text-[#98A9BC]'}`} disabled={!isDetailButtonActive} onClick={() => { setDetailTemplate(true) }}
                            >Load Template</button>
                        </div>


                    )}
                    {detailTemplate && (
                        <div className="flex gap-4">
                            <div className="flex-[2]">
                                <div>
                                    <div className="flex items-center gap-1 cursor-pointer text-[#26BADA] mb-1" onClick={() => { setshowDetailTempSelect(detailRevRow.length ? false : true); setloadTemplate(false) }}>
                                        <FaChevronLeft />
                                        <span>Back to list</span>
                                    </div>
                                    <Typography variant="h6" className='text-[#778CA2]'>Export Compliance Check</Typography>
                                    <div className="mt-4">

                                        <div dangerouslySetInnerHTML={{ __html: templateHTML }} />

                                        {/*detailTemplateQuestions.map((option, index) => (
                                            <div key={index} className="flex items-center shadow-md p-4 mb-2 bg-white">
                                                <FormControlLabel
                                                    className='flex items-center justify-between w-full flex-row-reverse'
                                                    label={<Typography variant="body1">{option}</Typography>}
                                                    control={
                                                        <Switch
                                                            color="primary"
                                                            checked={selectedTemplateQuestions[option]}
                                                            onChange={() => handleDetailOptionChange(option)}
                                                        />
                                                    }
                                                />
                                            </div>
                                                ))*/}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-[1] flex flex-col items-center p-3 gap-4">
                                {/* {!viewTemplateDetails && <button className={`text-center  py-3 mt-[10px] mb-[18px] rounded-md border-0 uppercase w-full ${detailActiveSubmit ? 'bg-[#26BADA] text-white' : 'bg-[#EFF3F5] text-[#98A9BC]'}`} disable={!detailActiveSubmit} onClick={() => { addDetailRevRow(); setshowDetailTempSelect(false); setDetailTemplate(false); setNextStep(true) }} >Submit</button>} */}
                                {!inDetailReviewTemplate && <button className='text-center  py-3 mt-[10px] mb-[18px] rounded-md border-0 uppercase w-full bg-[#26BADA] text-white' onClick={() => { addDetailRevRow(); setshowDetailTempSelect(false); setDetailTemplate(false); setNextStep(true) }} >Submit</button>}
                                <div className="rounded-md border border-gray-300 w-full mt-4 ">
                                    <div className="bg-[#00000005] text-[#778CA2]  flex gap-2 p-3 items-center">
                                        <span >Score</span>
                                        <RxQuestionMarkCircled />
                                    </div>
                                    <div className="bg-[#F8FAFB] text-center p-8">
                                        <p className="text-5xl text-[#778CA2]">17 : <span className="text-[#6DD230]">Compiled</span></p>
                                        <p className=" text-[#778CA2] my-4">Export Compliance Check</p>
                                    </div>
                                </div>
                                <div className="rounded-md border border-gray-300 w-full">
                                    <div className="bg-[#EFF3F5] text-[#778CA2]  flex justify-between p-3 items-center">
                                        <span >Reviewer / Approver</span>
                                        <span className="text-[#00AAEC] flex items-center text-sm gap-2 cursor-pointer" onClick={handleDetailDialogOpen} >ADD <IoMdAddCircleOutline /></span>
                                    </div>

                                    <div className="bg-[#F8FAFB] text-center p-8">

                                        {selectedDetailsUsers?.map((user) => (
                                            user.name && (
                                                <div key={user.name} className="px-4 py-1 flex items-center justify-between">
                                                    <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                                        <Image src={user.image} width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                                        <div className="">
                                                            <span className="text-sm leading-4">{user.name}</span>
                                                            <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                                        </div>
                                                    </div>
                                                    <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center">Requester</div>
                                                </div>
                                            )))}

                                    </div>
                                    <SelectReviewerDialog open={detailDialogOpen} onClose={handleDetailDialogClose} onDone={handleDetailDialogDone} usersRec={allUsersRec} />
                                </div>
                                {inDetailReviewTemplate && <div className="rounded-md border border-gray-300 w-full">
                                    <div className="bg-[#EFF3F5] text-[#778CA2]  p-3">
                                        <span >Comments</span>
                                    </div>
                                    <div className="bg-[#E8ECEF] p-2">

                                        {reviewReplyCommentList && reviewReplyCommentList.map((item) => (
                                            <div className="flex">
                                                <div className="flex-[1]">
                                                    <Image src="/avatar.jpg" width={20} height={20} alt="ravi" className="max-w-[36px]" />
                                                </div>
                                                <div className="flex flex-col flex-[5] p-2 mb-2">
                                                    <div className="flex justify-between">
                                                        <span>{item.first_name} {item.last_name}</span>
                                                        <span className="text-sm text-[#26BADA]">{item.status}</span>
                                                    </div>
                                                    <p className="text-sm text-[#778CA2]" >{item.comment}</p>
                                                </div>
                                            </div>
                                        ))}

                                        {<>
                                            <textarea
                                                className='my-2 p-2 w-full'
                                                rows={3}
                                                placeholder="Write your reply"
                                                onChange={(e) => setReviewReplyComment(e.target.value)}>
                                            </textarea>
                                            <select
                                                id="rfx_type"
                                                className="block w-full px-4 py-4 mb-3 text-sm border rounded-sm border-gray-300 hover:border-black"
                                                onChange={(e) => setReviewReplyStatus(e.target.value)}
                                            >
                                                <option value={''}>Status</option>
                                                <option
                                                    key="Pending"
                                                    value="Pending"
                                                >
                                                    Pending
                                                </option>
                                                <option
                                                    key="Issued"
                                                    value="Issued"
                                                >
                                                    Issued
                                                </option>
                                                <option
                                                    key="Approved with comment"
                                                    value="Approved with comment"
                                                >
                                                    Approved with comment
                                                </option>
                                            </select>
                                            <button
                                                className='uppercase p-[10px] min-w-[200px] w-[50%] bg-[#26BADA] text-white  rounded-md '
                                                onClick={handleReviewReplySubmit}
                                            >Reply</button>
                                        </>}

                                    </div>
                                </div>}
                            </div>
                        </div>

                    )}


                    {clarificationDetail &&
                        <div className="flex gap-6">
                            <div className="flex flex-[3] flex-col">
                                <div className=" flex items-center gap-1 text-[#00AAEC] cursor-pointer" onClick={() => setClarificationDetail(false)}>
                                    <FaChevronLeft />
                                    <span>  Back to List</span>
                                </div>
                                <p className='text-xl p-2'>Commercial Clarification 01</p>
                                <div className="flex flex-col-reverse">
                                    <div className="border mb-3 rounded-md ">
                                        <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between " >
                                            <p>#001</p>
                                            <p>Posted by <span className='text-[#00AAEC]'>Ravi K.</span> on 23 Jun 2021, 12:30</p>
                                        </div>
                                        <div className="bg-[#F4F5F6] p-6 flex flex-col gap-5">
                                            <p>Hi Michael,22
                                                Please find enclosed the first set of commercial questions. Can you please get clarifications from the customer.<br />
                                                Thanks,
                                            </p>
                                            <p className='text-[#778CA2] mt-3'>Attached Documents</p>
                                            <div className="bg-[#E8ECEF] shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                                <FaRegFilePdf className='text-red-600' />
                                                <span className=''>102345-CCL-01.xlxs</span>
                                                <span className='text-[#98A9BC]'>123kb</span>
                                                <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                                <div className="flex items-center gap-2">
                                                    <span><Image src="/msg.svg" width={18} height={21} /></span>
                                                    <BsThreeDots className='text-[#98A9BC]' />
                                                </div>

                                            </div>
                                            <div className="bg-[#E8ECEF] shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                                <FaRegFilePdf className='text-red-600' />
                                                <span className=''>102345-CCL-01.xlxs</span>
                                                <span className='text-[#98A9BC]'>123kb</span>
                                                <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                                <div className="flex items-center gap-2">
                                                    <span><Image src="/msg.svg" width={18} height={21} /></span>
                                                    <BsThreeDots className='text-[#98A9BC]' />
                                                </div>

                                            </div>
                                            {!showReply && <button className='bg-[#26BADA] p-3 max-w-[200px] text-white rounded-sm' onClick={setShowReply}>REPLY</button>
                                            }                                    </div>
                                    </div>
                                    <div className="border mb-3 rounded-md ">
                                        <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between " >
                                            <p>#002</p>
                                            <p>Posted by <span className='text-[#00AAEC]'>Ravi K.</span> on 23 Jun 2021, 12:30</p>
                                        </div>
                                        <div className="bg-white p-6 flex flex-col gap-5">
                                            <p>Hi Ravi
                                                Please find attached the updated file with commercial clarifications from the customer.<br />
                                                Regards, Michael
                                            </p>
                                            <p className='text-[#778CA2] mt-3'>Attached Documents</p>
                                            <div className="shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                                <FaRegFilePdf className='text-red-600' />
                                                <span className=''>102345-CCL-01.xlxs</span>
                                                <span className='text-[#98A9BC]'>123kb</span>
                                                <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                                <div className="flex items-center gap-2 text-[#98A9BC]">
                                                    <MdOutlineModeEdit className='cursor-pointer' />
                                                    <RiDeleteBin6Line className='cursor-pointer' />
                                                    <span><Image src="/msg.svg" width={18} height={21} className='cursor-pointer' /></span>
                                                    <BsThreeDots className='cursor-pointer' />
                                                </div>

                                            </div>
                                            <div className="shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                                <FaRegFileImage className='text-[#00AAEC]' />
                                                <span className=''>ScreenShot.png</span>
                                                <span className='text-[#98A9BC]'>123kb</span>
                                                <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                                <div className="flex items-center gap-2 text-[#98A9BC]">
                                                    <MdOutlineModeEdit className='cursor-pointer' />
                                                    <RiDeleteBin6Line className='cursor-pointer' />
                                                    <span><Image src="/msg.svg" width={18} height={21} className='cursor-pointer' /></span>
                                                    <BsThreeDots className='cursor-pointer' />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {showReply && <div className="flex flex-col gap-[18px]">
                                    <textarea className='w-full border border-[#E8ECEF] outline-none p-2 rounded-md' placeholder='Description' rows={4} ></textarea>
                                    <DragDrop />
                                    <p className='text-[#778CA2]'>Attached Documents</p>
                                    <div className=" flex gap-3">
                                        <button className='bg-white border border-[#26BADA] text-[#26BADA] uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>Cancel</button>
                                        <button className='bg-[#26BADA] border border-[#26BADA] text-white uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>SUBMIT</button>
                                    </div>
                                </div>}

                            </div>
                            <div className="flex-[2]">
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Status <span className='text-black'>Open</span></div>
                                    <div className="bg-[#c3eff92f] px-4 py-1 flex flex-col  ">
                                        <div className="flex items-center justify-between w-full p-4">
                                            <div>
                                                <span className='text-[#778CA2]'>Referrence #</span> <br />
                                                <span>102345-CCL-01</span>
                                            </div>
                                            <div>
                                                <span className='text-[#778CA2]'>Type</span> <br />
                                                <span>Commercial</span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="flex items-center justify-between w-full p-4">
                                            <div>
                                                <span className='text-[#778CA2]'>Issue Date</span> <br />
                                                <span>23 Jun 2021</span>
                                            </div>
                                            <div>
                                                <span className='text-[#778CA2]'>Due Date</span> <br />
                                                <span>28 Jun 2021</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between" >
                                        <p>Issued to</p>
                                        <p className='uppercase text-[#26BADA]'>Reassign</p>
                                    </div>
                                    <div className="bg-[#F4F5F6] py-3 px-4 flex   items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                            <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                            <div className="">
                                                <span className="text-sm leading-4">Michael Gates</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Key Contacts</div>
                                    <div className="bg-[#F4F5F6] py-3 px-4 flex  items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                            <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                            <div className="">
                                                <span className="text-sm leading-4">Michael Gates</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                            </div>
                                        </div>
                                        <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Requester</div>

                                    </div>

                                    <div className="bg-[#F4F5F6] py-3 px-4 flex  items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full ">
                                            <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                            <div className="">
                                                <span className="text-sm leading-4 w-8">John Smith</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Buyer</span>
                                            </div>
                                            <div className="bg-red-300 text-xs px-1 ml-2 text-white">E</div>
                                        </div>
                                        <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Buyer</div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    }
                </div>}

                {active === 'RFx Clarifications' && <div className='p-5 bg-white shadow-sm h-full min-h-screen'>
                    {!clarificationDetail &&
                        <>
                            <div className="flex justify-between uppercase text-[#00AAEC] text-sm mb-4 cursor-pointer ">

                                <div className="flex items-center gap-1" onClick={() => { setClarificationDetail(true); setShowSubmitedRfxCalrification(false) }}>
                                    <span>New clarification</span>
                                    <IoMdAddCircleOutline />
                                </div>
                                <button className={`upprecase uppercase max-w-[200px] rounded-md p-2 flex items-center gap-1  ${rfxClarRows.length ? 'bg-[#00AAEC] text-white' : 'bg-[#EFF3F5] text-[#98A9BC]'}`} onClick={handleChangeStatus} disabled={!rfxClarRows.length ? true : false} >Proceed <FaArrowRight /> </button>
                            </div>
                            <SearchTableNew rows={rfxClarRows} handleRowClick={handleRowClick} handlRowDetail={() => { setClarificationDetail(true); setShowSubmitedRfxCalrification(true) }} NoRowsOverlay={NoRowsOverlayClarification} />

                        </>
                    }
                    {(clarificationDetail && !showSubmitedRfxCalrification) &&
                        <div className="flex gap-4">
                            <div className="flex flex-[2] flex-col p-4 gap-6">
                                <div className=" flex items-center gap-1 text-[#00AAEC] cursor-pointer" onClick={() => setClarificationDetail(false)}>
                                    <FaChevronLeft />
                                    <span>  Back to List</span>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <TextField
                                        id="clarification_title"
                                        label="Clarification Title *"
                                        variant="outlined"
                                        className="w-full"
                                        onChange={(e) => setclarificationTitle(e.target.value)}
                                    />
                                    <TextField
                                        select
                                        label="RFx Type *"
                                        //onChange={handleSelectChange}
                                        className="bg-white w-full max-w-[360px]"
                                        onChange={(e) => setclarificationType(e.target.value)}
                                    >
                                        {templateOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <div className="relative w-[50%]">
                                        <AiOutlineQuestionCircle className="absolute right-4 top-1 z-10 text-[#98A9BC]" />
                                        <TextField
                                            id="rfx_clarification_ref_num"
                                            label="Reference# *"
                                            variant="outlined"
                                            className="bg-white w-full max-w-[360px]"
                                            onChange={(e) => setclarificationRefNum(e.target.value)}
                                        />
                                    </div>
                                    <textarea onChange={(e) => setclarificationDescription(e.target.value)} className='w-full border border-[#E8ECEF] outline-none p-2 rounded-md' placeholder='Description' rows={4} ></textarea>
                                    <DragDrop setSelectedFilesMain={setSelectedFilesMain} setAttachedDocuments={setAttachedDocuments} />
                                    <div className=" flex gap-3">
                                        <button className='bg-white border border-[#26BADA] text-[#26BADA] uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>Cancel</button>
                                        <button className='bg-[#26BADA] border border-[#26BADA] text-white uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm' onClick={() => { addRfxClarRow(); }}>SUBMIT   </button>
                                    </div>
                                </div>
                                {showReply && <div className="flex flex-col gap-[18px]">
                                    <textarea className='w-full border border-[#E8ECEF] outline-none p-2 rounded-md' placeholder='Description' rows={4} ></textarea>
                                    <DragDrop />
                                    <p className='text-[#778CA2]'>Attached Documents</p>
                                    <div className=" flex gap-3">
                                        <button className='bg-white border border-[#26BADA] text-[#26BADA] uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>Cancel</button>
                                        <button className='bg-[#26BADA] border border-[#26BADA] text-white uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm ' onClick={() => { setShowSubmitedRfxCalrification(true); }}>SUBMIT</button>
                                    </div>
                                </div>}

                            </div>
                            <div className="flex-[1]">
                                <div className="border mt-[18px] mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] " > Critical Dates </div>
                                    <div className="bg-[#F4FCFD] px-4 py-5 w-full flex flex-col date-picker">
                                        {/*<DynamicDatePicker onChange={(date) => console.log((new Date(date).toISOString().slice(0, 10)))}labels={datePickerLabels} data={datePickerLabels} />*/}
                                        <LocalizationProvider key={"clarification_issued_date"} dateAdapter={AdapterDayjs} className="w-full bg-white "
                                        >
                                            <DemoContainer components={["DatePicker"]}>
                                                <div id={"clarification_issued_date"}>
                                                    <DatePicker
                                                        label={"Issued Date *"}
                                                        value={dayjs(clarificationIssuedDate)}
                                                        onChange={(date) => setclarificationIssuedDate(new Date(date).toISOString().slice(0, 10))}
                                                    />
                                                </div>
                                            </DemoContainer>
                                        </LocalizationProvider>

                                        <LocalizationProvider
                                            key={"clarification_due_date"}
                                            dateAdapter={AdapterDayjs}
                                            className="w-full bg-white "
                                        >
                                            <DemoContainer components={["DatePicker"]}>
                                                <div id={"clarification_issued_date"}>
                                                    <DatePicker
                                                        label={"Due Date *"}
                                                        value={dayjs(clarificationDueDate)}
                                                        onChange={(date) => setclarificationDueDate(new Date(date).toISOString().slice(0, 10))}
                                                    />
                                                </div>
                                            </DemoContainer>
                                        </LocalizationProvider>

                                    </div>
                                </div>

                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between items-center" >
                                        <span>Assign to</span>
                                        <span className='text-[#00AAEC] text-sm uppercase flex gap-1 items-cente cursor-pointer' onClick={handleClickOpenContact}>Select contact <IoMdAddCircleOutline /></span>
                                    </div>
                                    <BidDialog openBid={openContactAssign} handleBidClose={handlCloseContact} onPersonSelect={handlePersonSelectDailog} keyContactsRec={allUsersRec} setPersonAssignTo={setPersonAssignTo} onYesButtonClick={onYesButtonClick} />

                                    {!personAssignTo && <div className="bg-[#F4F5F6] py-8 flex items-center flex-col gap-3">
                                        <p className="text-lg text-[#FFAB2B]">No Contact Selected</p>
                                    </div>}
                                    {personAssignTo && <div className="bg-[#F4F5F6] py-8 flex items-center flex-col gap-3">
                                        <p className="text-lg text-[#FFAB2B]">{personAssignTo.name}</p>
                                        {personAssignTo.designation}
                                    </div>}
                                </div>
                            </div>
                        </div>
                    }
                    {showSubmitedRfxCalrification && (
                        <div className="flex gap-6">
                            <div className="flex flex-[3] flex-col">
                                <div className=" flex items-center gap-1 text-[#00AAEC] cursor-pointer" onClick={() => setClarificationDetail(false)}>
                                    <FaChevronLeft />
                                    <span>  Back to List</span>
                                </div>
                                <p className='text-xl p-2'>{clarificationTitle}</p>
                                <div className="flex flex-col-reverse">
                                    <div className="border mb-3 rounded-md ">
                                        <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between " >
                                            <p>#1</p>
                                            <p>Posted by <span className='text-[#00AAEC]'>{selectedClarificationRow?.first_name} {selectedClarificationRow?.last_name}</span> on {formatDatetime(selectedClarificationRow?.posted_on)}</p>
                                        </div>
                                        <div className="bg-[#F4F5F6] p-6 flex flex-col gap-5">
                                            <p>{selectedClarificationRow?.description}</p>
                                            <p className='text-[#778CA2] mt-3'>Attached Documents</p>
                                            {clarificationSelectedDocuments.map((doc, index) => (
                                                <div className="bg-[#E8ECEF] shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                                    <FaRegFilePdf className='text-red-600' />
                                                    <span className=''>{doc.docvalt_filename}</span>
                                                    <span className='text-[#98A9BC]'>{doc.file_size}</span>
                                                    <span className='text-[#98A9BC]'>{formatDateString(doc.created_date)}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span><Image src="/msg.svg" width={18} height={21} /></span>
                                                        <BsThreeDots className='text-[#98A9BC]' />
                                                    </div>

                                                </div>
                                            ))}

                                            {!showReply && <button className='bg-[#26BADA] p-3 max-w-[200px] text-white rounded-sm' onClick={setShowReply}>REPLY</button>
                                            }                                    </div>
                                    </div>

                                    {rfxClarPostRows && rfxClarPostRows.map((post, index) => (
                                        <div className="border mb-3 rounded-md ">
                                            <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between " >
                                                <p>#{index + 2}</p>
                                                <p>Posted by <span className='text-[#00AAEC]'>{post.first_name} {post.last_name}</span> on  {formatDatetime(post.posted_on)} </p>
                                            </div>
                                            <div className="bg-white p-6 flex flex-col gap-5">
                                                <p>{post.comment} </p>
                                                <p className='text-[#778CA2] mt-3'>Attached Documents</p>

                                                {rfxClarPostDocsRows
                                                    .filter(item => item.docvalt_key === 'rfx-clarifications-post-' + post.rfx_clarification_post_id)
                                                    .map((item, index) => (
                                                        <div className="shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                                            {
                                                                ['jpg', 'png', 'jpeg'].includes(item.file_type)
                                                                    ?
                                                                    <FaRegFileImage className='text-[#00AAEC]' />
                                                                    :
                                                                    <FaRegFilePdf className='text-red-600' />
                                                            }
                                                            <span className=''>{item.docvalt_filename}</span>
                                                            <span className='text-[#98A9BC]'>{item.file_size}</span>
                                                            <span className='text-[#98A9BC]'>{formatDateString(item.created_at)}</span>
                                                            <div className="flex items-center gap-2 text-[#98A9BC]">
                                                                <MdOutlineModeEdit className='cursor-pointer' />
                                                                <RiDeleteBin6Line className='cursor-pointer' />
                                                                <span><Image src="/msg.svg" width={18} height={21} className='cursor-pointer' /></span>
                                                                <BsThreeDots className='cursor-pointer' />
                                                            </div>

                                                        </div>))}

                                            </div>
                                        </div>))}

                                    {messages.map((message, index) => (
                                        <div className="border mb-3 rounded-md " key={index}>
                                            <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between " >
                                                <p>#00{index} 6666</p>
                                                <p>Posted by <span className='text-[#00AAEC]'>Ravi K.</span> on 23 Jun 2021, 12:30</p>
                                            </div>
                                            <div className="bg-white p-6 flex flex-col gap-5">
                                                <p>{message.text}</p>
                                                {message.files.length > 0 && (
                                                    <p className='text-[#778CA2] mt-3'>Attached Documents</p>
                                                )}
                                                {message.files.map((file, fileIndex) => (
                                                    <div key={fileIndex} className="shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]">
                                                        {file.type === 'image/png' ? <FaRegFileImage className='text-[#00AAEC]' /> : <FaRegFilePdf className='text-red-600' />}
                                                        <span className=''>{file.name}</span>
                                                        <span className='text-[#98A9BC]'>{file.size}kb</span>
                                                        <span className='text-[#98A9BC]'>{file.lastModifiedDate}</span>
                                                        <div className="flex items-center gap-2 text-[#98A9BC]">
                                                            <MdOutlineModeEdit className='cursor-pointer' />
                                                            <RiDeleteBin6Line className='cursor-pointer' />
                                                            <span><Image src="/msg.svg" width={18} height={21} className='cursor-pointer' /></span>
                                                            <BsThreeDots className='cursor-pointer' />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                </div>
                                {showReply && (
                                    <div className="flex flex-col gap-[18px]">
                                        <textarea
                                            className='w-full border border-[#E8ECEF] outline-none p-2 rounded-md'
                                            placeholder='Reply to post'
                                            rows={4}
                                            value={replyMessage}
                                            onChange={(e) => setReplyMessage(e.target.value)}
                                        ></textarea>
                                        <DragDrop onFileUpload={handleFileUpload} setSelectedFilesMain={setSelectedFilesMain} setAttachedDocuments={setAttachedDocuments} />
                                        <button
                                            className='bg-[#26BADA] border border-[#26BADA] text-white uppercase text-sm px-8 py-3 max-w-[200px] rounded-sm ml-auto'
                                            onClick={handleReplySubmit}
                                        >
                                            SUBMIT REPLY
                                        </button>
                                    </div>
                                )}

                            </div>
                            <div className="flex-[2]">
                                <div className="flex justify-end mb-1">
                                    <button className='upprecase uppercase max-w-[200px] rounded-md p-2 bg-[#00AAEC] text-white cursor-pointer flex items-center gap-1' onClick={handleChangeStatus} >Proceed <FaArrowRight /> </button>
                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Status <span className='text-black'>{currentRecordDetailStatus}</span></div>
                                    <div className="bg-[#c3eff92f] px-4 py-1 flex flex-col  ">
                                        <div className="flex items-center justify-between w-full p-4">
                                            <div>
                                                <span className='text-[#778CA2]'>Referrence #</span> <br />
                                                <span>{currentRecordDetailRefNum}</span>
                                            </div>
                                            <div>
                                                <span className='text-[#778CA2]'>Type</span> <br />
                                                <span>{CurrentRecordDetailClarType}</span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="flex items-center justify-between w-full p-4">
                                            <div>
                                                <span className='text-[#778CA2]'>Issue Date</span> <br />
                                                <span>{currentRecordDetailIssueDate}</span>
                                            </div>
                                            <div>
                                                <span className='text-[#778CA2]'>Due Date</span> <br />
                                                <span>{currentRecordDetailDueDate} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between" >
                                        <p>Issued to</p>
                                        <p className='uppercase text-[#26BADA]'>Reassign</p>
                                    </div>
                                    {clarificationAssignTo?.first_name && <div className="bg-[#F4F5F6] py-3 px-4 flex   items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                            <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                            <div className="">
                                                <span className="text-sm leading-4">{clarificationAssignTo?.first_name} {clarificationAssignTo?.last_name}</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">{clarificationAssignTo?.designation_title}</span>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Key Contacts</div>
                                    <div className="bg-[#F4F5F6] py-3 px-4 flex  items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                            <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                            <div className="">
                                                <span className="text-sm leading-4">Michael Gates</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                            </div>
                                        </div>
                                        <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Requester</div>

                                    </div>

                                    <div className="bg-[#F4F5F6] py-3 px-4 flex  items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full ">
                                            <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                            <div className="">
                                                <span className="text-sm leading-4 w-8">John Smith</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Buyer</span>
                                            </div>
                                            <div className="bg-red-300 text-xs px-1 ml-2 text-white">E</div>
                                        </div>
                                        <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Buyer</div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                    }
                </div>}


                {active === 'Final Review' && <div className='p-5 bg-white shadow-sm h-full min-h-screen'>
                    {showFinalRewList && (
                        <>
                            <div className="flex justify-between uppercase text-[#00AAEC] text-sm mb-4 cursor-pointer ">
                                <div className="flex items-center gap-1" onClick={() => { handleshowFinalTemplateSelect(); setShowFinalRewList(false); setInFinalTemp(false) }}>
                                    <span>New Request</span>
                                    <IoMdAddCircleOutline />
                                </div>
                                <button className={`upprecase uppercase max-w-[200px] rounded-md p-2 flex items-center gap-1  ${finalRevrows.length > 0 ? 'bg-[#00AAEC] text-white' : 'bg-[#EFF3F5] text-[#98A9BC]'}`} onClick={handleChangeStatus} disabled={finalRevrows.length > 0 ? false : true} >Proceed <FaArrowRight /> </button>
                            </div>
                            <SearchTableNew rows={finalRevrows} handleRowClick={handleRowClick} NoRowsOverlay={NoRowsFinalReview} />
                        </>
                    )}
                    {(showFinalTempSelect && !finalTemplate) && (
                        <div className='flex flex-col gap-4 mt-5'>
                            <div className=" flex items-center gap-1 text-[#00AAEC] cursor-pointer" onClick={() => { setFinalTemplate(false); setshowFinalTempSelect(false); setShowFinalRewList(true) }}>
                                <FaChevronLeft /><span>  Back to List</span>
                            </div>
                            <TextField
                                select
                                label="Select Template"
                                onChange={handleFinalSelectChange}
                                className="bg-white w-full max-w-[360px]"
                            >
                                {templatesAll.map(option => (
                                    <MenuItem key={option.id} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-basic"
                                label="Reference #"
                                variant="outlined"
                                className="bg-[#EFF3F5] w-full max-w-[360px]"
                                onChange={(e) => setTempRefNumber(e.target.value)}
                            />
                            <button className={`uppercase p-[10px] max-w-[240px] ${isFinalButtonActive ? 'bg-[#26BADA] text-white' : 'bg-[#EFF3F5] text-[#98A9BC]'}`} onClick={() => { setFinalTemplate(true) }}
                            >Load Template</button>
                        </div>


                    )}
                    {finalTemplate && (
                        <div className="flex">
                            <div className="flex-[3]">
                                <div className=" flex items-center gap-1 text-[#00AAEC] cursor-pointer" onClick={() => { setFinalTemplate(false); setshowFinalTempSelect(false); setShowFinalRewList(true) }}>
                                    <FaChevronLeft />
                                    <span>  Back to List</span>
                                </div>
                                <div>
                                    <Typography variant="h6" className='text-[#778CA2]'>Bid Review Checklist</Typography>
                                    <div className="mt-4">

                                        <div dangerouslySetInnerHTML={{ __html: templateHTML }} />

                                        {/*finalTemplateQuestions.map((option, index) => (
                                            <div key={index} className="flex items-center shadow-md p-4 mb-2 bg-white">
                                                <FormControlLabel
                                                    className='flex items-center justify-between w-full flex-row-reverse'
                                                    label={<Typography variant="body1">{option}</Typography>}
                                                    control={
                                                        <Switch
                                                            color="primary"
                                                            checked={selectedTemplateQuestions[option]}
                                                            onChange={() => handleFinalOptionChange(option)}
                                                        />
                                                    }
                                                />
                                            </div>
                                                ))*/}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-[2] flex flex-col items-center p-3">
                                {/* <button className={`text-center  py-3 mt-[10px] mb-[18px] rounded-md border-0 uppercase w-full ${finalActiveSubmit ? 'bg-[#26BADA] text-white' : 'bg-[#EFF3F5] text-[#98A9BC]'}`} disable={!finalActiveSubmit} onClick={() => { addFinalRevRow(); setshowFinalTempSelect(false); setFinalTemplate(false); setNextStep(true) }} >Submit</button> */}
                                {!inFinalTemp &&<button className='text-center  py-3 mt-[10px] mb-[18px] rounded-md border-0 uppercase w-full bg-[#26BADA] text-white' onClick={() => { addFinalRevRow(); setshowFinalTempSelect(false); setFinalTemplate(false); setShowFinalRewList(true); setNextStep(true) }} >Submit</button>}                                <div className="rounded-md border border-gray-300 w-full mt-4 ">
                                    <div className="bg-[#00000005] text-[#778CA2]  flex gap-2 p-3 items-center">
                                        <span >Score</span>
                                        <RxQuestionMarkCircled />
                                    </div>
                                    <div className="bg-[#F8FAFB] text-center p-8">
                                        <p className="text-5xl text-[#778CA2]">17 : <span className="text-[#6DD230]">Compiled</span></p>
                                        <p className=" text-[#778CA2] my-4">Export Compliance Check</p>
                                    </div>
                                </div>
                                {inFinalTemp && <div className="rounded-md border border-gray-300 w-full mt-4">
                                    <div className="bg-[#EFF3F5] text-[#778CA2]  p-3"><span >Comments</span></div>
                                    <div className="bg-[#E8ECEF] p-2">
                                        {reviewReplyCommentList && reviewReplyCommentList.map((item) => (
                                            <div className="flex">
                                                <div className="flex-[1]">
                                                    <Image src="/avatar.jpg" width={20} height={20} alt="ravi" className="max-w-[36px]" />
                                                </div>
                                                <div className="flex flex-col flex-[5] p-2 mb-2">
                                                    <div className="flex justify-between">
                                                        <span>{item.first_name} {item.last_name}</span>
                                                        <span className="text-sm text-[#26BADA]">{item.status}</span>
                                                    </div>
                                                    <p className="text-sm text-[#778CA2]" >{item.comment}</p>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="block">
                                            {<>
                                                <textarea className='my-2 p-2 w-full' rows={3} placeholder="Write your reply" onChange={(e) => setReviewReplyComment(e.target.value)}></textarea>
                                                <select id="rfx_type" className="block w-full px-4 py-4 mb-3 text-sm border rounded-sm border-gray-300 hover:border-black" onChange={(e) => setReviewReplyStatus(e.target.value)}>
                                                    <option value={''}>Status</option>
                                                    <option key="Pending" value="Pending">Pending</option>
                                                    <option key="Issued" value="Issued">Issued</option>
                                                    <option key="Approved with comment" value="Approved with comment">Approved with comment</option>
                                                </select>
                                                <button className='uppercase p-[10px] min-w-[200px] w-[50%] bg-[#26BADA] text-white  rounded-md ' onClick={handleReviewReplySubmit} >Reply</button>
                                            </>}

                                        </div>
                                    </div>
                                </div>}
                            </div>

                        </div>

                    )}


                    {/* {clarificationDetail &&<div className="flex gap-6">
                            <div className="flex flex-[3] flex-col">
                                <div className=" flex items-center gap-1 text-[#00AAEC] cursor-pointer" onClick={() => setClarificationDetail(false)}>
                                    <FaChevronLeft />
                                    <span>  Back to List</span>
                                </div>
                                <p className='text-xl p-2'>Commercial Clarification 01</p>
                                <div className="flex flex-col-reverse">
                                    <div className="border mb-3 rounded-md ">
                                        <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between " >
                                            <p>#001</p>
                                            <p>Posted by <span className='text-[#00AAEC]'>Ravi K.</span> on 23 Jun 2021, 12:30</p>
                                        </div>
                                        <div className="bg-[#F4F5F6] p-6 flex flex-col gap-5">
                                            <p>Hi Michael,
                                                Please find enclosed the first set of commercial questions. Can you please get clarifications from the customer.<br />
                                                Thanks,
                                            </p>
                                            <p className='text-[#778CA2] mt-3'>Attached Documents</p>
                                            <div className="bg-[#E8ECEF] shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                                <FaRegFilePdf className='text-red-600' />
                                                <span className=''>102345-CCL-01.xlxs</span>
                                                <span className='text-[#98A9BC]'>123kb</span>
                                                <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                                <div className="flex items-center gap-2">
                                                    <span><Image src="/msg.svg" width={18} height={21} /></span>
                                                    <BsThreeDots className='text-[#98A9BC]' />
                                                </div>

                                            </div>
                                            {!showReply && <button className='bg-[#26BADA] p-3 max-w-[200px] text-white rounded-sm' onClick={setShowReply}>REPLY</button>
                                            }                                    </div>
                                    </div>
                                    <div className="border mb-3 rounded-md ">
                                        <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between " >
                                            <p>#002</p>
                                            <p>Posted by <span className='text-[#00AAEC]'>Ravi K.</span> on 23 Jun 2021, 12:30</p>
                                        </div>
                                        <div className="bg-white p-6 flex flex-col gap-5">
                                            <p>Hi Ravi
                                                Please find attached the updated file with commercial clarifications from the customer.<br />
                                                Regards, Michael
                                            </p>
                                            <p className='text-[#778CA2] mt-3'>Attached Documents</p>
                                            <div className="shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                                <FaRegFilePdf className='text-red-600' />
                                                <span className=''>102345-CCL-01.xlxs</span>
                                                <span className='text-[#98A9BC]'>123kb</span>
                                                <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                                <div className="flex items-center gap-2 text-[#98A9BC]">
                                                    <MdOutlineModeEdit className='cursor-pointer' />
                                                    <RiDeleteBin6Line className='cursor-pointer' />
                                                    <span><Image src="/msg.svg" width={18} height={21} className='cursor-pointer' /></span>
                                                    <BsThreeDots className='cursor-pointer' />
                                                </div>

                                            </div>
                                            <div className="shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                                <FaRegFileImage className='text-[#00AAEC]' />
                                                <span className=''>ScreenShot.png</span>
                                                <span className='text-[#98A9BC]'>123kb</span>
                                                <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                                <div className="flex items-center gap-2 text-[#98A9BC]">
                                                    <MdOutlineModeEdit className='cursor-pointer' />
                                                    <RiDeleteBin6Line className='cursor-pointer' />
                                                    <span><Image src="/msg.svg" width={18} height={21} className='cursor-pointer' /></span>
                                                    <BsThreeDots className='cursor-pointer' />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {showReply && <div className="flex flex-col gap-[18px]">
                                    <textarea className='w-full border border-[#E8ECEF] outline-none p-2 rounded-md' placeholder='Description' rows={4} ></textarea>
                                    <DragDrop />
                                    <p className='text-[#778CA2]'>Attached Documents</p>
                                    <div className=" flex gap-3">
                                        <button className='bg-white border border-[#26BADA] text-[#26BADA] uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>Cancel</button>
                                        <button className='bg-[#26BADA] border border-[#26BADA] text-white uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>SUBMIT</button>
                                    </div>
                                </div>}

                            </div>
                            <div className="flex-[2]">
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Status <span className='text-black'>Open</span></div>
                                    <div className="bg-[#c3eff92f] px-4 py-1 flex flex-col  ">
                                        <div className="flex items-center justify-between w-full p-4">
                                            <div>
                                                <span className='text-[#778CA2]'>Referrence #</span> <br />
                                                <span>102345-CCL-01</span>
                                            </div>
                                            <div>
                                                <span className='text-[#778CA2]'>Type</span> <br />
                                                <span>Commercial</span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="flex items-center justify-between w-full p-4">
                                            <div>
                                                <span className='text-[#778CA2]'>Issue Date</span> <br />
                                                <span>23 Jun 2021</span>
                                            </div>
                                            <div>
                                                <span className='text-[#778CA2]'>Due Date</span> <br />
                                                <span>28 Jun 2021</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between" >
                                        <p>Issued to</p>
                                        <p className='uppercase text-[#26BADA]'>Reassign</p>
                                    </div>
                                    <div className="bg-[#F4F5F6] py-3 px-4 flex   items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                            <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                            <div className="">
                                                <span className="text-sm leading-4">Michael Gates</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Key Contacts</div>
                                    <div className="bg-[#F4F5F6] py-3 px-4 flex  items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                            <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                            <div className="">
                                                <span className="text-sm leading-4">Michael Gates</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                            </div>
                                        </div>
                                        <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Requester</div>

                                    </div>

                                    <div className="bg-[#F4F5F6] py-3 px-4 flex  items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full ">
                                            <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                            <div className="">
                                                <span className="text-sm leading-4 w-8">John Smith</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Buyer</span>
                                            </div>
                                            <div className="bg-red-300 text-xs px-1 ml-2 text-white">E</div>
                                        </div>
                                        <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Buyer</div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    } */}
                </div>}



                {active === 'Prepration' && <div className='p-5 bg-white shadow-sm h-full min-h-screen'>
                    <h1 className='text-6xl'>Will Be Done in Next Phase</h1>
                    <button className='bg-[#26BADA] border border-[#26BADA] text-white uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm ' onClick={handleChangeStatus}>SUBMIT</button>

                </div>}

                {active === 'Submission' && <div className='p-5 bg-white shadow-sm h-full min-h-screen'>
                    {showSubmissionTable && (
                        <>
                            <div className="flex justify-between uppercase text-[#00AAEC] text-sm mb-4 cursor-pointer ">
                                <div className="flex items-center gap-1" onClick={() => { setshowSubmissionTempSelect(true); setSubmissionTemplate(false);setSubmissionDetail(false);setShowSubmissionTable(false);setInSubmissionTemp(false) }} >
                                    <span>New Submission</span>
                                    <IoMdAddCircleOutline />
                                </div>
                                <button className={`upprecase uppercase max-w-[200px] rounded-md p-2 flex items-center gap-1  ${submissionrows ? 'bg-[#00AAEC] text-white' : 'bg-[#EFF3F5] text-[#98A9BC]'}`} onClick={handleChangeStatus} disabled={!submissionrows} >Proceed <FaArrowRight /> </button>
                            </div>
                            <SearchTableNew rows={submissionrows} handleRowClick={handleRowClick} NoRowsOverlay={NoRowsSubmission} />
                        </>
                    )}
                    {(showSubmissionTempSelect && !submissionTemplate) && (
                        <div className='flex gap-4 mt-5'>
                            
                            <div className="flex-[2] flex flex-col gap-4">
                            <div className=" flex items-center gap-1 text-[#00AAEC] cursor-pointer" onClick={() => {setSubmissionDetail(false);setShowSubmissionTable(true);setshowSubmissionTempSelect(false)}}>
                                <FaChevronLeft />
                                <span>  Back to List</span>
                            </div>
                                <TextField
                                    select
                                    label="Bid Type *"
                                    onChange={(e) => setSubmissionType(e.target.value)}
                                    className="bg-white w-full max-w-[360px]"
                                >
                                    {submissionOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    label="Stage *"
                                    onChange={(e) => setSubmissionStage(e.target.value)}
                                    className="bg-white w-full max-w-[360px]"
                                >
                                    {rfxPrereqStageList.map((option) => (
                                        <MenuItem key={option.title} value={option.title}>
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="outlined-basic"
                                    label="Reference #"
                                    variant="outlined"
                                    className="bg-[#EFF3F5] w-full max-w-[360px]"
                                    onChange={(e) => setSubmissionRefNumber(e.target.value)}
                                />
                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    rows="5"
                                    onChange={(e) => setSubmissionDescription(e.target.value)}
                                    className="outline-none  border  border-gray-300 p-3 rounded-sm" />
                                <DragDrop setSelectedFilesMain={setSelectedFilesMain} setAttachedDocuments={setAttachedDocuments} />
                                <div className=" flex gap-3">
                                    <button className='bg-white border border-[#26BADA] text-[#26BADA] uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>Cancel</button>
                                    <button className='bg-[#26BADA] border border-[#26BADA] text-white uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm ' onClick={() => { addSubmissionRow(); setshowSubmissionTempSelect(false); setNextStep(true) }}>SUBMIT</button>
                                </div>
                            </div>
                            <div className="flex-[1]">
                                <div className="rounded-md border border-gray-300 w-full">
                                    <div className="bg-[#EFF3F5] text-[#778CA2]  flex justify-between p-3 items-center">
                                        <span >Submit to</span>
                                    </div>

                                    <div className="bg-[#F8FAFB] text-center p-8">
                                        <div className="px-4 py-1 flex  items-center justify-between">
                                            <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                                <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                                <div className="">
                                                    <span className="text-sm leading-4">Michael Gates</span>
                                                    <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                                </div>
                                            </div>
                                            <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Requester</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    )}
                    {submissionDetail && <div className="flex gap-6">
                        <div className="flex flex-[3] flex-col">
                            <div className=" flex items-center gap-1 text-[#00AAEC] cursor-pointer" onClick={() => {setSubmissionDetail(false);setShowSubmissionTable(true)}}>
                                <FaChevronLeft />
                                <span>  Back to List</span>
                            </div>
                            <p className='text-xl p-2'>{selectedSubmissionRow.bid_type}</p>
                            <div className="flex flex-col-reverse">
                                <div className="border mb-3 rounded-md ">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between " >
                                        <p>Details</p>
                                        <p>Posted by <span className='text-[#00AAEC]'>Ravi K.</span> on {formatDatetime(selectedSubmissionRow.created_on)}</p>
                                    </div>
                                    <div className="bg-[#F4F5F6] p-6 flex flex-col gap-5">
                                        <p>{selectedSubmissionRow.description}
                                        </p>
                                        <p className='text-[#778CA2] mt-3'>Attached Documents</p>
                                        {selectedSubmissionDocuments?.map((item) => (
                                            <div className="bg-[#E8ECEF] shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                                {
                                                    ['jpg', 'jpeg', 'png'].some(ext => item.file_type.includes(ext))

                                                        ?
                                                        <FaRegFileImage className='text-red-600' />
                                                        :
                                                        <FaRegFilePdf className='text-red-600' />
                                                }
                                                <span className=''>{item.docvalt_filename}</span>
                                                <span className='text-[#98A9BC]'>{item.file_size}</span>
                                                <span className='text-[#98A9BC]'>{formatDateString(item.created_at)}</span>
                                                <div className="flex items-center gap-2">
                                                    <span><Image src="/msg.svg" width={18} height={21} /></span>
                                                    <BsThreeDots className='text-[#98A9BC]' />
                                                </div>
                                            </div>))}
                                        {!showReply && <button className='bg-[#26BADA] p-3 max-w-[200px] text-white rounded-sm' onClick={setShowReply}>REPLY</button>
                                        }                                    </div>
                                </div>
                                                            </div>
                            {showReply && <div className="flex flex-col gap-[18px]">
                                {/*<textarea className='w-full border border-[#E8ECEF] outline-none p-2 rounded-md' placeholder='Description' rows={4} ></textarea>
                                <div className=" flex gap-3">
                                    <button className='bg-white border border-[#26BADA] text-[#26BADA] uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>Cancel</button>
                                    <button className='bg-[#26BADA] border border-[#26BADA] text-white uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>SUBMIT</button>
                                    </div>*/}
                            </div>}
                            {inSubmissionTemp && <div className="">
                                    <p className='flex items-center gap-3 mb-4'>
                                        <Image src="/msg.svg" width={19} height={25} />
                                        <span className='text-[#778CA2] text-lg'>Discussions</span>
                                    </p>
                                    {/* CHAT SECTION */}
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1 my-3">
                                            <Image src="/man.jpeg" width={31} height={31} className='mr-1 rounded-full object-cover w-9' />
                                            <p className='bg-[#F2F4F6] px-4 py-2 rounded-full max-w-[80%] pr-[20%]'>Hi Bryan,  Thanks for the timely submission. </p>
                                            <span className='uppercase text-[#98A9BC] text-xs'>08:00 PM</span>
                                        </div>
                                        <div className="flex items-center flex-row-reverse gap-1 my-3">
                                            <Image src="/man2.png" width={31} height={31} className='mr-1 rounded-full object-cover w-9' />
                                            <p className='bg-[#98A9BC] text-white px-4 py-2 rounded-full max-w-[80%] pr-[20%]'>You are welcome Michael. Thanks </p>
                                            <span className='uppercase text-[#98A9BC] text-xs'>09:30 PM</span>
                                        </div>
                                        <div className="flex items-center gap-1 my-3">
                                            <Image src="/man.jpeg" width={31} height={31} className='mr-1 rounded-full object-cover w-9' />
                                            <p className='bg-[#F2F4F6] px-4 py-2 rounded-full max-w-[80%] pr-[20%]'>Hopefully customer will get back with clarifications soon </p>
                                            <span className='uppercase text-[#98A9BC] text-xs'>09:45 PM</span>
                                        </div>
                                        <div className="flex items-center flex-row-reverse gap-1 my-3">
                                            <Image src="/man2.png" width={31} height={31} className='mr-1 rounded-full object-cover w-9' />
                                            <p className='bg-[#98A9BC] text-white px-4 py-2 rounded-full max-w-[80%] pr-[20%]'>You are welcome Michael. Thanks</p>
                                            <span className='uppercase text-[#98A9BC] text-xs'>10:00 PM</span>
                                        </div>
                                        {/* If date changes */}
                                        <p className="text-[#778CA2] flex items-center gap-10 my-8 w-[50%] m-auto after:content-[''] after:bg-slate-400 after:w-full after:h-[0.5px] after:border before:content-[''] before:bg-slate-400 before:w-full before:h-[0.5px] before:border">Today</p>
                                        <div className="flex items-center gap-1 my-3">
                                            <Image src="/man.jpeg" width={31} height={31} className='mr-1 rounded-full object-cover w-9' />
                                            <p className='bg-[#F2F4F6] px-4 py-2 rounded-full max-w-[80%] pr-[20%]'>Hi Bryan, The clarifications are now posted. Thanks </p>
                                            <span className='uppercase text-[#98A9BC] text-xs'>10:10 PM</span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <textarea rows={4} className='p-3 w-full rounded-md mb-2 border border-[#E8ECEF] outline-none' placeholder='Reply with message'></textarea>
                                        <div className="flex justify-between">
                                            <Image src="/man.jpeg" width={36} height={36} className='rounded-full object-cover' />
                                            <button className='text-white border border-[#26BADA] bg-[#26BADA] uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>REPLY</button>

                                        </div>
                                    </div>
                                </div>}

                        </div>
                        <div className="flex-[2]">
                            <div className="border mb-3 rounded-md">
                                <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Status <span className='text-black'>{selectedSubmissionRow.status}</span></div>
                                <div className="bg-[#c3eff92f] px-4 py-1 flex flex-col  ">
                                    <div className="flex items-center justify-between w-full p-4">
                                        <div>
                                            <span className='text-[#778CA2]'>Referrence #</span> <br />
                                            <span>{selectedSubmissionRow.reference_number}</span>
                                        </div>
                                        <div>
                                            <span className='text-[#778CA2]'>Stage</span> <br />
                                            <span>{selectedSubmissionRow.bid_stage}</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="flex items-center justify-between w-full p-4">
                                        <div>
                                            <span className='text-[#778CA2]'>Issued Date</span> <br />
                                            <span>{selectedSubmissionRow.issued_date}</span>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="border mb-3 rounded-md">
                                <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between" >
                                    <p>Issued to</p>
                                    <p className='uppercase text-[#26BADA]'>Reassign</p>
                                </div>
                                <div className="bg-[#F4F5F6] py-3 px-4 flex   items-center justify-between">
                                    <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                        <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                        <div className="">
                                            <span className="text-sm leading-4">Michael Gates</span>
                                            <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border mb-3 rounded-md">
                                <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Key Contacts</div>
                                <div className="bg-[#F4F5F6] py-3 px-4 flex  items-center justify-between">
                                    <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                        <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                        <div className="">
                                            <span className="text-sm leading-4">Michael Gates</span>
                                            <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                        </div>
                                    </div>
                                    <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Requester</div>

                                </div>

                                <div className="bg-[#F4F5F6] py-3 px-4 flex  items-center justify-between">
                                    <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full ">
                                        <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                        <div className="">
                                            <span className="text-sm leading-4 w-8">John Smith</span>
                                            <span className="text-sm leading-4 text-[#778CA2] block">Buyer</span>
                                        </div>
                                        <div className="bg-red-300 text-xs px-1 ml-2 text-white">E</div>
                                    </div>
                                    <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Buyer</div>

                                </div>

                            </div>
                            
                        </div>
                    </div>
                    }
                </div>}

                {active === 'Bid Documents' && <div>
                    {!documentDetail && <SearchTable rows={documentRow} handleRowClick={handleDocRowClick} NoRowsOverlay={NoRowsOverlayDocuments} />
                    }
                    {documentDetail &&
                        <div className='flex p-8 '>
                            <div className='flex-[3]'>
                                <div className="border mb-3 rounded-md mt-4 ">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between " >
                                        <p>Technical Proposal</p>
                                        <p>Submitted by <span className='text-[#00AAEC]'>Bryan C.</span> on 20 Jul 2021, 12:30</p>
                                    </div>
                                    <div className="bg-[#F8FAFB] px-6 py-8 flex flex-col gap-5">
                                        <p>Hi Michael, Please find enclosed the Tehcnical proposal.</p>
                                        <p className='text-[#778CA2] mt-3'>Attached Documents</p>
                                        <div className="shadow-sm flex items-center w-full p-2 justify-between mb-2 border-b border-[#babec2]" >
                                            <FaRegFilePdf className='text-red-600' />
                                            <span className=''>102345-CCL-01.xlxs</span>
                                            <span className='text-[#98A9BC]'>123kb</span>
                                            <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                            <div className="flex items-center gap-2 text-[#98A9BC]">
                                                <MdOutlineModeEdit className='cursor-pointer' />
                                                <RiDeleteBin6Line className='cursor-pointer' />
                                                <span><Image src="/msg.svg" width={18} height={21} className='cursor-pointer' /></span>
                                                <BsThreeDots className='cursor-pointer' />
                                            </div>

                                        </div>
                                        <div className="shadow-sm flex items-center w-full p-2 justify-between mb-2 border-b border-[#babec2]" >
                                            <FaRegFileImage className='text-[#00AAEC]' />
                                            <span className=''>ScreenShot.png</span>
                                            <span className='text-[#98A9BC]'>123kb</span>
                                            <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                            <div className="flex items-center gap-2 text-[#98A9BC]">
                                                <MdOutlineModeEdit className='cursor-pointer' />
                                                <RiDeleteBin6Line className='cursor-pointer' />
                                                <span><Image src="/msg.svg" width={18} height={21} className='cursor-pointer' /></span>
                                                <BsThreeDots className='cursor-pointer' />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <p className='flex items-center gap-3 mb-4'>
                                        <Image src="/msg.svg" width={19} height={25} />
                                        <span className='text-[#778CA2] text-lg'>Discussions</span>
                                    </p>
                                    {/* CHAT SECTION */}
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1 my-3">
                                            <Image src="/man.jpeg" width={31} height={31} className='mr-1 rounded-full object-cover w-9' />
                                            <p className='bg-[#F2F4F6] px-4 py-2 rounded-full max-w-[80%] pr-[20%]'>Hi Bryan,  Thanks for the timely submission. </p>
                                            <span className='uppercase text-[#98A9BC] text-xs'>08:00 PM</span>
                                        </div>
                                        <div className="flex items-center flex-row-reverse gap-1 my-3">
                                            <Image src="/man2.png" width={31} height={31} className='mr-1 rounded-full object-cover w-9' />
                                            <p className='bg-[#98A9BC] text-white px-4 py-2 rounded-full max-w-[80%] pr-[20%]'>You are welcome Michael. Thanks </p>
                                            <span className='uppercase text-[#98A9BC] text-xs'>09:30 PM</span>
                                        </div>
                                        <div className="flex items-center gap-1 my-3">
                                            <Image src="/man.jpeg" width={31} height={31} className='mr-1 rounded-full object-cover w-9' />
                                            <p className='bg-[#F2F4F6] px-4 py-2 rounded-full max-w-[80%] pr-[20%]'>Hopefully customer will get back with clarifications soon </p>
                                            <span className='uppercase text-[#98A9BC] text-xs'>09:45 PM</span>
                                        </div>
                                        <div className="flex items-center flex-row-reverse gap-1 my-3">
                                            <Image src="/man2.png" width={31} height={31} className='mr-1 rounded-full object-cover w-9' />
                                            <p className='bg-[#98A9BC] text-white px-4 py-2 rounded-full max-w-[80%] pr-[20%]'>You are welcome Michael. Thanks</p>
                                            <span className='uppercase text-[#98A9BC] text-xs'>10:00 PM</span>
                                        </div>
                                        {/* If date changes */}
                                        <p className="text-[#778CA2] flex items-center gap-10 my-8 w-[50%] m-auto after:content-[''] after:bg-slate-400 after:w-full after:h-[0.5px] after:border before:content-[''] before:bg-slate-400 before:w-full before:h-[0.5px] before:border">Today</p>
                                        <div className="flex items-center gap-1 my-3">
                                            <Image src="/man.jpeg" width={31} height={31} className='mr-1 rounded-full object-cover w-9' />
                                            <p className='bg-[#F2F4F6] px-4 py-2 rounded-full max-w-[80%] pr-[20%]'>Hi Bryan, The clarifications are now posted. Thanks </p>
                                            <span className='uppercase text-[#98A9BC] text-xs'>10:10 PM</span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <textarea rows={4} className='p-3 w-full rounded-md mb-2 border border-[#E8ECEF] outline-none' placeholder='Your message'></textarea>
                                        <div className="flex justify-between">
                                            <Image src="/man.jpeg" width={36} height={36} className='rounded-full object-cover' />
                                            <button className='text-white border border-[#26BADA] bg-[#26BADA] uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>Add</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex-[2] px-5'>
                                <div className="flex flex-col">
                                    <button className="text-white text-center bg-[#26BADA] py-3 uppercase mb-3 rounded-md border-0 " onClick={handleChangeStatus}>Submit to customer</button>
                                    <button className="text-white text-center bg-[#26BADA] py-3 uppercase mb-3 rounded-md border-0 ">Request Revision</button>
                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Status <span className='text-black'>Issued</span></div>
                                    <div className="bg-[#c3eff92f] px-4 py-1 flex flex-col  ">
                                        <div className="flex items-center justify-between w-full p-4">
                                            <div>
                                                <span className='text-[#778CA2]'>Referrence #</span> <br />
                                                <span>102345-CCL-01</span>
                                            </div>
                                            <div>
                                                <span className='text-[#778CA2]'>Type</span> <br />
                                                <span>Commercial</span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="flex items-center justify-between w-full p-4">
                                            <div>
                                                <span className='text-[#778CA2]'>Issue Date</span> <br />
                                                <span>23 Jun 2021</span>
                                            </div>
                                            <div>
                                                <span className='text-[#778CA2]'>Due Date</span> <br />
                                                <span>28 Jun 2021</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between" >
                                        <p>Assigned to</p>
                                        <p className='uppercase text-[#26BADA]'>Reassign</p>
                                    </div>
                                    <div className="bg-[#F4F5F6] py-3 px-4 flex   items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                            <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                            <div className="">
                                                <span className="text-sm leading-4">Michael Gates</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Key Contacts</div>
                                    <div className="bg-[#F4F5F6] py-3 px-4 flex  items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                            <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                            <div className="">
                                                <span className="text-sm leading-4">Michael Gates</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                            </div>
                                        </div>
                                        <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Requester</div>

                                    </div>

                                    <div className="bg-[#F4F5F6] py-3 px-4 flex  items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full ">
                                            <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                            <div className="">
                                                <span className="text-sm leading-4 w-8">John Smith</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Buyer</span>
                                            </div>
                                            <div className="bg-red-300 text-xs px-1 ml-2 text-white">E</div>
                                        </div>
                                        <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Buyer</div>

                                    </div>

                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Proposal Acknowledgement</div>
                                    <div className="bg-[#F4F5F6] py-6 flex items-center flex-col gap-3">
                                        <p className="text-lg text-[#FFAB2B]">Due</p>
                                        <p className="text-[#00AAEC] cursor-pointer" onClick={handleClickOpen}>Upload Customer Bid Acknowldegement</p>
                                        <UploadDialog open={open} handleClose={handleClose} />

                                    </div>
                                </div>
                            </div>

                        </div>}
                </div>}

                {active === 'Bid Clarifications' &&
                    <div>
                        {!showBidClarificationDetial && <SearchTable rows={Bidrows} NoRowsOverlay={NoRowsOverlayBidClarification} handlRowDetail={() => { setShowBidClarificationDetial(false) }} />}

                        {showBidClarificationDetial && <div className="flex gap-6">
                            <div className="flex flex-[3] flex-col p-5">
                                <div className=" flex items-center gap-1 text-[#00AAEC] cursor-pointer" onClick={() => setShowBidClarificationDetial(true)}>
                                    <FaChevronLeft />
                                    <span>  Back to List</span>
                                </div>
                                <p className='text-xl p-2'>Commercial Clarification 01</p>
                                <div className="flex flex-col-reverse">
                                    <div className="border mb-3 rounded-md ">
                                        <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between " >
                                            <p>#001</p>
                                            <p>Posted by <span className='text-[#00AAEC]'>Ravi K.</span> on 23 Jun 2021, 12:30</p>
                                        </div>
                                        <div className="bg-[#F4F5F6] p-6 flex flex-col gap-5">
                                            <p>Hi Michael,
                                                Please find enclosed the first set of commercial questions. Can you please get clarifications from the customer.<br />
                                                Thanks,
                                            </p>
                                            <p className='text-[#778CA2] mt-3'>Attached Documents</p>
                                            <div className="bg-[#E8ECEF] shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                                <FaRegFilePdf className='text-red-600' />
                                                <span className=''>102345-CCL-01.xlxs</span>
                                                <span className='text-[#98A9BC]'>123kb</span>
                                                <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                                <div className="flex items-center gap-2">
                                                    <span><Image src="/msg.svg" width={18} height={21} /></span>
                                                    <BsThreeDots className='text-[#98A9BC]' />
                                                </div>

                                            </div>
                                            {!showReply && <button className='bg-[#26BADA] p-3 max-w-[200px] text-white rounded-sm' onClick={setShowReply}>REPLY</button>
                                            }                                    </div>
                                    </div>
                                    <div className="border mb-3 rounded-md ">
                                        <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between " >
                                            <p>#002</p>
                                            <p>Posted by <span className='text-[#00AAEC]'>Ravi K.</span> on 23 Jun 2021, 12:30</p>
                                        </div>
                                        <div className="bg-white p-6 flex flex-col gap-5">
                                            <p>Hi Ravi
                                                Please find attached the updated file with commercial clarifications from the customer.<br />
                                                Regards, Michael
                                            </p>
                                            <p className='text-[#778CA2] mt-3'>Attached Documents</p>
                                            <div className="shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                                <FaRegFilePdf className='text-red-600' />
                                                <span className=''>102345-CCL-01.xlxs</span>
                                                <span className='text-[#98A9BC]'>123kb</span>
                                                <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                                <div className="flex items-center gap-2 text-[#98A9BC]">
                                                    <MdOutlineModeEdit className='cursor-pointer' />
                                                    <RiDeleteBin6Line className='cursor-pointer' />
                                                    <span><Image src="/msg.svg" width={18} height={21} className='cursor-pointer' /></span>
                                                    <BsThreeDots className='cursor-pointer' />
                                                </div>

                                            </div>
                                            <div className="shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                                <FaRegFileImage className='text-[#00AAEC]' />
                                                <span className=''>ScreenShot.png</span>
                                                <span className='text-[#98A9BC]'>123kb</span>
                                                <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                                <div className="flex items-center gap-2 text-[#98A9BC]">
                                                    <MdOutlineModeEdit className='cursor-pointer' />
                                                    <RiDeleteBin6Line className='cursor-pointer' />
                                                    <span><Image src="/msg.svg" width={18} height={21} className='cursor-pointer' /></span>
                                                    <BsThreeDots className='cursor-pointer' />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {showReply && <div className="flex flex-col gap-[18px]">
                                    <textarea className='w-full border border-[#E8ECEF] outline-none p-2 rounded-md' placeholder='Description' rows={4} ></textarea>
                                    <DragDrop />
                                    <p className='text-[#778CA2]'>Attached Documents</p>
                                    <div className=" flex gap-3">
                                        <button className='bg-white border border-[#26BADA] text-[#26BADA] uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>Cancel</button>
                                        <button className='bg-[#26BADA] border border-[#26BADA] text-white uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm ' onClick={handleChangeStatus}>SUBMIT</button>
                                    </div>
                                </div>}

                            </div>
                            <div className="flex-[2]">
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Status <span className='text-black'>Open</span></div>
                                    <div className="bg-[#c3eff92f] px-4 py-1 flex flex-col  ">
                                        <div className="flex items-center justify-between w-full p-4">
                                            <div>
                                                <span className='text-[#778CA2]'>Referrence #</span> <br />
                                                <span>102345-CCL-01</span>
                                            </div>
                                            <div>
                                                <span className='text-[#778CA2]'>Type</span> <br />
                                                <span>Commercial</span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="flex items-center justify-between w-full p-4">
                                            <div>
                                                <span className='text-[#778CA2]'>Issue Date</span> <br />
                                                <span>23 Jun 2021</span>
                                            </div>
                                            <div>
                                                <span className='text-[#778CA2]'>Due Date</span> <br />
                                                <span>28 Jun 2021</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between" >
                                        <p>Issued to</p>
                                        <p className='uppercase text-[#26BADA]'>Reassign</p>
                                    </div>
                                    <div className="bg-[#F4F5F6] py-3 px-4 flex   items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                            <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                            <div className="">
                                                <span className="text-sm leading-4">Michael Gates</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Key Contacts</div>
                                    <div className="bg-[#F4F5F6] py-3 px-4 flex  items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                            <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                            <div className="">
                                                <span className="text-sm leading-4">Michael Gates</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                            </div>
                                        </div>
                                        <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Requester</div>

                                    </div>

                                    <div className="bg-[#F4F5F6] py-3 px-4 flex  items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full ">
                                            <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                            <div className="">
                                                <span className="text-sm leading-4 w-8">John Smith</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Buyer</span>
                                            </div>
                                            <div className="bg-red-300 text-xs px-1 ml-2 text-white">E</div>
                                        </div>
                                        <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Buyer</div>

                                    </div>

                                </div>
                            </div>
                        </div>}
                    </div>}

                {active === 'Bid Revision' && <div className="flex justify-between">
                    <p>No revision submitted</p>
                    <button className=' flex items-center gap-1 upprecase uppercase max-w-[200px] rounded-md p-2 bg-[#00AAEC] text-white' onClick={handleChangeStatus} disabled={false} >Proceed <FaArrowRight /> </button>
                </div>}


                {active === 'Order' && <div>
                    <div className="flex justify-end ">
                        <div className="w-[260px] flex items-center justify-between rounded-3xl my-4 bg-white py-[6px] border  px-5">
                            <input type="text" placeholder='Search within results' className='w-full text-black bg-transparent border-0 outline-none placeholder:text-[#778CA2] placeholder:text-sm' />
                            <button><IoIosSearch className="transform scale-x-[-1] text-[#778CA2]" /></button>
                        </div>
                    </div>
                    {/* <SearchTable rows={documentRow} NoRowsOverlay={NoRowsOverlayOrder} /> */}
                    <div className="flex gap-3">
                        <div className="flex-[3] p-5 flex flex-col gap-8">
                            <div className=" flex items-center gap-1 text-[#00AAEC] cursor-pointer" onClick={() => setClarificationDetail(false)}>
                                <FaChevronLeft />
                                <span>  Back to List</span>
                            </div>
                            <TextField
                                id="outlined-basic"
                                label="Purchase Order"
                                variant="outlined"
                                className="bg-white w-full"
                            />
                            <div className="flex gap-4">
                                <TextField
                                    select
                                    label="Currency"
                                    // defaultValue="90 days"
                                    className="bg-white w-[50%]"
                                >
                                    {typeInput.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <div className="relative w-[50%]">
                                    <AiOutlineQuestionCircle className="absolute right-0.5 top-0.5 z-10 text-[#98A9BC]" />
                                    <TextField
                                        id="outlined-basic"
                                        label="Order Value"
                                        variant="outlined"
                                        className="bg-white w-full"
                                    />
                                </div>
                            </div>
                            <textarea className='w-full border border-[#E8ECEF] outline-none p-2 rounded-md' placeholder='Description' rows={8} ></textarea>
                            <DragDrop className="w-full" />
                            <div className=" flex gap-3 pb-5">
                                <button className='bg-white border border-[#26BADA] text-[#26BADA] uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>Cancel</button>
                                <button className='bg-[#26BADA] border border-[#26BADA] text-white uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm ' onClick={handleChangeStatus} >SUBMIT</button>
                            </div>
                        </div>
                        <div className="flex-[2]">
                            <div className="border mt-[18px] mb-3 rounded-md">
                                <div className="bg-[#00000005] py-2 px-[14px]" > Critical Dates</div>
                                <div className="bg-[#F4FCFD] px-4 py-5 date-picker">
                                    <DynamicDatePicker labels={datePickerLabels} />
                                </div>
                            </div>
                            <div className="border mb-3 rounded-md">
                                <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between items-center" >
                                    <span>Assign to</span>
                                    <span className='text-[#00AAEC] text-sm uppercase flex gap-1 items-center' >Reassign</span>
                                </div>
                                <div className="bg-[#F8FAFB] flex flex-col gap-3 py-4 px-6 rounded-b-md items-center w-full">
                                    <PopupInput label={"Assign to"} className="w-full" />
                                    <BidDialog openBid={openContactAssign} handleBidClose={handlCloseContact} />
                                </div>

                            </div>
                            <div className="border mb-3 rounded-md">
                                <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between items-center" >
                                    <span>Key Contacts</span>
                                </div>
                                <div className="bg-[#F8FAFB] flex flex-col gap-3 py-4 px-6 rounded-b-md items-center w-full">
                                    <PopupInput label={"Order Issuer"} className="w-full" />
                                    <BidDialog openBid={openContactAssign} handleBidClose={handlCloseContact} />
                                </div>
                                <div className="bg-[#F8FAFB] flex flex-col gap-3 py-4 px-6 rounded-b-md items-center w-full">
                                    <PopupInput label={"Order Technical Contact"} className="w-full" />
                                    <BidDialog openBid={openContactAssign} handleBidClose={handlCloseContact} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>}

                {(active === 'Order Handover' || active === 'Closed') && <div>
                    {!showOrderDone && <div className="flex gap-4">
                        <div className="flex-[2] p-5">
                            <div className="grid grid-cols-2 gap-8">
                                <TextField
                                    label="Order Number"
                                    id="outlined-basic"
                                    value="PO4527334"
                                    variant="outlined"
                                    className="w-full max-w-[360px]"
                                />

                                <div className="text-black ">
                                    <TextField
                                        id="outlined-basic"
                                        label="Order Currency"
                                        value="USD"
                                        variant="outlined"
                                        className="w-full max-w-[360px]"
                                    />
                                </div>
                                <div className="text-black ">
                                    <TextField
                                        id="outlined-basic"
                                        label="Order Title"
                                        value="DRP Refinery Automation Contract"
                                        variant="outlined"
                                        className="w-full max-w-[360px]"
                                    />
                                </div>
                                <div className="text-black ">
                                    <TextField
                                        id="outlined-basic"
                                        label="Order Value"
                                        value="$ 1,231,401"
                                        variant="outlined"
                                        className="w-full max-w-[360px]"
                                    />
                                </div>
                                <div class="col-span-2 max-w-[80%]">
                                    <p className='text-[#778CA2] mb-1'>Description</p>
                                    <textarea className='w-full border border-[#E8ECEF] outline-none p-2 rounded-md' placeholder='Description' value="Hi Chand, Transferring this order for DRP refinery Automation Project. I am enclosing all the necessar documents. If you have any questions, please do let us know." rows={4} ></textarea>

                                </div>

                            </div>
                            <p className='text-[#778CA2] my-2 text-lg'>Attached Documents</p>
                            <div className="my-4">
                                <p className='text-[#778CA2] my-1 flex gap-1 items-center'>Purchase Order <IoMdAddCircleOutline /></p>
                                <div className=" shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                    <div className="flex items-center gap-4">
                                        <FaRegFilePdf className='text-red-600' />
                                        <span className=''>102345-CCL-01.xlxs</span>
                                    </div>
                                    <span className='text-[#98A9BC]'>182kb</span>
                                    <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                    <div className="flex items-center gap-2 text-[#98A9BC]">
                                        <MdOutlineModeEdit className='cursor-pointer' />
                                        <RiDeleteBin6Line className='cursor-pointer' />
                                        <BsThreeDots className='text-[#98A9BC]' />
                                    </div>
                                </div>

                            </div>
                            <div className="my-4">
                                <p className='text-[#778CA2] my-1 flex gap-1 items-center'>Bid Documents <IoMdAddCircleOutline /></p>
                                <div className=" shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                    <div className="flex items-center gap-4">
                                        <FaRegFilePdf className='text-red-600' />
                                        <span className=''>102345-CCL-01.xlxs</span>
                                    </div>
                                    <span className='text-[#98A9BC]'>123kb</span>
                                    <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                    <div className="flex items-center gap-2 text-[#98A9BC]">
                                        <MdOutlineModeEdit className='cursor-pointer' />
                                        <RiDeleteBin6Line className='cursor-pointer' />
                                        <BsThreeDots className='text-[#98A9BC]' />
                                    </div>
                                </div>
                            </div>
                            <div className="my-4">
                                <p className='text-[#778CA2] my-1 flex gap-1 items-center'>Suppliers Quotations<IoMdAddCircleOutline /></p>
                                <div className=" shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                    <div className="flex items-center gap-4">
                                        <FaRegFilePdf className='text-red-600' />
                                        <span className=''>102345-CCL-01.xlxs</span>
                                    </div>
                                    <span className='text-[#98A9BC]'>123kb</span>
                                    <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                    <div className="flex items-center gap-2 text-[#98A9BC]">
                                        <MdOutlineModeEdit className='cursor-pointer' />
                                        <RiDeleteBin6Line className='cursor-pointer' />
                                        <BsThreeDots className='text-[#98A9BC]' />
                                    </div>
                                </div>
                            </div>
                            <div className="my-4">
                                <p className='text-[#778CA2] my-1 flex gap-1 items-center'>RFx Documents<IoMdAddCircleOutline /></p>
                                <div className=" shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                    <div className="flex items-center gap-4">
                                        <FaRegFilePdf className='text-red-600' />
                                        <span className=''>102345-CCL-01.xlxs</span>
                                    </div>
                                    <span className='text-[#98A9BC]'>123kb</span>
                                    <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                    <div className="flex items-center gap-2 text-[#98A9BC]">
                                        <MdOutlineModeEdit className='cursor-pointer' />
                                        <RiDeleteBin6Line className='cursor-pointer' />
                                        <BsThreeDots className='text-[#98A9BC]' />
                                    </div>
                                </div>
                            </div>
                            <div className="my-4">
                                <p className='text-[#778CA2] my-1 flex gap-1 items-center'>RFx Clarifications<IoMdAddCircleOutline /></p>
                                <div className=" shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                    <div className="flex items-center gap-4">
                                        <FaFileExcel className='text-[#20744A]' />
                                        <span className=''>102345-CCL-01.xlxs</span>
                                    </div>
                                    <span className='text-[#98A9BC]'>123kb</span>
                                    <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                    <div className="flex items-center gap-2 text-[#98A9BC]">
                                        <MdOutlineModeEdit className='cursor-pointer' />
                                        <RiDeleteBin6Line className='cursor-pointer' />
                                        <BsThreeDots className='text-[#98A9BC]' />
                                    </div>
                                </div>
                            </div>
                            <div className="my-4">
                                <p className='text-[#778CA2] my-1 flex gap-1 items-center'>Bids Clarifications<IoMdAddCircleOutline /></p>
                                <div className=" shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                    <div className="flex items-center gap-4">
                                        <FaRegFileImage className='text-[#20744A]' />
                                        <span className=''>102345-CCL-01.xlxs</span>
                                    </div>
                                    <span className='text-[#98A9BC]'>123kb</span>
                                    <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                    <div className="flex items-center gap-2 text-[#98A9BC]">
                                        <MdOutlineModeEdit className='cursor-pointer' />
                                        <RiDeleteBin6Line className='cursor-pointer' />
                                        <BsThreeDots className='text-[#98A9BC]' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-[1] p-5">
                            <button className="text-center  py-3 mt-[10px] mb-[18px] rounded-md border-0 uppercase w-full bg-[#26BADA] text-white" onClick={() => { setShowOrderDone(true) }}>Submit</button>
                            <div className="border mt-[18px] mb-3 rounded-md">
                                <div className="bg-[#00000005] py-2 px-[14px] " > Critical Dates</div>
                                <div className="bg-[#F4FCFD] px-4 py-5 flex items-center justify-between ">
                                    <div>
                                        <span className="text-[#778CA2] block">Issue Date</span>
                                        <span>20 June 2021</span>
                                    </div>
                                    <div>
                                        <span className="text-[#778CA2] block">Due Date</span>
                                        <span>20 July 2021</span>
                                    </div>
                                </div>
                                <div className="border-b border-[#E8ECEF] w-[90%] m-auto"></div>
                                <div className="bg-[#F4FCFD] px-4 py-5">
                                    <span className="text-[#778CA2] block">Order Acknowldegement Date</span>
                                    <span>09 Aug 2021</span>
                                </div>
                            </div>

                        </div>

                    </div>}
                    {showOrderDone && <SearchTable rows={[]} NoRowsOverlay={NoRowsOverlayOrderHandover} />
                    }                </div>}
            </div>

        </div >
    )
}

export default BidDetail