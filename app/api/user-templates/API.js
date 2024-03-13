"use client"
import axios from "axios";
let server_url = ""
server_url = process.env.API_BACKEND_CLIENT

export const getpage = async (page,tenantID) => {
  let pageContent = {};
  try {
    const response = await axios(
      server_url + `templates/templates/${page}/content/load?tenant_id=${tenantID}
      `
    );


    pageContent = response.data;

    if (!pageContent || pageContent == "") pageContent = {};
  } catch (err) {console.log("error is ",err) }

try{

  pageContent=JSON.parse(pageContent)
}catch(err){}


  return pageContent;
};

export const uploadImages = async (formData) => {
  console.log("here my data");
  console.log(formData.get("file-0"));
  let responseData = [];
  let payload = formData;

  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  try {
    const response = await axios.post(
      server_url + `/assets`,
      payload,
      config
    );
    responseData = response.data;

    if (!responseData || responseData == "") responseData = [];
  } catch (err) { }

  return responseData;
};

export const newPage = async (pageData,tenantID
) => {


  let actionResponse = "";
  let payload = pageData;


  try {
    const response = await axios.post(
      server_url + `templates/templates?tenant_id=${tenantID}`,
      payload
    );
    actionResponse = response.data;

    try { actionResponse = JSON.parse(actionResponse) } catch (err) { }

    if (!actionResponse || actionResponse == "") actionResponse = "";
  } catch (err) { }

  let pModal = document.getElementById("pagesModal");
  //pModal.style.zIndex = 888888;

  let myModal = document.getElementById("builderModal");
  myModal.style.display = "block";
  myModal.style.opacity = 0.75;
  //myModal.style.zIndex = 999999999999999999999999999999999;

  setTimeout(() => {
    myModal = document.getElementById("builderModal");
    myModal.style.display = "none";
    myModal.style.opacity = 0;
    myModal.style.zIndex = 888;

    pModal.style.zIndex = 999999999999999999999999999999999;
    pModal.style.opacity = 1;
  }, 2000);

  return actionResponse;
};

export const newWidget = async (widgetData) => {
  let actionResponse = "";
  let payload = widgetData;

  try {
    const response = await axios.post(
      server_url + `/api/widgets/createWidget`,
      payload
    );
    actionResponse = response.data;

    if (!actionResponse || actionResponse == "") actionResponse = "";
  } catch (err) { }

  let pModal = document.getElementById("widgetsModal");
  //pModal.style.zIndex = 888888;

  let myModal = document.getElementById("builderModal");
  myModal.style.display = "block";
  myModal.style.opacity = 0.75;
  //myModal.style.zIndex = 999999999999999999999999999999999;

  setTimeout(() => {
    myModal = document.getElementById("builderModal");
    myModal.style.display = "none";
    myModal.style.opacity = 0;
    myModal.style.zIndex = 888;

    pModal.style.zIndex = 999999999999999999999999999999999;
    pModal.style.opacity = 1;
  }, 2000);

  return actionResponse;
};

export const getPages = async (tenantID) => {
  let pagesData = [];

  try {
    const response = await axios(server_url + `templates/templates?tenant_id=${tenantID}`);
    pagesData = response.data;
    if (!pagesData || pagesData == "") pagesData = [];
  } catch (err) { }
  return pagesData;
};

export const getWidgets = async () => {
  let widgetsData = [];

  try {
    const response = await axios(server_url + `/api/widgets/getAllWidgets`);
    widgetsData = response.data;
    if (!widgetsData || widgetsData == "") widgetsData = [];
  } catch (err) { }
  return widgetsData;
};

export const getDepts = async (limit) => {
  let depts = [];

  try {
    const response = await axios(
      server_url + `/api/taxonomy/getDepts?limit=${limit}`
    );
    depts = response.data;
    if (!depts || depts == "") depts = [];
  } catch (err) { }

  return depts;
};

export const getTyps = async (dept) => {
  let typs = [];

  try {
    const response = await axios(
      server_url + `/api/taxonomy/getTyps?dept=${dept}`
    );
    typs = response.data;

    if (!typs || typs == "") typs = [];
  } catch (err) { }

  return typs;
};

