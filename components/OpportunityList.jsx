'use client'
import React from 'react'
import SearchTable from './SearchTable'

const OpportunityList = ({data}) => {
  return (
    <div>
        <SearchTable rows={data} />
    </div>
  )
}

export default OpportunityList