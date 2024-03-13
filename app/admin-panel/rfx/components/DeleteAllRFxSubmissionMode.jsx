"use client";
import { useState } from "react";
import { deleteAllRfxPrereqRecordAction } from "@/app/api/admin-panel/actions/rfx";
const DeleteAllRFxSubmissionModeButton = ({ onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleClickDeleteRFxSubmissionMode = async () => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete RFx Submission Mode? This will delete RFx Submission Mode's all data."
    );

    if (confirmDelete) {
      let resp = deleteAllRfxPrereqRecordAction("rfx_submission_mode");
      window.location.reload();
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <button
      onClick={handleClickDeleteRFxSubmissionMode}
      type="button"
      class="btn btn-sm btn-outline-secondary waves-effect justify-between"
    >
      <span class="tf-icons mdi mdi-trash-can-outline me-1"></span>
      Delete All RFx Submission Mode
    </button>
  );
};

export default DeleteAllRFxSubmissionModeButton;
