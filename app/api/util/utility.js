export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return (
    !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === dateString
  );
};

export const formatDate = (inputDate) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = new Date(inputDate).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};

export const formatDatetime = (datetimeString) => {
  const options = {
    day: "numeric",
    month: "short", // Use 'long' for full month names
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = new Date(datetimeString).toLocaleString(
    "en-US",
    options
  );
  return formattedDate;
};

export const formatDateString = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};

export const generatePassword = (length = 15) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
};

export const getCurrentHostName = () => {
  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const baseUrl = `${hostname}`;
    return baseUrl;
  } else {
    return '';
  }
};

export const generateUniqueSixDigitNumber = () => {
  const timestamp = new Date().getTime();
  const seed = timestamp % 1000000; // Use the last 6 digits of the timestamp
  const randomComponent = Math.floor(seed + Math.random() * (1000000 - seed));
  const uniqueSixDigitNumber = randomComponent % 1000000; // Ensure it is 6 digits
  return uniqueSixDigitNumber;
};

export const generateBidOrderNumber = () => {
  const timestamp = new Date().getTime();
  const seed = timestamp % 10000000; // Use the last 7 digits of the timestamp
  const randomComponent = Math.floor(seed + Math.random() * (100000000 - seed));
  const uniqueEightDigitNumber = randomComponent % 100000000; // Ensure it is 8 digits
  return uniqueEightDigitNumber;
};

export const generateClarifRefNumber = (opp, crm, type) => {  
  const timestamp = new Date().getTime();
  const seed = timestamp % 1000; // Use the last 3 digits of the timestamp for seed
  const randomComponent = Math.floor(seed + Math.random() * (10000 - seed));
  const uniqueFourDigitNumber = randomComponent % 10000; // Ensure it is 4 digits
  const clarif_ref_num = `OPP-${opp}-${crm}-Rfx-${type}-${uniqueFourDigitNumber}`;

  return clarif_ref_num;
};

 

export const generateAccountNumber = (value) => {
  // value ko 8-digit format mein convert karne ke liye ziro fill karte hain
  if(!value){
   // const formattedNumber = value.toString().padStart(8, '0');
    const acc_num = `AC-00000001`
    return acc_num;
  }
  else{
    const [prefix, numStr] = value.split('-');
    let num = parseInt(numStr, 10) + 1;
    let temp = num.toString().padStart(numStr.length, '0')
    const acc_num = `${prefix}-${temp}`
    return acc_num;
  }
};

export const generateOpportunityNumber = (value) => {
const timestamp = new Date();
const fullYear = timestamp.getFullYear();

const lastTwoDigitsOfYear = fullYear.toString().slice(-2);
if(!value){
  // const formattedNumber = value.toString().padStart(8, '0');
    const opp_num = `OPP-${lastTwoDigitsOfYear}-00000001`
    return opp_num;
  }
  else{
    const [prefix, dat, numStr] = value.split('-');
    let num = parseInt(numStr, 10) + 1;
    let temp = num.toString().padStart(numStr.length, '0')
    const opp_num = `${prefix}-${lastTwoDigitsOfYear}-${temp}`
    return opp_num;
  }
};

export const generateRFxID = (value) => { 
  if(!value){
  // const formattedNumber = value.toString().padStart(8, '0');
    const rfx_id = `RFX-000001`
    return rfx_id;
  }
  else{
    const [prefix, numStr] = value.split('-');
    let num = parseInt(numStr, 10) + 1;
    let temp = num.toString().padStart(numStr.length, '0')
    const rfx_id = `${prefix}-${temp}`
    return rfx_id;
  }
};



export const formatFileSize = (sizeInBytes) => {
  const KB = 1024;
  const MB = KB * 1024;

  if (sizeInBytes < KB) {
    return `${sizeInBytes} B`;
  } else if (sizeInBytes < MB) {
    const sizeInKB = (sizeInBytes / KB).toFixed(2);
    return `${sizeInKB} KB`;
  } else {
    const sizeInMB = (sizeInBytes / MB).toFixed(2);
    return `${sizeInMB} MB`;
  }
};

