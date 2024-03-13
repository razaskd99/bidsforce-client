"use client";
import { useState } from "react";
import { deleteAllRfxPrereqRecordAction } from "@/app/api/admin-panel/actions/rfx";
const DeleteAllRFxContentSubmissionButton = ({ onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleClickDeleteRFxContentSubmission = async () => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete RFx Conetent Submission? This will delete RFx Conetent Submission's all data."
    );

    if (confirmDelete) {
      let resp = deleteAllRfxPrereqRecordAction("rfx_content_submission");
      window.location.reload();
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <button
      onClick={handleClickDeleteRFxContentSubmission}
      type="button"
      class="btn btn-sm btn-outline-secondary waves-effect justify-between"
    >
      <span class="tf-icons mdi mdi-trash-can-outline me-1"></span>
      Delete All RFx Content Submission
    </button>
  );
};

export default DeleteAllRFxContentSubmissionButton;
