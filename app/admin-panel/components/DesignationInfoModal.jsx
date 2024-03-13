'use client'
import React,{useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  createDesignationRequest,
  updateDesignationRequest
  } from "@/app/api/admin-panel/scripts";


export default function DesignationInfoModal(props) {
    const[openModal, setOpenModal] = useState(true)  
    const [formData, setFormDate] = useState({
        m2_title: props.modalData && props.modalData.title ? props.modalData.title : "",
        m2_type: props.modalData && props.modalData.type ? props.modalData.type : "",
        m2_description: props.modalData && props.modalData.description ? props.modalData.description : ""       
    });
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
               

      } catch (error) {
        console.error('Error fetching data:', error);
      }      
    };

    fetchData(); // Call the async function inside useEffect

    
    return () => {
      // Clean up any effects if needed on unmount
    };
  }, []); 


  const handleChangeValues = (e)=>{
    let data = {...formData, [e.target.name]: e.target.value}
    setFormDate({...data});   
  }

  const handleCancel = (e)=>{
    setOpenModal(false);
    props.setOpenDesignationModal(false)
  }

  
  return (    
    <>
        <div class="modal fade show" id="modalCenter" tabindex="-1" aria-modal="true" role="dialog" style={{display: "block", opacity:1, background:'rgba(151,149,158,50%)'}}>
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content" id="modalFormComponent1">
                <div class="modal-header">
                  <h4 class="modal-title" id="modalCenterTitle">Designation Details</h4>
                  <button onClick={handleCancel} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modalFormComponentBody1">
                  <form id="modalform2">
                    <div class="row">
                      <div class="col mb-4 mt-2">
                        <div class="form-floating form-floating-outline">
                            <input type="text" onChange={handleChangeValues} id="m2_title" name="m2_title" value={formData.m2_title} class="form-control" placeholder="Enter Title" />
                            <label for="company_name">Title *</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col mb-4 mt-2">
                        <div class="form-floating form-floating-outline">
                            <input type="text" onChange={handleChangeValues} id="m2_type" name="m2_type" value={formData.m2_type} class="form-control" placeholder="Enter Type" />
                            <label for="company_name">Type *</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col mb-4 mt-2">
                          <textarea onChange={handleChangeValues} class="form-control" id="m2_description" name="m2_description" rows={4} placeholder="Enter Description">{formData.m2_description}</textarea>
                      </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-12">
                            <div id="modalErrorMessageAlert" class="alert alert-danger mt-4" style={{display:"none"}} role="alert">
                                Invalid data.
                            </div>
                            <div id="modalSuccessMessageAlert" class="alert alert-success mt-4" style={{display:"none"}} role="alert">
                                Operation successful.
                            </div>
                        </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button 
                  onClick={handleCancel}
                  type="button" 
                  class="btn btn-outline-primary waves-effect" 
                  data-bs-dismiss="modal">Cancel</button>

                  { props.buttonType && props.buttonType === "new" 
                    ?
                    <button 
                    onClick={createDesignationRequest}
                    type="button" 
                    class="btn btn-primary waves-effect waves-light">Add Info</button>
                    :
                    <button 
                    onClick={(e)=>updateDesignationRequest(e, props.modalData.designation_id)}
                    type="button" 
                    class="btn btn-primary waves-effect waves-light">Update Info</button>}
                </div>
              </div>
            </div>
          </div>

          

    </>

  );
};