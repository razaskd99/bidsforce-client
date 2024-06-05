"use server";
import getConfig from "next/config";
import { formatFileSize } from "../../util/utility";
import { cookies } from "next/headers";

// required to access cookies
import { getApiPrereqVars } from "../../util/action/apiCallPrereq";
import { getToken } from "../../util/script";

// start cookie init
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
// end cookie init

export const loadPostData = async (id) => {
  /*const { serverRuntimeConfig } = getConfig() || {};
  if (serverRuntimeConfig) {
    serverRuntimeConfig.TEMP_DATA = {}
    serverRuntimeConfig.TEMP_DATA = postData    
  }*/
  try{
    cookies.remove('temp_opp_id');
  }catch{}
  cookies().set("temp_opp_id", id);
};


// get all rfx records by opportunity id
export const getAllRfxRecordsActionByOppId = async (opportunity_id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}rfx/rfx/opportunity-id/${opportunity_id}`;

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

// get all Persona records
export const getAllPersonaRecordsAction = async () => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}persona/persona/tenant/${tenantID}`;

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
        error: response.statusText || "Request failed for Persona",
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
      error: error.message || "Request failed for Persona",
    };
  }
};


// get all Customer records from db
export const getAllCustomerRecordsAction = async () => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();

  try {
    const url = `${apiBackendURL}customer/customers/tenant/${tenantID}`;

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
        error: response.statusText || "Request failed for Customer",
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
      error: error.message || "Request failed for Customer",
    };
  }
};

// get all Rfx stages records by type from db
export const getAllRfxStagesAction = async (typeName) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}phase_stage/phase_stages/tenant/${tenantID}/type/${typeName}`;

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

// get all Rfx stages records by type & Rfx ID from db
export const getAllRfxStagesByRfxIdAction = async (rfx_id, typeName) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}phase_stages_detail/phase_stages_detail/rfx/${rfx_id}/type/${typeName}`;

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

export const getRfxById = async (id) => {
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
    console.log("eeeeeeeeeeeeeee", error);

    return {
      statusCode: "400",
      rfxData: [],
      error: error.message || "Request failed for Rfxs",
    };
  }
};

export const getRfxTypes = async () => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}rfx_type/rfx_type/tenant/${tenantID}`;

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
        data: [],
        error: response.statusText || "Request failed for Rfxs",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      data: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      data: [],
      error: error.message || "Request failed for Rfxs",
    };
  }
};

export const getRfxStages = async () => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}rfx_stage/rfx_stage/tenant/${tenantID}`;

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
        data: [],
        error: response.statusText || "Request failed for Rfxs",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      data: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      data: [],
      error: error.message || "Request failed for Rfxs",
    };
  }
};

export const getBidVality = async () => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}bid_validity/bid_validity/tenant/${tenantID}`;

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
        data: [],
        error: response.statusText || "Request failed for Rfxs",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      data: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      data: [],
      error: error.message || "Request failed for Rfxs",
    };
  }
};

export const getSubmissionMode = async () => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}rfx_submission_mode/rfx_submission_mode/tenant/${tenantID}`;

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
        data: [],
        error: response.statusText || "Request failed for Rfxs",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      data: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      data: [],
      error: error.message || "Request failed for Rfxs",
    };
  }
};

export const getContentSubmission = async () => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}rfx_content_submission/rfx_content_submission/tenant/${tenantID}`;

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
        data: [],
        error: response.statusText || "Request failed for Rfxs",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      data: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      data: [],
      error: error.message || "Request failed for Rfxs",
    };
  }
};

export const getUsers = async () => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}auth/auth/users/tenant/${tenantID}`;

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
        data: [],
        error: response.statusText || "Request failed for Rfxs",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      data: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      data: [],
      error: error.message || "Request failed for Rfxs",
    };
  }
};

export const getRfxContacts = async (id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}contacts/contacts/tenant/${tenantID}/rfx_id/${id}`;

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
    console.log("eeeeeeeeeeeeeee", error);

    return {
      statusCode: "400",
      rfxData: [],
      error: error.message || "Request failed for Rfxs",
    };
  }
};

export const getRfxContactsByKey = async (rfxID, contact_key) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}contacts/contacts/tenant/${tenantID}/rfx_id/${rfxID}/key/${contact_key}`;

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
        error: response.statusText || "Request failed for Contacts",
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
      error: error.message || "Request failed for Contacts",
    };
  }
};

