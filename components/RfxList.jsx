"use client";
import { DataGrid } from "@mui/x-data-grid";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
  } from "@mui/material";
import { getAllRfxRecordsActionByOppId } from "@/app/api/rfx/actions/rfx";
import React, {useEffect, useState} from "react";



// const renderOptionCell = (params) => (
//   <div style={{ display: "flex", alignItems: "center" }}>
//     <LuMessagesSquare
//       style={{ marginRight: 4, fontSize: 18, color: "#98A9BC" }}
//     />
//     <IoIosNotificationsOutline
//       style={{ marginRight: 4, fontSize: 18, color: "#98A9BC" }}
//     />
//     <HiOutlineDotsHorizontal
//       style={{ marginRight: 4, fontSize: 18, color: "#98A9BC" }}
//     />
//   </div>
// );

export default function RFxList( props ) {
  const {
    open,
    close,
    oppID,
    NoRowsOverlay,
    handlRowDetail,
    oppNum
} = props;

const [rfxRecords, setRfxRecords] = useState([]);

useEffect(() => {
  getAllRfxRecordsActionByOppId(oppID)
    .then((resp) => {
      setRfxRecords(resp.returnData);
    })
    .catch((err) => {});
}, []);


  let dataWithId = "";
  let columns = "";
  if (rfxRecords && rfxRecords.length > 0 && !rfxRecords.includes(null)) {
    dataWithId = rfxRecords.map((row) => ({
      ...row,
      id: row.rfx_id ? row.rfx_id : row.id,
      
    }));

    // Define an array containing the names of columns you want to display
    const selectedColumns = [
      "rfx_id",
      "rfx_type",
      "opportunity_title",
      "company_name",
      "end_user_name",
      "due_date",
      "status"
      
    ];

    const keys = rfxRecords && rfxRecords.length > 0 ? Object.keys(rfxRecords[0] || {}) : [];

    // Creating columns dynamically for selected columns
    columns = keys
      .filter((key) => selectedColumns.includes(key)) // Filter only the selected columns
      .map((key) => ({
        field: key,
        flex: 1,
        // order: setColumnsOrder(key),
        headerName: getCustomHeaderName(key), // Capitalize and replace underscores with spaces
        minWidth: 120,
        renderCell: (params) => (          
          <span>
            {params.value}
          </span>
        ),
      }));
    columns = [...columns].sort((a, b) => a.order - b.order);
    
    function getCustomHeaderName(key) {
      switch (key) {
        case "rfx_id":
          return "RFX ID";
        case "rfx_type":
          return "RFX TYPE";
        case "opportunity_title":
          return "OPPORTUNITY NAME";
        case "company_name":
          return "CUSTOMER";
        case "end_user_name":
            return "END USER";
        case "due_date":
          return "DUE DATE";
          case "status":
        return "STATUS"; 
                            
        default:
          return key;
      }
    }

    // function setColumnsOrder(key) {
    //   switch (key) {
    //     case "account_image":
    //       return 1;
    //     case "account_number":
    //       return 2;
    //     case "account_name":
    //       return 3;
    //     case "type_name":
    //       return 4;
    //     case "created_at":
    //       return 5;
    //     case "owner_name":
    //       return 6;
    //     case "street":
    //       return 7;       
    //     default:
    //       return key;
    //   }
    // }
  
 

  }
  return (
    
    <Dialog open={open} onClose={close} maxWidth="lg" fullWidth>
      <DialogTitle className="flex item-center justify-center font-bold">RFx Records found under Opportunity <span className="text-[#26BADA] ml-2">{oppNum}</span></DialogTitle>
      <DialogContent>
    <div
      style={{
        minHeight: "600px",
        width: "100%",
        maxWidth: "80vw",
        overflowX: "auto",
        margin: "auto",
      }}
      className="search-table"
    >
      {rfxRecords.length > 0 && !rfxRecords.includes(null) ? (
        <DataGrid
          rows={dataWithId}
          columns={columns}
          //onRowClick={handleRowClick}
          getRowId={(row) => row.id}
          slots={{
            noRowsOverlay: NoRowsOverlay,
          }}
          //onRowClick={handlRowDetail || handleRowClick}
          getRowClassName={(params) => "cursor-pointer"}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 8 },
            },
          }}
        />
      ) : (
        <DataGrid
          rows={[]}
          columns={[]}
          slots={{
            noRowsOverlay: NoRowsOverlay,
          }}
        />
      )}
    </div>
    </DialogContent>
    </Dialog>
    
  );
}
