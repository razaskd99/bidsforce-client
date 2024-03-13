"use client";
import { useState } from "react";
import {
  getAllRfxPrereqRecordsAction,
  deleteAllRfxPrereqRecordAction,
} from "@/app/api/admin-panel/actions/rfx";
const DeleteAllBidValidityButton = ({ onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleClickDeleteBidValidity = async () => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete Bid Validity? This will delete Bid Validity's all data."
    );

    if (confirmDelete) {
      let resp = await deleteAllRfxPrereqRecordAction("bid_validity");
      window.location.reload();    
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <button
      onClick={handleClickDeleteBidValidity}
      type="button"
      class="btn btn-sm btn-outline-secondary waves-effect justify-between"
    >
      <span class="tf-icons mdi mdi-trash-can-outline me-1"></span>
      Delete All BidValidity
    </button>
  );
};

export default DeleteAllBidValidityButton;
