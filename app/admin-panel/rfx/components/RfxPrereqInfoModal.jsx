'use client'
import React,{useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  createRfxPrereqRequest,
  updateRfxPrereqRequest  
} from "@/app/api/admin-panel/scripts";


export default function RfxPrereqInfoModal(props) {
    const[openModal, setOpenModal] = useState(true)  
    const [formData, setFormDate] = useState({
        m4_title: props.modalData && props.modalData.title ? props.modalData.title : "",
        m4_is_active: props.modalData && props.modalData.is_active ? true : false,
        m4_alias: props.modalData && props.modalData.alias ? props.modalData.alias : ""       
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
    props.setOpenRfxPrereqModal(false)
  }

  
  return (    
    <>
        <div class="modal fade show" id="modalCenter" tabindex="-1" aria-modal="true" role="dialog" style={{display: "block", opacity:1, background:'rgba(151,149,158,50%)'}}>
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content" id="modalFormComponent1">
                <div class="modal-header">
                  <h4 class="modal-title text-capitalize" id="modalCenterTitle">{props.tablename.replace('_',' ').replace('_',' ')} Details</h4>
                  <button onClick={handleCancel} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modalFormComponentBody1">
                  <form id="modalform4">
                    <div class="row">
                      <div class="col mb-4 mt-2">
                        <div class="form-floating form-floating-outline">
                            <input type="text" onChange={handleChangeValues} id="m4_title" name="m4_title" value={formData.m4_title} class="form-control" placeholder="Enter Title" />
                            <label for="m4_title">Title *</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col mb-4 mt-2">
                        <div class="form-floating form-floating-outline">
                        <select onChange={handleChangeValues} id="m4_is_active" name="m4_is_active" class="form-select">
                            <option>Select Status... *</option>
                            <option value="Active" selected={formData.m4_is_active ? true : false}>Active</option>
                            <option value="Inactive" selected={formData.m4_is_active ? true : false}>Inactive</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col mb-4 mt-2">
                          <div class="form-floating form-floating-outline">
                              <input type="text" onChange={handleChangeValues} id="m4_alias" name="m4_alias" value={formData.m4_alias} class="form-control" placeholder="Enter Title" />
                              <label for="m4_alias">Alias</label>
                          </div>
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
                    onClick={(e)=>createRfxPrereqRequest(e, props.tablename)}
                    type="button" 
                    class="btn btn-primary waves-effect waves-light">Add Info</button>
                    :
                    <button 
                    onClick={(e)=>updateRfxPrereqRequest(e, props.tablename, props.id)}
                    type="button" 
                    class="btn btn-primary waves-effect waves-light">Update Info</button>}
                </div>
              </div>
            </div>
          </div>

          

    </>

  );
};