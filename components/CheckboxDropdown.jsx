import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const CheckboxDropdown = ({label, options}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = selectedOptions.indexOf(value);
    const newSelectedOptions = [...selectedOptions];

    if (currentIndex === -1) {
      newSelectedOptions.push(value);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }

    setSelectedOptions(newSelectedOptions);
  };

  return (
    <FormControl className="bg-white">
      <InputLabel id="content-submission-label">Content Submission</InputLabel>
      <Select
        labelId="content-submission-label"
        id="content_submission"
        multiple
        value={selectedOptions}
        onChange={(event) => setSelectedOptions(event.target.value)}
        label={label}
        renderValue={(selected) => selected.join(', ')}
      >
        {options.map((option) => (
        
        <MenuItem key={option.title} value={option.title} >
            <Checkbox
              checked={selectedOptions.indexOf(option.title) > -1}
              onChange={() => handleToggle(option.title)}
            />
            {option.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CheckboxDropdown;
