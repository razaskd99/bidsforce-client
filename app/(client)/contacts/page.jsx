import ContactTabel from "@/components/contacts/ContactTable";
import OpenContact from "@/components/contacts/OpenContact";
import OpenTeamDailog from "@/components/contacts/OpenTeamDailog";
import Breadcrumbs from "@/components/controlpanel/Breadcrumbs";


// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
import { getAllContactRecordsAction } from "@/app/api/contacts/actions/contact";
import { getAllCompanyRecordsAction, getAllDesignationRecordsAction, getAllPersonaRecordsAction, getAllTeamRecordsAction } from "@/app/api/rfx/actions/rfx";
import { getAllUsers } from "@/app/api/rfx/actions/user";
// end login init 



export default async function Contacts() {



  let userEncrptedData = await getCookieValue('userPrivateData')
  let tenant_ID = await getCookieValue('TENANT_ID')
  let userLoginData = await getCookieValue('userLoginData')

  // check user is login
  let isLogin = await getCookieValue('loginStatus')    
  if (!isLogin) { 
      { redirect("/login") }
  }
  
  // get env variables
  let apiBackendURL = API_BACKEND_SERVER
  let username = userEncrptedData.user
  let password = userEncrptedData.pass
  let tenantID = tenant_ID

  // get token
  let res = await getToken(apiBackendURL, username, password)
  let tokens = res?.tokenData?.access_token

  // call all tenant action
  let records = await getAllContactRecordsAction(apiBackendURL, tokens, tenantID);
  let usersData = records.returnData;

  let response = {}

  // get companies
  response = await getAllCompanyRecordsAction()
  let companyRecords = response.returnData 

  // get designations
  response = await getAllDesignationRecordsAction()
  let designationRecords = response.returnData 

  // get teams
  response = await getAllTeamRecordsAction()
  let teamRecords = response.returnData 

  // get persona
  response = await getAllPersonaRecordsAction()
  let personaRecords = response.returnData 

  // get users
  response = await getAllUsers()
  let userRecords = response.data 

  console.log("contacts",usersData)
  console.log("tenant",tenantID)

  const breadcrumbItems = [{ label: 'Dashboard', href: '/' }, { label: 'Contacts', href: '/contacts' }];
   let usersData2 = [
    { id: 1, name: 'Bryan C', role: 'requester', designation: 'Buyer', email:'mail@google.com', company: 'i6 Tech', rfxID: '548-6523', image: '/bryan.jpg' },
    { id: 2, name: 'Chand Kumar', role: 'requester', designation: 'Sr. Buyer', email:'mail@google.com', company: 'i6 Tech', rfxID: '548-6523', image: '/chand.jpg' },
    { id: 3, name: 'James Bell', role: 'requester', designation: 'Manager', email:'mail@google.com', company: 'i6 Tech', rfxID: '548-6523', image: '/james.jpg' },
    { id: 4, name: 'Lin Chau', role: 'requester', designation: 'Sales', email:'mail@google.com', company: 'i6 Tech', rfxID: '548-6523', image: '/lin.jpg' },
    { id: 5, name: 'Maha Khan', role: 'requester', designation: 'Buyer', email:'mail@google.com', company: 'i6 Tech', rfxID: '548-6523', image: '/maha.jpg' },
    { id: 6, name: 'Marvin Lambert', role: 'requester', designation: 'Buyer', email:'mail@google.com', company: 'i6 Tech', rfxID: '548-6523', image: '/marvin.jpg' },
    { id: 7, name: 'Ravi K.', role: 'requester', designation: 'Buyer', email:'mail@google.com', company: 'i6 Tech', rfxID: '548-6523', image: '/ravi.png' },
    { id: 8, name: 'Rose Peters', role: 'requester', designation: 'Buyer', email:'mail@google.com', company: 'i6 Tech', rfxID: '548-6523', image: '/rose.jpg' },
  ];
  const NoRowsOverlayContact = () => (
    <Stack height="100%" alignItems="center" justifyContent="center">
      <Image src="/no-contact.png" width={480} height={260} alt="No Rows" />
      <p className="text-[#252631] text-xl mb-3">No contacts yet</p>
      <p className="text-[#778CA2] text-lg font-light mb-3">
        You’ll see them here if there are any contacts posted
      </p>
    </Stack>
  );
  return (
    <div className="">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex items-center gap-3">
        <OpenContact designationRecords={designationRecords} companyRecords={companyRecords} teamRecords={teamRecords}/>
        <OpenTeamDailog personaRecords={personaRecords} userRecords={userRecords} />
      </div>
      <div>
        <ContactTabel rows={usersData} />
      </div>

    </div>
  )
}