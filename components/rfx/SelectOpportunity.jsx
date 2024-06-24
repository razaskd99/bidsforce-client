"use client";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid
  } from "@mui/material";
import { useState } from "react";
import OpportunitySearch from "./OpportunitySearch"
import { getOpportunityByOppNumber } from "../../app/api/opportunities/action/opportunity";
import Link from "next/link";
import NewOpportunity from "../opportunity/NewOpportunity"


const SelectOpportunity = (props) => {
    const {
        isOpen,
        handleClose,
        usersRecords,
        accountRecords,
        oppSalesStagesList,
        salesPursuitProgressList,
        businessLineList,
        oppCommForSalesBudgetList,
        biddingUnitList,
        projectTypeList,
        opportunityTypeList,
        opportunityIndustryList,
    } = props;

    const [openOppSearch, setOpenOppSearch] = useState(false);
    const [value, setValue] = useState('');
    const [oppRecords, setOppRecords] = useState(null);
    const [openNewOpportunity, setOpenNewOpportunity] = useState(false);
    const [showNoRecordsMessage, setShowNoRecordsMessage] = useState(false);
    const [showAddNewOpportunityLink, setShowAddNewOpportunityLink] = useState(false);

    const handleCloseOpportunity = () => {
        setOpenNewOpportunity(false);
    };

    const handleOpenOpportunity = () => {
        setOpenNewOpportunity(true);
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleOpportunitySearch = async () => {
        let rec = await getOpportunityByOppNumber(value);
        setOppRecords(rec.returnData);
        setOpenOppSearch(true);

        if (rec.returnData.length === 0) {
            setShowNoRecordsMessage(true);
            setTimeout(() => {
                setShowNoRecordsMessage(false);
                setShowAddNewOpportunityLink(true);
            }, 3000);
        } else {
            setShowAddNewOpportunityLink(false);
        }
    };

    const handleCloseOppSearch = () => {
        setOpenOppSearch(false);
        setShowAddNewOpportunityLink(false);
    };

    return (
        <>
            <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle></DialogTitle>
                <DialogContent>
                    <div className="w-full mb-5 mt-2 h-4 text-xl flex items-center justify-between">
                        <div>
                            <p>Select Opportunity</p>
                        </div>
                        <div className="text-[#26BADA]">
                            {showAddNewOpportunityLink && (
                                <Link href="#" onClick={handleOpenOpportunity}>
                                    ADD NEW OPPORTUNITY
                                </Link>
                            )}
                            {openNewOpportunity && (
                                <NewOpportunity
                                    isOpen={openNewOpportunity}
                                    handleClose={handleCloseOpportunity}
                                    usersRecords={usersRecords}
                                    accountRecords={accountRecords}
                                    oppSalesStagesList={oppSalesStagesList}
                                    salesPursuitProgressList={salesPursuitProgressList}
                                    businessLineList={businessLineList}
                                    oppCommForSalesBudgetList={oppCommForSalesBudgetList}
                                    biddingUnitList={biddingUnitList}
                                    projectTypeList={projectTypeList}
                                    opportunityTypeList={opportunityTypeList}
                                    opportunityIndustryList={opportunityIndustryList}
                                />
                            )}
                        </div>
                    </div>
                    <Grid container spacing={2} style={{ marginTop: 3 }}>
                        <Grid item xs={12} md={8}>
                            <TextField
                                fullWidth
                                name=""
                                label="ENTER OPPORTUNITY NUMBER OR NAME"
                                variant="outlined"
                                onChange={handleChange}
                                className="text-[#26BADA] border border-[#26BADA] rounded-md bg-white rounded-md"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#26BADA',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#26BADA',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#26BADA',
                                        },
                                        '& input': {
                                            color: '#26BADA',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#26BADA',
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#26BADA',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <button
                                onClick={handleOpportunitySearch}
                                className="text-[#26BADA] border border-[#26BADA] rounded-md bg-white w-full h-full"
                            >
                                SEARCH NOW
                            </button>
                        </Grid>

                        {openOppSearch && oppRecords.length > 0 ? (
                            <OpportunitySearch
                                open={openOppSearch}
                                close={handleCloseOppSearch}
                                usersRecords={usersRecords}
                                oppRecords={oppRecords}
                                oppSalesStagesList={oppSalesStagesList}
                                salesPursuitProgressList={salesPursuitProgressList}
                                businessLineList={businessLineList}
                                oppCommForSalesBudgetList={oppCommForSalesBudgetList}
                                biddingUnitList={biddingUnitList}
                                projectTypeList={projectTypeList}
                                opportunityTypeList={opportunityTypeList}
                                opportunityIndustryList={opportunityIndustryList}
                                accountRecords={accountRecords}
                            />
                        ) : (
                            openOppSearch &&
                            showNoRecordsMessage && (
                                <div className="ml-5 my-3">
                                    No opportunity records found                                    
                                </div>
                            )
                        )}
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
};
export default SelectOpportunity;