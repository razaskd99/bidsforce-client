"use client";
import { DataGrid } from "@mui/x-data-grid";
import { LuMessagesSquare } from "react-icons/lu";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { showMainLoader102 } from "@/app/api/util/utility";

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

export default function SearchTable({ rows, NoRowsOverlay, handlRowDetail }) {
  let dataWithId = "";
  let columns = "";
  if (rows && rows.length > 0 && !rows.includes(null)) {
    dataWithId = rows.map((row) => ({
      ...row,
      id: row.opportunity_id ? row.opportunity_id : row.id,
    }));

    // Define an array containing the names of columns you want to display
    const selectedColumns = [
      "crm_id",
      "title",
      "customer_name",
      "end_user_name",
      "gross_profit_value",
      "business_unit",
      "opportunity_owner",
      "expected_award_date",
    ];

    const keys = rows && rows.length > 0 ? Object.keys(rows[0] || {}) : [];

    // Creating columns dynamically for selected columns
    columns = keys
      .filter((key) => selectedColumns.includes(key)) // Filter only the selected columns
      .map((key) => ({
        field: key,
        flex: 1,
        order: setColumnsOrder(key),
        headerName: getCustomHeaderName(key), // Capitalize and replace underscores with spaces
        minWidth: 120,
        renderCell: (params) =>
          key === "forcasted" ? (
            <input type="checkbox" checked={params.value} disabled />
          ) : (
            params.value
          ),
      }));
    columns = [...columns].sort((a, b) => a.order - b.order);

    console.log(columns);
    function getCustomHeaderName(key) {
      switch (key) {
        case "crm_id":
          return "Opportunity Number";
        case "title":
          return "Opportunity Name";
        case "customer_name":
          return "Customer";
        case "end_user_name":
          return "End User";
        case "gross_profit_value":
          return "Opportunity Value";
        case "business_unit":
          return "Business Line";
        case "opportunity_owner":
          return "Opportunity Owner";
        case "expected_award_date":
          return "Expected Award Date";

        default:
          return key;
      }
    }

    function setColumnsOrder(key) {
      switch (key) {
        case "crm_id":
          return 1;
        case "title":
          return 2;
        case "customer_name":
          return 3;
        case "end_user_name":
          return 4;
        case "gross_profit_value":
          return 5;
        case "business_unit":
          return 6;
        case "opportunity_owner":
          return 7;
        case "expected_award_date":
          return 8;

        default:
          return key;
      }
    }
  }

  const router = useRouter();
  const pathname = usePathname();
  const isManager = pathname.includes("/manager/");

  const handleRowClick = (params) => {
    const rowId = params.row.id;
    showMainLoader102();
    if (isManager) {
      router.push(`/manager/opportunities/add/${rowId}`);
    } else {
      router.push(`/opportunities/add/${rowId}`);
    }
  };

  return (
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
      {rows.length > 0 && !rows.includes(null) ? (
        <DataGrid
          rows={dataWithId}
          columns={columns}
          // onRowClick={handleRowClick}
          getRowId={(row) => row.id}
          slots={{
            noRowsOverlay: NoRowsOverlay,
          }}
          onRowClick={handlRowDetail || handleRowClick}
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
  );
}
