"use client";
import { useState } from "react";
import { deleteAllUsersAction } from "@/app/api/admin-panel/actions/user";

const DeleteAllUsersButton = ({ onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleClickDeleteUsers = async () => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete User? This will delete user's all data."
    );

    if (confirmDelete) {
      let resp = await deleteAllUsersAction();
      console.log(resp);
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <button
      onClick={handleClickDeleteUsers}
      type="button"
      class="btn btn-sm btn-outline-secondary waves-effect justify-between"
    >
      <span class="tf-icons mdi mdi-trash-can-outline me-1"></span>
      Delete All Users
    </button>
  );
};

export default DeleteAllUsersButton;
