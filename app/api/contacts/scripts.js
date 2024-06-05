'use client'

import { showError } from "../admin-panel/utility";
import { showModalError, showModalSuccess } from "../rfx/utility";
import { hideMainLoader102, isValidEmail, showMainLoader102 } from "../util/utility";
import { uploadImagesOnBlob } from "../util/vercelFileHandler";
import { createPrimaryContactsAction, updatePrimaryContactsAction } from "./actions/contacts";
import { createFunctionalGroupAction, deleteFunctionalGroupRecordAction, updateFunctionalGroupAction } from "./actions/functionalGroup";



//////////////////////////// Functional Group


// Client request to create new Functional Group
export const createFunctionalGroupRequest = async (e) => {
  e.preventDefault();

  const formData = {
    title: document.getElementById("m8_title")
      ? document.getElementById("m8_title").value
      : "",
    active: true,    
  };

  let valid = true;
  let message = "";
  const validationFields = ["title"];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  const isactive = document.getElementById("m8_active");
  formData.active =
    isactive.options[isactive.selectedIndex].value === "Active" ? true : false;

  if (valid && isactive.selectedIndex == 0) {
    valid = false;
    message = "Please select the active status.";
  }
  let success = true;
  if (valid) {
    showMainLoader102();
    let res = await createFunctionalGroupAction(formData);
    if (res.statusCode === 200) {
      showModalSuccess("New record added successfully.");
      window.location.reload();
    } else {
      valid = false;
      message = res.error;
    }
  }

  if (!valid || !success) {
    showModalError(message);
    hideMainLoader102();
  }
};



// Client request to update Functional Group
export const updateFunctionalGroupRequest = async (e, id) => {
  e.preventDefault();

  const formData = {
    title: document.getElementById("m8_title")
      ? document.getElementById("m8_title").value
      : "",
    active: true,    
  };

  let valid = true;
  let message = "";
  const validationFields = ["title"];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  const isactive = document.getElementById("m8_active");
  formData.active =
    isactive.options[isactive.selectedIndex].value === "Active" ? true : false;

  if (valid && isactive.selectedIndex == 0) {
    valid = false;
    message = "Please select the active status.";
  }
  let success = true;
  if (valid) {
    showMainLoader102();
    let res = await updateFunctionalGroupAction(formData, id);
    if (res.statusCode === 200) {
      showModalSuccess("New record added successfully.");
      window.location.reload();
    } else {
      valid = false;
      message = res.error;
    }
  }

  if (!valid || !success) {
    showModalError(message);
    hideMainLoader102();
  }
};


// Client request to delete Functional Group
export const deleteFunctionalGroupRequest = async (e, id) => {
  e.preventDefault();

  const userConfirmed = window.confirm(
    "Are you sure want to delete Functional Group?"
  );

  if (userConfirmed) {
    showMainLoader102();
    let res = await deleteFunctionalGroupRecordAction(id);
    if (res.statusCode == 200) {
      window.location.reload();
    } else {
      showError(res.returnData.error)
      hideMainLoader102();
    }
  }
};
