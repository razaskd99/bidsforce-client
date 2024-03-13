export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === dateString;
}

export const formatDate = (inputDate) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
    return formattedDate;
};

export const formatDatetime = (datetimeString) => {
  const options = {
    day: 'numeric',
    month: 'short', // Use 'long' for full month names
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  const formattedDate = new Date(datetimeString).toLocaleString('en-US', options);
  return formattedDate;
};


export const formatDateString = (dateString) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  return formattedDate;
};

export const generateUniqueSixDigitNumber =()=> {
  const timestamp = new Date().getTime();
  const seed = timestamp % 1000000; // Use the last 6 digits of the timestamp
  const randomComponent = Math.floor(seed + Math.random() * (1000000 - seed));
  const uniqueSixDigitNumber = randomComponent % 1000000; // Ensure it is 6 digits
  return uniqueSixDigitNumber;
}

export const generateBidOrderNumber = () => {
  const timestamp = new Date().getTime();
  const seed = timestamp % 10000000; // Use the last 7 digits of the timestamp
  const randomComponent = Math.floor(seed + Math.random() * (100000000 - seed));
  const uniqueEightDigitNumber = randomComponent % 100000000; // Ensure it is 8 digits
  return uniqueEightDigitNumber;
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

export const showErrorMessageAlertMain = (message, title='Error!') => {
    document.getElementById('errorMessageAlertMainContent').children[0].innerHTML = title
    document.getElementById('errorMessageAlertMainContent').children[1].innerHTML = message
    document.getElementById('errorMessageAlertMain').style.display = "flex"
    setTimeout(() => {            
    document.getElementById('errorMessageAlertMain').style.display = "none"
    }, 2000);
}

export const successMessageAlertMain = (message, title='Success!') => {
  document.getElementById('successMessageAlertMainContent').children[0].innerHTML = title
  document.getElementById('successMessageAlertMainContent').children[1].innerHTML = message
  document.getElementById('successMessageAlertMain').style.display = "flex"
  setTimeout(() => {            
  document.getElementById('successMessageAlertMain').style.display = "none"
  }, 2000);
}

export const uploadFiles = async (selectedFilesMain,apiBackendURL,
  tenantID, rfxID, docvaltKey) => {
  //event.preventDefault();

console.log('mmmmmmmmmmmmm',selectedFilesMain)

  try {
      
    
    const formData = new FormData();
    for (let i = 0; i < selectedFilesMain.length; i++) {
      formData.append('files', selectedFilesMain[i]);
    }									  
        
    // Make a POST request to your FastAPI route			
    const response = await fetch(apiBackendURL + "uploads/upload/", {
      method: "POST",
      body: formData,
      headers: {
        'accept': 'application/json',
        'tenantID': tenantID,
        'docvaltKey': docvaltKey,
        'rfxID': rfxID,
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


export const fileDownload = async (e, tenantID, apiBackendURL, filename, key) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiBackendURL}uploads/download/`, {
            method: "GET",
            headers: {
                'accept': 'application/json',
                'tenantID': tenantID,
                'docvaltKey': key,
                'file-name': filename,
                // No need to set 'Content-Type' as it is automatically set for multipart/form-data
            },
        });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download file:', response.statusText);
      }
    } catch (error) {
      console.error('Error downloading file:', error.message);
    }
};






