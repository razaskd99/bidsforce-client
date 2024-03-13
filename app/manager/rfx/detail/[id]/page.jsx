'use server'
import { getOpportunityByID } from "@/app/api/opportunities/scripts";
import { getAllRfxStagesByRfxIdAction, getRfxContacts, GetRfxDocumentsAction } from "@/app/api/rfx/actions/rfx";
import { getAllReviewsRecordsBy_Rfx_Key_Action } from "@/app/api/manager/actions/reviews";
import { getRfxById } from "@/app/api/rfx/actions/rfx";
import { getUserById, getAllUsers } from "@/app/api/rfx/actions/user";
import BidDetail from "@/components/BidDetail";

import getConfig from 'next/config'
import { getAllRfxClarificationRecordsBy_RfxID_Action } from "@/app/api/manager/actions/clarifications";
import { getAllKoffMeetingAction } from "@/app/api/manager/actions/kickoff";
import { getAllDeliverablesAction } from "@/app/api/manager/actions/deliverables";
import { getRfxContactsByKey } from "@/app/api/rfx/actions/rfx";
import { getAllSubmissionAction } from "@/app/api/manager/actions/bidsubmission";
import { getAllBidClarificationRecordsBy_RfxID_Action } from "@/app/api/manager/actions/bidclarifications";
import { redirect } from 'next/navigation'
import { getAllBidOrderAction } from "@/app/api/manager/actions/bidorder";


const BDetail = async ({ params }) => {
    const { id } = params
      
    const { serverRuntimeConfig } = getConfig() || {};
    let accessToken = ''
    let apiBackendURL = ''
    let tenantID = 0
    let loginUserRec = {}
    let rfxID = '';
    let isLogin=false
    // get server side global store data
    if (serverRuntimeConfig) {
        // get api backend url
        apiBackendURL = serverRuntimeConfig.API_BACKEND_SERVER
        // get access token
        accessToken = serverRuntimeConfig.API_ACCESS_TOKEN_SERVER
        tenantID = serverRuntimeConfig.TENANT_ID
        // get login user obj
        loginUserRec = serverRuntimeConfig.LOGIN_USER_DATA
        if(!serverRuntimeConfig.RFX_ID) serverRuntimeConfig.RFX_ID = id
        rfxID = serverRuntimeConfig.RFX_ID 
        isLogin = serverRuntimeConfig.IS_LOGIN;
    }
    rfxID=id;

    if(!isLogin) redirect("/login")

    // call all  opportunity
    let records = await getOpportunityByID(apiBackendURL, accessToken, tenantID, rfxID)
    let opportunirtRec = records.rfxData;
    
    // call current Rfx
    records = await getRfxById(rfxID)
    let rfxRec = records.rfxData;
    
    records = await getAllRfxStagesByRfxIdAction(rfxID, 'bid stage')
    let stagesRec = records.returnData;
    
    records = await getRfxContacts(rfxID);
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

    records = await getAllReviewsRecordsBy_Rfx_Key_Action(rfxID, 'pre-lim review');
    let prelimReviewRec = records.returnData 
    
    records = await getAllReviewsRecordsBy_Rfx_Key_Action(rfxID, 'Detailed Review');
    let detailedReviewRec = records.returnData 

    records = await getAllReviewsRecordsBy_Rfx_Key_Action(rfxID, 'Final Review');
    let finalReviewRec = records.returnData 

    records = await getAllRfxClarificationRecordsBy_RfxID_Action(rfxID);
    let clarificationRec = records.returnData 

    records = await getAllKoffMeetingAction(rfxID)
    let koffRec = records.returnData

    records= await getAllDeliverablesAction(rfxID)
    let deliverablesRec = records.returnData

    records = await getRfxContactsByKey(rfxID, 'bid-team-' + rfxID)
    let bidteamRec = records.rfxData

    records = await getAllSubmissionAction(rfxID);
    let submissionRec = records.returnData

    records = await getAllBidClarificationRecordsBy_RfxID_Action(rfxRec.rfx_id)
    const bidClarifRec = records.returnData

    records = await GetRfxDocumentsAction(rfxID);
    let  docvalt = records.returnData  

    records = await getAllBidOrderAction(rfxRec.rfx_id)
    let bidOrderRec = records.returnData

    return (
        <div>
            <BidDetail data={opportunirtRec} rfxRecord={rfxRec} stagesList={stagesRec} tenantID={tenantID} apiBackendURL={apiBackendURL} keyContactsRec={keyContactsRec} assigntoRec={assigntoRec} initiatorRec={initiatorRec} allUsersRec={allUsersRec} docvaltRec={docvalt} login_user_id={loginUserRec.user_id} prelimReviewRec={prelimReviewRec} detailedReviewRec={detailedReviewRec} clarificationRec={clarificationRec} finalReviewRec={finalReviewRec} koffRec={koffRec} deliverablesRec={deliverablesRec} bidteamRec={bidteamRec} submissionRec={submissionRec} bidClarifRec={bidClarifRec} bidOrderRec={bidOrderRec} />
        </div>
    )
}

export default BDetail