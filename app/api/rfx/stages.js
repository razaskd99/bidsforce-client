'use server'

// required to access cookies
import { getApiPrereqVars } from "../util/action/apiCallPrereq";


// get all stages detail for Rfx
export const getRfxStagesDetailByRfxIdAction = async (rfxID, typeName='rfxstage') => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    try {
      const url = `${apiBackendURL}phase_stages_detail/phase_stages_detail/rfx/${rfxID}/type/${typeName}`;
 
      const response = await fetch(url, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${tokens}`,
        },
        redirect: "follow",
      });
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || "Request failed for Rfx Stages",
        };
      }
  
      const result = await response.json();
  
      return {
        statusCode: 200,
        returnData: result,
      };
    } catch (error) {
      return {
        statusCode: "400",
        returnData: [],
        error: error.message || "Request failed for Rfx Stages",
      };
    }
  };
 
  
// get stages detail by ID
export const getRfxStageDetailByIdAction = async (stage_detail_id) => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    try {
      const url = `${apiBackendURL}phase_stages_detail/phase_stages_detail/id/${stage_detail_id}`;
  
      const response = await fetch(url, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${tokens}`,
        },
        redirect: "follow",
      });
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: {},
          error: response.statusText || "Request failed for Rfx Stages",
        };
      }
  
      const result = await response.json();
  
      return {
        statusCode: 200,
        returnData: result,
      };
    } catch (error) {
      return {
        statusCode: "400",
        returnData: {},
        error: error.message || "Request failed for Rfx Stages",
      };
    }
  };

  

// update stage detail by ID
export const updateStageDetailAction = async (stage_detail_id, stage_status, stage_score, completed=true) => {
  const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
  const apiUrl = `${apiBackendURL}phase_stages_detail/phase_stages_detail/id/${stage_detail_id}`;

    const now = new Date();
    const formattedTimestamp = now.toISOString()
    const formatedDate = now.toISOString().split('T')[0]
  
    const headers = new Headers({
      cache: 'no-store',
      'Accept': 'application/json',
      'Authorization': `Bearer ${tokens}`,
      'Content-Type': 'application/json'
    }); 
    
    const requestOptions = {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        "bidding_phases_id": stage_detail_id,
        "rfx_id": 0,
        "stage_status": stage_status,
        "stage_score": stage_score,
        "completed": completed,
        "created_at": formattedTimestamp,
        "updated_at": formattedTimestamp
      })
    };
      
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: {status: true},
          error: response.statusText || 'Request Failed for Rfx Stage',
        };
      }
  
      const result = await response.json();  
     
      return {
        statusCode: 200,
        returnData: {status: result},
      };
  
    } catch (error) {
      return {
        statusCode: "400",
        returnData: {status: false},
        error: error.message || 'Request failed for Rfx Stage',
      };
    }
  }



// Move stage to next
export const movetoNextStageAction = async (rfxID) => {
  try{
        let resp = {}
        // api call for stages
        resp = await getRfxStagesDetailByRfxIdAction(rfxID, 'rfxstage')
        let stagesData = resp.returnData

        // update current element
        const currentElement = stagesData.find((item) => item.stage_status === 'current');
        resp = await updateStageDetailAction(currentElement.stages_detail_id, 'done', currentElement.stage_score, true)

        // update next element
        const currentIndex = stagesData.findIndex((item) => item.stage_status === 'current');
        const nextElement = currentIndex !== -1 && currentIndex < stagesData.length - 1 ? stagesData[currentIndex + 1] : null;
        resp = await updateStageDetailAction(nextElement.stages_detail_id, 'current', nextElement.stage_score, false)
        return true;
  }catch(e) {
    return false;
  }
}  



// Move stage to next
export const movetoNextBidStageAction = async (rfxID) => {
  try{
        let resp = {}
        // api call for stages
        resp = await getRfxStagesDetailByRfxIdAction(rfxID, 'bidstage')
        let stagesData = resp.returnData

        // update current element
        const currentElement = stagesData.find((item) => item.stage_status === 'current');
        resp = await updateStageDetailAction(currentElement.stages_detail_id, 'done', currentElement.stage_score, true)

        // update next element
        const currentIndex = stagesData.findIndex((item) => item.stage_status === 'current');
        const nextElement = currentIndex !== -1 && currentIndex < stagesData.length - 1 ? stagesData[currentIndex + 1] : null;
        resp = await updateStageDetailAction(nextElement.stages_detail_id, 'current', nextElement.stage_score, false)
        return true;
  }catch(e) {
    return false;
  }
}  

