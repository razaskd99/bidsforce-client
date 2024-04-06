// Import necessary libraries and components
import { DataGrid } from "@mui/x-data-grid";
import { LuMessagesSquare } from "react-icons/lu";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import CustomPagination from "./CustomPagination";
import { showMainLoader102 } from "@/app/api/util/utility";
import { FaRegCalendarAlt } from "react-icons/fa";

// Define a function for rendering option cell
const renderOptionCell = (params) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <LuMessagesSquare
      style={{ marginRight: 4, fontSize: 18, color: "#98A9BC" }}
    />
    <IoIosNotificationsOutline
      style={{ marginRight: 4, fontSize: 18, color: "#98A9BC" }}
    />
    <HiOutlineDotsHorizontal
      style={{ marginRight: 4, fontSize: 18, color: "#98A9BC" }}
    />
  </div>
);

// Define columns for the DataGrid
const columns = [
  {
    field: "checkbox",
    headerName: <input type="checkbox" />,
    width: 160,
    renderCell: (params) => (
      <Image src={`/${params.value}`} width={40} height={40} />
    ),
  },
  { field: "rfxid", headerName: "RFX ID", width: 60 },
  { field: "type", headerName: "RFx Type", width: 160 },
  { field: "opportunity_title", headerName: "Opportunity Name", width: 160 },
  { field: "customer", headerName: "Customer", width: 160 },
  { field: "end_user_name", headerName: "End User", width: 160 },
  { field: "issued_date", headerName: "RFx Creation Date", width: 160 },
  { field: "due_date", headerName: "Due Date", width: 160 },
  { field: "owner", headerName: "RFx Owner", width: 160 },
  { field: "status", headerName: "Status", width: 160 },
  
  {
    field: "options",
    headerName: "...",
    width: 120,
    renderCell: renderOptionCell,
  },
];

// Define the DataTable component
export default function DataTable({ viewMode, data, viewType }) {
  let adjustedRows = [];
  // Adjusted rows with unique ids

  function statusStrToJSON(jsonString) {
    try {
      const jsonObject = JSON.parse(jsonString);
      return jsonObject;
    } catch (error) {
      return null;
    }
  }

  try {
    adjustedRows = data.map((rowData, index) => ({
      id: rowData.rfx_id, // Assuming rfx_id is unique
      tenant_id: rowData.tenant_id,
      opportunity_id: rowData.opportunity_id,
      opportunity_title: rowData.opportunity_title,
      initiator_id: rowData.initiator_id,
      rfx_bid_assignto: rowData.rfx_bid_assignto,
      checkbox: "Galaxy Petroleum.png", // Replace with the actual checkbox value
      description: rowData.rfx_title,
      rfxid: rowData.rfx_number,
      customer: rowData.company_name,
      type: rowData.rfx_type,
      duedate: rowData.due_date,
      contacts: `${rowData.initiator_first_name} ${rowData.initiator_last_name}`,
      status: statusStrToJSON(rowData.status) != null ? (viewType == 'bids' ? statusStrToJSON(rowData.status).bid : statusStrToJSON(rowData.status).rfx) : '', 
      rfx_title: rowData.rfx_title,
      rfx_type: rowData.rfx_type,
      rfx_number: rowData.rfx_number,
      acknowledgement_date: rowData.acknowledgement_date,
      acknowledgement_comment: rowData.acknowledgement_comment,
      acknowledged: rowData.acknowledged,
      acknowledgement_document: rowData.acknowledgement_document,
      under_existing_agreement: rowData.under_existing_agreement,
      previous_rfx_ref_num: rowData.previous_rfx_ref_num,
      revision_of_previous_rfx: rowData.revision_of_previous_rfx,
      agreement_ref_num: rowData.agreement_ref_num,
      issued_date: rowData.issued_date,
      due_date: rowData.due_date,
      crm_id: rowData.crm_id,
      bid_number: rowData.bid_number,
      bid_validity: rowData.bid_validity,
      request_for_bid: rowData.request_for_bid,
      submission_content: rowData.submission_content,
      submission_mode: rowData.submission_mode,
      submission_instructions: rowData.submission_instructions,
      visit_worksite: rowData.visit_worksite,
      visit_worksite_instructions: rowData.visit_worksite_instructions,
      tech_clarification_deadline: rowData.tech_clarification_deadline,
      com_clarification_deadline: rowData.com_clarification_deadline,
      enduser_id: rowData.enduser_id,
      end_user_name: rowData.end_user_name,
      end_user_name: rowData.end_user_name,
      owner: rowData.initiator_first_name + " " + rowData.initiator_last_name,
      rfx_id: rowData.rfx_id,
    }));
  } catch (err) { }

  // Setup necessary variables and state
  const pathname = usePathname();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the start and end index for paginated rows
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRows = adjustedRows.slice(startIndex, endIndex);
  const isManager = pathname.includes("/manager/");

  // Handle row click
  const handleRowClick = (params) => {
    showMainLoader102();
    const rowId = params.row.id;
    if (viewType == "bids") {
      router.push(`/manager/rfx/detail/${rowId}`);
    } else if (viewType == "rfx") {
      router.push(`/rfx/detail/${rowId}`);
    }
  };

  // Render the DataTable component
  return (
    <div>
      {viewMode === "list" ? (
        <div
          style={{
            height: "100%",
            maxHeight: "600px",
            width: "100%",
            maxWidth: "86vw",
            userSelect: "none",
          }}
          className="data-table mb-3"
        >
          <DataGrid
            className="select-none mb-5"
            rows={adjustedRows} // Use adjustedRows instead of data
            columns={columns}
            onRowClick={handleRowClick}
            pageSize={itemsPerPage}
            pagination
            getRowClassName={(params) => "cursor-pointer"}
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Render cards for each stage */}
            {['Initiated', 'In Progress', 'InReview', 'Closed'].map((stage, index) => (
              <div key={index} className=" bg-[#dcdbdb7b] rounded-t-lg">
                {/* Stage column heading */}
                <p className=" bg-[#26BADA] rounded-t-lg text-white p-2 ">{stage}</p>

                {/* Render cards for the current stage */}
                {paginatedRows.filter(row => row.status === stage.toLowerCase().replace(' ', '_')).map((row) => (
                  <div key={row.id} className=" bg-white rounded-md my-4 mx-3 shadow-sm p-2 pb-0 relative overflow-hidden h-auto">
                    <h3 className='text-[13px] mt-4 '>{row.description}</h3>
                    <p className='text-[13px] mt-1 text-[#98A9BC]'>{row.type}</p>
                    <div className="flex items-center justify-between text-[#98A9BC]  text-[11px] mt-3 m  mb-6  ">
                      <div className="flex items-center justify-center relative -space-x-3">
                        <Image src="/man.jpeg" alt="man" width={25} height={25} className="rounded-full w-auto" />
                        <Image src="/man.jpeg" alt="man" width={25} height={25} className="rounded-full w-auto" />
                        <Image src="/man.jpeg" alt="man" width={25} height={25} className="rounded-full w-auto" />
                        <div className="bg-[#F8FAFB] text-sm flex items-center justify-center p-4 w-4 h-4 text-[#98A9BC] rounded-full">+5</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaRegCalendarAlt />
                        <p>{row.duedate}</p>
                      </div>  
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>


          <CustomPagination
            totalItems={adjustedRows.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
