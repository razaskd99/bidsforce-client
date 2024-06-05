'use client'
import React, { useState } from 'react'
import OpportunityTable from './OpportunityTable';
import OpportunityInfoModal from '/admin-panel/components/OpportunityInfoModal.jsx';

const [openOpportunityModal,setOpenOpportunityModal ] = useState(false);
const OpportunityList = ({ data }) => {
  return (
    <div>
      <OpportunityTable rows={data} />
      {openOpportunityModal && (<OpportunityInfoModal setOpenOpportunityModal={setOpenOpportunityModal} />)}
    </div>
  )
}

export default OpportunityList