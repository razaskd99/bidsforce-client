"use client";
import { useState } from "react";
import {
  getAllTeamRecordsAction,
  deleteAllTeamRecordAction,
} from "@/app/api/admin-panel/actions/user";

const DeleteAllTeamsButton = ({ onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleClickDeleteTeams = async () => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete Teams? This will delete teams's all data."
    );

    if (confirmDelete) {
      let resp = await getAllTeamRecordsAction();
      let getTeam = resp.returnData;
      console.log(getTeam);

      for (const item of getTeam) {
        let resp = deleteAllTeamRecordAction(item.team_id);
      }
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <button
      onClick={handleClickDeleteTeams}
      type="button"
      class="btn btn-sm btn-outline-secondary waves-effect justify-between"
    >
      <span class="tf-icons mdi mdi-trash-can-outline me-1"></span>
      Delete All Teams
    </button>
  );
};

export default DeleteAllTeamsButton;
