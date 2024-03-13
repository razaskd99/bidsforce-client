'use client'
import React,{useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  createTeamRequest,
  updateTeamRequest
  } from "@/app/api/admin-panel/scripts";


export default function TeamInfoModal(props) {
    const[openModal, setOpenModal] = useState(true)  
    const [formData, setFormDate] = useState({
        m3_team_title: props.modalData && props.modalData.team_title ? props.modalData.team_title : "",
        m3_team_role: props.modalData && props.modalData.team_role ? props.modalData.team_role : "",
        m3_role_level: props.modalData && props.modalData.role_level ? props.modalData.role_level : "",
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
    props.setOpenTeamModal(false)
  }

  
  return (    
    <>
        <div class="modal fade show" id="modalCenter" tabindex="-1" aria-modal="true" role="dialog" style={{display: "block", opacity:1, background:'rgba(151,149,158,50%)'}}>
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content" id="modalFormComponent1">
                <div class="modal-header">
                  <h4 class="modal-title" id="modalCenterTitle">New Team</h4>
                  <button onClick={handleCancel} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modalFormComponentBody1">
                  <form id="modalform3">
                    <div class="row">
                      <div class="col mb-4 mt-2">
                        <div class="form-floating form-floating-outline">
                            <input type="text" onChange={handleChangeValues} id="m3_team_title" name="m3_team_title" value={formData.m3_team_title} class="form-control" placeholder="Enter Title" />
                            <label for="company_name">Title *</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col mb-4 mt-2">
                        <div class="form-floating form-floating-outline">
                          <select onChange={handleChangeValues} id="m3_team_role" name="m3_team_role" class="form-select">
                            <option>Select Role... *</option>
                            <option value="Administrator" selected={formData.m3_team_role === 'Administrator' ? true : false}>Administrator</option>
                            <option value="Bid Manager" selected={formData.m3_team_role === 'Bid Manager' ? true : false}>Bid Manager</option>
                            <option value="Front Sales" selected={formData.m3_team_role === 'Front Sales' ? true : false}>Front Sales</option>                            
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col mb-2 mt-2">
                        <div class="form-floating form-floating-outline">
                          <select onChange={handleChangeValues} id="m3_role_level" name="m3_role_level" class="form-select">
                            <option>Select Role Level... *</option>
                            <option value="0" selected={formData.m3_role_level === 0 ? true : false}>Level 0 - (View a bid)</option>
                            <option value="1" selected={formData.m3_role_level === 1 ? true : false}>Level 1 - (Make reviews on bids)</option>
                            <option value="2" selected={formData.m3_role_level === 2 ? true : false}>Level 2 - (Manage bids)</option>
                            <option value="3" selected={formData.m3_role_level === 3 ? true : false}>Level 3 - (Access All operations)</option>
                            <option value="4" selected={formData.m3_role_level === 4 ? true : false}>Level 4 - (details)</option>
                            <option value="5" selected={formData.m3_role_level === 5 ? true : false}>Level 5 - (details)</option>
                          </select>
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
                    onClick={createTeamRequest}
                    type="button" 
                    class="btn btn-primary waves-effect waves-light">Add Info</button>
                    :
                    <button 
                    onClick={(e)=>updateTeamRequest(e, props.modalData.team_id)}
                    type="button" 
                    class="btn btn-primary waves-effect waves-light">Update Info</button>}
                </div>
              </div>
            </div>
          </div>

          

    </>

  );
};