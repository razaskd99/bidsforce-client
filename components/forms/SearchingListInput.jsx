import { Grid, IconButton, TextField } from '@mui/material';
import { GridSearchIcon } from '@mui/x-data-grid';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'react-feather';

function SearchingListInput({ allSearchList, onListSelect, placeHolder, selectedValue }) {
  const [searchText, setSearchText] = useState(
    selectedValue ? selectedValue : ''
  );
  const [filteredListItems, setFilteredListItems] = useState([]);
  const [isSelected, setIsSelected] = useState(
    selectedValue ? true : false
  );
  const wrapperRef = useRef(null);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    const filtered = allSearchList?.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredListItems(filtered);
    if(!text) {
      setIsSelected(false);
    }
  };

  const handleAddNewCompany = () => {
    // Implement logic to add new company
    alert('Add new company functionality should be implemented here.');
  };

  const handleSelectCompany = (item) => {
    setSearchText(item.name);
    setFilteredListItems([]);
    onListSelect(item); // Call the callback function with the selected company
    setIsSelected(true);
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setFilteredListItems([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={wrapperRef}> 
      {/*<input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder={placeHolder ? placeHolder : "Search name..."}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  />*/}
      <Grid item xs={12} md={12}>
        <TextField
          fullWidth
          className='bg-white'
          label={placeHolder ? placeHolder : "Search name..."}
          variant="outlined"
          value={searchText}
          placeholder={placeHolder ? placeHolder : "Search name..."}
          onChange={handleInputChange}
          onClick={(e) => setFilteredListItems(allSearchList)}
          autoComplete="off"
          inputProps={{ maxLength: 100 }}     
          InputProps={{
            endAdornment: (
              <IconButton onClick={(e) => setFilteredListItems(allSearchList)}>
                <GridSearchIcon />
              </IconButton>
            ),
          }}           
        />
      </Grid>
      {/*!isSelected && searchText && filteredListItems.length === 0 && (
        <button onClick={handleAddNewCompany} className="absolute inset-y-0 right-0 flex items-center justify-center w-10 h-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </button>
      )*/}
      <ul className="flex absolute flex-col z-10 w-full max-h-[12rem] overflow-y-auto bg-slate-50 border border-gray-300 rounded-b-lg shadow-md overflow-hidden" style={{ display: filteredListItems?.length ? 'block' : 'none' }}>
        {filteredListItems?.map(item => (
          <li
            key={item.name}
            onClick={() => handleSelectCompany(item)}
            className="px-4 py-2 cursor-pointer hover:bg-slate-200"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchingListInput;
