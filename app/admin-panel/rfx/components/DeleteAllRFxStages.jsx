"use client";
import { useState } from "react";
import { deleteAllRfxPrereqRecordAction } from "@/app/api/admin-panel/actions/rfx";
const DeleteAllRFxStagesButton = ({ onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleClickDeleteRFxStages = async () => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete RFx Stages? This will delete RFx Stages's all data."
    );

    if (confirmDelete) {
      let resp = deleteAllRfxPrereqRecordAction("rfx_stage");
      window.location.reload();
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <button
      onClick={handleClickDeleteRFxStages}
      type="button"
      className="btn btn-sm btn-outline-secondary waves-effect justify-between"
    >
      <span className="tf-icons mdi mdi-trash-can-outline me-1"></span>
      Delete All RFx Stages
    </button>
  );
};

export default DeleteAllRFxStagesButton;
