'use client'
import React,{useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
/*import { 
    createCompanyRequest,
    updateCompanyRequest
  } from "@/app/api/admin-panel/scripts";
*/

export default function CompanyInfoModal(props) {
    const[openModal, setOpenModal] = useState(true)  
    const [formData, setFormDate] = useState({
        m1_company_name: props.modalData && props.modalData.company_name ? props.modalData.company_name : "",
        m1_phone: props.modalData && props.modalData.phone ? props.modalData.phone : "",
        m1_email: props.modalData && props.modalData.email ? props.modalData.email : "",
        m1_address: props.modalData && props.modalData.address ? props.modalData.address : "",
        m1_industry: props.modalData && props.modalData.industry ? props.modalData.industry : "",
        m1_website: props.modalData && props.modalData.website ? props.modalData.website : "",
        m1_company_logo: props.modalData && props.modalData.company_logo ? props.modalData.company_logo : "",
        m1_company_type: props.modalData && props.modalData.company_type ? props.modalData.company_type : "",        
    });
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
               

      } catch (error) {
        console.error('Error fetching data:', error);
      }      
    };

    fetchData(); // Call the async function inside useEffect

    console.log(props.modalData)
    return () => {
      // Clean up any effects if needed on unmount
    };
  }, []); 


  const handleChangeValues = (e)=>{
    let data = {...formData, [e.target.name]: e.target.value}
    setFormDate({...data})    
  }

  const handleCancel = (e)=>{
    setOpenModal(false);
    props.setOpenCompanyModal(false)
  }


  
  return (    
    <>
        <div className="modal fade show" id="modalCenter" tabindex="-1" aria-modal="true" role="dialog" style={{display: "block", opacity:1, background:'rgba(151,149,158,50%)'}}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content" id="modalFormComponent1">
                <div className="modal-header">
                  <h4 className="modal-title" id="modalCenterTitle">Company Details</h4>
                  <button onClick={handleCancel} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body" id="modalFormComponentBody1">
                  <form id="modalform1">
                    <div className="row">
                        <div className="col mb-4 mt-2">
                        <div className="form-floating form-floating-outline">
                            <input type="text" onChange={handleChangeValues} value={formData.m1_company_name} id="m1_company_name" name="m1_company_name" className="form-control" placeholder="Enter Name" />
                            <label for="company_name">Name *</label>
                        </div>
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className="col mb-4">
                        <div className="form-floating form-floating-outline">
                            <input type="email" onChange={handleChangeValues} value={formData.m1_email} id="m1_email" name="m1_email" className="form-control" placeholder="example@domain.com" />
                            <label for="email">Email *</label>
                        </div>
                        </div>
                        <div className="col mb-4">
                        <div className="form-floating form-floating-outline">
                            <input type="text" onChange={handleChangeValues} value={formData.m1_phone} id="m1_phone" name="m1_phone" className="form-control" placeholder="Enter Phone Number" />
                            <label for="phone">Phone *</label>
                        </div>
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className="col mb-4">
                        <div className="form-floating form-floating-outline">
                            <input type="text" onChange={handleChangeValues} value={formData.m1_industry} id="m1_industry" name="m1_industry" className="form-control" placeholder="Enter Industry" />
                            <label for="industry">Industry *</label>
                        </div>
                        </div>
                        <div className="col mb-4">
                        <div className="form-floating form-floating-outline">
                            <input type="text" onChange={handleChangeValues} value={formData.m1_website} id="m1_website" name="m1_website" className="form-control" placeholder="Enter Website URL" />
                            <label for="website">Website</label>
                        </div>
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className="col-6 mb-4">
                          <div className="input-group">
                              <input type="file" onChange={handleChangeValues} className="form-control" id="m1_company_logo" name="m1_company_logo" />
                          </div>
                        </div>
                        <div className="col-6">
                            <select
                            className="form-select"
                            id="m1_company_type"
                            name="m1_company_type"
                            >
                              <option value={""}>Company Type *</option>
                              <option selected={formData.company_type == 'Customer' ? true : false}>Customer</option>
                              <option selected={formData.company_type == 'End User' ? true : false}>End User</option>                            
                          </select>
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className="col mb-2">
                        <div className="input-group">
                            <textarea onChange={handleChangeValues} className="form-control" id="m1_address" name="m1_address" placeholder="Enter Address">{formData.m1_address}</textarea>
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div id="modalErrorMessageAlert" className="alert alert-danger mt-4" style={{display:"none"}} role="alert">
                                Invalid data.
                            </div>
                            <div id="modalSuccessMessageAlert" className="alert alert-success mt-4" style={{display:"none"}} role="alert">
                                Operation successful.
                            </div>
                        </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button 
                  onClick={handleCancel}
                  type="button" 
                  className="btn btn-outline-primary waves-effect" 
                  data-bs-dismiss="modal">Cancel</button>

                  { /*props.buttonType && props.buttonType === "new"
                    ?
                    <button 
                    onClick={(e)=>createCompanyRequest(e, props.apiBackendURL, props.tokens, props.tenantID)}
                    type="button" 
                    className="btn btn-primary waves-effect waves-light">Add Info</button>
                    :
                    <button 
                    onClick={(e)=>updateCompanyRequest(e, props.modalData.company_id, props.apiBackendURL, props.tokens, props.tenantID)}
                    type="button" 
  className="btn btn-primary waves-effect waves-light">Update Info</button>*/}
                </div>
              </div>
            </div>
          </div>

          

    </>

  );
};