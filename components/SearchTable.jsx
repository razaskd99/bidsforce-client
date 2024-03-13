'use client'
import { DataGrid } from '@mui/x-data-grid';
import { LuMessagesSquare } from 'react-icons/lu';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const renderOptionCell = (params) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <LuMessagesSquare style={{ marginRight: 4, fontSize: 18, color: "#98A9BC" }} />
    <IoIosNotificationsOutline style={{ marginRight: 4, fontSize: 18, color: "#98A9BC" }} />
    <HiOutlineDotsHorizontal style={{ marginRight: 4, fontSize: 18, color: "#98A9BC" }} />
  </div>
);

export default function SearchTable({ rows, NoRowsOverlay, handlRowDetail }) {


  let dataWithId = ''
  let columns = ''
  if (rows && rows.length > 0 && !rows.includes(null)) {
    dataWithId = rows.map(row => ({ ...row, id: row.opportunity_id ? row.opportunity_id : row.id }));

    const keys = rows && rows.length > 0 ? Object.keys(rows[0] || {}) : [];

    // Creating columns dynamically
    columns = keys.map(key => ({
      field: key,
      flex: 1,
      headerName: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '), // Capitalize and replace underscores with spaces
      minWidth: 120,
      renderCell: (params) => (key === 'forcasted' ? <input type="checkbox" checked={params.value} disabled /> : params.value),
    }));
  }
  const router = useRouter();
  const pathname = usePathname();
  const isManager = pathname.includes('/manager/');

  const handleRowClick = (params) => {
    const rowId = params.row.id;

    if (isManager) {
      router.push(`/manager/opportunities/add/${rowId}`);
    } else {
      router.push(`/opportunities/add/${rowId}`);
    }


  };

  return (
    <div style={{ minHeight: '600px', width: '100%', maxWidth: '80vw', overflowX: 'auto' }} className='search-table'>
      {rows.length > 0 && !rows.includes(null) ? <DataGrid
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
      /> : (
        <DataGrid
          rows={[]}
          columns={[]}
          slots={{
            noRowsOverlay: NoRowsOverlay,
          }}
        />

      )
      }
    </div>
  );
}

