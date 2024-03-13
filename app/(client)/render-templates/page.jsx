import React from 'react'
import { getPageContent } from './api/script';

import { TemplateDisplay } from '../../../components/TemplateDisplay';

import getConfig from 'next/config'

const page = async () => {
    

    const { serverRuntimeConfig } = getConfig() || {};

    let accessToken = ''
    let apiBackendURL = ''
    let tenantID = 0
    let isLogin=false
  
  
    if (serverRuntimeConfig) {
      // get api backend url
      apiBackendURL = serverRuntimeConfig.API_BACKEND_SERVER
      // get access token
      accessToken = serverRuntimeConfig.API_ACCESS_TOKEN_SERVER
      tenantID = serverRuntimeConfig.TENANT_ID
      isLogin = serverRuntimeConfig.IS_LOGIN
  
    }
  

    let pageHTML = '';
    let pageCSS = '';




    
    let pageContent ={}
    pageContent = await getPageContent();

    try {
       pageContent = JSON.parse(pageContent);
    } catch (err) {
      // Handle parsing error if needed
    }
    pageHTML = pageContent?.data?.['mycustom-html'] ?? '';
    pageCSS = pageContent?.data?.['mycustom-css'] ?? '';



    //mycustom-css
    return (
        <div>
            <TemplateDisplay pageHTML={pageHTML}  pageCSS={pageCSS} tenantID={tenantID} />
        </div>
    )
}

export default page
