"use client";
import { useState } from "react";
import {
  getAllCompanyRecordsAction,
  deleteAllCompanyRecordAction,
} from "@/app/api/admin-panel/actions/user";

import { getUsers } from "@/app/api/rfx/actions/rfx";

const DeleteAllCompaniesButton = ({ onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleClickDeleteCompanies = async () => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete User? This will delete user's all data."
    );

    if (confirmDelete) {
      let resp = await getAllCompanyRecordsAction();
      let getComp = resp.returnData;
      console.log(getComp);

      for (const item of getComp) {
        let resp = deleteAllCompanyRecordAction(item.company_id);
      }
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <button
      onClick={handleClickDeleteCompanies}
      type="button"
      class="btn btn-sm btn-outline-secondary waves-effect justify-between"
    >
      <span class="tf-icons mdi mdi-trash-can-outline me-1"></span>
      Delete All Company
    </button>
  );
};

export default DeleteAllCompaniesButton;
