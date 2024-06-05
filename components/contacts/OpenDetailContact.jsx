'use client'
import Breadcrumbs from "@/components/Breadcrumbs";
import { hideMainLoader102 } from "@/app/api/util/utility";
import Image from "next/image";
import React,{useEffect, useState} from "react";
import {Edit, Grid, Plus, PlusIcon } from "lucide-react";
import NewContact from "@/components/contacts/NewContact";
import { updateUserBioAction, updateUserTagsAction } from "@/app/api/users/action/user";
import { Comment, List } from "@mui/icons-material";
import { TextField } from "@mui/material";


export default function OpenDetailContact( props ) {
    const {contactsRec} = props;
    const [contactsDetail, setContactsDetail] = useState(contactsRec)
    const [openContact, setOpenContact] = useState(false);
    const [bio, setBio] = useState(contactsRec?.bio ? contactsRec?.bio : '');
    const [updated, setUpdated] = useState(false);
    const [tags, setTags] = useState('');
    const [tagsList, setTagsList] = useState(
        contactsDetail.tags && contactsDetail.tags.includes(',') ? contactsDetail.tags.split(',') : []
    );
    
         
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
        { label: "Users", href: "/users"},
        { label: contactsDetail.first_name + ' ' + contactsDetail.last_name, href: "/users/detail/" + contactsDetail.user_id },    
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
    };


    const handleAddTags = async() => {
        if(tags) {
            let tagsArr = [];
            if(!tagsList.length && contactsDetail?.tags?.length) {
                tagsArr = contactsDetail?.tags.split(',')                   
            } else {
                tagsArr = tagsList;
            }        
            if(!tagsArr.includes(tags)){
                tagsArr.push(tags) 
            }
            let r1 = await updateUserTagsAction(tagsArr.join(','), contactsDetail.user_id);
            if(r1.statusCode == 200) {
                setTagsList(r1.returnData.tags.split(','))
                setTags('');
            }            
        }
    };


    const handleDeleteTags = async(tag) => {
        if(tag) {
            let tagsArr = [];
            if(!tagsList.length && contactsDetail?.tags?.length) {
                tagsArr = contactsDetail?.tags.split(',')                   
            } else {
                tagsArr = tagsList;
            }        
            //tagsArr.push(tags) 
            tagsArr = tagsArr.filter(item => item.toString() != tag);
            let r1 = await updateUserTagsAction(tagsArr.join(','), contactsDetail.user_id);
            if(r1.statusCode == 200) {
                setTagsList(r1.returnData.tags.split(','))
                setTags('');
            }            
        }
    }



      

    hideMainLoader102();
    return (
        <>  
            <div className="flex justify-between items-center">
                <div>
                    <Breadcrumbs items={breadcrumbItems} />
                </div>

                {props.userLoginID === contactsDetail.user_id && (
                    <p className="text-md text-[#26BADA] gap-1 mb-3 cursor-pointer flex items-center" onClick={handleClickOpen}>
                        <span className="mr-1">Edit User</span>
                        <span><Edit /></span>
                    </p>
                )}
            </div>
             
            <div className="flex flex-col md:flex-row gap-4 bg-[#E8ECEF] rounded-md bg-slate-100">
                
            <div className="w-1/4">
                <div className="bg-white px-5 py-5 mb-4">
                    <NewContact 
                        isOpen={openContact} 
                        handleClose={handleClose} 
                        contactsData={contactsRec} 
                        modalType={'edit'}
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
                    <p className="text-sm text-[#778CA2] mt-3">Time Zone</p> 
                    <p>{contactsDetail.time_zone}</p>
                    <p className="text-sm text-[#778CA2] mt-3">Email Address</p> 
                    <p>{contactsDetail.email}</p>
                    <p className="text-sm text-[#778CA2] mt-3">Work Hours</p> 
                    <p>{contactsDetail.work_hours_start}</p>
                </div>
                <div className="bg-white p-2">
                    <h1 className="text-lg py-3 ml-6">Stats</h1>
                    <div className="flex items-center justify-between border rounded-md border-gray-300 py-2 px-3 mx-4 mb-2">
                        <div className="my-2">
                        <div class="rounded-full h-12 w-12 flex items-center justify-center bg-orange-400 px-2 py-2 text-white text-sm">580</div>
                        </div>
                        <div className="">
                            <p className="text-gray-500">Hours Logged</p>
                            <p>580 in Last Month</p>        
                        </div>
                    </div>

                    <div className="flex items-center justify-between border rounded-md border-gray-300 py-2 px-3 mx-4 mb-2 ">
                        <div className="my-2">
                        <div class="rounded-full h-12 w-12 flex items-center justify-center bg-blue-400 px-2 py-2 text-white text-sm">85%</div>
                        </div>
                        <div className="">
                            <p className="text-gray-500">Tasks Completed</p>
                            <p>255 of 298 Last Month</p>        
                        </div>
                    </div>          
                </div>
            </div>
       
            <div className="rounde-md w-1/2">
                <>
                <div class="bg-white p-4">
                    <h2 className="text-lg">Recent Activity</h2>
                    {recentActivity.map((activity, index)=>(
                        <div key={index} className="text-[#778CA2] my-3"><span>{activity.type}</span> <span>{activity.date}</span> <span className="text-black">{activity.stage}</span> for <span>{activity.company}</span></div>
                    ))}
                </div>

                <div class="bg-white p-4 mt-4">
                    <h1 class="text-xl">Tasks</h1>
                    <div class="mt-4">

                        <div class="flex items-center justify-between py-3 border-b border-gray-200">
                            <div>
                                <input type="checkbox" class="mr-3 ml-3"/>
                                <span class="mr-3">Basis of Proposal</span>
                            </div>
                            <div class="flex items-center text-gray-400 mr-3">
                                <List className="text-md"/>
                                <span class="px-3">0/3</span> 
                                <Comment className="text-sm"/> 
                                <span className="px-3">4</span>
                            </div>
                        </div>                    

                        <div class="flex items-center justify-between py-3 border-b border-gray-200">
                            <div>
                                <input type="checkbox" checked={true} class="mr-3 ml-3"/>
                                <span class="mr-3">Bill of Material</span>
                            </div>
                            <div class="flex items-center text-gray-400 mr-3">
                                <List className="text-md"/>
                                <span class="px-3">0/3</span> 
                                <Comment className="text-sm"/> 
                                <span className="px-3">4</span>
                            </div>
                        </div>
                    

                        <div class="flex items-center justify-between py-3 border-b border-gray-200">
                            <div>
                                <input type="checkbox" class="mr-3 ml-3"/>
                                <span class="mr-3">Solution Engineering Activity</span>
                            </div>
                            <div class="flex items-center text-gray-400 mr-3">
                                    <List className="text-md"/>
                                    <span class="px-3">0/3</span> 
                                    <Comment className="text-sm"/> 
                                    <span className="px-3">4</span>
                                </div>
                        </div>
                   
                        <div class="flex items-center justify-between py-3 border-b border-gray-200">
                            <div>
                                <input type="checkbox" class="mr-3 ml-3"/>
                                <span class="mr-3">Supply Chain</span>
                            </div>
                            <div class="flex items-center text-gray-400 mr-3">
                                <List className="text-md"/>
                                <span class="px-3">0/3</span> 
                                <Comment className="text-sm"/> 
                                <span className="px-3">4</span>
                            </div>
                        </div>                   
                        
                    </div>
                </div>

                <div class="bg-white p-4 mt-4">
                    <h1 class="text-xl">Recent Bids</h1>
                    <div class="mt-4">

                    <div class="flex items-center justify-between py-3 border-b border-gray-200">
                        <div>
                            <input type="checkbox" class="mr-3 ml-3"/>
                            <span class="mr-3">DRP Refinery Automation</span>
                        </div>
                        <div class="flex items-center text-gray-400 mr-3">
                            <List className="text-md"/>
                            <span class="px-3">0/3</span> 
                            <Comment className="text-sm"/> 
                            <span className="px-3">4</span>
                        </div>
                    </div>
                    <hr/>

                    <div class="flex items-center justify-between py-3 border-b border-gray-200">
                        <div>
                            <input type="checkbox" class="mr-3 ml-3"/>
                            <span class="mr-3">Six Terminal DRX</span>
                        </div>
                        <div class="flex items-center text-gray-400 mr-3">
                            <List className="text-md"/>
                            <span class="px-3">0/3</span> 
                            <Comment className="text-sm"/> 
                            <span className="px-3">4</span>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between py-3 border-b border-gray-200">
                        <div>
                            <input type="checkbox" checked={true} class="mr-3 ml-3"/>
                            <span class="mr-3">Ring Gas Plant</span>
                        </div>
                        <div class="flex items-center text-gray-400 mr-3">
                            <List className="text-md"/>
                            <span class="px-3">0/3</span> 
                            <Comment className="text-sm"/> 
                            <span className="px-3">4</span>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between py-3 border-b border-gray-200">
                        <div>
                            <input type="checkbox" class="mr-3 ml-3"/>
                            <span class="mr-3">Southern Pipeline</span>
                        </div>
                        <div class="flex items-center text-gray-400 mr-3">
                            <List className="text-md"/>
                            <span class="px-3">0/3</span> 
                            <Comment className="text-sm"/> 
                            <span className="px-3">4</span>
                        </div>
                    </div>
                    

                        
                    </div>
                </div>
                <div className="bg-white p-4 mt-4">
                    <h2 className="text-xl mb-5">Files</h2>
                    
                        <div class="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1">
                            <img src="/diamond.png" alt=""  className="w-8 h-8" />
                                <span class="mr-3 ml-3">DRP System Architecture</span>
                            </div>
                            <div class="flex -space-x-4 rtl:space-x-reverse mr-2">
                                <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                <a class="flex items-center justify-center w-10 h-10 text-xs font-medium text-gray-500 bg-gray-200 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 ml-4" href="#">+2</a>
                                                            
                            </div>
                        </div>

                        <div class="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1">
                                <img src="/word.png" alt=""  className="w-8 h-8" />
                                <span class="mr-3 ml-3">Kick Off Minutes of Meeting.docx</span>
                            </div>
                            <div class="flex -space-x-4 rtl:space-x-reverse mr-2">
                                <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                <a class="flex items-center justify-center w-10 h-10 text-xs font-medium text-gray-500 bg-gray-200 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 ml-4" href="#">+2</a>
                                                            
                            </div>
                        </div>

                        <div class="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1">
                            <img src="/excel.png" alt=""  className="w-8 h-8" />
                                <span class="mr-3 ml-3">102435 Costing Estimate.xlsx</span>
                            </div>
                            <div class="flex -space-x-4 rtl:space-x-reverse mr-2">
                                <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                <a class="flex items-center justify-center w-10 h-10 text-xs font-medium text-gray-500 bg-gray-200 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 ml-4" href="#">+2</a>
                                                            
                            </div>
                        </div>
                    

                </div>


                </>
            </div>


            <div className="w-1/4">
            <>
                <div className="bg-white p-5">
                    <h1 className="text-xl">About</h1>
                    <h1 className="text-lg mt-4">Bio</h1>
                    <div className="flex flex-col">                    
                        {props.userLoginID != contactsDetail.user_id                          
                        ?
                         <p className="text-md text-gray-700">
                            {contactsDetail.bio ? contactsDetail.bio : 'No bio is added'}
                         </p>
                        :
                         <>
                            <textarea 
                                className="border border-gray-300 text-gray-400 rounded-sm p-2 resize-none"
                                rows="6" 
                                placeholder="Enter your bio..."
                                value={bio}
                                onChange={handleUpdateBio}
                            >{bio}</textarea>
                            {/* {updated && <p className="text-sm text-green-500 m-0">Bio Saving...</p>}                            */}
                         </>}
                    </div>     
                    <h1 className="text-xl mt-4 mb-4">Tags</h1>
                    <div className="inline-flex flex-wrap gap-2 ">                     
                        {tagsList.length || contactsDetail?.tags?.length
                        ?(
                            !tagsList.length 
                            ? 
                            contactsDetail?.tags.split(',').filter(tag => tag.trim() !== '').map(tag => (
                                <span class="bg-gray-100 text-blue-600 text-md font-small me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                    {tag}
                                    {props.userLoginID == contactsDetail.user_id 
                                     && <button 
                                        type="button" 
                                        class="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300" data-dismiss-target="#badge-dismiss-default" aria-label="Remove"
                                        onClick={()=>handleDeleteTags(tag)}
                                    >
                                        <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span class="sr-only">Remove badge</span>
                                    </button>}
                                </span>
                            ))
                            :
                            tagsList.filter(tag => tag.trim() !== '').map(tag => (
                                <span class="bg-gray-100 text-blue-600 text-md font-small me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                    {tag}
                                    {props.userLoginID == contactsDetail.user_id 
                                     && <button 
                                        type="button" 
                                        class="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300" data-dismiss-target="#badge-dismiss-default" aria-label="Remove"
                                        onClick={()=>handleDeleteTags(tag)}
                                    >
                                        <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span class="sr-only">Remove badge</span>
                                    </button>}
                                </span>
                            ))
                        ):
                         <p className="text-gray-500 text-center">No tags are added</p>
                        }  
                    </div>      
                    { props.userLoginID == contactsDetail.user_id && (
                    <div className="flex items-center w-full mt-3">
                    <input
                      type="text"
                      name="tags"
                      value={tags}
                      className="h-[40px] flex-grow mr-3 border border-gray-300 text-gray-800 rounded-sm bg-white"
                      onChange={(e) => setTags(e.target.value)}
                    />
                    <button
                      type="button"
                      className="w-[40px] h-[40px] flex-shrink-0 flex justify-center items-center bg-[#26BADA] text-white rounded-sm hover:bg-[#51C8E1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={handleAddTags}
                    >
                      <Plus />
                    </button>
                  </div>                  
                
                 )}    
                </div>
                
                <div className="bg-white p-4 mt-4">
                    <div className="flex items-center mt-5 pl-3"><span className="text-xl">Teams</span></div>
                        <div class="bg-white mt-5 border rounded-md border-gray-300 py-2 mx-3">
                            <h1 class="text-md font-light  text-gray-500 text-center my-2">Automation Bids Team</h1>
                            <div class="flex items-center justify-center">
                                <div class="flex -space-x-4 rtl:space-x-reverse mb-2">
                                    <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                    <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                    <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                    <a class="flex items-center justify-center w-10 h-10 text-xs font-medium text-gray-500 bg-gray-200 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 ml-4" href="#">+2</a>
                                </div>                                
                            </div>
                        </div>

                        <div class="bg-white mt-3 border rounded-md border-gray-300 py-2 mx-3">
                            <h1 class="text-md font-light text-gray-500 text-center my-2">Electrification Bids Team</h1>
                            <div class="flex items-center justify-center">
                                <div class="flex -space-x-4 rtl:space-x-reverse mb-2">
                                    <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                    <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                    <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                    <a class="flex items-center justify-center w-10 h-10 text-xs font-medium text-gray-500 bg-gray-200 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 ml-4" href="#">+2</a>
                                </div>                    
                            </div>
                        </div>

                        <div class="bg-white mt-3 border rounded-md border-gray-300 py-2 mx-3 pb-3">
                            <h1 class="text-md font-light text-gray-500 text-center my-2">Solution Bids Team</h1>
                            <div class="flex items-center justify-center">
                                <div class="flex -space-x-4 rtl:space-x-reverse mb-2">
                                    <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                    <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                    <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/ravi.png" alt=""/>
                                    <a class="flex items-center justify-center w-10 h-10 text-xs font-medium text-gray-500 bg-gray-200 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 ml-4" href="#">+2</a>
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
