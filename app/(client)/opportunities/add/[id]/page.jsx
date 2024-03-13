import { getOpportunityByID } from "@/app/api/opportunities/scripts";
import CreateRfx from "@/components/CreateRfx";
import getConfig from 'next/config'


const AddRfx = async({params}) => {

  const {id}= params;
  const { serverRuntimeConfig } = getConfig() || {};
  let accessToken = ''
  let apiBackendURL = ''
  let tenantID = 0
  // get server side global store data
  if (serverRuntimeConfig) {
    // get api backend url
    apiBackendURL = serverRuntimeConfig.API_BACKEND_SERVER
    // get access token
    accessToken = serverRuntimeConfig.API_ACCESS_TOKEN_SERVER
    tenantID = serverRuntimeConfig.TENANT_ID
  }
  // call all  request
  let records = await getOpportunityByID(apiBackendURL, accessToken, tenantID, id)
  let opportunityRec = records.opportunityData;

  return (
    <>
     <CreateRfx data={opportunityRec} />
    </>
  );
};

export default AddRfx;
