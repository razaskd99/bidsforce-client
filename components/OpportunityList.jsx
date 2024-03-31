'use client'
import React, { useState } from 'react'
import SearchTable from './SearchTable'
import OpportunityInfoModal from '/admin-panel/components/OpportunityInfoModal.jsx';

const [openOpportunityModal,setOpenOpportunityModal ] = useState(false);
const OpportunityList = ({ data }) => {
  return (
    <div>
      <SearchTable rows={data} />
      {openOpportunityModal && (<OpportunityInfoModal setOpenOpportunityModal={setOpenOpportunityModal} />)}
    </div>
  )
}

export default OpportunityList