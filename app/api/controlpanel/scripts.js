import { 
  createTenantAction, 
  deleteTenantRecordAction,
  updateTenantRecordAction
} from "./actions/controlpanel";

// Client request to create
export const createTenenatRequest= async(e,apiBackendURL,accessToken)=>{
    e.preventDefault()
    const tenant_name = document.getElementById('tenant_name');
    const domain_url = document.getElementById('domain_url');
    const tenant_title = document.getElementById('tenant_title');
    const tenant_logo = document.getElementById('tenant_logo');
    const tenant_description = document.getElementById('tenant_description');
    const contact_person = document.getElementById('contact_person');
    const contact_email = document.getElementById('contact_email');
    const contact_phone = document.getElementById('contact_phone');
    const contact_address = document.getElementById('contact_address');
    const subscription_start_date = document.getElementById('subscription_start_date');
    const subscription_end_date = document.getElementById('subscription_end_date');
    const subscription_type = document.getElementById('subscription_type');
    const location_country = document.getElementById('location_country');
    const location_state = document.getElementById('location_state');
    const location_zip = document.getElementById('location_zip');
    const tenant_status = document.getElementById('tenant_status');

    const tenantData = {
      tenant_name: tenant_name.value,
      domain_url: domain_url.value,
      tenant_title: tenant_title.value,
      tenant_logo: tenant_logo.value,
      tenant_description: tenant_description.value,
      contact_person: contact_person.value,
      contact_email: contact_email.value,
      contact_phone: contact_phone.value,
      contact_address: contact_address.value,
      subscription_start_date: subscription_start_date.value,
      subscription_end_date: subscription_end_date.value,
      subscription_type: subscription_type.value,
      location_country: location_country.value,
      location_state: location_state.value,
      location_zip: location_zip.value,
      tenant_status: tenant_status.value
    };

    let valid = true;
    const validationFields = ['tenant_name', 'domain_url', 'tenant_title', 'subscription_start_date', 
                    'subscription_end_date', 'contact_person', 'contact_email', 'contact_phone'];
    
    validationFields.forEach((element) => {
      if(!tenantData[element]) {
        valid = false;
      }
    });
    
    if(valid) {
      let res= await  createTenantAction(apiBackendURL,accessToken,tenantData)
      if(res.statusCode === 200) {
        window.location = '/controlpanel/auth/members';
      } else {
        const parentElement = document.getElementById('tenantRegisterMessage');
        parentElement.children[1].innerHTML = res.error;
      }
    } else {
      document.getElementById('tenantRegisterMessage').classList.toggle('hidden');
      setTimeout(() => {            
        document.getElementById('tenantRegisterMessage').classList.toggle('hidden');
      }, 2000);
      
    }
    
}


// Client request to delete
export const deleteTenenatRequest= async(e, apiBackendURL, accessToken, tenant_id)=>{
    e.preventDefault()
  
    const userConfirmed = window.confirm("Are you sure want to delete tenant details? This will delete all its data.");

    if (userConfirmed) {
        if(accessToken && tenant_id)  {
          let res= await  deleteTenantRecordAction(apiBackendURL, accessToken, tenant_id)
          if(res.statusCode === 200) {
            window.location.reload();
          }
        } else {
    
        }  
    } 
             
     
}


// Client request to delete
export const updateTenenatRequest= async(e, apiBackendURL, accessToken, tenantData)=>{
  e.preventDefault();
     
  if(accessToken && tenantData.tenant_id)  {
    let res= await  updateTenantRecordAction(apiBackendURL, accessToken, tenantData)
    console.log(res.statusCode)
    if(res.statusCode === 200) {
      window.location.reload();
    }
  } else {

  }          
    
}



// Client request to delete selected items
export const deleteSelectedTenenatsRequest= async(e, apiBackendURL, accessToken, tenant_id)=>{
  e.preventDefault()

  const userConfirmed = window.confirm("Are you sure want to delete selected tenants detail? This will delete all its data.");

  if (userConfirmed) {
      if(accessToken && tenant_id)  {
        let res= await  deleteTenantRecordAction(apiBackendURL, accessToken, tenant_id)
        if(res.statusCode === 200) {
          window.location.reload();
        }
      } else {
  
      }  
  }              
    
}
  
