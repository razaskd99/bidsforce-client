
import { getAllRfxRecords } from "@/app/api/rfx/scripts";
import BidsList from "@/components/Bids";

// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
// end login init 

const Approvals = async () => {
  
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


  // check user is login
  let isLogin = await getCookieValue('loginStatus')
  if (isLogin == true || isLogin == 'true') {
  }
  else {
    { redirect("/login") }
  }
  
  return (
    <div className="p-4 text-center text-[18px] text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
      <h2>Approvals coming</h2>
    </div>
  )
}
export default Approvals

// const rows = [
//     {id: 1,checkbox: 'dddd.png',description: 'Urea Plant Expansion',rfxid: 'RFX-101132',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '8 Jul 2021',contacts: 'Sara Andrew',status: 'RFx Issued',
//       biId:'BID-187678',new: 'New', issue:'19 June, 2022', sales: 'Tysen',},
//     {id: 2,checkbox: 'Galaxy Petroleum.png',description: 'Sixth Terminal DRX',rfxid: 'RFX-101732',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '4 Jul 2022',contacts: 'Nathan Phillip',status: 'RFx Acknowledg.',
//     },
//     {id: 3,checkbox: 'dddd.png',description: 'Cross Country Pipeline',rfxid: 'RFX-101132',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '8 Jul 2021',contacts: 'Sara Andrew',status: 'RFx Issued',
//     },
//     {id: 4,checkbox: 'Galaxy Petroleum.png',description: 'Ring 3 Gas Plant',rfxid: 'RFX-101732',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '4 Jul 2022',contacts: 'Nathan Phillip',status: 'RFx Acknowledg.',
//     },
//     {id: 5,checkbox: 'dddd.png',description: 'Phase-II Electrification',rfxid: 'RFX-101132',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '8 Jul 2021',contacts: 'Sara Andrew',status: 'RFx Issued',
//     },
//     {id: 6,checkbox: 'Galaxy Petroleum.png',description: 'Gemon Energy storage',rfxid: 'RFX-101732',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '4 Jul 2022',contacts: 'Nathan Phillip',status: 'RFx Acknowledg.',
//     },
//     {id: 7,checkbox: 'Galaxy Petroleum.png',description: 'DRP Refinery Automation',rfxid: 'RFX-101732',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '4 Jul 2022',contacts: 'Nathan Phillip',status: 'RFx Acknowledg.',
//     },
//     {id: 8,checkbox: 'Galaxy Petroleum.png',description: 'Digitalization - Phase-I ',rfxid: 'RFX-101732',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '4 Jul 2022',contacts: 'Nathan Phillip',status: 'RFx Acknowledg.',
//     },
//   ];
