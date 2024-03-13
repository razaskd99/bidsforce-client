export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const showError = (title, message) => {
    document.getElementById('errorMessageAlert').children[0].innerHTML = title
    document.getElementById('errorMessageAlert').children[1].innerHTML = message
    document.getElementById('errorMessageAlert').style.display = "block"
    setTimeout(() => {            
    document.getElementById('errorMessageAlert').style.display = "none"
    }, 2000);
}

export const showModalError = (message) => {
    document.getElementById('modalErrorMessageAlert').style.display = "none"
    document.getElementById('modalSuccessMessageAlert').style.display = "none"
    
    document.getElementById('modalErrorMessageAlert').innerHTML = message
    document.getElementById('modalErrorMessageAlert').style.display = "block"
    /*setTimeout(() => {            
    document.getElementById('modalErrorMessageAlert').style.display = "none"
    }, 2500);*/
}


export const showModalSuccess = (message) => {
    document.getElementById('modalErrorMessageAlert').style.display = "none"
    document.getElementById('modalSuccessMessageAlert').style.display = "none"
    
    document.getElementById('modalSuccessMessageAlert').innerHTML = message
    document.getElementById('modalSuccessMessageAlert').style.display = "block"
    /*setTimeout(() => {            
    document.getElementById('modalSuccessMessageAlert').style.display = "none"
    }, 2500);*/
}


