"use client"
import React, { useState, useEffect } from "react";
import {
  getPages,
  getWidgets,
  newWidget,
  newPage,
  uploadImages,
} from "../../../api/user-templates/API";
import { allCategories } from "../resources/categories";

let server_url = ""


server_url = process.env.API_BACKEND_CLIENT





export const InitEditor = (
  grapesjs,
  currentPage,
  custPlugins,
  alert,
  tenantID

) => {
  let editor = {}


  try {
    // replace all multiple spaces to single space
    currentPage = currentPage.replace(/\s\s+/g, " ");
  } catch (err) { }

  try {
    // replace all spaces to -
    currentPage = currentPage.replace(/ /g, "-");
  } catch (err) { }


  let loadRequestURL = server_url + `templates/templates/${currentPage}/content/load?tenant_id=${tenantID}`

  let saveRequestURL = server_url + `templates/templates/${currentPage}/content/save?tenant_id=${tenantID}`


  editor = grapesjs.init({
    container: "#editor",



    storageManager: {
      type: "remote",
      stepsBeforeSave: 1,
      contentTypeJson: true,
      autosave: false,

      storeComponents: true,
      storeStyles: true,
      storeHtml: true,
      storeCss: true,

      headers: {},
      id: "mycustom-",
      urlStore:
        saveRequestURL,
      urlLoad:
        loadRequestURL,

      params: {},
      fromElement: true,
      allowScripts: 1,
      selectorManager: { componentFirst: true },
    },


    plugins: custPlugins,



    canvas: {
      styles: [
        "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
        "https://cdn.celerantwebservices.com/plugins/fontawesome/4.5.0/fontawesome.min.css",


      ],
      scripts: [
        "https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js",
        "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js",

        "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js",
        "https://code.jquery.com/jquery-3.6.0.min.js",
        "https://cdn.tailwindcss.com",

      ],
    },
  });





  editor.on("storage:end:store", function (e) {
    setTimeout(() => {
      /* alert.success(
         <div style={{ color: "white", fontSize: 11 + "px" }}>
           Content Saved Successfully!
         </div>
       );*/

      alert("Saved content")

    }, 1000);

  });



  return editor;
};

export const saveCurrentPage = (editor, currentPage) => {
  // DISPLAy SAVE ICON
  editor.Panels.addButton("options", [
    {
      id: "save-db",
      className: "fa fa-floppy-o",
      command: "save-db",
      attributes: { title: "Publish" },
    },
  ]);

  // RUN SAVE PAGE FUNCTION ON CLICK ON ICON

  editor.Commands.add("save-db", {
    run: function (editor, sender) {
      if (!currentPage || currentPage == "") {
        alert("Please select a Page from Top");
      } else {
        sender && sender.set("active"); // turn off the button
        editor.store();
      }
    },
  });
};

export const pageManager = (editor) => {
  editor.Panels.addButton("options", [
    {
      id: "manage-pages",
      className: "fa fa-file page-manager",
      command: "manage-pages",
      type: "button",

      attributes: {
        title: "Manage Templates",
        "data-bs-toggle": "modal",
        "data-bs-target": "#pagesModal",
      },
    },
  ]);

  editor.Commands.add("manage-pages", {
    run: function (editor, sender) {
      let myModal = document.getElementById("pagesModal");
    },
  });
};


export const widgetManager = (editor) => {
  editor.Panels.addButton("options", [
    {
      id: "manage-widgets",
      className: "fa fa-file-text-o page-manager",
      command: "manage-widgets",
      type: "button",

      attributes: {
        title: "Manage Widgets",
        "data-bs-toggle": "modal",
        "data-bs-target": "#widgetsModal",
      },
    },
  ]);

  editor.Commands.add("manage-widgets", {
    run: function (editor, sender) {
      let myModal = document.getElementById("widgetsModal");
    },
  });
};

export const logOut = (editor) => {
  editor.Panels.addButton("options", [
    {
      id: "log-out",
      className: "fa fa-sign-out page-manager",
      command: "log-out",
      type: "button",

      attributes: {
        title: "Log Out",
      },
    },
  ]);

  editor.Commands.add("log-out", {
    run: function (editor, sender) {
      sessionStorage.clear("loginInfo");
      window.location.reload();
    },
  });
};

export const savePage = (editor, currentPage) => { };

export const PageHandle = (setAllPages, tenantID) => {


  let pageData = {
    name: "",
    content: "",
    tenant_id: tenantID,
    template_category: ""
  };
  let pageName = "";
  pageName = document.getElementById("pageName").value.trim();
  if (!pageName) pageName = "";

  try {
    // replace all multiple spaces to single space
    pageName = pageName.replace(/\s\s+/g, " ");
  } catch (err) { }

  try {
    // replace all spaces to -
    pageName = pageName.replace(/ /g, "-");
  } catch (err) { }


  pageData.name = pageName;

  let response = "";
  newPage(pageData, tenantID
  )
    .then((data) => {
      response = data;
      document.getElementById("actionMsg").classList.remove("d-block");
      try {
        document.getElementById("actionMsg").classList.remove("d-none");
      } catch (err) { }
      document.getElementById("actionMsg").innerHTML = response.msg;
      setTimeout(() => {
        document.getElementById("actionMsg").classList.add("d-none");
      }, 2000);
      setTimeout(() => {
        document.getElementById("pageName").value = "";
        getPages(tenantID)
          .then((list) => {
            setAllPages(list);
          })
          .catch((err) => console.log(err));
      }, 2000);
    })
    .catch((err) => console.log(err));
};

export const WidgetHandle = (setAllWidgets) => {
  let widgetData = { name: "", slung: "" };
  let widgetName = "";
  widgetName = document.getElementById("widgetName").value.trim();
  if (!widgetName) widgetName = "";

  try {
    // replace all multiple spaces to single space
    widgetName = widgetName.replace(/\s\s+/g, " ");
  } catch (err) { }

  try {
    // replace all spaces to -
    widgetName = widgetName.replace(/ /g, "-");
  } catch (err) { }
  widgetData.name = widgetName;

  widgetData.slung = widgetName;

  widgetData.slung = widgetData.slung.toUpperCase();

  widgetData.slung = widgetData.slung.toLowerCase();
  let response = "";
  newWidget(widgetData)
    .then((data) => {
      response = data;
      document.getElementById("actionMsg2").classList.remove("d-block");
      try {
        document.getElementById("actionMsg2").classList.remove("d-none");
      } catch (err) { }
      document.getElementById("actionMsg2").innerHTML = response.msg;
      setTimeout(() => {
        document.getElementById("actionMsg2").classList.add("d-none");
      }, 2000);
      setTimeout(() => {
        document.getElementById("widgetName").value = "";
        getWidgets()
          .then((list) => {
            setAllWidgets(list);
          })
          .catch((err) => console.log(err));
      }, 2000);
    })
    .catch((err) => console.log(err));
};
