"use client";
import { useState } from "react";
import {
  getAllCustomerRecordsAction,
  deleteAllCustomerRecordAction,
} from "@/app/api/admin-panel/actions/user";
const DeleteAllCustomerButton = ({ onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleClickDeleteCustomer = async () => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete Customer? This will delete Customer's all data."
    );

    if (confirmDelete) {
      let resp = await getAllCustomerRecordsAction();
      let getCutomer = resp.returnData;

      for (const item of getCutomer) {
        let resp = deleteAllCustomerRecordAction(item.customer_id);
      }
      window.location.reload();
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <button
      onClick={handleClickDeleteCustomer}
      type="button"
      class="btn btn-sm btn-outline-secondary waves-effect justify-between"
    >
      <span class="tf-icons mdi mdi-trash-can-outline me-1"></span>
      Delete All Customer
    </button>
  );
};

export default DeleteAllCustomerButton;
