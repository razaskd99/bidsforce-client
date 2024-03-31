export const showModalError = (message) => {    
    document.getElementById('modalErrorMessageAlert').innerHTML = message
    document.getElementById('modalErrorMessageAlert').style.display = "block"
    setTimeout(() => {            
        document.getElementById('modalErrorMessageAlert').innerHTML = 'Operation failed.'
        document.getElementById('modalErrorMessageAlert').style.display = "none"
    }, 2500);
}


export const showModalSuccess = (message) => {    
    document.getElementById('modalSuccessMessageAlert').innerHTML = message
    document.getElementById('modalSuccessMessageAlert').style.display = "block"
    setTimeout(() => {      
        document.getElementById('modalSuccessMessageAlert').innerHTML = 'Operation successful.'      
        document.getElementById('modalSuccessMessageAlert').style.display = "none"
    }, 2500);
}