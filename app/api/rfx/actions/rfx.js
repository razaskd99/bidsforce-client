"use server";

import { getApiPrereqVars } from "../../util/action/apiCallPrereq";



// Create new rfx record
export const createRfxRecordAction = async (formData, opportunity_id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}rfx/rfx/`;
   
  const headers = new Headers({
    cache: "no-store",
    Accept: "application/json",
    Authorization: `Bearer ${tokens}`,
    "Content-Type": "application/json",
  });

  const now = new Date();
  const formattedTimestamp = now.toISOString();
  const formatedDate = now.toISOString().split("T")[0];

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      "tenant_id": tenantID,
      "opportunity_id": opportunity_id,
      "rfx_number": formData.rfx_number,
      "rfx_id": formData.rfx_id,
      "rfx_title": formData.rfx_title,
      "rfx_record_type": formData.rfx_record_type,
      "prev_rfx_reference": formData.prev_rfx_reference,
      "rfx_type": formData.rfx_type,
      "bid_type": formData.bid_type,
      "bid_validity": formData.bid_validity,
      "bid_submission_mode": formData.bid_submission_mode,
      "submission_contents": formData.submission_contents,
      "work_agreement_ref_num": formData.work_agreement_ref_num ? formData.work_agreement_ref_num : '',
      "rfx_tech_contact_id": formData.rfx_tech_contact_id ? formData.rfx_tech_contact_id : 0,
      "rfx_comm_contact_id": formData.rfx_comm_contact_id ? formData.rfx_comm_contact_id : 0,
      "submission_instructions": formData.submission_instructions,
      "visit_worksite": formData.visit_worksite,
      "visit_worksite_instructions": formData.visit_worksite_instructions ? formData.visit_worksite_instructions : '',
      "issue_date": formData.issue_date,
      "due_date": formData.due_date,
      "tech_clarif_deadline": formData.tech_clarif_deadline ? formData.tech_clarif_deadline : formatedDate,
      "comm_clarif_deadline": formData.comm_clarif_deadline ? formData.comm_clarif_deadline : formatedDate,
      "expected_award_date": formData.expected_award_date,
      "bid_number": formData.bid_number ? formData.bid_number : '',
      "rfx_status": formData.rfx_status ? formData.rfx_status : '',
      "bid_status": formData.bid_status ? formData.bid_status : '',
      "data": formData.data ? formData.data : '',
      "rfx_owner_id": formData.rfx_owner_id,
      "bid_owner_id": formData.bid_owner_id,
      "created_by": formData.created_by,
      "is_active": true,
      "created_at": formattedTimestamp,
      "updated_at": formattedTimestamp
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "RFx creation failed",
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
      error: error.message || "RFx creation failed",
    };
  }
};



// Update an rfx record
export const updateRfxRecordAction = async (formData, id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}rfx/rfx/id/${id}`;
   
  const headers = new Headers({
    cache: "no-store",
    Accept: "application/json",
    Authorization: `Bearer ${tokens}`,
    "Content-Type": "application/json",
  });

  const now = new Date();
  const formattedTimestamp = now.toISOString();
  const formatedDate = now.toISOString().split("T")[0];

  const requestOptions = {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      "tenant_id": tenantID,
      "opportunity_id": formData.opportunity_id,
      "rfx_number": formData.rfx_number,
      "rfx_id": formData.rfx_id,
      "rfx_title": formData.rfx_title,
      "rfx_record_type": formData.rfx_record_type,
      "prev_rfx_reference": formData.prev_rfx_reference,
      "rfx_type": formData.rfx_type,
      "bid_type": formData.bid_type,
      "bid_validity": formData.bid_validity,
      "bid_submission_mode": formData.bid_submission_mode,
      "submission_contents": formData.submission_contents,
      "work_agreement_ref_num": formData.work_agreement_ref_num ? formData.work_agreement_ref_num : '',
      "rfx_tech_contact_id": formData.rfx_tech_contact_id ? formData.rfx_tech_contact_id : 0,
      "rfx_comm_contact_id": formData.rfx_comm_contact_id ? formData.rfx_comm_contact_id : 0,
      "submission_instructions": formData.submission_instructions,
      "visit_worksite": formData.visit_worksite,
      "visit_worksite_instructions": formData.visit_worksite_instructions ? formData.visit_worksite_instructions : '',
      "issue_date": formData.issue_date,
      "due_date": formData.due_date,
      "tech_clarif_deadline": formData.tech_clarif_deadline ? formData.tech_clarif_deadline : formatedDate,
      "comm_clarif_deadline": formData.comm_clarif_deadline ? formData.comm_clarif_deadline : formatedDate,
      "expected_award_date": formData.expected_award_date,
      "bid_number": formData.bid_number ? formData.bid_number : '',
      "rfx_status": formData.rfx_status ? formData.rfx_status : '',
      "bid_status": formData.bid_status ? formData.bid_status : '',
      "data": formData.data ? formData.data : '',
      "rfx_owner_id": formData.rfx_owner_id,
      "bid_owner_id": formData.bid_owner_id,
      "created_by": formData.created_by,
      "is_active": true,
      "created_at": formattedTimestamp,
      "updated_at": formattedTimestamp
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "RFx updation failed",
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
      error: error.message || "RFx updation failed",
    };
  }
};