export const getSubTyp1 = async (dept, typ) => {
  let subTyp1 = [];

  try {
    const response = await axios(
      server_url + `/api/taxonomy/getSubTyp1?dept=${dept}&typ=${typ}`
    );

    subTyp1 = response.data;

    if (!subTyp1 || subTyp1 == "") subTyp1 = [];
  } catch (err) { }

  return subTyp1;
};

export const getHomePageProducts = async (attr, limit) => {
  let products = [];

  try {
    const response = await axios(
      server_url +
      `/api/products/getHomePageprods?attr=${attr}&&limit=${limit}`
    );
    products = response.data;

    if (!products || products == "") products = [];
  } catch (err) { }
  return products;
};

export const DelPage = async (e, pageName, setAllPages,tenantID) => {

  let actionResponse = "";

  let payload = pageName;
  let response = ``;
  
  try {
    showModal();
    let resDel = await axios.delete(server_url + `templates/templates/${pageName}/content/delete?tenant_id=${tenantID}`, {
      name: pageName,
    });



    response=resDel?.data?.message

    setTimeout(() => {
      getPages(tenantID)
        .then((list) => {
          setAllPages(list);
        })
        .catch((err) => console.log(err));

      hideModal();
      //  window.location.reload();
    }, 2000);
  } catch (err) { }
  return response;
};

export const DelWidget = async (e, widgetName, setAllWidgets) => {
  let actionResponse = "";

  let payload = widgetName;
  let response = {
    status: 200,
    msg: `Widget <strong> ${widgetName} </strong> Deletion Failed`,
  };
  try {
    showModal();
    response = await axios.post(server_url + `/api/widgets/deleteWidget`, {
      name: widgetName,
    });

    actionResponse = response.data;

    setTimeout(() => {
      getWidgets()
        .then((list) => {
          setAllWidgets(list);
        })
        .catch((err) => console.log(err));

      hideModal();
      //  window.location.reload();
    }, 2000);
  } catch (err) { }
  console.log("deleted response", actionResponse);
  return actionResponse;
};

export const showModal = () => {
  let myModal = document.getElementById("builderModal");
  try {
    myModal.style.display = "block";
  } catch (err) { }
  try {
    myModal.style.opacity = 0.75;
  } catch (err) { }
};

export const hideModal = () => {
  let myModal = document.getElementById("builderModal");
  myModal.style.display = "none";
  myModal.style.opacity = 0;
};

export const dataSourceChange = async (ds) => {
  let actionResponse = "";
  let payload = ds;
  let response = {
    status: 200,
    msg: `Data Source <strong> ${ds} </strong> Has Been Set`,
  };
  try {
    /*  response = await axios.post(
      server_url + `/api/dataSource/setNew`,
      payload
    );

    actionResponse = response.data;
    */
    alert(
      "Database Selection is disabled by developer. You can only us JSON Files"
    );
  } catch (err) { }
  return actionResponse;
};

export const getCuurentDataSource = async () => {
  let curDataSource = "";

  try {
    const response = await axios(server_url + `/api/dataSource/getDs`);
    curDataSource = response.data;

    if (!curDataSource || curDataSource == "") curDataSource = "jsonFiles";
  } catch (err) { }

  return curDataSource;
};

export const testDSConnections = async (ds) => {
  let testResponse = "";

  if (ds == "jsonFiles") {
    testResponse =
      "Congratulations! JASON Files connection is Always Connected.";
  } else if (ds == "mongoDb") {
    try {
      const response = await axios(server_url + `/checkMongoConnected`);
      testResponse = response.data;

      if (!testResponse || testResponse == "")
        testResponse = "MongoDb Connection Failed";
    } catch (err) { }
  } else if (ds == "sqlServer") {
    try {
      const response = await axios(
        server_url + `/checkSqlServerConnection`
      );
      testResponse = response.data;
      if (!testResponse || testResponse == "")
        testResponse = "SQL Database Connection Failed";
    } catch (err) { }
  }
  return testResponse;
};

export const checkUserLogin = async (credentials) => {
  let actionResponse = "";
  let payload = credentials;

  let response = {};
  try {
    response = await axios.post(server_url + `/api/user/login`, payload);
    actionResponse = response.data;
  } catch (err) {
    console.log(err);
  }
  return actionResponse;
};
