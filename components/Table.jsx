// Import necessary libraries and components
import { DataGrid } from '@mui/x-data-grid';
import { LuMessagesSquare } from 'react-icons/lu';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import CustomPagination from './CustomPagination';

// Define a function for rendering option cell
const renderOptionCell = (params) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <LuMessagesSquare style={{ marginRight: 4, fontSize: 18, color: '#98A9BC' }} />
    <IoIosNotificationsOutline style={{ marginRight: 4, fontSize: 18, color: '#98A9BC' }} />
    <HiOutlineDotsHorizontal style={{ marginRight: 4, fontSize: 18, color: '#98A9BC' }} />
  </div>
);

// Define columns for the DataGrid
const columns = [
  { field: 'checkbox', headerName: <input type='checkbox' />, width: 220, renderCell: (params) => <Image src={`/${params.value}`} width={40} height={40} /> },
  { field: 'description', headerName: 'Description', width: 220 },
  { field: 'rfxid', headerName: 'RFX ID', width: 160 },
  { field: 'customer', headerName: 'Customer', width: 160 },
  { field: 'type', headerName: 'Type', width: 160 },
  { field: 'duedate', headerName: 'Due Date', width: 160 },
  { field: 'contacts', headerName: 'Contacts', width: 160 },
  { field: 'status', headerName: 'Status', width: 160 },
  { field: 'options', headerName: '...', width: 120, renderCell: renderOptionCell },
];




// Define the DataTable component
export default function DataTable({ viewMode, data }) {

  let adjustedRows = []
  // Adjusted rows with unique ids
  try {
    adjustedRows = data.map((rowData, index) => ({
      id: rowData.rfx_id, // Assuming rfx_id is unique
      tenant_id: rowData.tenant_id,
      opportunity_id: rowData.opportunity_id,
      initiator_id: rowData.initiator_id,
      rfx_bid_assignto: rowData.rfx_bid_assignto,
      checkbox: 'Galaxy Petroleum.png', // Replace with the actual checkbox value
      description: rowData.rfx_title,
      rfxid: rowData.rfx_number,
      customer: rowData.company_name,
      type: rowData.rfx_type,
      duedate: rowData.due_date,
      contacts: rowData.customer_name,
      status: rowData.status, // Replace with the actual status value
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
      enduser_type: rowData.enduser_type,
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
  const isManager = pathname.includes('/manager/');

  // Handle row click
  const handleRowClick = (params) => {
    const rowId = params.row.id;
    if (isManager) {
      router.push(`/manager/rfx/detail/${rowId}`);
    } else {
      router.push(`/rfx/detail/${rowId}`);
    }
  };

  // Render the DataTable component
  return (
    <div>
      {viewMode === 'list' ? (
        <div style={{ height: '100%', maxHeight: '600px', width: '100%',maxWidth:'100%', userSelect: 'none' }} className='data-table'>
          <DataGrid
            className='select-none mb-5'
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
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {paginatedRows.map((row) => (
              <div key={row.id} className='bg-white p-8 py-16 border rounded-md text-center'>
                <Image src={`/${row.checkbox}`} width={80} height={80} className='m-auto mb-1' />
                <div className='mt-2 text-[#778CA2] mb-1'>{row.description}</div>
                <div className='text-xl mb-1'>{row.customer}</div>
                <div className='mt-2 text-lg mb-1'>{row.duedate}</div>
                <div className='mt-2 text-sm text-[#98A9BC] mb-2'>Due Date</div>
                <div className='flex justify-center relative w-[30%] m-auto mt-3'>
                  <Image src='/man.jpeg' alt='man' width={36} height={36} className=' rounded-full w-auto absolute top-0 left-[0px]' />
                  <Image src='/man.jpeg' alt='man' width={36} height={36} className=' rounded-full w-auto absolute top-0 left-[20px]' />
                  <Image src='/man.jpeg' alt='man' width={36} height={36} className=' rounded-full w-auto absolute top-0 left-[40px]' />
                  <div className='bg-[#F8FAFB] p-3 text-[#98A9BC] rounded-full w-auto absolute top-0 left-[60px]'>+5</div>
                </div>
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