// get all rfx records 
export const getAllRfxRecordsAction = async (searchTermValue, offset, limit) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}rfx/rfx/tenant/${tenantID}?searchTerm=${searchTermValue}&offset=${offset}&limit=${limit}`;

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
        error: response.statusText || "Request failed for RFx",
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
      error: error.message || "Request failed for RFx",
    };
  }
};



// get rfx record by ID
export const getRfxByIdAction = async (id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}rfx/rfx/id/${id}`;

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
        rfxData: [],
        error: response.statusText || "Request failed for Rfxs",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      rfxData: result,
    };
  } catch (error) {

    return {
      statusCode: "400",
      rfxData: [],
      error: error.message || "Request failed for Rfxs",
    };
  }
};



// get rfx record by ID
export const getMaxRfxByIdAction = async () => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}rfx/rfx/max_id`;

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
        rfxData: [],
        error: response.statusText || "Request failed for Rfxs",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      rfxData: result,
    };
  } catch (error) {

    return {
      statusCode: "400",
      rfxData: [],
      error: error.message || "Request failed for Rfxs",
    };
  }
};

// get all rfx records by opportunity id
export const getAllRfxRecordsActionByOppId = async (opportunity_id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}rfx/rfx/opportunity/${opportunity_id}`;

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
        error: response.statusText || "Request failed for RFx",
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
      error: error.message || "Request failed for RFx",
    };
  }
};

// delete a Rfx record from db
export const deleteRfxRecordAction = async (id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();

  try {
    let apiUrl = `${apiBackendURL}rfx/rfx/id/${id}`;
    
    const response = await fetch(apiUrl, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request failed for Rfx deletion.",
      };
    }
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Rfx deletion",
    };
  }
};

/*export const createNewRfxAction = async (rfxData) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const apiUrl = `${apiBackendURL}rfx/rfx`;

    const now = new Date();
    const formattedTimestamp = now.toISOString();
    const formatedDate = now.toISOString().split("T")[0];

    const headers = new Headers({
      cache: "no-store",
      Accept: "application/json",
      Authorization: `Bearer ${tokens}`,
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        tenant_id: tenantID,
        opportunity_id: rfxData.opportunity_id,
        initiator_id: rfxData.initiator_id,
        rfx_bid_assignto: rfxData.rfx_bid_assignto,
        rfx_title: rfxData.rfx_title,
        rfx_number: rfxData.rfx_number,
        under_existing_agreement: rfxData.under_existing_agreement,
        status: rfxData.status,
        previous_rfx_ref_num: rfxData.previous_rfx_ref_num,
        revision_of_previous_rfx: rfxData.revision_of_previous_rfx,
        agreement_ref_num: rfxData.agreement_ref_num,
        issued_date: rfxData.issued_date ?? formatedDate,
        due_date: rfxData.due_date,
        crm_id: rfxData.crm_id,
        bid_number: rfxData.bid_number,
        request_for_bid: rfxData.request_for_bid,
        submission_instructions: rfxData.submission_instructions,
        visit_worksite: rfxData.visit_worksite,
        visit_worksite_instructions: rfxData.visit_worksite_instructions,
        tech_clarification_deadline: rfxData.tech_clarification_deadline,
        com_clarification_deadline: rfxData.com_clarification_deadline,
        expected_award_date: rfxData.expected_award_date,
        enduser_id: rfxData.enduser_id,
        enduser_type: rfxData.enduser_type,
        acknowledged_by: rfxData.acknowledged_by,
        acknowledgement_date: formatedDate,
        acknowledgement_comment: rfxData.acknowledgement_comment,
        acknowledged: rfxData.acknowledged,
        acknowledgement_document:
          rfxData.acknowledgement_document ?? formatedDate,
        acknowledgement_submitted_on: formattedTimestamp,
        rfx_type_id: rfxData.rfx_type_id,
        bid_validity_id: rfxData.bid_validity_id,
        rfx_content_submission_id: rfxData.rfx_content_submission_id,
        rfx_submission_mode_id: rfxData.rfx_submission_mode_id,
        rfx_stage_id: rfxData.rfx_stage_id,
      }),
    };

    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request Failed for Rfx",
      };
    }

    const result = await response.json();

    try {
      await updateRfxNumberAction(result.rfx_id, result.rfx_id);
    } catch (updateError) {
      console.error("Error updating RFX number:", updateError);
    }

    try {
      if (rfxData.attached_documents) {
        for (const item of rfxData.attached_documents) {
          await createDocUploadAction(
            result.rfx_id,
            rfxData.initiator_id,
            item
          );
        }
      }
    } catch (docUploadError) {
      console.error("Error uploading documents:", docUploadError);
    }

    try {
      if (rfxData.key_contacts) {
        for (const item of rfxData.key_contacts) {
          await createContactsAction(
            result.rfx_id,
            item.primary_contacts_id,
            item.contact_key,
            item.persona_role
          );
        }
      }
    } catch (contactError) {
      console.error("Error saving key contacts:", contactError);
    }

    try {
      await fetchAndProcessStages("rfxstage", result.rfx_id);
    } catch (rfxStagesError) {
      console.error(
        "Error fetching and processing RFX stages:",
        rfxStagesError
      );
    }

    try {
      await fetchAndProcessStages("bidstage", result.rfx_id);
    } catch (bidStagesError) {
      console.error(
        "Error fetching and processing bid stages:",
        bidStagesError
      );
    }

    return {
      statusCode: 200,
      returnData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Rfx",
    };
  }
};
*/


