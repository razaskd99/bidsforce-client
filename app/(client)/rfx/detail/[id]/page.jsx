import { getOpportunityByID } from "@/app/api/opportunities/scripts";
import { getAllRfxStagesByRfxIdAction, getRfxContacts } from "@/app/api/rfx/actions/rfx";
import { getRfxById } from "@/app/api/rfx/actions/rfx";
import { getUserById, getAllUsers } from "@/app/api/rfx/actions/user";
import { getAllRfxClarificationRecordsBy_RfxID_Action } from "@/app/api/manager/actions/clarifications";
import RfxDetail from "@/components/RfxDetail"
import { getAllSubmissionAction } from "@/app/api/manager/actions/bidsubmission";
import { getAllBidClarificationRecordsBy_RfxID_Action } from "@/app/api/manager/actions/bidclarifications";
import { getAllBidOrderAction } from "@/app/api/manager/actions/bidorder";
import { getToken } from "@/app/api/util/script";


// start for login check
import getConfig from "next/config";
import { redirect } from "next/navigation";
let isLogin = false;
// end for login check


const Detail = async ({ params }) => {
    const { id } = params

    // get env variables
    const { serverRuntimeConfig } = getConfig() || {};
    let apiBackendURL = ''
    let username = ''
    let password = ''
    let tenantID = 0
    let loginUserRec = {}

    if (serverRuntimeConfig) {
        apiBackendURL = serverRuntimeConfig.API_BACKEND_SERVER
        username = serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.user
        password = serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.pass
        tenantID = serverRuntimeConfig?.TENANT_ID
        isLogin = serverRuntimeConfig?.IS_LOGIN
        loginUserRec = serverRuntimeConfig.LOGIN_USER_DATA
    }

    // get token
    let res = await getToken(apiBackendURL, username, password)
    let tokens = res?.tokenData?.access_token

    
    // call all  opportunity
    let records = await getOpportunityByID(apiBackendURL, tokens, tenantID, id)
    let opportunirtRec = records.rfxData;

    // call current Rfx
    records = await getRfxById(id)
    let rfxRec = records.rfxData;
    
    records = await getAllRfxStagesByRfxIdAction(id, 'rfx stage')
    let stagesRec = records.returnData;
    
    records = await getRfxContacts(id);
    let  contactsRec = records.rfxData
    
    let  keyContactsRec = []  
    for (const item of contactsRec) {
        try {
            const apiData = await getUserById(item.contact_user_id);
            const updatedObject = {...apiData.data, contact_key: item.conatct_key};
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

    return (
        <div>
            <RfxDetail login_user_id={loginUserRec.user_id} data={opportunirtRec} rfxRecord={rfxRec} stagesList={stagesRec} tenantID={tenantID} apiBackendURL={apiBackendURL} keyContactsRec={keyContactsRec} assigntoRec={assigntoRec} initiatorRec={initiatorRec} allUsersRec={allUsersRec} clarificationRec={clarificationRec} submissionRec={submissionRec} bidClarifRec={bidClarifRec} bidOrderRec={bidOrderRec}/>
        </div>
    )
}

export default Detail