export const createNewRfxAction = async (rfxData) => {
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

const fetchAndProcessStages = async (stageType, rfx_id) => {
  try {
    let userEncrptedData = await getCookieValue("userPrivateData");
    let tenantID = await getCookieValue("TENANT_ID");

    // get env variables
    let apiBackendURL = API_BACKEND_SERVER;
    let username = userEncrptedData.user;
    let password = userEncrptedData.pass;

    // get token
    let res = await getToken(apiBackendURL, username, password);
    let tokens = res?.tokenData?.access_token;

    const response = await getAllRfxStagesAction(stageType);
    const stagesList = response.returnData || [];
    await Promise.all(
      stagesList.map((item) => {
        const status =
          item.display_order == 1
            ? "done"
            : item.display_order == 2
            ? "current"
            : "pending";
        return createStagesDetailAction(
          item.bidding_phases_id,
          rfx_id,
          status,
          item.score,
          apiBackendURL,
          tokens,
          tenantID
        );
      })
    );
  } catch (error) {
    console.error("Error fetching and processing stages:", error);
  }
};

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

export const updateRfxNumberAction = async (rfx_id, rfx_number) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}rfx/rfx/rfx-number/id/${rfx_id}`;

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
      rfx_number: String(rfx_number),
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: { status: true },
        error: response.statusText || "Request Failed for Rfx Number",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: { status: result },
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: { status: false },
      error: error.message || "Request failed for Rfx",
    };
  }
};

export const updateBidNumberAction = async (rfx_id, bid_number) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}rfx/rfx/bid-number/id/${rfx_id}`;

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
      bid_number: String(bid_number),
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: { status: true },
        error: response.statusText || "Request Failed for Bid Number",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: { status: result },
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: { status: false },
      error: error.message || "Request failed for Bid Number",
    };
  }
};

export const updateBidAssignToAction = async (rfx_id, rfx_bid_assignto) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}rfx/rfx/rfx-bid-assignto/id/${rfx_id}`;

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
      rfx_bid_assignto: rfx_bid_assignto,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: { status: true },
        error: response.statusText || "Request Failed for Bid Number",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: { status: result },
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: { status: false },
      error: error.message || "Request failed for Bid Number",
    };
  }
};


export const updateRfxStatusAction = async (rfx_id, status) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}rfx/rfx/rfx-status/id/${rfx_id}`;

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
      status: status,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: { status: true },
        error: response.statusText || "Request Failed for RFx Status",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: { status: result },
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: { status: false },
      error: error.message || "Request failed for RFx Status",
    };
  }
};


export const GetRfxDocumentsAction = async (rfx_id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}docvalt/docvalt/tenant/${tenantID}/rfx_id/${rfx_id}`;

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
    method: "GET",
    headers: headers,
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request Failed for Docvalt",
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
      error: error.message || "Request failed for Docvalt",
    };
  }
};

export const GetRfxDocumentsBy_RfxID_Key_Action = async (
  rfx_id,
  docvalt_key
) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}docvalt/docvalt/rfx/${rfx_id}/key/${docvalt_key}`;

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
    method: "GET",
    headers: headers,
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request Failed for Docvalt",
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
      error: error.message || "Request failed for Docvalt",
    };
  }
};

export const GetDocumentByKeyAction = async (docvalt_key) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}docvalt/docvalt/tenant/${tenantID}/key/${docvalt_key}`;

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
    method: "GET",
    headers: headers,
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request Failed for Docvalt",
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
      error: error.message || "Request failed for Docvalt",
    };
  }
};

export const createDocUploadAction = async (
  rfx_id,
  user_id,
  docData,
  docvalt_key = "rfx"
) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}docvalt/docvalt`;

  const now = new Date();
  const formattedTimestamp = now.toISOString();
  const formatedDate = now.toISOString().split("T")[0];

  const headers = new Headers({
    cache: "no-store",
    Accept: "application/json",
    Authorization: `Bearer ${tokens}`,
    "Content-Type": "application/json",
  });
  console.log({
    tenant_id: tenantID,
    rfx_id: rfx_id,
    user_id: user_id,
    docvalt_key: docvalt_key,
    docvalt_dir: "",
    docvalt_filename: docData.name,
    docvalt_cloudpath: docData.path ? docData.path : "",
    file_type: (docData.type || "").split("/")[1],
    file_size: formatFileSize(parseInt(docData.size)),
    file_moved: false,
    created_date: formatedDate,
    created_at: formattedTimestamp,
    updated_at: formattedTimestamp,
  });
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      tenant_id: tenantID,
      rfx_id: rfx_id,
      user_id: user_id,
      docvalt_key: docvalt_key,
      docvalt_dir: "",
      docvalt_filename: docData.name,
      docvalt_cloudpath: docData.path ? docData.path : "",
      file_type: (docData.type || "").split("/")[1],
      file_size: formatFileSize(parseInt(docData.size)),
      file_moved: false,
      created_date: formatedDate,
      created_at: formattedTimestamp,
      updated_at: formattedTimestamp,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request Failed for Docvalt",
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
      error: error.message || "Request failed for Docvalt",
    };
  }
};

