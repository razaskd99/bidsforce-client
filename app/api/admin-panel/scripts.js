import {
  isValidEmail,
  showError,
  showModalError,
  showModalSuccess,
} from "./utility";





import {
  createPhaseStageAction,
  updatePhaseStageRecordAction,
  deletePhaseStageRecordAction,
} from "./actions/phaseStages";
import { hideMainLoader102, showMainLoader102, uploadSingleFile } from "../util/utility";
import {
  createPersonaAction,
  deletePersonaRecordAction,
  updatePersonaRecordAction,
} from "./actions/persona";
import { createDocUploadAction } from "../rfx/actions/rfx";
import { uploadImagesOnBlob } from "../util/vercelFileHandler";
import { revalidatePath } from "next/cache";
import { Route } from "lucide-react";



///////////////////////// Phase Stage methods

// Client request to create Phase Stage
export const createPhaseStageRequest = async (
  e,
  typeName,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const formData = {
    default_name: document.getElementById("m1_default_name")
      ? document.getElementById("m1_default_name").value
      : "",
    new_name: document.getElementById("m1_new_name")
      ? document.getElementById("m1_new_name").value
      : "",
    type: typeName,
    display_order: document.getElementById("m1_display_order")
      ? document.getElementById("m1_display_order").value
      : 0,
    score: document.getElementById("m1_score")
      ? document.getElementById("m1_score").value
      : 0,
    required:
      document.getElementById("m1_required") &&
      document.getElementById("m1_required").checked == true
        ? true
        : false,
    status: "",
  };

  let valid = true;
  let message = "";
  const validationFields = ["default_name"];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  let success = true;
  if (valid) {
    let res = await createPhaseStageAction(
      formData,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res.statusCode === 200) {
      document.getElementById("modalform1").reset();
      showModalSuccess("New details added successfully.");
      window.location.reload();
    } else {
      success = false;
      message = res.error;
    }
  }

  if (!valid || !success) {
    showModalError(message);
  }
};

// Client request to create Phase Stage
export const updatePhaseStageRequest = async (
  e,
  typeName,
  id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const formData = {
    default_name: document.getElementById("m1_default_name")
      ? document.getElementById("m1_default_name").value
      : "",
    new_name: document.getElementById("m1_new_name")
      ? document.getElementById("m1_new_name").value
      : "",
    type: typeName,
    display_order: document.getElementById("m1_display_order")
      ? document.getElementById("m1_display_order").value
      : 0,
    score: document.getElementById("m1_score")
      ? document.getElementById("m1_score").value
      : 0,
    required: document.getElementById("m1_required")
      ? document.getElementById("m1_required").checked
      : true,
    status: "",
  };

  let valid = true;
  let message = "";
  const validationFields = ["default_name"];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  let success = true;
  if (valid) {
    let res = await updatePhaseStageRecordAction(
      formData,
      id,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res.statusCode === 200) {
      showModalSuccess("Details updated successfully.");
      window.location.reload();
    } else {
      success = false;
      message = res.error;
    }
  }

  if (!valid || !success) {
    showModalError(message);
  }
};

// Client request to delete
export const deletePhaseStageRequest = async (
  e,
  id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const userConfirmed = window.confirm("Are you sure want to Rfx Stage?");

  if (userConfirmed) {
    let res = await deletePhaseStageRecordAction(
      id,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res) {
      window.location.reload();
    } else {
      //showError("Server Error:", res.returnData.error)
      window.location.reload();
    }
  }
};

///////////////////////// Persona methods

// Client request to create new Persona
export const createPersonaRequest = async (
  e,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const formData = {
    persona_role: document.getElementById("m7_persona_role")
      ? document.getElementById("m7_persona_role").value
      : "",
    is_active: true,
    description: document.getElementById("m7_description")
      ? document.getElementById("m7_description").value
      : "",
  };

  let valid = true;
  let message = "";
  const validationFields = ["persona_role"];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  const isactive = document.getElementById("m7_is_active");
  formData.is_active =
    isactive.options[isactive.selectedIndex].value === "Active" ? true : false;

  if (valid && isactive.selectedIndex == 0) {
    valid = false;
    message = "Please select the status.";
  }
  let success = true;
  if (valid) {
    showMainLoader102();
    let res = await createPersonaAction(
      formData,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res.statusCode === 201) {
      //document.getElementById("modalform4").reset();
      //showModalSuccess("New details added successfully.");
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

// Client request to update Persona
export const updatePersonaRequest = async (
  e,
  id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const formData = {
    persona_role: document.getElementById("m7_persona_role")
      ? document.getElementById("m7_persona_role").value
      : "",
    is_active: true,
    description: document.getElementById("m7_description")
      ? document.getElementById("m7_description").value
      : "",
  };

  let valid = true;
  let message = "";
  const validationFields = ["persona_role"];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  const isactive = document.getElementById("m7_is_active");
  formData.is_active =
    isactive.options[isactive.selectedIndex].value === "Active" ? true : false;

  if (valid && isactive.selectedIndex == 0) {
    valid = false;
    message = "Please select the status.";
  }

  let success = true;
  if (valid) {
    showMainLoader102();
    let res = await updatePersonaRecordAction(
      formData,
      id,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res.statusCode === 200) {
      //document.getElementById("modalform4").reset();
      //showModalSuccess("Details updated successfully.");
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

// Client request to delete Personal
export const deletePersonaRequest = async (
  e,
  id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const userConfirmed = window.confirm(
    "Are you sure want delete persona?" + id
  );

  if (userConfirmed) {
    let res = await deletePersonaRecordAction(
      id,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res) {
      window.location.reload();
    } else {
      //showError("Server Error:", res.returnData.error)
      window.location.reload();
    }
  }
};