export const showErrorMessageAlertMain = (message, title = "Error!") => {
  /*document.getElementById(
    "errorMessageAlertMainContent"
  ).children[0].innerHTML = title;*/
  document.getElementById(
    "errorMessageAlertMainContent"
  ).innerHTML = message;
  document.getElementById("errorMessageAlertMain").style.display = "flex";
  setTimeout(() => {
    document.getElementById("errorMessageAlertMain").style.display = "none";
  }, 2000);
};

export const successMessageAlertMain = (message, title = "Success!") => {
  /*document.getElementById(
    "successMessageAlertMainContent"
  ).children[0].innerHTML = title;*/
  document.getElementById(
    "successMessageAlertMainContent"
  ).innerHTML = message;
  document.getElementById("successMessageAlertMain").style.display = "flex";
  setTimeout(() => {
    document.getElementById("successMessageAlertMain").style.display = "none";
  }, 2000);
};

export const showMainLoader102 = () => {
  try {
    const loaderElement = document.getElementById("mainLoader102");
    if (loaderElement) {
      loaderElement.classList.remove("hidden");
      loaderElement.style.zIndex = "9999"; // Set a higher z-index value
    }
  } catch (error) {
    console.error("Error showing main loader:", error);
  }
};

export const hideMainLoader102 = () => {
  try{
    document.getElementById("mainLoader102").classList.add("hidden")
  } catch{}
}

export const uploadFiles = async (
  selectedFilesMain,
  apiBackendURL,
  tenantID,
  rfxID,
  docvaltKey
) => {
  //event.preventDefault();

  console.log("mmmmmmmmmmmmm", selectedFilesMain);

  try {
    const formData = new FormData();
    for (let i = 0; i < selectedFilesMain.length; i++) {
      formData.append("files", selectedFilesMain[i]);
    }

    // Make a POST request to your FastAPI route
    const response = await fetch(apiBackendURL + "uploads/upload/", {
      method: "POST",
      body: formData,
      headers: {
        accept: "application/json",
        tenantID: tenantID,
        docvaltKey: docvaltKey,
        rfxID: rfxID,
        // No need to set 'Content-Type' as it is automatically set for multipart/form-data
      },
    });

    if (response.ok) {
      console.log("Files uploaded successfully");
    } else {
      console.error("Failed to upload files");
    }
  } catch (error) {
    console.error("Error uploading files", error);
  }
};

export const uploadSingleFile = async (
  file,
  apiBackendURL,
  tenantID,
  folderName
) => {
  try {
    const formData = new FormData();
    formData.append("files", file);

    // Make a POST request to your FastAPI route
    const response = await fetch(apiBackendURL + "uploads/upload/profile", {
      method: "POST",
      body: formData,
      headers: {
        accept: "application/json",
        tenantID: tenantID,
        folderName: folderName,
        // No need to set 'Content-Type' as it is automatically set for multipart/form-data
      },
    });

    if (response.ok) {
      console.log("File uploaded successfully");
    } else {
      console.error("Failed to upload file");
    }
  } catch (error) {
    console.error("Error uploading file", error);
  }
};

export const fileDownload = async (
  e,
  tenantID,
  apiBackendURL,
  filename,
  key
) => {
  e.preventDefault();

  try {
    const response = await fetch(`${apiBackendURL}uploads/download/`, {
      method: "GET",
      headers: {
        accept: "application/json",
        tenantID: tenantID,
        docvaltKey: key,
        "file-name": filename,
        // No need to set 'Content-Type' as it is automatically set for multipart/form-data
      },
    });
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else {
      console.error("Failed to download file:", response.statusText);
    }
  } catch (error) {
    console.error("Error downloading file:", error.message);
  }
};



