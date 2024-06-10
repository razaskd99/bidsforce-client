import { isValidEmail } from "../admin-panel/utility";
import { showModalError, showModalSuccess } from "../rfx/utility";
import { hideMainLoader102, showMainLoader102 } from "../util/utility";
import { uploadImagesOnBlob } from "../util/vercelFileHandler";
import { createUserAction, deleteUserRecordAction, updateUserDetailLimitedAction, updateUserRecordAction } from "./action/user";
import { createFunctionalGroupAction, deleteFunctionalGroupRecordAction, updateFunctionalGroupAction } from "./action/functionalGroup";


// Client request to create User
export const createUserRequest = async (
  e,
  handleClose,
  formData,
  selectedFile,
  fileData
) => {
  e.preventDefault();
  
  let valid = true;
  let message = "";
  const validationFields = [
    "job_title",
    "user_name",
    "email",
    "first_name",
    "last_name",
    "user_role",
    "contact_number",
    "functional_group",
    "time_zone",
    "work_location",
    "work_hours_start",
    "password",
    "cpassword",
  ];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Fill all the required fields to process registraion.";
    }
  });

  if (valid && !isValidEmail(formData.email)) {
    valid = false;
    message = "You have provided invalid Email.";
  }

  if (valid && formData.password != formData.cpassword) {
    valid = false;
    message = "Password and Confirm Password are different.";
  }
    
  let success = true;
  if (valid) {
    showMainLoader102();    
    // upload file
    if (selectedFile && selectedFile.name) {
      if (process.env.IS_LOCAL === "local") {
        // upload file on local or AWS
        /*let resp = await uploadSingleFile(
          selectedFile,
          apiBackendURL,
          tenantID,
          folderName
        );
        formData.user_profile_photo =
          "tenant-" + tenantID + "/" + folderName + selectedFile.name;
        console.log("Running on localhost");*/
        // upload file on blob
        const uploaded = await uploadImagesOnBlob(fileData);
        formData.profile_image = uploaded[0].url;
        console.log("Running on local/aws"); 
      } else {
        // upload file on blob
        const uploaded = await uploadImagesOnBlob(fileData);
        formData.profile_image = uploaded[0].url;
        console.log("Running on Vercel or different environment");
      }
    }
    if(!formData.profile_image) {
      formData.profile_image = '';
    } 
    // create user
    let res = await createUserAction(formData);
    
    if (res.statusCode === 200) {
      //showModalSuccess("New details added successfully.");
      window.location.reload();
      //handleClose();
      //hideMainLoader102();
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


// Client request to delete
export const deleteUserRequest = async (
  e,
  user_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const userConfirmed = window.confirm(
    "Are you sure want to delete User? This will delete user's all data."
  );

  if (userConfirmed) {
    let res = await deleteUserRecordAction(user_id);
    if (res) {
      window.location.reload();
    } else {
      // showError("Server Error:", res.returnData.error*/);
      window.location.reload();
    }
  }
};


// Client request to update User
export const updaateUserRequest = async (
  e,
  handleClose,
  formData,
  user_id,
  apiBackendURL,
  accessToken,
  tenantID,
  selectedFile,
  fileData
) => {
  e.preventDefault();
  
  let valid = true;
  let message = "";
  const validationFields = [
    "job_title",
    "user_name",
    "email",
    "first_name",
    "last_name",
    "user_role",
    "contact_number",
    "functional_group",
    "time_zone",
    "work_location",
    "work_hours_start",
  ];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Fill all the required fields to process registraion.";
    }
  });
  
  if (valid && !isValidEmail(formData.email)) {
    valid = false;
    message = "You have provided invalid Email.";
  }

  if (valid && formData.password && formData.password != formData.cpassword) {
    valid = false;
    message = "Password and Confirm Password should be same.";
  }

  
  let success = true;
  if (valid) {
    showMainLoader102();
    // upload file
    if (selectedFile && selectedFile.name) {
      if (process.env.IS_LOCAL === "local") {
        // upload file on local or AWS
        /*let resp = await uploadSingleFile(
          selectedFile,
          apiBackendURL,
          tenantID,
          folderName
        );
        formData.user_profile_photo =
          "tenant-" + tenantID + "/" + folderName + selectedFile.name;
        console.log("Running on localhost");*/
        // upload file on blob
        const uploaded = await uploadImagesOnBlob(fileData);
        formData.profile_image = uploaded[0].url;
        console.log("Running on local/aws"); 
      } else {
        // upload file on blob
        const uploaded = await uploadImagesOnBlob(fileData);
        formData.profile_image = uploaded[0].url;
        console.log("Running on Vercel or different environment");
      }
    }
    if(!formData.profile_image) {
      formData.profile_image = '';
    }
    if(!formData.password) {
      formData.password = '';
    }
    
    // update user
    let res = await updateUserRecordAction(formData, user_id);
    if (res.statusCode === 200) {
      //showModalSuccess("User details updated successfully.");
      window.location.reload();
      //handleClose();
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


// Client request to update User
export const updateUserDetailLimited = async (
    e,
    handleClose,
    formData,
    user_id,
    selectedFile,
    fileData
  ) => {
    e.preventDefault();console.log(formData,"aaaaaa")
    
    let valid = true;
    let message = "";
    const validationFields = [
      "job_title",
      "contact_number",
      "time_zone",
      "work_location",
      "work_hours_start"
    ];
  
    validationFields.forEach((element) => {
      if (!formData[element]) {
        valid = false;
        message = "Fill all the required fields to process registraion.";
      }
    });
  
    if (valid && formData.password && formData.password != formData.cpassword) {
      valid = false;
      message = "Password and Confirm Password should be same.";
    }
  
    
    let success = true;
    if (valid) {
      showMainLoader102();
      // upload file
      if (selectedFile && selectedFile.name) {
        if (process.env.IS_LOCAL === "local") {
          // upload file on local or AWS
          /*let resp = await uploadSingleFile(
            selectedFile,
            apiBackendURL,
            tenantID,
            folderName
          );
          formData.user_profile_photo =
            "tenant-" + tenantID + "/" + folderName + selectedFile.name;
          console.log("Running on localhost");*/
          // upload file on blob
          const uploaded = await uploadImagesOnBlob(fileData);
          formData.profile_image = uploaded[0].url;
          console.log("Running on local/aws"); 
        } else {
          // upload file on blob
          const uploaded = await uploadImagesOnBlob(fileData);
          formData.profile_image = uploaded[0].url;
          console.log("Running on Vercel or different environment");
        }
      }
      if(!formData.profile_image) {
        formData.profile_image = '';
      }
      if(!formData.password) {
        formData.password = '';
      }
      // update user
      let res = await updateUserDetailLimitedAction(formData, user_id);
      if (res.statusCode === 200) {
        showMainLoader102();
        //showModalSuccess("User details updated successfully.");
        window.location.reload();
        // handleClose();
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
      //showModalSuccess("New record added successfully.");
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
      //showModalSuccess("New record added successfully.");
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
export const deleteFunctionalGroupRequest = async (id) => {
 // e.preventDefault();

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
