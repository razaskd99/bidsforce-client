"use client";
import { useState } from "react";
import {
  getAllDesignationRecordsAction,
  deleteAllDesignationRecordAction,
} from "@/app/api/admin-panel/actions/user";

const DeleteAllDesignationButton = ({ onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleClickDeleteDesignation = async () => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete Desination? This will delete Desination's all data."
    );

    if (confirmDelete) {
      let resp = await getAllDesignationRecordsAction();
      let getDesig = resp.returnData;
      console.log(getDesig);

      for (const item of getDesig) {
        let resp = deleteAllDesignationRecordAction(item.designation_id);
      }
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <button
      onClick={handleClickDeleteDesignation}
      type="button"
      class="btn btn-sm btn-outline-secondary waves-effect justify-between"
    >
      <span class="tf-icons mdi mdi-trash-can-outline me-1"></span>
      Delete All Designation
    </button>
  );
};

export default DeleteAllDesignationButton;
