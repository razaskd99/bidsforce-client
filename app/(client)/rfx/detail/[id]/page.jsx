//import { getOpportunityByID } from "@/app/api/opportunities/scripts";
import { getAllRfxStagesByRfxIdAction, getRfxContacts } from "@/app/api/rfx/actions/rfx";
import { getRfxById } from "@/app/api/rfx/actions/rfx";
import { getUserById, getAllUsers } from "@/app/api/rfx/actions/user";
import { getAllRfxClarificationRecordsBy_RfxID_Action } from "@/app/api/manager/actions/clarifications";
import RfxDetail from "@/components/RfxDetail"
import { getAllSubmissionAction } from "@/app/api/manager/actions/bidsubmission";
import { getAllBidClarificationRecordsBy_RfxID_Action } from "@/app/api/manager/actions/bidclarifications";
import { getAllBidOrderAction } from "@/app/api/manager/actions/bidorder";
import getConfig from "next/config";

// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
import { getPrimaryContactsByIDAction } from "@/app/api/contacts/actions/contacts";
// end login init 

const Detail = async ({ params }) => {
    const { id } = params

    let userEncrptedData = await getCookieValue('userPrivateData')
    let tenant_ID = await getCookieValue('TENANT_ID')
    let userLoginData = await getCookieValue('userLoginData')
    
    // get env variables
    let apiBackendURL = API_BACKEND_SERVER
    let username = userEncrptedData.user
    let password = userEncrptedData.pass
    let tenantID = tenant_ID

    // get token
    let res = await getToken(apiBackendURL, username, password)
    let tokens = res?.tokenData?.access_token
 
    // call all  opportunity
    //let records = await getOpportunityByID(apiBackendURL, tokens, tenantID, id)
    let opportunirtRec = []//records.rfxData;

    // call current Rfx
    records = await getRfxById(id)
    let rfxRec = records.rfxData;
    
    records = await getAllRfxStagesByRfxIdAction(id, 'rfxstage')
    let stagesRec = records.returnData;
    
    records = await getRfxContacts(id);
    let  contactsRec = records.rfxData
    
    let  keyContactsRec = []  
    for (const item of contactsRec) {
        try {
            const apiData = await getPrimaryContactsByIDAction(item.contact_user_id);
            const updatedObject = {...apiData.returnData, contact_key: item.conatct_key, persona_role: item.persona_role};
            keyContactsRec.push(updatedObject);
        } catch (error) {
            console.error(`Error fetching data for object with id ${item.contact_user_id}`, error);
        }
    }

    
    let assigntoRec = {}
    if(rfxRec.rfx_bid_assignto > 0) {
        records = await getUserById(rfxRec.rfx_bid_assignto);
        assigntoRec = records.data;
    }
    
    let initiatorRec = {}
    if(rfxRec.initiator_id > 0) {
        records = await getUserById(rfxRec.initiator_id);
        initiatorRec = records.data;
    }
   
    records = await getAllUsers();
    let allUsersRec = records.data

    records = await getAllRfxClarificationRecordsBy_RfxID_Action(rfxRec.rfx_id);
    let clarificationRec = records.returnData 

    records = await getAllSubmissionAction(rfxRec.rfx_id);
    let submissionRec = records.returnData

    records = await getAllBidClarificationRecordsBy_RfxID_Action(rfxRec.rfx_id)
    const bidClarifRec = records.returnData

    records = await getAllBidOrderAction(rfxRec.rfx_id)
    let bidOrderRec = records.returnData

    // check user is login
    let isLogin = await getCookieValue('loginStatus')
    if (isLogin == true || isLogin == 'true') {
    }
    else {
        { redirect("/login") }
    }
    
    return (
        <div>
            <RfxDetail login_user_id={userLoginData.user_id} data={opportunirtRec} rfxRecord={rfxRec} stagesList={stagesRec} tenantID={tenantID} apiBackendURL={apiBackendURL} keyContactsRec={keyContactsRec} assigntoRec={assigntoRec} initiatorRec={initiatorRec} allUsersRec={allUsersRec} clarificationRec={clarificationRec} submissionRec={submissionRec} bidClarifRec={bidClarifRec} bidOrderRec={bidOrderRec}/>
        </div>
    )
}

export default Detail