export const updateRfxAction = async (rfxData, rfx_id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}rfx/rfx/id/${rfx_id}`;

  const now = new Date();
  const formattedTimestamp = now.toISOString();
  const formatedDate = now.toISOString().split("T")[0];

  const headers = new Headers({
    cache: "no-store",
    Accept: "application/json",
    Authorization: `Bearer ${tokens}`,
    "Content-Type": "application/json",
  });

  const requestOptions = {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      rfx_bid_assignto: rfxData.rfx_bid_assignto,
      rfx_title: rfxData.rfx_title,
      rfx_number: rfxData.rfx_number,
      under_existing_agreement: rfxData.under_existing_agreement,
      status: "initiated",
      previous_rfx_ref_num: rfxData.previous_rfx_ref_num,
      revision_of_previous_rfx: rfxData.revision_of_previous_rfx,
      agreement_ref_num: rfxData.agreement_ref_num,
      issued_date: rfxData.issued_date ?? formatedDate,
      due_date: rfxData.due_date,
      crm_id: rfxData.crm_id,
      bid_number: rfxData.bid_number,
      request_for_bid: rfxData.request_for_bid,
      submission_instructions: "",
      visit_worksite: rfxData.visit_worksite,
      visit_worksite_instructions: rfxData.visit_worksite_instructions,
      tech_clarification_deadline: rfxData.tech_clarification_deadline,
      com_clarification_deadline: rfxData.com_clarification_deadline,
      expected_award_date: rfxData.expected_award_date,
      enduser_id: rfxData.enduser_id,
      enduser_type: rfxData.enduser_type,
      rfx_type_id: rfxData.rfx_type_id,
      bid_validity_id: rfxData.bid_validity_id,
      rfx_content_submission_id: rfxData.rfx_content_submission_id,
      rfx_submission_mode_id: rfxData.rfx_submission_mode_id,
      rfx_stage_id: rfxData.rfx_stage_id,
      acknowledged_by: rfxData.acknowledged_by,
      acknowledgement_date: "2024-01-30",
      acknowledgement_comment: rfxData.acknowledgement_comment,
      acknowledged: rfxData.acknowledged,
      acknowledgement_document: rfxData.acknowledgement_document,
      acknowledgement_submitted_on: "2024-01-30T00:04:40.671Z",
      rfx_id: rfx_id,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request Failed for Rfx",
      };
    }

    const result = await response.json();

    // save ino of attached docs
    let resp = {};
    rfxData.attached_documents &&
      rfxData.attached_documents.map(
        (item, index) => (resp = createDocUploadAction(rfx_id, 1, item))
      );

    // save key contacts info
    let resp2 = {};
    rfxData.key_contacts &&
      rfxData.key_contacts.map(
        (item, index) =>
          (resp2 = createContactsAction(
            rfx_id,
            item.user_id,
            item.contact_key,
            item.persona_role
          ))
      );

    return {
      statusCode: 200,
      returnData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Rfx",
    };
  }
};



