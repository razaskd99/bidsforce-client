"use client";
import { useState } from "react";
import {
  getAllRfxPrereqRecordsAction,
  deleteAllRfxPrereqRecordAction,
} from "@/app/api/admin-panel/actions/rfx";

const DeleteAllRFxTypeButton = ({ onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleClickDeleteRFxType = async () => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete RFx Type? This will delete RFx Type's all data."
    );

    if (confirmDelete) {
      //   let resp = await getAllRfxPrereqRecordsAction("rfx_type");
      //   let getRFxType = resp.returnData;
      //   console.log(getRFxType);

      let resp = deleteAllRfxPrereqRecordAction("rfx_type");
      window.location.reload();
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <button
      onClick={handleClickDeleteRFxType}
      type="button"
      class="btn btn-sm btn-outline-secondary waves-effect justify-between"
    >
      <span class="tf-icons mdi mdi-trash-can-outline me-1"></span>
      Delete All RFx Type
    </button>
  );
};

export default DeleteAllRFxTypeButton;
