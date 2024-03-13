'use client'
import React,{useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";

import { 
  createPhaseStageRequest,
  updatePhaseStageRequest 
} from "@/app/api/admin-panel/scripts";

export default function PhaseStagesInfoModal(props) {
    const[openModal, setOpenModal] = useState(true)  
    const [formData, setFormDate] = useState({
        m1_default_name: props.modalData && props.modalData.default_name ? props.modalData.default_name : "",
        m1_new_name: props.modalData && props.modalData.new_name ? props.modalData.new_name : "",
        m1_type: props.typeName,
        m1_display_order: props.modalData && props.modalData.display_order ? props.modalData.display_order : 1,       
        m1_score: props.modalData && props.modalData.score ? props.modalData.score : 0, 
        m1_status: "" ,     
        m1_required: props.modalData && props.modalData.required == true ? true : true,        
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

  const handleChangeCheckbox = e =>{
    let data = {...formData, m1_required: e.target.checked}
    setFormDate({...data});   
  }

  const handleCancel = (e)=>{
    setOpenModal(false);
    props.setOpenPhaseStageModal(false)
  }

  
  return (    
    <>
        <div class="modal fade show" id="modalCenter" tabindex="-1" aria-modal="true" role="dialog" style={{display: "block", opacity:1, background:'rgba(151,149,158,50%)'}}>
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content" id="modalFormComponent1">
                <div class="modal-header">
                  <h4 class="modal-title text-capitalize" id="modalCenterTitle">Bid Stages Detail </h4>
                  <button onClick={handleCancel} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modalFormComponentBody1">
                  <form id="modalform1">
                    <div class="row">
                      <div class="col mb-4 mt-2">
                        <div class="form-floating form-floating-outline">
                            <input type="text" onChange={handleChangeValues} id="m1_default_name" name="m1_default_name" value={formData.m1_default_name} class="form-control" placeholder="Name" />
                            <label for="m1_default_name">Name *</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col mb-4 mt-2">
                        <div class="form-floating form-floating-outline">
                            <input type="text" onChange={handleChangeValues} id="m1_new_name" name="m1_new_name" value={formData.m1_new_name} class="form-control" placeholder="Display As" />
                            <label for="m1_new_name">Display As</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col mb-4 mt-2">
                        <div class="form-floating form-floating-outline">
                            <input type="number" onChange={handleChangeValues} id="m1_display_order" name="m1_display_order" value={formData.m1_display_order} class="form-control" placeholder="0" />
                            <label for="m1_display_order">Order</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col mb-4 mt-2">
                        <div class="form-floating form-floating-outline">
                            <input type="number" onChange={handleChangeValues} id="m1_score" name="m1_score" value={formData.m1_score} class="form-control" placeholder="0%" />
                            <label for="m1_score">Score %</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col mb-4 mt-2">                                                
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" onChange={handleChangeCheckbox} class="sr-only peer" id="m1_required" name="m1_required" checked={formData.m1_required} />
                          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#529af1]"></div>
                          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enable/Disable</span>
                        </label>
                      </div>
                      {/*<div class="col mb-4 mt-2">
                        <div class="form-floating form-floating-outline">
                        <select onChange={handleChangeValues} id="m1_status" name="m1_status" class="form-select">
                            <option>Status</option>
                            <option value="Active" selected={formData.status == 'Active' ? true : false}>Active</option>
                            <option value="Inactive" selected={formData.status == 'Inactive' ? true : false}>Inactive</option>
                          </select>
                        </div>
  </div>*/}
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
                  data-bs-dismiss="modal">Cancel </button>

                  { props.buttonType && props.buttonType === "new" 
                    ?
                    <button 
                    onClick={(e)=>createPhaseStageRequest(e, props.typeName)}
                    type="button" 
                    class="btn btn-primary waves-effect waves-light">Add Info</button>
                    :
                    <button 
                    onClick={(e)=>updatePhaseStageRequest(e, props.typeName, props.id)}
                    type="button" 
                    class="btn btn-primary waves-effect waves-light">Update Info</button>}
                </div>
              </div>
            </div>
          </div>

          

    </>

  );
};