export const createStagesDetailAction = async (
  bidding_phases_id,
  rfx_id,
  stage_status,
  stage_score,
  apiBackendURL,
  tokens,
  tenantID
) => {
  const apiUrl = `${apiBackendURL}phase_stages_detail/phase_stages_detail`;

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
      bidding_phases_id: bidding_phases_id,
      rfx_id: rfx_id,
      stage_status: stage_status,
      stage_score: stage_score,
      completed: false,
      created_at: formattedTimestamp,
      updated_at: formattedTimestamp,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request Failed for Stages Detail",
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
      error: error.message || "Request failed for Stages Detail",
    };
  }
};

export const createContactsAction = async (
  rfx_id,
  user_id,
  contact_key,
  persona_role = ""
) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}contacts/contacts`;

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
      rfx_id: rfx_id,
      contact_user_id: user_id,
      conatct_key: contact_key,
      created_date: formatedDate,
      created_at: formattedTimestamp,
      persona_role: persona_role,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request Failed for Contacts",
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
      error: error.message || "Request failed for Contacts",
    };
  }
};

export const updateAcknowledgementAction = async (
  rfxID,
  acknowledgementNotes,
  acknowledgementDate
) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}rfx/rfx/acknowledgement/rfx-id/${rfxID}`;

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
      rfx_acknowledgement: 0,
      rfx_id: rfxID,
      acknowledged_by: 1,
      acknowledgement_date: acknowledgementDate,
      acknowledgement_comment: acknowledgementNotes,
      acknowledged: true,
      acknowledgement_document: 0,
      acknowledgement_submitted_on: formattedTimestamp,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request Failed for Contacts",
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
      error: error.message || "Request failed for Contacts",
    };
  }
};

// Add new Opportunity record in db
export const createOpportunityAction = async (formData) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}opportunity/Opportunity/`;

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
      tenant_id: tenantID,
      company_id: parseInt(formData.company_id),
      customer_id: parseInt(formData.customer_id),
      title: formData.title,
      type: formData.type,
      probability: "",
      total_value: formData.total_value,
      crm_id: formData.crm_id,
      customer_name: formData.customer_name,
      end_user_name: formData.end_user_name,
      region: formData.region,
      industry_code: formData.industry_code,
      business_unit: formData.business_unit,
      project_type: formData.project_type,
      delivery_duration: "",
      stage: formData.stage,
      status: formData.status,
      expected_award_date: formData.expected_award_date,
      expected_rfx_date: formData.expected_rfx_date,
      close_date: formData.close_date,
      competition: "",
      gross_profit_percent:  0,
      gross_profit_value:  0,
      description: formData.description,
      last_updated_at: formattedTimestamp,
      forcasted: formData.forcasted,
      end_user_project: formData.end_user_project,
      opportunity_currency: formData.opportunity_currency,
      sales_persuit_progress: formData.sales_persuit_progress,
      opportunity_owner: formData.opportunity_owner,
      bidding_unit: formData.bidding_unit,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Opportunity creation failed",
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
      error: error.message || "Opportunity creation failed",
    };
  }
};



///////////////////////// Designation methods


// get all Designation records
export const getAllDesignationRecordsAction = async (offset,limit) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}designation/designations/tenant/${tenantID}?offset=${offset}&limit=${limit}`;

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
        error: response.statusText || "Request failed for Designation",
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
      error: error.message || "Request failed for Designation",
    };
  }
};



///////////////////////// Team methods


// get all Team records 
export const getAllTeamRecordsAction = async () => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}team/teams/tenant/${tenantID}`;

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
        error: response.statusText || "Request failed for Team",
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
      error: error.message || "Request failed for Team",
    };
  }
};
