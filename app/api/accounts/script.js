import { showModalError, showModalSuccess } from "../rfx/utility";
import { generateAccountNumber, hideMainLoader102, showMainLoader102 } from "../util/utility";
import { uploadImagesOnBlob } from "../util/vercelFileHandler";
import { createAccountAction, deleteAccountRecordAction, getAccountMaxRecordsAction, getAllAccountRecordsAction, updateAccountAction } from "./action/account";
import { createAccountTypeAction, updateAccountTypeRecordAction } from "./action/accountType";
import { createAccountTypeEntriesAction, deleteAccountTypeEntriesAction } from "./action/accountTypeEntries";



  
  // Client request to create Account
  export const createAccountRequest = async (
    e,
    handleClose,
    formData,
    selectedFile,
    fileData,
    selectedAccountTypeList
  ) => {
    e.preventDefault();
   
    let valid = true;
    let message = "";
    const validationFields = ["account_name",  "account_owner_id", "street", "postal_code", "country" ];
  
    validationFields.forEach((element) => {
      if (!formData[element]) {
        valid = false;
        message = "Please fill the required fields.";
      }
    });
  
  
    let account_list = await getAccountMaxRecordsAction();
    let account_resp = account_list.returnData;
    let account_number = '';
  
    if(account_resp){
      account_number = generateAccountNumber(account_resp.account_number);
    } else {
      account_number = generateAccountNumber('');      
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
          formData.user_profile_photo = "tenant-" + tenantID + "/" + folderName + selectedFile.name;        
          */
         // upload file on blob
         const uploaded = await uploadImagesOnBlob(fileData);
         formData.account_image = uploaded[0].url; 
         console.log("Running on local/aws");      
        } else {
          // upload file on blob
          const uploaded = await uploadImagesOnBlob(fileData);
          formData.account_image = uploaded[0].url;
          console.log("Running on Vercel or different environment");
        }
      }
        
      let res = await createAccountAction(formData, account_number);

      if (res.statusCode === 200) {
        let account_id = res.returnData.account_id
        for(let i=0; i<selectedAccountTypeList.length; i++) {
          let r2 = await createAccountTypeEntriesAction(account_id, selectedAccountTypeList[i].id);
        }
        //handleClose();
        //showModalSuccess("New details added successfully.");
        window.location.reload();
      } else {
        valid = false;
        message = res.error;
      }
    }
    
  
    if (!valid || !success) {
      showModalError(message);
      hideMainLoader102()
    }
  };
  
  // Client request to update Account
  export const updateAccountRequest = async (
    e,
    handleClose,
    account_id,
    formData,
    selectedFile,
    fileData,
    selectedAccountTypeList
  ) => {
    e.preventDefault();
    console.log(formData,"aaaaa")

    let valid = true;
    let message = "";
    const validationFields = ["account_name", "account_owner_id", "owner_name", "street",  "postal_code", "country" ];

    validationFields.forEach((element) => {
      if (!formData[element]) {
        valid = false;
        message = "Please fill the required fields.";
      }
    });
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
          formData.user_profile_photo = "tenant-" + tenantID + "/" + folderName + selectedFile.name;        
          */
         // upload file on blob
         const uploaded = await uploadImagesOnBlob(fileData);
         formData.account_image = uploaded[0].url; 
         console.log("Running on local/aws");      
        } else {
          // upload file on blob
          const uploaded = await uploadImagesOnBlob(fileData);
          formData.account_image = uploaded[0].url;
          console.log("Running on Vercel or different environment");
        }
      }
  
      let res1 = await updateAccountAction(formData, account_id);
  
      if (res1.statusCode === 200) {
        let account_id = res1.returnData.account_id;        
        if(selectedAccountTypeList.length){
          let res2 = await deleteAccountTypeEntriesAction(account_id);
          for(let i=0; i<selectedAccountTypeList.length; i++) {
            let res3 = await createAccountTypeEntriesAction(account_id, selectedAccountTypeList[i].id);
          }
        }
        //handleClose();
        window.location.reload();
      } else {
        valid = false;
        message = res1.error;
      }
    }
    
    if (!valid || !success) {
      showModalError(message);
      hideMainLoader102();
    }
    
  };
  
  // Client request to delete Account
  export const deleteAccountRequest = async (
    e,
    company_id,
    apiBackendURL,
    tokens,
    tenantID
  ) => {
    e.preventDefault();
  
    const userConfirmed = window.confirm(
      "Are you sure want to delete Account? This will delete user's all data."
    );
  
    if (userConfirmed) {
      let res = await deleteAccountRecordAction(
        company_id,
        apiBackendURL,
        tokens,
        tenantID
      );
      showMainLoader102();
  
      if (res) {
        window.location.reload();
      } else {
        //showError("Server Error:", "Could not delete")
        window.location.reload();
      }
    }
  };
  
///////////////////// Account Type methods


// Client request to create new Account Type
export const createAccountTypeRequest = async (
  e,
  formData
) => {
  e.preventDefault();

  let valid = true;
  let message = "";
    
  if (!formData.type_name) {
    valid = false;
    message = "Please input Type Name.";
  }
  

  let success = true;
  if (valid) {
    showMainLoader102();
    let res = await createAccountTypeAction(
      formData
    );
    if (res.statusCode === 201) {
      //document.getElementById("modalform1").reset();
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

// Client request to update Account Type
export const updateAccountTypeRequest = async (
  e,
  id,
  formData
) => {
  e.preventDefault();
  
  let valid = true;
  let message = "";
  
  if (!formData.type_name) {
    valid = false;
    message = "Please provide the type.";
  }


  let success = true;
  if (valid) {
    let res = await updateAccountTypeRecordAction(
      formData,
      id
    );
    if (res.statusCode === 200) {
      showMainLoader102();
      //document.getElementById("modalform1").reset();
      //showModalSuccess("Details updated successfully.");
      window.location.reload();
    } else {
      valid = false;
      message = res.error;
    }
  }

  if (!valid || !success) {
    showModalError(message);
  }
};

