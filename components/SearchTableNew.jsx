'use client'
import { DataGrid } from '@mui/x-data-grid';
import { LuMessagesSquare } from 'react-icons/lu';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const renderOptionCell = (params) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <LuMessagesSquare style={{ marginRight: 4, fontSize: 18, color: "#98A9BC" }}  onClick={() => handleIconClick('LuMessagesSquare')} />
    <IoIosNotificationsOutline style={{ marginRight: 4, fontSize: 18, color: "#98A9BC" }}  onClick={() => handleIconClick('IoIosNotificationsOutline')} />
    <HiOutlineDotsHorizontal style={{ marginRight: 4, fontSize: 18, color: "#98A9BC" }} onClick={() => handleIconClick('HiOutlineDotsHorizontal')} />
  </div>
);

const handleIconClick = (iconName) => {
  alert(`Icon ${iconName} clicked!`);
};
export default function SearchTableNew(props) {

  //   props.rows.forEach(function(row, index) {
  //     console.log("Inside Comp", row)
  //     row.id = index + 1;
  // });


  let dataWithId = ''
  let columns = ''
  if (props.rows && props.rows.length > 0 && !props.rows.includes(null)) {
    dataWithId = props.rows.map(row => ({ ...row, id: row.opportunity_id ? row.opportunity_id : row.id }));

    const keys = props.rows && props.rows.length > 0 ? Object.keys(props.rows[0] || {}) : [];

    // Creating columns dynamically
    columns = keys.filter(key => key !== 'id').map(key => ({
      field: key,
      flex: 1,
      headerName: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
      minWidth: 120,
      renderCell: (params) => {
        if (key === 'forcasted') {
          return <input type="checkbox" checked={params.value} disabled />;
        } else if (key === 'options') {
          return renderOptionCell();
        } else {
          return params.value;
        }
      },
    }));
    columns.push({
      field: 'options',
      headerName: 'Options',
      flex: 1,
      renderCell: renderOptionCell,
    });
    
  }
  const router = useRouter();
  const pathname = usePathname();
  const isManager = pathname.includes('/manager/');

  const handleRowClick = (params) => {
    const rowId = params.row.id;

    /*if (isManager) {
      router.push(`/manager/opportunities/add/${rowId}`);
    } else {
      router.push(`/opportunities/add/${rowId}`);
    }*/

    props.handleRowClick(rowId)
  };

  return (
    <div style={{ minHeight: '600px', width: '100%', maxWidth: '77vw', overflowX: 'auto' }} className='search-table m-auto'>
      {props.rows.length > 0 && !props.rows.includes(null) ? <DataGrid
        rows={dataWithId}
        columns={columns}
        // onRowClick={handleRowClick}
        getRowId={(row) => row.id}
        slots={{
          noRowsOverlay: props.NoRowsOverlay,
        }}
        onRowClick={handleRowClick}
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
            noRowsOverlay: props.NoRowsOverlay,
          }}
        />

      )
      }
    </div>
  );
}

