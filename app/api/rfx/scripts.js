import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig() || {};
const axios = require('axios');

import {
  createNewRfxAction,
  updateRfxAction
} from "./actions/rfx";
//import { uploadFiles } from "@/components/FileInput";

import {
  showErrorMessageAlertMain,
  successMessageAlertMain,
  isValidDate,
  uploadFiles
} from "../util/utility";
import { getToken } from '../util/script';

// get all rfx records from db
export const getAllRfxRecords = async (apiBackendURL, accessToken, tenantID) => {


  let username = ''
  let password = ''
  if (serverRuntimeConfig) {
    username = serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.user
    password = serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.pass
  }

  let tokens = ''
  let tokenRes = await getToken(apiBackendURL, username, password)
  tokens = tokenRes?.tokenData?.access_token


  try {
    const url = `${apiBackendURL}rfx/rfx/${tenantID}`;

    const response = await axios.get(url, {
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${tokens}`,
      },
      maxRedirects: 5, // assuming you want a similar behavior to 'redirect: follow'
    });

    if (!response.status === 200) {
      return {
        statusCode: "400",
        rfxData: [],
        error: response.statusText || 'Request failed for Rfxs',
      };
    }

    return {
      statusCode: 200,
      rfxData: response.data,
    };
  } catch (error) {
    return {
      statusCode: "400",
      rfxData: [],
      error: error.message || 'Request failed for Rfxs',
    };
  }
};



// Create new / update rfx record from db
export const createUpdateRfxRequest = async (rfxData, isRevision, rfx_id, tenantID, apiBackendURL, selectedFilesMain,router) => {
  if (!rfxData.rfx_title) {
    showErrorMessageAlertMain("Please provide the Rfx title.")
    return
  }


  const rfxtype = document.getElementById('rfx_type')
  let rfx_type = rfxtype.options[rfxtype.selectedIndex].value ?? 0

  const bidvalidity = document.getElementById('bid_validity')
  let bid_validity = bidvalidity.options[bidvalidity.selectedIndex].value ?? 0

  const submissionmode = document.getElementById('submission_mode')
  let rfx_submission_mode = submissionmode.options[submissionmode.selectedIndex].value ?? 0

  const rfxstage = document.getElementById('rfx_stage')
  let rfx_stage = rfxstage.options[rfxstage.selectedIndex].value ?? 0

  if (rfx_type == 0 || bid_validity == 0 || rfx_submission_mode == 0 || rfx_stage == 0) {
    showErrorMessageAlertMain("Select option from provided dropdown.")
    return;
  }
console.log(rfxData)
  if (!isValidDate(rfxData.due_date) ||
    !isValidDate(rfxData.tech_clarification_deadline) ||
    !isValidDate(rfxData.com_clarification_deadline)) {
    showErrorMessageAlertMain("Select the provided date options.")
    return;
  }

  const uniqueContacts = Array.from(new Set(rfxData.key_contacts.map(obj => obj.user_id))).map(user_id => {
    return rfxData.key_contacts.find(obj => obj.user_id === user_id);
  });
  rfxData.key_contacts = uniqueContacts

  let response = {}
  if (isRevision === 'yes') {
    response = await updateRfxAction(rfxData, rfx_id)
    /*if (response.statusCode == 200 && selectedFilesMain.length > 0) {
      uploadFiles(selectedFilesMain, apiBackendURL, tenantID, rfx_id, 'rfx')
    }*/
    successMessageAlertMain("Rfx information updated successfully.")
    window.location = '/rfx';
  } else {
    response = await createNewRfxAction(rfxData)
    console.log("rrrrr sajjad", response)
    /*if (response.statusCode == 200 && selectedFilesMain.length > 0) {
      uploadFiles(selectedFilesMain, apiBackendURL, tenantID, response.returnData.rfx_id, 'rfx')      
    }*/
    if (response.statusCode == 200) {
      // successMessageAlertMain("Rfx information added successfully.")
      // window.location = '/rfx';
    } else {
      // showErrorMessageAlertMain(response.error)
    }
    router.push("/rfx")

  }
};


