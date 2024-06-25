"use client";
import { usePathname, useRouter } from "next/navigation";
import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import 
  {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
  } from "@mui/material";

import { getAllRfxRecordsActionByOppId } from "@/app/api/rfx/actions/rfx";
import { formatDatetime, hideMainLoader102, showMainLoader102 } from "@/app/api/util/utility";

export default function RFxList(props) {
    const {
        open,
        close,
        handleRfxSelect,
        oppID,
        oppNum,
        selectData,
    } = props;

  hideMainLoader102()
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [rfxRecords, setRfxRecords] = useState([]);
    
  useEffect(() => {
    getAllRfxRecordsActionByOppId(oppID)
      .then((resp) => {
        setRfxRecords(resp.returnData);
      })
      .catch((err) => {});
  }, []); 

  
  const handleClose = () => {
    setIsOpen(false);
  };

  const router = useRouter();

  const handleRowClick = async(rfxData) => {   
   
    if(selectData == 'Copy'){
      handleRfxSelect(rfxData);
      close();
    }
    else{
      const rowId = rfxData.id;
      showMainLoader102();    
      router.push(`/rfx/detail/${rowId}`);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={close} maxWidth="xl" fullWidth>
        <DialogContent>            

          <div className='w-full mt-2 h-4 text-gray-800 text-xl'>
          <p>
              {rfxRecords.length} RFx Records Found under Opportunity <span className="text-[#26BADA]">{oppNum}</span>
          </p>
          </div>
    
          <table id='itemsListing' className="table-auto w-full border-separate border-spacing-y-3 bg-[#f2f4f6] mt-4">
            <tbody className='w-full'>
              <tr className="bg-[#F8FAFB] w-full text-[#778CA2] text-sm ">
               
                <th className="px-2 py-2 font-light text-left align-middle w-[110px]">RFX ID</th>
                <th className="px-2 py-2 font-light text-left align-middle w-[210px]">RFX TYPE</th>
                <th className="px-2 py-2 font-light text-left align-middle">OPPORTUNITY NAME</th>
                <th className="px-2 py-2 font-light text-left align-middle">CUSTOMER</th>
                <th className="px-2 py-2 font-light text-left align-middle">END USER</th>
                <th className="px-2 py-2 font-light text-left align-middle">RFX CREATION DATE</th>
                <th className="px-2 py-2 font-light text-left align-middle">DUE DATE</th>
                <th className="px-2 py-2 font-light text-left align-middle">RFX OWNER</th>
                <th className="px-2 py-2 font-light text-left align-middle">RFX STATUS</th>

              </tr>
              {rfxRecords.map((row) => (
                <tr key={row.id} className="relative bg-white text-[#252631] text-sm p-5 hover:bg-neutral-200 cursor-pointer"  >
                 
                                
                  <td className="px-2 py-2 text-small text-[#26BADA] cursor-pointer" >
                    {row.rfx_id}
                    <div
                      onClick={() => handleRowClick(row)}
                      className="absolute top-0 left-[50px] w-full h-full bg-transparent hover:pointer"
                      style={{ maxWidth: `calc(100% - 50px)` }} 
                    >
                    </div>                                     
                  </td>
                  <td className="px-2 py-2 text-small">{row.rfx_type}</td>
                  <td className="px-2 py-2 text-small">{row.opp_title}</td>
                  <td className="px-2 py-2 text-small">{row.customer_name}</td>
                  <td className="px-2 py-2 text-small">{row.enduser_name}</td>
                  <td className="px-2 py-2 text-small">{formatDatetime(row.created_at)}</td>
                  <td className="px-2 py-2 text-small">{row.due_date}</td>
                  <td className="px-2 py-2 text-small">{row.rfxowner_name}</td>
                  <td className="px-2 py-2 text-small">{row.rfx_status}</td>

                </tr>
              ))}
            </tbody>
          </table>          
        </DialogContent>
        </Dialog>
        </>
    
);
};

RFxList.propTypes = {
  rows: PropTypes.array.isRequired,
};
