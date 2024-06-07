'use client'
import Breadcrumbs from "@/components/Breadcrumbs";
import { hideMainLoader102 } from "@/app/api/util/utility";
import Image from "next/image";
import React,{useEffect, useState} from "react";
import { ChefHatIcon, Edit, Edit2Icon, ListIcon } from "lucide-react";
import UserInfoModal from "./UserInfoModal";
import { Checkbox, Typography } from "@mui/material";
import { Comment, List } from "@mui/icons-material";
import { updateUserBioAction } from "@/app/api/users/action/user";

export default function AdminUserDetail( props ) {
    const {contactsRec, tenantDetails, functionalGroupRec} = props;
    const [contactsDetail, setContactsDetail] = useState(contactsRec)
    const [openContact, setOpenContact] = useState(false);
    const [bio, setBio] = useState(contactsRec?.bio ? contactsRec?.bio : '');
    const [updated, setUpdated] = useState(false);
    
         
    
    const recentActivity = [
      {stage: "Cost estimation",date: "28 February",type: "meeting",company: "DRP Refinery"},
      { stage: "System Architecture", date: "1 March", type: "meeting", company: "DRP Refinery"},
      { stage: "Bid Kick-Off Meeting", date: "2 March", type: "meeting", company: null},
      { stage: "Marked Tasks Done", date: "8 March", type: "meeting",company: "DRP Refinery"},
      { stage: "New incoming request", date: "13 March", type: "meeting", company: null},
      { stage: "Bid completed", date: "16 March", stype: "meeting", company: "DRP Refinery"},
      { stage: "Marked Tasks Done", date: "20 March", type: "meeting", company: null}
  ];
    
  const breadcrumbItems = [
    { label: "Users", href: "/admin-panel/users"},
    { label: contactsDetail.first_name + ' ' + contactsDetail.last_name, href: "/admin-panel/users/detail/" + contactsDetail.user_id },
    
  ];
  
  
  const handleClickOpen = () => {
      setOpenContact(true);
  };

  const handleClose = () => {
      setOpenContact(false);
  };
  

  const handleUpdateBio = async(e) => {
    setBio(e.target.value);
    let r1 = await updateUserBioAction(e.target.value, contactsDetail.user_id);
    if(r1.statusCode == 200) {                
        setUpdated(true);
        setTimeout(() => {
            setUpdated(false);
        }, 1000);
    }
  }


    hideMainLoader102();
    return (
        <>  
            
            <div className="flex justify-between items-center">
                <div>
                    <Breadcrumbs items={breadcrumbItems} />
                </div>
                    <p className="text-md text-[#26BADA] gap-1 mb-3 cursor-pointer flex items-center" onClick={handleClickOpen}>
                        <span className="mr-1">Edit User</span>
                        <span><Edit /></span>
                    </p>                
                </div>         
                         
            <div className="flex flex-col md:flex-row gap-4 bg-[#E8ECEF] rounded-md bg-slate-100">
                
            <div className="w-1/4">
                <div className="bg-white px-5 py-5 mb-4">
                
                
                <UserInfoModal 
                    isOpen={openContact} 
                    handleClose={handleClose} 
                    modalData={contactsRec}
                    tenantDetails ={tenantDetails} 
                    modalType={'edit'}
                    functionaGroupRecs={functionalGroupRec}
                />

                <img src={contactsDetail.profile_image ? contactsDetail.profile_image : '/avatar.png'} alt="man" width={120} height={120} className="rounded-full" />
                <p className="text-xl">{contactsDetail.first_name + ' ' + contactsDetail.last_name}</p>
                <p className="text-[#778CA2]">{contactsDetail.job_title}</p>
                <p className="text-sm text-[#778CA2] mt-3">Manager</p>
                <p>{contactsDetail.manager}</p>
                <p className="text-sm text-[#778CA2] mt-3">Functional Group</p>
                <p>{contactsDetail.functional_group}</p>
                <p className="text-sm text-[#778CA2] mt-3">Contact #</p> 
                <p>{contactsDetail.contact_number}</p>
                <p className="text-sm text-[#778CA2] mt-3">Work Location</p> 
                <p>{contactsDetail.work_location}</p>
                {contactsDetail.state && <p className="text-sm text-[#778CA2] mt-3">State</p> }
                {contactsDetail.state && <p>{contactsDetail.state}</p>}
                {contactsDetail.city && <p className="text-sm text-[#778CA2] mt-3">City</p> }
                {contactsDetail.city && <p>{contactsDetail.city}</p>}
                <p className="text-sm text-[#778CA2] mt-3">Time Zone</p> 
                <p>{contactsDetail.time_zone}</p>
                <p className="text-sm text-[#778CA2] mt-3">Email Address</p> 
                <p>{contactsDetail.email}</p>
                <p className="text-sm text-[#778CA2] mt-3">Work Hours</p> 
                <p>{contactsDetail.work_hours_start}</p>
                </div> 

                <div className="bg-white p-2">
                    <h1 className="text-lg py-3 ml-6">Stats</h1>
                    <div className="flex items-center justify-between border rounded-md border-gray-300 py-2 px-1 mx-1 mb-2">
                        <div className="my-2 mx-1">
                        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-400 px-2 py-2 text-white text-sm">580</div>
                        </div>
                        <div className="ml-2 mr-1">
                            <p className="text-gray-500 text-sm">Hours Logged</p>
                            <p className="text-sm">580 in Last Month</p>        
                        </div>
                    </div>

                    <div className="flex items-center justify-between border rounded-md border-gray-300 py-2 px-1 mx-1 mb-2 ">
                        <div className="my-2 mx-1">
                        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-400 px-2 py-2 text-white text-sm">85%</div>
                        </div>
                        <div className="ml-2 mr-1">
                            <p className="text-gray-500 text-sm">Tasks Completed</p>
                            <p className="text-sm">255 of 298 Last Month</p>        
                        </div>
                    </div>          
                </div>
            </div>     
            

        

            <div className="rounde-md w-1/2">
                <>
                <div className="bg-white p-4">
                    <h2 className="text-xl">Recent Activity</h2>
                    {recentActivity.map((activity, index)=>(
                        <div key={index} className="text-[#778CA2] my-3"><span>{activity.type}</span> <span>{activity.date}</span> <span className="text-black">{activity.stage}</span> for <span>{activity.company}</span></div>
                    ))}
                </div>

                <div className="bg-white p-4 mt-4">
                    <h1 className="text-xl">Tasks</h1>
                    <div className="mt-4">

                        <div className="flex items-center justify-between py-3 border-b border-gray-200">
                            <div>
                                <input type="checkbox" className="mr-3 ml-3"/>
                                <span className="mr-3">Basis of Proposal</span>
                            </div>
                            <div className="flex items-center text-gray-400 mr-3">
                                <List className="text-md"/>
                                <span className="px-3">0/3</span> 
                                <Comment className="text-sm"/> 
                                <span className="px-3">4</span>
                            </div>
                        </div>                    

                        <div className="flex items-center justify-between py-3 border-b border-gray-200">
                            <div>
                                <input type="checkbox" checked={true} className="mr-3 ml-3"/>
                                <span className="mr-3">Bill of Material</span>
                            </div>
                            <div className="flex items-center text-gray-400 mr-3">
                                <List className="text-md"/>
                                <span className="px-3">0/3</span> 
                                <Comment className="text-sm"/> 
                                <span className="px-3">4</span>
                            </div>
                        </div>
                    

                        <div className="flex items-center justify-between py-3 border-b border-gray-200">
                            <div>
                                <input type="checkbox" className="mr-3 ml-3"/>
                                <span className="mr-3">Solution Engineering Activity</span>
                            </div>
                            <div className="flex items-center text-gray-400 mr-3">
                                    <List className="text-md"/>
                                    <span className="px-3">0/3</span> 
                                    <Comment className="text-sm"/> 
                                    <span className="px-3">4</span>
                                </div>
                        </div>
                   
                        <div className="flex items-center justify-between py-3 border-b border-gray-200">
                            <div>
                                <input type="checkbox" className="mr-3 ml-3"/>
                                <span className="mr-3">Supply Chain</span>
                            </div>
                            <div className="flex items-center text-gray-400 mr-3">
                                <List className="text-md"/>
                                <span className="px-3">0/3</span> 
                                <Comment className="text-sm"/> 
                                <span className="px-3">4</span>
                            </div>
                        </div>                   
                        
                    </div>
                </div>

                <div className="bg-white p-4 mt-4">
                    <h1 className="text-xl">Recent Bids</h1>
                    <div className="mt-4">

                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <div>
                            <input type="checkbox" className="mr-3 ml-3"/>
                            <span className="mr-3">DRP Refinery Automation</span>
                        </div>
                        <div className="flex items-center text-gray-400 mr-3">
                            <List className="text-md"/>
                            <span className="px-3">0/3</span> 
                            <Comment className="text-sm"/> 
                            <span className="px-3">4</span>
                        </div>
                    </div>
                    <hr/>

                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <div>
                            <input type="checkbox" className="mr-3 ml-3"/>
                            <span className="mr-3">Six Terminal DRX</span>
                        </div>
                        <div className="flex items-center text-gray-400 mr-3">
                            <List className="text-md"/>
                            <span className="px-3">0/3</span> 
                            <Comment className="text-sm"/> 
                            <span className="px-3">4</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <div>
                            <input type="checkbox" checked={true} className="mr-3 ml-3"/>
                            <span className="mr-3">Ring Gas Plant</span>
                        </div>
                        <div className="flex items-center text-gray-400 mr-3">
                            <List className="text-md"/>
                            <span className="px-3">0/3</span> 
                            <Comment className="text-sm"/> 
                            <span className="px-3">4</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <div>
                            <input type="checkbox" className="mr-3 ml-3"/>
                            <span className="mr-3">Southern Pipeline</span>
                        </div>
                        <div className="flex items-center text-gray-400 mr-3">
                            <List className="text-md"/>
                            <span className="px-3">0/3</span> 
                            <Comment className="text-sm"/> 
                            <span className="px-3">4</span>
                        </div>
                    </div>
                    

                        
                    </div>
                </div>
                <div className="bg-white p-4 mt-4">
                    <h2 className="text-xl mb-5">Files</h2>
                    
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1">
                            <img src="/diamond.png" alt=""  className="w-8 h-8" />
                                <span className="mr-3 ml-3">DRP System Architecture</span>
                            </div>
                            <div className="flex -space-x-4 rtl:space-x-reverse mr-2">
                                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-gray-500 bg-gray-200 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 ml-4" href="#">+2</a>
                                                            
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1">
                                <img src="/word.png" alt=""  className="w-8 h-8" />
                                <span className="mr-3 ml-3">Kick Off Minutes of Meeting.docx</span>
                            </div>
                            <div className="flex -space-x-4 rtl:space-x-reverse mr-2">
                                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-gray-500 bg-gray-200 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 ml-4" href="#">+2</a>
                                                            
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1">
                            <img src="/excel.png" alt=""  className="w-8 h-8" />
                                <span className="mr-3 ml-3">102435 Costing Estimate.xlsx</span>
                            </div>
                            <div className="flex -space-x-4 rtl:space-x-reverse mr-2">
                                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-gray-500 bg-gray-200 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 ml-4" href="#">+2</a>
                                                            
                            </div>
                        </div>
                    

                </div>


                </>
            </div>


            <div className="w-1/4">
            <>
                <div className="bg-white px-3 py-3">
                    <h1 className="text-xl">About</h1> 
                    <h1 className="text-lg mt-3">Bio</h1>
                    <div className="flex flex-col">                    
                        {                        
                         <>
                            {/*<textarea 
                                className="border border-gray-300 text-gray-400 rounded-sm p-2 resize-none"
                                rows="6" 
                                placeholder="Enter bio..."
                                value={bio}
                                onChange={handleUpdateBio}
                            >{bio}</textarea>*/}
                            {/* {updated && <p className="text-sm text-green-500 m-0">Bio Saving...</p>} */}
                            <p className="text-gray-500 rounded-md resize-none">
                                {bio ? bio : 'No bio is provided.'}
                            </p>
                         </>
                        }
                    </div>     
                    <h1 className="text-lg mt-4 mb-3">Tags</h1>
                    <div className="inline-flex flex-wrap gap-2 "> 
                        {/*<textarea 
                            className="border border-gray-300 text-gray-400 rounded-sm p-2 resize-none"
                            rows="3"  
                        >Add tags</textarea>*/}
                        {contactsDetail?.tags?.length
                        ?
                        contactsDetail?.tags.split(',').filter(tag => tag.trim() !== '').map(tag => (
                            <span class="bg-gray-100 text-blue-600 text-md font-small me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                {tag}                                
                            </span>
                        ))
                        :
                        <p className="text-gray-500 text-center">No tags are added</p>}
                    </div>           
                </div>
                
                <div className="bg-white p-4 mt-4">
                    <div className="flex items-center mt-2 pl-3"><span className="text-xl">Teams</span></div>
                        <div className="bg-white mt-3 border rounded-lg border-gray-300 py-1">
                            <h1 className="text-md font-light text-gray-500 text-center my-2 mx-2">Automation Bids Team</h1>
                            <div className="flex items-center justify-center">
                                <div className="flex -space-x-4 rtl:space-x-reverse mb-2">
                                    <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                    <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                    <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                    <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-gray-500 bg-gray-200 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 ml-4" href="#">+2</a>
                                </div>                                
                            </div>
                        </div>

                        <div className="bg-white mt-2 border rounded-lg border-gray-300 py-1">
                            <h1 className="text-md font-light text-gray-500 text-center my-2 mx-2">Electrification Bids Team</h1>
                            <div className="flex items-center justify-center">
                                <div className="flex -space-x-4 rtl:space-x-reverse mb-2">
                                    <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                    <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                    <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                    <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-gray-500 bg-gray-200 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 ml-4" href="#">+2</a>
                                </div>                    
                            </div>
                        </div>

                        <div className="bg-white mt-2 border rounded-lg border-gray-300 py-1">
                            <h1 className="text-md font-light text-gray-500 text-center my-2 mx-2">Solution Bids Team</h1>
                            <div className="flex items-center justify-center">
                                <div className="flex -space-x-4 rtl:space-x-reverse mb-2">
                                    <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                    <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                    <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                    <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-gray-500 bg-gray-200 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 ml-4" href="#">+2</a>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </>                
            </div>            
        </div>
        </>
    )
}
